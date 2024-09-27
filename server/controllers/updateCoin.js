const User = require("../models/user");

exports.updateCoin = async (req, res) => {

    try{
        // fetch data from request body
        const { telegramId, coins } = req.body;        

        const user = await User.findOneAndUpdate({ telegramId }, { coins }, { new: true, upsert: true });

        // if user already exists, then return a response
        if(!user){
            return res.status(401).json({
                success:false,
                message:`coin update failure`
            })
        };
        
        res.status(200).json({
            success:true,
            data:user,
            message:"coin update successfully"

        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Something went wrong while updating coin error: ${error}`
        })
    }
    
}