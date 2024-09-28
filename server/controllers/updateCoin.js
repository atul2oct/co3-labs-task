const supabase = require('../config/database'); // Import the Supabase client

exports.updateCoin = async (req, res) => {

    try{
        // fetch data from request body
        const { telegramId, coins } = req.body;
        if (!telegramId || !coins) {
            return res.status(400).json({ message: 'telegramId and coins is required' });
        }
        console.log(telegramId, coins )
        console.log(typeof (telegramId),typeof (coins))
        
        const { user, error } = await supabase
            .from('User')
            .update({ coins: coins })
            .eq('telegramId', telegramId)
            .select();

            console.log('1',user)
            console.log('coin route')
        // if (error) {
        //     console.log(error)
        //     throw error;
        // }
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
            message:`Something went wrong while updating coin error: ${error.message}`
        })
    }
    
}