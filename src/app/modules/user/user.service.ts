/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Faculty } from '../faculty/faculty.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //set student role
  const userData: Partial<TUser> = {};
  //if password is not provided then ,use default password
  userData.password = password || (config.default_password as string);
  //set student role
  userData.role = 'student';

  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // Handle null academic semester
  if (!admissionSemester) {
    throw new AppError(400, 'Invalid semester ID ❌');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set generated id
    userData.id = await generateStudentId(admissionSemester);

    // create new user(transaction -1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user 🚫');
    }
    payload.id = newUser[0].id; //set id, _id as user
    payload.user = newUser[0]._id; //reference id

    // create new student(transaction -2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student 🚫');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFacultyIntoDB = async (password: string, payload: TStudent) => {
  //set faculty role
  const userData: Partial<TUser> = {};
  //if password is not provided then ,use default password
  userData.password = password || (config.default_password as string);
  //set faculty role
  userData.role = 'faculty';

  //find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  // Handle null academic semester
  if (!academicDepartment) {
    throw new AppError(400, 'Invalid department ID ❌');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set generated id
    userData.id = await generateFacultyId();

    // create new user(transaction -1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user 🚫');
    }
    payload.id = newUser[0].id; //set id, _id as user
    payload.user = newUser[0]._id; //reference id

    // create new faculty(transaction -2)
    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty 🚫');
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
