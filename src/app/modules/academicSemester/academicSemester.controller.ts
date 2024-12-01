import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
 const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic Semester created successfully.',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};