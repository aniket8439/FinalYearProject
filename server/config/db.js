import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://aniket8439:aniket123@cluster1.str7tvp.mongodb.net/?retryWrites=true&w=majority";
console.log("url is :----------",MONGODB_URI);

// Set 'strictQuery' option to prepare for Mongoose 7
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'travel-and-guide',
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default connectDB;