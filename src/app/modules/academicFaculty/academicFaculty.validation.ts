import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Faculty Name is required',
        invalid_type_error: 'Faculty Name must be a string',
      })
      .trim(),
  }),
});

const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Faculty Name is required',
        invalid_type_error: 'Faculty Name must be a string',
      })
      .trim()
      .optional(),
  }),
});

export const academicFacultyValidations = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
