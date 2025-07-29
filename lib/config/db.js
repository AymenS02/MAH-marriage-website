import mongoose from 'mongoose';

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://shoteriaymen:Anev3682013.@nikkah-cluster.eeswmxe.mongodb.net/nikkah-app')
    console.log('MongoDB connected successfully');
}