import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z
      .enum([...SemesterRegistrationStatus] as [string, ...string[]])
      .optional(),
    startDate: z.string().datetime().trim(),
    endDate: z.string().datetime().trim(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().trim().optional(),
    status: z
      .enum([...SemesterRegistrationStatus] as [string, ...string[]])
      .optional(),
    startDate: z.string().datetime().trim().optional(),
    endDate: z.string().datetime().trim().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const semesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};
