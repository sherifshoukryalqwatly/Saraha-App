import mongoose from 'mongoose';



export const dataBaseConnection = async ()=>{
    try {
        await mongoose.connect(process.env.DB,{
            serverSelectionTimeoutMS: 30000
        });
        console.log("DataBase Connected");
    } catch (error) {
        console.log(`DataBase Is Down, Error : ${error.message}`)
    }
    
}

