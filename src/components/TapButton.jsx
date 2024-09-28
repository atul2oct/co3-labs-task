import React, { useState, useEffect, useRef } from 'react';
import { getUser, updateCoins } from '../services/operations/updateCoins';
import { supabase } from './supabaseClient';
import CountUp from 'react-countup';

const TapButton = ({user}) => {
  const [animate, setAnimate] = useState(false);
    const [totalClicks, setTotalClicks] = useState(0);
    const [currentClicks, setCurrentClicks] = useState(0);
    const [totalCoins, setTotalCoins] = useState(0);
    const username = user;
    const [clickPerPoint, setClickPerPoint] = useState(1);
    const [animateCoins, setAnimateCoins] = useState(false);
    const [animateClicks, setAnimateClicks] = useState(false);
    const [userId,setUserId] = useState('');
    const imageRef = useRef(null);

    // Function to fetch or create user data from Supabase
    const fetchUserData = async () => {
        try {
            const { data, error } = await supabase
                .from('Users')
                .select('*')
                .eq('username', username)
                .single();

            if (error && error.code === 'PGRST116') { // Not Found
                // If user doesn't exist, create one
                const { data: newUser, error: insertError } = await supabase
                    .from('Users')
                    .insert({
                        username: username,
                        total_clicks: 1000,
                        current_clicks: 1000,
                        total_coins: 0,
                        click_per_point: 1,
                    })
                    .select()
                    .single();

                if (insertError) {
                    throw insertError;
                }
                setUserId(newUser.id);
                setTotalClicks(newUser.total_clicks);
                setCurrentClicks(newUser.current_clicks);
                setTotalCoins(newUser.total_coins);
                setClickPerPoint(newUser.click_per_point);
            } else if (data) {
                // If user exists, set the state with the fetched data
                setUserId(data.id);
                setTotalClicks(data.total_clicks || 1000);
                setCurrentClicks(data.current_clicks || 1000);
                setTotalCoins(data.total_coins || 0);
                setClickPerPoint(data.click_per_point || 1);
            }
        } catch (error) {
            console.error('Error fetching or creating user data:', error.message);
        }
    };

  // Fetch user info from Telegram API or your server when component mounts
  // Fetch user info when component mounts
  useEffect(() => {

    console.log("telegram object",window.Telegram?.WebApp);
    
    
    const fetchUser = async () => {
      try {
        // Retrieve telegramId from Telegram WebApp initialization
        // const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
        const telegramId = '63968'
        // Use window.Telegram.WebApp.initDataUnsafe.user.id to retrieve the telegramId from the Telegram Web App.
        
        if (!telegramId) {
          console.error('Telegram ID not found');
          return;
        }

        // Send telegramId to your backend to fetch user info
        const response = await getUser(telegramId);
        // Send this telegramId as a query parameter in your API request (/get-user-info?telegramId=<ID>).
        console.log(response)
        // setUser(response?.telegramId || response?.user?.telegramId);
        // setCoins(response?.coins || response?.user?.coins); // Set initial coin balance

      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    // fetchUser();
  }, []);

  useEffect(() => {
    fetchUserData();

    const intervalId = setInterval(() => {
        setCurrentClicks((prevClicks) => {
            if (prevClicks + 2 <= totalClicks) {
                return Math.max(prevClicks + 2, 0);
            }
            return prevClicks;
        });
    }, 1000);

    return () => clearInterval(intervalId);
}, [totalClicks]);

const handleImageClick = async (event) => {
  if (currentClicks > 0) {
      setAnimate(true);
      setAnimateCoins(true);
      setAnimateClicks(true);
      setCurrentClicks(currentClicks - clickPerPoint);
      setTotalCoins(totalCoins + clickPerPoint);

      // Create and animate the floating element
      const clickX = event.clientX;
      const clickY = event.clientY;

      const floatElement = document.createElement('div');
      floatElement.textContent = `+${clickPerPoint}`;
      floatElement.style.position = 'absolute';
      floatElement.style.left = `${clickX}px`;
      floatElement.style.top = `${clickY}px`;
      floatElement.style.fontSize = '28px';
      floatElement.style.color = 'white';
      floatElement.style.pointerEvents = 'none';
      floatElement.className = 'float-animation';
      document.body.appendChild(floatElement);

      setTimeout(() => {
          floatElement.remove();
      }, 1000);

      // Update the backend with new values
      await updateUserData(userId, totalClicks, totalCoins + clickPerPoint, username, clickPerPoint);

      setTimeout(() => {
          setAnimate(false);
          setAnimateCoins(false);
          setAnimateClicks(false);
      }, 1000);
  }
};

// Function to update user data in Supabase
const updateUserData = async (userId, totalClicks, totalCoins, username, clickPerPoint) => {
  try {
      const { data, error } = await supabase
          .from('Users')
          .upsert({
              id: userId,
              total_clicks: totalClicks,
              total_coins: totalCoins,
              username: username.trim() === '' ? null : username,
              click_per_point: clickPerPoint,
          });

      if (error) {
          throw error;
      }
  } catch (error) {
      console.error('Error updating user data:', error.message);
  }
};

  return (
    <div className="container mx-auto border-2 border-gray-600 bg-richblack-900 rounded-lg">
    <div className="flex flex-col justify-center items-center pt-2">
        <div className="my-2">
            <h3 className="text-yellow-400">TapMe - @{username}</h3>
        </div>

        <div className="mt-2 mb-1 cursor-pointer">
            <div className="bg-gray-800 rounded-lg">
                <div className="p-4">
                    <h5 className="text-white flex items-center">
                        <img src="assets/coin.png" className="w-5 h-5" alt="coinimage" />
                        <span className="ml-2">
                            <CountUp
                                start={totalCoins - clickPerPoint}
                                end={totalCoins}
                                duration={1}
                                className={animateCoins ? 'animate-value' : ''}
                            />
                        </span>
                    </h5>
                </div>
            </div>
        </div>

        <div className="mt-3 relative cursor-pointer">
            <img
                ref={imageRef}
                src="assets/coin.png"
                alt="Tap Coin"
                className={`max-w-xs w-full ${animate ? 'animate-image' : ''}`}
                onClick={handleImageClick}
            />
        </div>

        <div className="my-2 cursor-pointer">
            <div className="bg-gray-800 rounded-lg">
                <div className="p-4">
                    <h5 className="text-white flex items-center">
                        <CountUp
                            start={currentClicks}
                            end={currentClicks}
                            duration={1}
                            className={animateClicks ? 'animate-value' : ''}
                        />
                        <span className="ml-1">/{totalClicks}</span>
                    </h5>
                </div>
            </div>
        </div>
    </div>
</div>


  );
};

export default TapButton;
