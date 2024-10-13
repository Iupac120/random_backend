const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
const morgan = require("morgan")



app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('tiny'))
app.use(cors())

require("./model/SecondaryModel")
const secTable = require("./controller/tableController")

app.use('/',secTable)

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