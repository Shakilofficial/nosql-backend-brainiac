import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  { message: 'Time is invalid, it should be in format HH:MM' },
);

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string({
        required_error: 'Semester registration id is required',
        invalid_type_error: 'Semester registration id is invalid',
      }),
      academicSemester: z.string({
        required_error: 'Academic semester id is required',
        invalid_type_error: 'Academic semester id is invalid',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty id is required',
        invalid_type_error: 'Academic faculty id is invalid',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department id is required',
        invalid_type_error: 'Academic department id is invalid',
      }),
      course: z.string({
        required_error: 'Course id is required',
        invalid_type_error: 'Course id is invalid',
      }),
      faculty: z.string({
        required_error: 'Faculty id is required',
        invalid_type_error: 'Faculty id is invalid',
      }),
      maxCapacity: z.number({
        required_error: 'Max capacity is required',
        invalid_type_error: 'Max capacity is invalid',
      }),
      section: z.number({
        required_error: 'Section is required',
        invalid_type_error: 'Section is invalid',
      }),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return start < end;
      },
      { message: 'Start time should be less than end time' },
    ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string({}),
      maxCapacity: z.number({}),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return start < end;
      },
      { message: 'Start time should be less than end time' },
    ),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
