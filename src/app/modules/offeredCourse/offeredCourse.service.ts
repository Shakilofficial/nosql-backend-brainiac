import httpStatus from 'http-status';
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

const getAllOfferedCoursesFromDB = async () => {
  const result = await OfferedCourse.find();
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: TOfferedCourse,
) => {
  const result = await OfferedCourse.findByIdAndUpdate(id, payload);
  return result;
};

const deleteOfferedCourseIntoDB = async (id: string) => {
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
