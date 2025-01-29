const Influencers = require("../Models/Influencers").Influencers
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const InfluencerController=async(req,res)=>{

    let influencer= await Influencers.find({});
    let id;
    if(influencer.length > 0){
        let last_influencer_array = influencer.slice(-1);
        let last_influencer = last_influencer_array[0];
        id=last_influencer.id +1;
    }
    else{
        id=1;
    }
    
    let check = await Influencers.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing influencer with the same email address"})
    }

    const Influencer= new Influencers({
        id:id,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        blogPost:req.body.blogPost,
        postCount:req.body.postCount,
        submissionDate:req.body.submissionDate,
        Accepted:req.body.Accepted,
    });

    console.log(Influencer);
    await Influencer.save();

    const data={
        influencer:{
            id:Influencer._id
        }
    };

    const token=jwt.sign(data,'secret_token');
    res.json({success:true,token});
};

const LoginInfluencer = async(req,res)=>{

    let check= await Influencers.findOne({email:req.body.email});
    if(check)
    {
        const checkpass= req.body.password === check.password;

        if(checkpass)
            {
                const data={
                    influencer:{
                        id:check._id
                    }
                }
                const token = jwt.sign(data,'secret_ecom');
                res.json({
                    success:true,
                    token
                })
            }
            else{
                res.json({success:false,errors:"Wrong password input"})
            }
    }else{
        res.json({success:false,errors:"Wrong username input"})
    }

};

const getAcceptedInfluencer = async(req,res)=>{
    let influencer = await Influencers.find({Accepted:true})
    console.log("All accepted influencers have been fetched", influencer);

    res.json(influencer);
};

const getAllInfluencers = async(req,res)=>{
    const influencers= await Influencers.find({});
    console.log("Fetched all applied influencers");
    
    res.json(influencers)
};

const updateStatus=async(req,res)=>{
   
   try {
    const influencerId = req.params.id;  

    const influencer = await Influencers.findOne({ id: influencerId });
    
    // const influencer = await Influencers.findOneAndUpdate(
    //   {id:influencerId}, 
    //     req.body , 
    //   { new: true } 
    // );

    if (!influencer) {
      return res.status(404).json({ message: "Influencer not found" });
    }
    
    influencer.Accepted = !influencer.Accepted;

    // Save the updated document
    await influencer.save();

    res.json({ message:"Status updated successfully", influencer });
  } catch (error) {
    console.error("Error updating influencer status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports={InfluencerController, getAcceptedInfluencer,LoginInfluencer,getAllInfluencers,updateStatus};