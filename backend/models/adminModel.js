import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    }
);

adminSchema.pre('save', async function() {
    try {
        
    } catch (error) {
        next(error);
    }
})

export const Admin = mongoose.model("Admin", adminSchema); 