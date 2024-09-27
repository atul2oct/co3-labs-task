import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../api";

export async function updateCoins (user,newCoins) {
    const toastId = toast.loading("Loading...");
    let result = null
    
    try{
        const response = await apiConnector(
            'POST',
            endpoints.UPDATECOINS_API,
            JSON.stringify({ telegramId: user.telegramId, coins: newCoins }),
            { 'Content-Type': 'application/json' },
        );

        if (!response.data.success) {
            console.log(`Error in res: ${response.data.message}`)
            throw new Error(response.data.message)
        };

        console.log("res",response);
        result = response?.data?.data;   
        toast.success("Coin updated");
    }catch(error){
        toast.error("Could Not Update Coins");
        console.log("Failure in update coins ERROR....",error);
    }
    toast.dismiss(toastId);
    return result
  };

export async function getUser (user,newCoins) {
    const toastId = toast.loading("Loading...");
    let result = null
    
    try{
        const response = await apiConnector(
            'GET',
            endpoints.GETUSER_API,
            null,
            { 'Content-Type': 'application/json' },
        );

        if (!response.data.success) {
            console.log(`Error in res: ${response.data.message}`)
            throw new Error(response.data.message)
        };

        console.log("res",response);
        result = response?.data?.data;   
        toast.success("Coin updated");
    }catch(error){
        toast.error("Could Not Update Coins");
        console.log("Failure in update coins ERROR....",error);
    }
    toast.dismiss(toastId);
    return result
  };
  