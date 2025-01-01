import { model, Schema } from 'mongoose';
import { BloodGroup, Gender } from './admin.constant';
import { AdminModel, TAdmin, TUserName } from './admin.interface';

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

const adminSchema = new Schema<TAdmin, AdminModel>(
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
      maxlength: [30, 'Designation should not be more than 20 characters'],
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
      maxlength: [40, 'Email should not be more than 40 characters'],
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true } },
);

//generate fullName
adminSchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    ' ' +
    this?.name?.middleName +
    ' ' +
    this?.name?.lastName
  ).trim();
});

//filter out deleted faculty
adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//check if user exists
adminSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Admin.findOne({ id });
  return existingUser;
};

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
