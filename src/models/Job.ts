import mongoose, { InferSchemaType, Schema, model } from 'mongoose';

const jobSchema = new Schema({
    company: {
        type: String,
        required: [true, 'Please provide a company'],
        maxLength: 100
    },
    position: {
        type: String,
        required: [true, 'Please provide a position'],
        maxLength: 100
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user'],
        immutable: true
    }
}, { timestamps: true });

export type JobType = InferSchemaType<typeof jobSchema>;

const Job = model<JobType>('Job', jobSchema);

export default Job;

