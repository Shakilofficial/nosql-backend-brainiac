import { Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = (req: Request, res: Response): void => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `Route Not Found for ${req.originalUrl} ⚠️`,
  });
};

export default notFound;
