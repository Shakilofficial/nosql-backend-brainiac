import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id || null;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  const lastStudentId = await findLastStudentId();
  const currentSemesterCode = payload.code; // e.g., '01'
  const currentYear = payload.year; // e.g., '2024'
  let incrementId = '0001'; // Default for the first student

  if (lastStudentId) {
    const lastStudentSemesterCode = lastStudentId.substring(4, 6);
    const lastStudentYear = lastStudentId.substring(0, 4);
    const lastStudentIncrement = parseInt(lastStudentId.substring(6), 10);

    if (
      lastStudentSemesterCode === currentSemesterCode &&
      lastStudentYear === currentYear
    ) {
      incrementId = (lastStudentIncrement + 1).toString().padStart(4, '0');
    }
  }

  const newId = `${currentYear}${currentSemesterCode}${incrementId}`;
  return newId;
};
