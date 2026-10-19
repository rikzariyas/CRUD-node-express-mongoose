import User from "../models/User.js"

// getting all users
export const getAllUsers = async (req,res)=>{
    console.log("getAllUsers is called")
    try{
        const users = await User.find().select("-password")
        res.status(200).json({
            status:"OK",
            data : users
        })
    }
    catch{
        res.status(400).json({
            status:"Error",
            message: error.message
        })
    }
}

//update user

export const nameUpdate = async (req, res) =>{
    console.log("partial update called")
    console.log("req.params.id>>>",req.params.id)
    try{
        const {userId}= req.params
        const user = await User.findOne({userId})
        if(! user){
            throw new Error("user not found")
        }
        user.name= req.body.name
        await user.save()
        res.status(200).json({
            status:"ok",
            data: user
        })
    }
    catch(error){
        res.status(400).json({
            status:"Error",
            message:error.message
        })    
    }
}

//update all
export const replaceUser = async (req,res) =>{
    console.log("replaceUser update")
    console.log("req.params.id",req.params.id)
    console.log("req.body",req.body)

    try{
        const {userId}= req.params
        const user = await User.findOne({userId}).select("-password")
        if(!user){
            throw new Error ("user not found")
        }
        const result = await User.replaceOne({userId}, req.body)
        console.log("result>>>>",result)
        await user.save()

        res.status(200).json({
            status:"OK",
            data: user
        })
    }
    catch(error){
        res.status(400).json({
            status:"Error",
            message:error.message
        })

    }
}


//delete
export const deleteUser = async (req,res)=>{
    try{
    const {userId}= req.body
    const user = await User.findOne({userId})
    if(!user){
        throw new Error ("user not found")
    }
    const result = await User.deleteOne({userId})
    res.status(200).json({
        status:"ok",
        data: result
    })
}
catch(error){
    res.status(400).json({
        status:"error",
        message: error.message
    })
}
}