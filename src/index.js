import { configDotenv } from "dotenv";
import connectDatabase from "./db/dbConnection.js";
import { app } from "./app.js";

configDotenv();

connectDatabase()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is listnining at port ${process.env.PORT}`);
    })
  })
  .catch((error) => console.log("MongoDb connection Errorr : ", error));
