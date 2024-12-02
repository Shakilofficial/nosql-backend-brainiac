import config from '../../config';
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
    throw new Error('Academic semester not found');
  }

  //set generated id
  userData.id = await generateStudentId(admissionSemester);

  // create new user
  const newUser = await User.create(userData);
  // create new student

  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; //reference id
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
