import { model, Schema } from 'mongoose';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: {
        values: SemesterRegistrationStatus,
        message: '{VALUE} is not a valid semester registration status',
      },
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    minCredit: {
      type: Number,
      required: [true, 'Minimum credit is required'],
      default: 3,
    },
    maxCredit: {
      type: Number,
      required: [true, 'Maximum credit is required'],
      default: 15,
    },
  },
  { timestamps: true },
);

export const SemesterRegistration = model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
