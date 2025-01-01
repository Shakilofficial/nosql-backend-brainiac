import { model, Schema } from 'mongoose';
import { BloodGroup, Gender } from './faculty.constant';
import { FacultyModel, TFaculty, TUserName } from './faculty.interface';

const userSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'Please enter your first name'],
    trim: true,
    maxlength: [20, 'First name should not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [20, 'Middle name should not be more than 20 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your last name'],
    trim: true,
    maxlength: [20, 'Last name should not be more than 20 characters'],
  },
});

const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: [true, 'Please enter your id'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please enter your user id'],
      unique: true,
    },
    designation: {
      type: String,
      required: [true, 'Please enter your designation'],
      trim: true,
      maxlength: [20, 'Designation should not be more than 20 characters'],
    },
    name: {
      type: userSchema,
      required: [true, 'Please enter your name'],
    },
    gender: {
      type: String,
      required: [true, 'Please enter your gender'],
      enum: {
        values: Gender,
        message: '{VALUE} is not a valid gender',
      },
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please enter your date of birth'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      trim: true,
      maxlength: [30, 'Email should not be more than 20 characters'],
    },
    contactNo: {
      type: String,
      required: [true, 'Please enter your contact number'],
      trim: true,
      maxlength: [20, 'Contact number should not be more than 20 characters'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Please enter your emergency contact number'],
      trim: true,
      maxlength: [
        20,
        'Emergency contact number should not be more than 20 characters',
      ],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Please enter your present address'],
      trim: true,
      maxlength: [50, 'Present address should not be more than 20 characters'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Please enter your permanent address'],
      trim: true,
      maxlength: [
        50,
        'Permanent address should not be more than 20 characters',
      ],
    },
    profileImg: {
      type: String,
      default: '',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: [true, 'Please enter your academic department'],
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true } },
);

//generate fullName
facultySchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    ' ' +
    this?.name?.middleName +
    ' ' +
    this?.name?.lastName
  ).trim();
});

//filter out deleted faculty
facultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//check if user exists
facultySchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Faculty.findOne({ id });
  return existingUser;
};

export const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema);
