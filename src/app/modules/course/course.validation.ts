import { z } from 'zod';

const preRequisiteCoursesValidationSchema = z.object({
  course: z
    .string({
      required_error: 'Course id is required',
      invalid_type_error: 'Course id must be a string',
    })
    .trim(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
      })
      .trim(),
    prefix: z
      .string({
        required_error: 'Prefix is required',
        invalid_type_error: 'Prefix must be a string',
      })
      .trim(),
    code: z.number({
      required_error: 'Code is required',
      invalid_type_error: 'Code must be a number',
    }),
    credits: z.number({
      required_error: 'Credits is required',
      invalid_type_error: 'Credits must be a number',
    }),
    preRequisiteCourses: z
      .array(preRequisiteCoursesValidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updatePreRequisiteCoursesValidationSchema = z.object({
  course: z.string({
    invalid_type_error: 'Course id must be a string',
  }),
  isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: 'Title must be a string',
      })
      .trim()
      .optional(),
    prefix: z
      .string({
        invalid_type_error: 'Prefix must be a string',
      })
      .trim()
      .optional(),
    code: z
      .number({
        invalid_type_error: 'Code must be a number',
      })
      .optional(),
    credits: z
      .number({
        invalid_type_error: 'Credits must be a number',
      })
      .optional(),
    preRequisiteCourses: z
      .array(updatePreRequisiteCoursesValidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const facultiesWithCoursesValidationSchema = z.object({
  body: z.object({
    faculties: z.array(
      z.string({
        invalid_type_error: 'Faculty id must be a string',
      }),
    ),
  }),
});

export const courseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultiesWithCoursesValidationSchema,
};
