import mongoose from "mongoose";

export const DBConnection = ()=>{
    mongoose.connect(process.env.DB_URL).then((connect)=>{
        console.log(`DataBase Connected ${connect.connection.host}`)
    })
}
    
