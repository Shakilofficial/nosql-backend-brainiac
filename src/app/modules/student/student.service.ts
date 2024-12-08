/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { studentSearchableFields } from './student.const';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  //use query builder -------> it works
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({ path: 'academicDepartment', populate: 'academicFaculty' }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;

  /* 
    //when don't use query builder -------> it works
  console.log('base query', query);
  const queryObj = { ...query };
  //{email:{$regex:query.searchTerm,$options:'i'}}
  //{presentAddress:{$regex:query.searchTerm,$options:'i'}}
  //{'name.firstName':{$regex:query.searchTerm,$options:'i'}}
  const searchableFields = ['email', 'presentAddress', 'name.firstName'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const excludeFields = ['searchTerm', 'sort', 'page', 'limit', 'fields'];
  excludeFields.forEach((field) => {
    delete queryObj[field];
  });

  const filterQuey = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({ path: 'academicDepartment', populate: 'academicFaculty' });
  let sort = '-createdAt';
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuey.sort(sort);

  let page = 1;
  let skip = 0;
  let limit = 0;
  if (query?.limit) {
    limit = query?.limit as number;
  }
  if (query?.page) {
    page = query?.page as number;
    skip = (page - 1) * limit;
  }
  const paginationQuery = sortQuery.skip(skip);
  const limitQuery = paginationQuery.limit(limit);

  //fields limiting
  let fields = '-__v';
  //fields:'name,email';
  //fields: 'name email';

  if (query?.fields) {
    fields = (query?.fields as string).split(',').join(' ');
    console.log(fields);
  }
  const fieldQuery = await limitQuery.select(fields);
  return fieldQuery; */
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById({ id })
    .populate('admissionSemester')
    .populate({ path: 'academicDepartment', populate: 'academicFaculty' });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...rest } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...rest,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deleteStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student 🚫');
    }
    const userId = deleteStudent.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user 🚫');
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
  } catch (err: any) {
    session.abortTransaction();
    session.endSession();
    throw new Error(err);
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
