const postModel = require("../models/post.model.js");
const Imagekit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');

const imagekit = new Imagekit({
  privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    console.log(req.body,req.file);

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:'Unauthorized Access'
        })
    }
    let decoded = null;
   try{
      decoded = jwt.verify(token,process.env.JWT_SECRET);
   }
   catch(err){
    return res.status(401).json({
        message:'Unauthorized Access'
    })
   }

  console.log(decoded);

    const file = await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),  //convert to file(convert buffer)
        fileName:'Test',
        folder:'instagram-clone-posts'
    })

    const post = await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        userId:decoded.id
    })

    res.status(201).json({
        message:'Post created',
        post
    })
   
}

async function getAllPostsController(req,res){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:'Unauthorized Access'
        })
    }

    let decoded = null;
    try{
          decoded =  jwt.verify(token,process.env.JWT_SECRET);
    }
    catch(err){
        return res.status(401).json({
            message:"Token invalid"
        })
    }
  
    const userId = decoded.id;
    const posts = await postModel.find({
        userId:userId
    })

    res.status(200).json({
        message:"post fetched successfully",
        posts
    })
}
async function getPostDetailsController(req,res){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"unauthorised access"
        })
     
}
    let decoded = null;
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET);
    }
    catch(err){
        return res.status(401).json({
            message:"Token invalid"

        })
    }

    const userId = decoded.id;
    const postId = req.params.id;

    const post = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })  
    }
  const isValidUser = post.userId.toString() === userId;

  if(!isValidUser){
    return res.status(403).json({
        message:"Access denied"
    })
  } 
  return res.status(200).json({
    message:"post fetched successfully",
    post
  })
}

module.exports = {
    createPostController,
    getAllPostsController,
    getPostDetailsController
}