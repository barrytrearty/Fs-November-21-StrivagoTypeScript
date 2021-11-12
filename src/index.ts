import { server } from "./server";
import mongoose from "mongoose";

process.env.TS_NODE_DEV && require("dotenv").config();

if (!process.env.MONGO_CONNECTION) {
  throw new Error("No MongoDB uri defined");
}

const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("Mongo connected!");
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
