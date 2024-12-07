import { model, Schema } from 'mongoose';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import AppError from '../../errors/AppError';

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
      type: String,
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

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExists) {
    throw new AppError(400, 'Semester already exists 🚫');
  }
  next();
});

//check if semester exist
academicSemesterSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isSemesterExist = await AcademicSemester.findOne(query);
  if (!isSemesterExist) {
    throw new AppError(404, 'Semester not found 🔍');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
