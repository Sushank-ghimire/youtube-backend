import { connect } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDatabase = async () => {
  try {
    const connectionInstance = await connect(`${process.env.TEMP_MONGO}`);
    // console.log(`Database Connected on port : ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error(`Mongodb Connection Error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;