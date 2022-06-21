const moongose=require('mongoose');
const mongoUri="mongodb://localhost:27017/myNotebook";


const connectToMongo=()=>{
    moongose.connect(mongoUri,()=>{
        console.log("Connected to mongo successfully");
    })
}
module.exports=connectToMongo;