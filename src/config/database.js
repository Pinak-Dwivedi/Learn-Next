import mongoose from "mongoose";

export default async function connectToDb() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Connected to db!");
        resolve();
      })
      .catch((error) => {
        console.log("Couldn't connect to db!");
        reject(new Error("Couldn't connect to db!"));
      });
  });
}
