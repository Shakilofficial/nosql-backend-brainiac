import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import AppError from '../../utils/AppError';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
  },
  { timestamps: true },
);

//check if faculty name already exist
academicFacultySchema.pre('save', async function (next) {
  const isFacultyExist = await AcademicFaculty.findOne({
    name: this.name,
  });
  if (isFacultyExist) {
    throw new AppError(400, 'Faculty name already exist');
  }
  next();
});

//check if faculty exist
academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isFacultyExist = await AcademicFaculty.findOne(query);
  if (!isFacultyExist) {
    throw new AppError(404, 'Faculty not found');
  }
  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
