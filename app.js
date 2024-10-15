require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
const morgan = require("morgan")

const whiteList = [process.env.CLIENT_URL, process.env.CLIENT2_URL]

const corsOptions = {
    
    origin:function (origin,callback){
      if(whiteList.indexOf(origin) !==-1 || !origin){
        callback(null,true)
      }else{
        callback(new Error("Not allowed by CORS"))
      }
    } ,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  };


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('tiny'))
app.use(cors(corsOptions))

app.use((err, req, res, next) => {
    if (err instanceof cors.CorsError) {
      // Handle CORS error
      res.status(400).send({ message: 'CORS Error: Not allowed by CORS' });
    } else {
      next(err);
    }
  });
  
require("./model/SecondaryModel")
const secTable = require("./controller/tableController")

app.use(secTable)

const server = async (req,res) =>{
    try {
        app.listen(port,()=>{
            console.log(`server is lenstening to port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
 

server()