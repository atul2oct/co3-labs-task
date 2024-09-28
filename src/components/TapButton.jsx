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
                .from('users')
                .select('*')
                .eq('username', username)
                .single();

            if (error && error.code === 'PGRST116') { // Not Found
                // If user doesn't exist, create one
                const { data: newUser, error: insertError } = await supabase
                    .from('users')
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



  // Animation configuration
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    tap: { scale: 0.9 },
  };

  return (
    <div className="container border-lg bg-dark rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', }} >
        <div className="row text-center pt-2">
            <div className="col-12 my-2">
                <h3 className="text-warning">TapMe - @{username}</h3>
            </div>

            <div className="col-12 mt-2 mb-1" style={{ cursor: 'pointer' }}>
                <div className="card bg-dark">
                    <div className="card-body">
                        <h5 className="card-title text-white">
                            <img src="assets/coin.png" style={{ width: '20px', height: '20px' }} alt="" /> &nbsp;
                            <CountUp
                                start={totalCoins - clickPerPoint}
                                end={totalCoins}
                                duration={1}
                                className={animateCoins ? 'animate-value' : ''}
                            />
                        </h5>
                    </div>
                </div>
            </div>

            <div className="col-12 mt-3" style={{ position: 'relative', cursor: "pointer" }}>
                <img
                    ref={imageRef}
                    src="assets/coin.png"
                    alt="Tap Coin"
                    className={`img-fluid ${animate ? 'animate-image' : ''}`}
                    style={{ maxWidth: '280px', width: '100%' }}
                    onClick={handleImageClick}
                />
            </div>

            <div className="col-12 my-2" style={{ cursor: 'pointer' }}>
                <div className="card bg-dark">
                    <div className="card-body">
                        <h5 className="card-title text-white">
                            <CountUp
                                start={currentClicks}
                                end={currentClicks}
                                duration={1}
                                className={animateClicks ? 'animate-value' : ''}
                            />
                            /{totalClicks}
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
};

export default TapButton;
