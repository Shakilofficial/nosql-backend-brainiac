import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'First Name is required' })
    .max(20, { message: 'First Name cannot exceed 20 characters' })
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().trim().optional(),
  lastName: z.string().min(1, { message: 'Last Name is required' }).trim(),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().trim(),
  fatherOccupation: z.string().trim(),
  fatherContactNo: z
    .string()
    .regex(/^\d{10}$/, { message: 'Father Contact No must be 10 digits' })
    .trim(),
  motherName: z.string().trim(),
  motherOccupation: z.string().trim(),
  motherContactNo: z
    .string()
    .regex(/^\d{10}$/, { message: 'Mother Contact No must be 10 digits' })
    .trim(),
});

const localGuardianValidationSchema = z.object({
  name: z.string().trim(),
  occupation: z.string().trim(),
  contactNo: z
    .string()
    .regex(/^\d{10}$/, { message: 'Contact No must be 10 digits' })
    .trim(),
  address: z.string().trim(),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(20, { message: 'Password cannot exceed 20 characters' })
      .trim(),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z
        .string()
        .optional()
        .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
          message: 'Date of Birth must be in YYYY-MM-DD format',
        }),
      email: z.string().email({ message: 'Invalid email address' }).trim(),
      contactNo: z
        .string()
        .regex(/^\d{10}$/, { message: 'Contact No must be 10 digits' })
        .trim(),
      emergencyContactNo: z
        .string()
        .regex(/^\d{10}$/, {
          message: 'Emergency Contact No must be 10 digits',
        })
        .trim(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().trim(),
      permanentAddress: z.string().trim(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z
        .string()
        .url({ message: 'Profile Image must be a valid URL' })
        .optional(),
      admissionSemester: z
        .string()
        .regex(/^[a-f0-9]{24}$/, { message: 'Invalid Semester ID' }),
      academicDepartment: z
        .string()
        .regex(/^[a-f0-9]{24}$/, { message: 'Invalid Department ID' }),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
