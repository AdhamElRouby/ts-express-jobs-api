import { Request, Response } from 'express';
import Job, { type JobType } from '../models/Job';
import CustomAPIError from '../errors/CustomAPIError';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';

export const getAllJobs = async (req: Request, res: Response) => {
  const jobs = await Job.find({ createdBy: req.user?.userId }).sort(
    '-createdAt'
  );
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

export const createJob = async (
  req: Request<{}, {}, { company: string; position: string }>,
  res: Response
) => {
  // get the company and position
  const { company, position } = req.body || {};
  // create the job
  const job = await Job.create({
    company,
    position,
    createdBy: new Types.ObjectId(req.user?.userId),
  });
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req: Request<{ id: string }>, res: Response) => {
  const { id: jobId } = req.params;
  const { userId } = req.user!;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  // MongoDB does not interact with a null job as an error
  if (!job) {
    throw new CustomAPIError(`No job with ${jobId}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (
  req: Request<{ id: string }, {}, { company?: string; position?: string }>,
  res: Response
) => {
  const { id: jobId } = req.params;
  const { userId } = req.user!;
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new CustomAPIError(`No job with ${jobId}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ job });
};

export const deleteJob = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id: jobId } = req.params;
  const { userId } = req.user!;
  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new CustomAPIError(`No job with ${jobId}`, StatusCodes.NOT_FOUND);
  }
  res.sendStatus(StatusCodes.NO_CONTENT);
};
