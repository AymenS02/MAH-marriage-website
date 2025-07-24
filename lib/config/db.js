import mongoose from 'mongoose';

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://nikkah-project:Anev3682013.@cluster0.cwzowuq.mongodb.net/profile-database')
    console.log('MongoDB connected successfully');
}