import { model, Schema } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: [true, 'Please enter your course title'],
      trim: true,
      maxlength: [30, 'Course title should not be more than 30 characters'],
    },
    prefix: {
      type: String,
      required: [true, 'Please enter your course prefix'],
      trim: true,
      maxlength: [10, 'Course prefix should not be more than 10 characters'],
    },
    code: {
      type: Number,
      required: [true, 'Please enter your course code'],
      trim: true,
      maxlength: [10, 'Course code should not be more than 10 characters'],
    },
    credits: {
      type: Number,
      required: [true, 'Please enter your course credits'],
      trim: true,
      min: [1, 'Credits should be greater than 0'],
      max: [10, 'Credits should be less than 10'],
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Course = model<TCourse>('Course', courseSchema);

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Please select your course'],
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
);