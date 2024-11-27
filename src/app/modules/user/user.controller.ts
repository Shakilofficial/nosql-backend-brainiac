import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Student created successfully.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
