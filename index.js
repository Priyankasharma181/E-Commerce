const express = require("express")
const app = express()
const Rout = require("./router/router")
app.use (express.json())
app.use ("/",Rout)
app.listen(4000,()=>{
    console.log("listinig");
})