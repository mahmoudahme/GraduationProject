import express from "express" ;
import bodyParser from "body-parser";
import cors from "cors" ;
import morgan from "morgan";
import { configDotenv } from "dotenv";
import { DBConnection } from "./config/DbConnection.js";
import { globalError } from "./middleware/errorMiddleware.js";
import authRouter from "./router/authRouter.js"
import userRouter from "./router/userRouter.js"
import cookieParser from "cookie-parser";
configDotenv({path : "config/config.env"})
const app = express() ;
DBConnection();
const PORT = process.env.PORT || 2000 ;
app.use(cors());
app.use(cookieParser())
app.use(express.json());
if(process.env.NODE_ENV == "development"){
    app.use(morgan("dev"))
    console.log("Mode : Development")
}

app.use("/api/auth" , authRouter)
app.use("/api/user" , userRouter)
//global error Middleware 
app.use(globalError);


app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`)
})