import { connect } from "mongoose";
import User from "../models/User";

export default function connectToDatabase(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log("Connecting to DB...".yellow);
            connect(process.env.MONGO_URI as string)
                .then(async () => {
                    console.log("Connected to DB!".green);
                    resolve();
                })
                .catch((reason: any) => reject(reason));
        } catch (error) {
            reject(error);
        }
    });
}
