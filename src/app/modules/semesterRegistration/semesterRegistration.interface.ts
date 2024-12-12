import { Types } from 'mongoose';

export type TSemesterRegistrationStatus = 'UPCOMING' | 'ONGOING' | 'ENDED';

export type TSemesterRegistration = {
  academicSemester: Types.ObjectId;
  status: TSemesterRegistrationStatus;
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};
