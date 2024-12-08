import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { facultyServices } from './faculty.service';

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.getSingleFacultyFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully fetched faculty',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await facultyServices.getAllFacultiesFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully fetched faculties',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await facultyServices.updateFacultyIntoDB(id, faculty);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated faculty',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.deleteFacultyFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully deleted faculty',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
