const express = require('express');
// console.log(express)
const app = express();
const port = 3000;
const web = require('./routes/web');
const connectDB = require('./db/connectDB');
const fileupload = require('express-fileupload')
var cookieParser = require('cookie-parser')
const cors=require("cors")



// token get cookie
app.use(cookieParser())

app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true,
    })
)


// image upload
app.use(fileupload({
    useTempFiles: true,
}))



// app.get('/',(req,res)=>{
//     res.send('Hello World!')
// });


// database connection
connectDB()

app.use(express.json());



app.use('/api', web);
app.listen(port, console.log(`Server is running on localhost:3000`))


