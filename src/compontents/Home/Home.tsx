import { GameState } from "../AppProvider/AppProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../AppProvider/AppProvider";
import Timer from "../Timer/Timer";
import Typing from "../Typing/Typing";
import Wpm from "../Wpm/Wpm";
import Retry from "../Retry/Retry";
import {
  endTypingSession,
  getNewTypingSession,
  updateTypingSession,
} from "../../services/typingSession";
import "./Home.css";
import Toolbar from "../Toolbar/Toolbar";

const Home = () => {
  const {
    gameState,
    setGameState,
    timerValue,
    setTimerValue,
    wpm,
    setWpm,
    userInput,
    setUserInput,
    typingSession,
    setTypingSession,
    incorrectIndices,
    setIncorrectIndices,
    languageOption,
    punctuationOption,
    timeOption,
  } = useContext(AppContext);

  const intervalIdRef = useRef(null);
  const sessionInitialized = useRef(false);

  const wpmRef = useRef(wpm);
  const userInputRef = useRef(userInput);
  const incorrectIndicesRef = useRef(incorrectIndices);

  useEffect(() => {
    wpmRef.current = wpm;
  }, [wpm]);

  useEffect(() => {
    userInputRef.current = userInput;
  }, [userInput]);

  useEffect(() => {
    incorrectIndicesRef.current = incorrectIndices;
  }, [incorrectIndices]);

  useEffect(() => {
    if (gameState === GameState.PLAY && !intervalIdRef.current) {
      console.log(typingSession.typingSessionId);
      intervalIdRef.current = setInterval(() => {
        setTimerValue((currentTimerValue) => {
          if (currentTimerValue <= 0) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
            setGameState(GameState.GAME_OVER);
            endTypingSession(typingSession.typingSessionId, userInput);
            // If you want to stop the timer, return the current state instead of decrementing
            return currentTimerValue; // assuming you want to return the current value to stop the timer
          } else {
            if (currentTimerValue % 5 == 0) {
              console.log(wpmRef.current);
              updateTypingSession(
                typingSession.typingSessionId,
                wpmRef.current,
                1 -
                  incorrectIndicesRef.current.size / userInputRef.current.length
              );
            }

            // Otherwise, decrement the timer
            return currentTimerValue - 1;
          }
        });
      }, 1000);
    } else if (gameState == GameState.READY && !sessionInitialized.current) {
      sessionInitialized.current = true;
      handleReset();
    }

    // Cleanup the interval on unmount or game over
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [gameState, languageOption, timeOption, punctuationOption]);

  const [resetKey, setResetKey] = useState(0);

  const handleReset = async () => {
    setResetKey((prevKey) => prevKey + 1); // Increment key to force re-mount
    setUserInput("");
    setTimerValue(timeOption);
    setWpm(0);
    const newTypingSession = await getNewTypingSession(
      languageOption,
      timeOption,
      punctuationOption
    );
    // const textToType = newTypingSession.textToType;
    setTypingSession(newTypingSession);
    setInterval(undefined);
    setIncorrectIndices(new Set());
    sessionInitialized.current = false;
  };

  // Calculate WPM
  useEffect(() => {
    if (gameState === GameState.PLAY && timerValue > 0) {
      // const wordsTyped = (userInput.match(/\S+/g) || []).length;
      const lettersTyped = Math.max(
        0,
        userInputRef.current.length - incorrectIndicesRef.current.size
      ); // Not counting spaces
      const wordsTyped = lettersTyped / 4.7; // Average English word contains 4.7 letters
      const timePassed = timeOption - timerValue;
      const wpm = timePassed > 0 ? (wordsTyped / timePassed) * 60 : 0;
      setWpm(wpm);
    }
  }, [timerValue]);

  return (
    <>
      <Toolbar />
      <Wpm />
      <Timer />
      <Typing key={resetKey} />
      {gameState === GameState.GAME_OVER && <Retry />}
    </>
  );
};

export default Home;
