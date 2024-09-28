const supabase = require('../config/database'); // Import the Supabase client

exports.updateCoin = async (req, res) => {

    try{
        // fetch data from request body
        const { telegramId, coins } = req.body;        

        const { user, error } = await supabase
            .from('User')
            .update({ coins })
            .eq('telegramId', telegramId);

        if (error) {
            throw error;
        }

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