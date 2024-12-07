import mongoose from 'mongoose';
import { TErrorResponse, TErrorSources } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (error: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: error?.path,
        message: error?.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error ⚠️',
    errorSources,
  };
};
export default handleValidationError;
