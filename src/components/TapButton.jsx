import React, { useState, useEffect } from 'react';
import { updateCoins } from '../services/operations/updateCoins';

const TapButton = () => {
  const [user, setUser] = useState(null); // To store user info
  const [coins, setCoins] = useState(0);

  // Fetch user info from Telegram API or your server when component mounts
  // Fetch user info when component mounts
  useEffect(() => {

    console.log("telegram object",window.Telegram?.WebApp);
    
    
    const fetchUser = async () => {
      try {
        // Retrieve telegramId from Telegram WebApp initialization
        const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
        // Use window.Telegram.WebApp.initDataUnsafe.user.id to retrieve the telegramId from the Telegram Web App.
        
        if (!telegramId) {
          console.error('Telegram ID not found');
          return;
        }

        // Send telegramId to your backend to fetch user info
        const response = await fetch(`/get-user-info?telegramId=${telegramId}`);
        // Send this telegramId as a query parameter in your API request (/get-user-info?telegramId=<ID>).
        const data = await response.json();
        
        setUser(data);
        setCoins(data.coins); // Set initial coin balance

        console.log("telegram id", telegramId);
        console.log('data',data);
        console.log("response",response)
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);


  const handleTap = () => {
    const newCoins = coins + 1;
    setCoins(newCoins);
    updateCoins(user,newCoins);
  };

  return (
    <div>
      <button onClick={handleTap} className="tap-button">
        Tap Me!
      </button>
      <p>Coins: {coins}</p>
    </div>
  );
};

export default TapButton;
