import React, { useState, useEffect } from 'react';
import { updateCoins } from '../services/operations/updateCoins';

const TapButton = () => {
  const [user, setUser] = useState(null); // To store user info
  const [coins, setCoins] = useState(0);

  // Fetch user info from Telegram API or your server when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      // Example: Fetch user info from your backend
      const response = await fetch('/get-user-info'); 
      const data = await response.json();
      setUser(data); // Set user in state
    };

    fetchUser();
  }, []);

  // const updateCoins = async (user,newCoins) => {
  //   if (user) {
  //     await fetch('/update-coins', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ telegramId: user.telegramId, coins: newCoins }),
  //     });
  //   }
  // };

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
