import { GameState } from "../AppProvider/AppProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../AppProvider/AppProvider";
import Timer from "../Timer/Timer";
import Typing from "../Typing/Typing";
import Wpm from "../Wpm/Wpm";
import Retry from "../Retry/Retry";
import { fetchTextToType } from "../../services/fetchTextToType";
import "./Home.css";

const Home = () => {
    const {
        gameState,
        setGameState,
        timerValue,
        setTimerValue,
        setWpm,
        userInput,
        setUserInput,
        setTextToType,
        incorrectIndices,
        setIncorrectIndices,
      } = useContext(AppContext);
    
      const intervalIdRef = useRef(null);
    
      useEffect(() => {
        if (gameState === GameState.PLAY && !intervalIdRef.current) {
          intervalIdRef.current = setInterval(() => {
            setTimerValue((currentTimerValue) => {
              if (currentTimerValue <= 1) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
                setGameState(GameState.GAME_OVER);
                // If you want to stop the timer, return the current state instead of decrementing
                return currentTimerValue; // assuming you want to return the current value to stop the timer
              } else {
                // Otherwise, decrement the timer
                return currentTimerValue - 1;
              }
            });
          }, 1000);
        } else if (gameState == GameState.READY) {
          handleReset();
        }
    
        // Cleanup the interval on unmount or game over
        return () => {
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
          }
        };
      }, [gameState]);
    
      const [resetKey, setResetKey] = useState(0);
    
      const handleReset = async () => {
        setResetKey((prevKey) => prevKey + 1); // Increment key to force re-mount
        setUserInput("");
        setTimerValue(90);
        setWpm(0);
        const newTextToType = await fetchTextToType();
        setTextToType(newTextToType);
        setInterval(undefined);
        setIncorrectIndices(new Set());
      };
    
      useEffect(() => {
        if (gameState === GameState.READY) {
          handleReset();
          const getText = async () => {
            const newTextToType = await fetchTextToType();
            setTextToType(newTextToType);
          };
    
          getText();
        }
      }, [gameState]);
    
      // Calculate WPM
      useEffect(() => {
        if (gameState === GameState.PLAY && timerValue > 0) {
          // const wordsTyped = (userInput.match(/\S+/g) || []).length;
          const lettersTyped = Math.max(
            0,
            // (userInput.match(/\S/g) || []).length - incorrectIndices.size // Do not count in spaces
            userInput.length - incorrectIndices.size
          ); // Not counting spaces
          const wordsTyped = lettersTyped / 4.7; // Average English word contains 4.7 letters
          const timePassed = 100 - timerValue;
          const wpm = timePassed > 0 ? (wordsTyped / timePassed) * 60 : 0;
          setWpm(wpm);
        }
      }, [timerValue]);
      
  return (
    <>
        <Wpm />
        <Timer />
        <Typing key={resetKey} />
        {gameState === GameState.GAME_OVER && <Retry />}
    </>
  );
};

export default Home;
