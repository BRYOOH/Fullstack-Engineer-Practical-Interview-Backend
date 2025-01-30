## Backend Functions
Backend was achieved with mongoDB database and Nodejs

# GET: 
Fetch the list of influencers who joined a campaign and their submission details.
The list of influencer are only the ones with Accepted boolean attribute set to true

# PATCH: 
Approve or reject influencer content submissions.
In the allInfluencers list in frontend the user can click on a button to reject or approve an influencer
This method automatically toggles the ACCEPTED boolean type from true to false


# POST
Post credentials to database for the user login and signup page with jsonwebtoken sign and verify methods to verify the user credentials
The Influencers model required the following attributes; 
id:type:Number,
name:type:String,
email:type:String,
      unique:true,
      required:true
password:type:String,
        required:true,
blogPost:type:String,
        default:'tiktok//link.com',
postCount:type:Number,
        default:10,
submissionDate:type:Date,
        default:Date.now,
Accepted:type:Boolean,
        default:false,
  
