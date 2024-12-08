import { z } from 'zod';
import { BloodGroup, Gender } from './faculty.constant';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().trim().optional(),
  lastName: z.string().min(1, { message: 'Last Name is required' }).trim(),
});

export const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(20, { message: 'Password cannot exceed 20 characters' })
      .trim(),
    faculty: z.object({
      designation: z.string().trim(),
      name: createUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email address' }).trim(),
      contactNo: z.string().trim(),
      emergencyContactNo: z.string().trim(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().trim(),
      permanentAddress: z.string().trim(),
      profileImg: z
        .string()
        .url({ message: 'Profile Image must be a valid URL' })
        .optional(),
      academicDepartment: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'First Name is required' })
    .max(20, { message: 'First Name cannot exceed 20 characters' })
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    })
    .optional(),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last Name is required' })
    .trim()
    .optional(),
});

export const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      designation: z.string().trim().optional(),
      name: updateUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email({ message: 'Invalid email address' })
        .trim()
        .optional(),
      contactNo: z.string().trim().optional(),
      emergencyContactNo: z.string().trim().optional(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().trim().optional(),
      permanentAddress: z.string().trim().optional(),
      profileImg: z
        .string()
        .url({ message: 'Profile Image must be a valid URL' })
        .optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const facultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
