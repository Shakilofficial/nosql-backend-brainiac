import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentIntoDB(
    req.file,
    password,
    studentData,
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student created successfully.',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;
  const result = await UserServices.createFacultyIntoDB(
    req.file,
    password,
    facultyData,
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Faculty created successfully.',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  const result = await UserServices.createAdminIntoDB(
    req.file,
    password,
    adminData,
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin created successfully.',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await UserServices.getMe(userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully.',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await UserServices.changeStatus(id, status);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User status updated successfully.',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully fetched users',
    meta: result.meta,
    data: result.result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
  getAllUsers,
};
