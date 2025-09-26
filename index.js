import express from "express";
import mongoose from "mongoose";
import { mongodbURL , PORT } from "./config.js";
import router from "./routes/Monastries.js";
import cors from "cors"

//app
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use("/monastries" , router)

app.get("/" , (req , res) => {
    console.log("Satyam King");
    
})
//database connection
mongoose.connect(mongodbURL)
.then(() => console.log('Connected to MongoD'))
.catch(err => console.error(err));


app.listen(PORT || 8000, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});