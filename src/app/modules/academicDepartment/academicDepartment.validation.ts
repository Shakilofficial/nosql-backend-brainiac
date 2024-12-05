import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Department Name is required',
        invalid_type_error: 'Department Name must be a string',
      })
      .trim(),
    academicFaculty: z
      .string({
        required_error: 'Academic Faculty is required',
        invalid_type_error: 'Academic Faculty must be a string',
      })
      .trim(),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Department Name is required',
        invalid_type_error: 'Department Name must be a string',
      })
      .trim()
      .optional(),
    academicFaculty: z
      .string({
        required_error: 'Academic Faculty is required',
        invalid_type_error: 'Academic Faculty must be a string',
      })
      .trim()
      .optional(),
  }),
});

export const academicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
