import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://mero:1989@ac-szgdezs-shard-00-00.qdexmzg.mongodb.net:27017,ac-szgdezs-shard-00-01.qdexmzg.mongodb.net:27017,ac-szgdezs-shard-00-02.qdexmzg.mongodb.net:27017/?ssl=true&replicaSet=atlas-n0ssz9-shard-0&authSource=admin&retryWrites=true&w=majority", {
     
    } ,mongoose.set('strictQuery', false));

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
