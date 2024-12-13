import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { hasTimeConflict } from './offeredCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  //check if semesterRegistration is exist
  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration is not found',
    );
  }
  const academicSemester = isSemesterRegistrationExist.academicSemester;

  //check if academicFaculty is exist
  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty is not found');
  }

  //check if academicDepartment is exist
  const isAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department is not found',
    );
  }

  //check if course is exist
  const isCourseExist = await Course.findById(course);
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found');
  }

  //check if faculty is exist
  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found');
  }

  //check if the the department is belong to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Department ${isAcademicDepartmentExist.name} is not belong to faculty ${isFacultyExist.name}`,
    );
  }

  //check if the same offered course same section in same registered semester exists
  const isOfferedCourseExist = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section,
  });
  if (isOfferedCourseExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Offered course with section ${section} already exists`,
    );
  }

  //get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    faculty,
    semesterRegistration,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = { days, startTime, endTime };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This faculty is not available now, try another time',
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const offeredCourse = await OfferedCourse.findById(id);

  //if not found throw error
  if (!offeredCourse) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course is not found');
  }

  return offeredCourse;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<
    TOfferedCourse,
    'faculty' | 'maxCapacity' | 'days' | 'startTime' | 'endTime'
  >,
) => {
  const { faculty, maxCapacity, days, startTime, endTime } = payload;

  //check if the offered course exists
  const isOfferedCourseExist = await OfferedCourse.findById(id);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course is not found');
  }

  //check if the faculty is Exists
  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found !');
  }

  const semesterRegistration = isOfferedCourseExist.semesterRegistration;

  //checking the status of semester registration
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.CONFLICT,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }

  // check if the faculty is available at this time.
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    maxCapacity,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = { days, startTime, endTime };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This faculty is not available now, try another time',
    );
  }
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOfferedCourseIntoDB = async (id: string) => {
  //check if the offered course exists
  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course is not found');
  }

  //check if the the semester registration status is UPCOMING
  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration).select('status');

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.CONFLICT,
      `You can not delete this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }
  const result = await OfferedCourse.findByIdAndDelete(id);
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseIntoDB,
};
