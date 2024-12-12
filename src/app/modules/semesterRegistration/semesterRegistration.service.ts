import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import { registrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;
  //check if there any registered semester that is already 'UPCOMING' or 'ONGOING'
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.CONFLICT,
      `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} semester registered !`,
    );
  }
  // check if the semester is exist
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found !',
    );
  }

  // check if the semester is already registered!
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered!',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //check if the Requested semester registration exist
  const isRequestedSemesterRegistrationExists =
    await SemesterRegistration.findById(id);
  if (!isRequestedSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This semester registration not found !',
    );
  }
  //if the requested semester registration status 'ENDED' then we can not update any data
  const currentSemesterRegistrationStatus =
    isRequestedSemesterRegistrationExists.status;
  if (currentSemesterRegistrationStatus === registrationStatus.ENDED) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This Semester is already ${currentSemesterRegistrationStatus} !`,
    );
  }

  //UPCOMING --> ONGOING --> ENDED

  if (
    currentSemesterRegistrationStatus === registrationStatus.UPCOMING &&
    payload.status === registrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.CONFLICT,
      `You can not directly change the status from ${currentSemesterRegistrationStatus} to ${payload.status} !`,
    );
  }
  if (
    currentSemesterRegistrationStatus === registrationStatus.ONGOING &&
    payload.status === registrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.CONFLICT,
      `You can not directly change the status from ${currentSemesterRegistrationStatus} to ${payload.status} !`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
