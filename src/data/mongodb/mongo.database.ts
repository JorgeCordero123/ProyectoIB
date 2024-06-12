import mongoose from "mongoose";


interface Options{
    mongoUrl: string;
    dbName: string
}

export class MongoDataBase{

    public static async connect(options:Options) {
        const { mongoUrl, dbName } = options;
        try {
            await mongoose.connect(mongoUrl,{dbName})
            console.log('Mongo connected')
            return true;
        } catch (error) {
            console.log('Mongo connection error');
            throw error;
        }
    }
}