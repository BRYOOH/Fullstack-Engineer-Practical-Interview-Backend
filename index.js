const port=4000;
const express = require("express");
const app = express();
const mongoose= require("mongoose");
const jwt=require('jsonwebtoken');
const cors=require('cors');;
const path=require('path');
const multer=require('multer');
// const { CampaignController, GetAccepted, GetCampaigns, GetCampaignsById } = require("./Controllers/CampaignController");
const { InfluencerController, getAcceptedInfluencer, LoginInfluencer, getAllInfluencers, updateStatus } = require("./Controllers/InfluencerController");


app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://brianmuchira001:Muriukis@cluster0.c8atalq.mongodb.net/Campaigns")
.then(()=>console.log("MongoDB is running"))
.catch((error)=>console.log("MongoDB is not running",error));

app.get('/',(req,res)=>{
    res.send("Express app is running!!!");
});

// app.post("/addCampaign",CampaignController);
// app.get("/getAccepted",GetAccepted);
// app.get("/getCampaign",GetCampaigns);
// app.get("/getCampaign/:id", GetCampaignsById);

app.post("/signup",InfluencerController);
app.get('/getInfluencers', getAcceptedInfluencer);
app.post("/login",LoginInfluencer);
app.get('/getAll',getAllInfluencers);
app.patch('/patchInfluencer/:id',updateStatus)

app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port: " + port);
    }
    else{
        console.log("Server is not running !!" + error);
    }
});