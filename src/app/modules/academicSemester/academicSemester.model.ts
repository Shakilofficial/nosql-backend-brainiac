import { model, Schema } from 'mongoose';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: [true, 'Name is required'],
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: [true, 'Code is required'],
    },
    year: {
      type: Date,
      required: [true, 'Year is required'],
    },
    startMonth: {
      type: String,
      enum: Months,
      required: [true, 'Start date is required'],
    },
    endMonth: {
      type: String,
      enum: Months,
      required: [true, 'End date is required'],
    },
  },
  { timestamps: true },
);

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
