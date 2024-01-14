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
import Statistics from "../Statistics/Statistics";
import Toast from "../Toast/Toast";

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
    wpmHistory,
    setWpmHistory,
    hacking,
    setHacking,
  } = useContext(AppContext);

  const intervalIdRef = useRef(null);
  const sessionInitialized = useRef(false);

  const wpmRef = useRef(wpm);
  const userInputRef = useRef(userInput);
  const incorrectIndicesRef = useRef(incorrectIndices);
  const wpmHistoryRef = useRef(wpmHistory);

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
    wpmHistoryRef.current = wpmHistory;
  }, [wpmHistory]);

  useEffect(() => {
    if (gameState === GameState.PLAY && !intervalIdRef.current) {
      console.log(typingSession.typingSessionId);

      intervalIdRef.current = setInterval(() => {
        setTimerValue((currentTimerValue) => {
          if (currentTimerValue >= 0) {
            if (currentTimerValue % 5 == 0) {
              const newWpmHistory = [...wpmHistoryRef.current, wpmRef.current];
              setWpmHistory(newWpmHistory);

              const updateResponse = updateTypingSession(
                typingSession.typingSessionId,
                wpmRef.current,
                1 -
                  incorrectIndicesRef.current.size /
                    userInputRef.current.length,
                userInputRef.current
              );
              updateResponse.then((res) => {
                console.log(res);
                if (!res) {
                  console.log("anti hack detected");
                  setHacking(true);
                }
              });
            }

            if (currentTimerValue === 0) {
              clearInterval(intervalIdRef.current);
              intervalIdRef.current = null;
              setGameState(GameState.GAME_OVER);
              endTypingSession(typingSession.typingSessionId, userInput);
              // If you want to stop the timer, return the current state instead of decrementing
              return currentTimerValue; // assuming you want to return the current value to stop the timer
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
    setWpmHistory([]);
    setHacking(false);
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
      const wordsTyped = lettersTyped / 1.7; // Average English word contains 4.7 letters, must match the value in the backend
      const timePassed = timeOption - timerValue;
      const wpm = timePassed > 0 ? (wordsTyped / timePassed) * 60 : 0;
      setWpm(wpm);
    }
  }, [timerValue]);

  return (
    <>
      {hacking && gameState == GameState.PLAY && <Toast />}
      {gameState != GameState.GAME_OVER && (
        <>
          {gameState == GameState.READY && <Toolbar />}
          <Wpm />
          <Timer />
          <Typing key={resetKey} />
        </>
      )}
      {gameState === GameState.GAME_OVER && (
        <>
          <Statistics />
          <Retry />
        </>
      )}
    </>
  );
};

export default Home;
