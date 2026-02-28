const followModel = require('../models/follow.model.js');
const { findOne } = require('../models/post.model.js');
const userModel = require('../models/user.model.js');


async function followUserController(req,res){
   const followerUsername = req.user.username;
   const followeeUsername = req.params.username;

     const isFolloweeExists = await userModel.findOne({
        username:followeeUsername
     })
       if(!isFolloweeExists){
        return res.status(404).json({
            message:'user you are trying to follow does not exist'
        })
       }
   if(followerUsername === followeeUsername){
    return res.status(400).json({
        message:"You cannot follow yourself"
    })
   }
 
    const isAlreadyFollowing = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    }) 

    if(isAlreadyFollowing){
        return res.status(200).json({
            message:`you are already following ${followeeUsername}`,
            follow:isAlreadyFollowing
        })
    }

const followRecord = await followModel.create({
    follower:followerUsername,
    followee:followeeUsername
})


res.status(201).json({
    message:`${followerUsername} is now following ${followeeUsername}`,
    follow:followRecord
})
}
async function unfollowUserController(req,res){

    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;
 const isFolloweeExists = await userModel.findOne({
    username:followeeUsername
 })

 if(!isFolloweeExists){
    return res.status(404).json({   
        message:'user you are trying to unfollow does not exist'

    })
 }
  if(followeeUsername === followerUsername){
    return res.status(409).json({
        message:'you can not unfollow yourself'
    })

  }

  const deleteUser = await followModel.findOneAndDelete({
    follower:followerUsername,
    followee:followeeUsername
  })

  if(!deleteUser){
    return res.status(400).json({
        message:`you are not following the ${followeeUsername}`
    })
  }

  res.status(200).json({
    message:`you are now unfollowing ${followeeUsername}`,
    unfollow:deleteUser
  })
}

module.exports = {
    followUserController,
    unfollowUserController
}