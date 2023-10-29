
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { versionKey: false });

export const UserModel = mongoose.model('users', userSchema);

