require("dotenv").config()
const {aliModel} = require("./models")

const mongoose = require('mongoose')
const express = require("express")
const app = express()

const cors = require('cors')


//*Setting up DB and port connection 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: "*"
}))
mongoose.set('strictQuery', true);

app.post("/addAliItem", async (req, res)=>{
    try{
        const item = await aliModel.createItem(req.body)
        res.status(200).json({...item})
    }catch(error){
        res.status(400).json({...error})
    }
})

app.get("/getAliItem/:itemID", async (req, res) => {
    try {
        const itemID = req.params.itemID;

        // Now you can use the 'itemID' in your code
        const result = await aliModel.fetchItem(itemID);

        // Send the result as a response
        res.status(200).json({ ...result });
    } catch (error) {
        res.status(400).json({ ...error });
    }
});


mongoose.connect(process.env.DBURI).then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log('Listening')
    })
})



