import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../utils/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

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
    throw new AppError(400, 'Invalid semester ID');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set generated id
    userData.id = await generateStudentId(admissionSemester);

    // create new user(transaction -1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id; //set id, _id as user
    payload.user = newUser[0]._id; //reference id

    // create new student(transaction -2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: unknown) {
    await session.abortTransaction();
    await session.endSession();

    if (err instanceof AppError) {
      throw err; // re-throw the custom AppError
    }

    // If the error is not an AppError, throw a generic error with a custom message
    throw new AppError(500, 'Failed to create student');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
