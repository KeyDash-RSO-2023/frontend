import { createContext, useState, ReactNode } from "react";

// Enum to represent the different states of the game.
// eslint-disable-next-line react-refresh/only-export-components
export enum GameState {
  READY = "ready",
  PLAY = "play",
  GAME_OVER = "game_over",
}

// Define the shape of the context for better type support.
interface AppContextType {
  gameState: GameState;
  setGameState: (value: GameState) => void;
  timeIntervalId: number | undefined;
  setTimeIntervalId: (id: number | undefined) => void;
  timerValue: number;
  setTimerValue: (value: number | ((prevValue: number) => number)) => void;
  wpm: number;
  setWpm: (value: number) => void;
  textToType: string;
  setTextToType: (text: string) => void;
  userInput: string;
  setUserInput: (input: string) => void;
  incorrectIndices: Set<number>;
  setIncorrectIndices: (indices: Set<number>) => void;
}

// Initializing the context with default values.
export const AppContext = createContext<AppContextType>({
  gameState: GameState.READY,
  setGameState: () => {},
  timeIntervalId: undefined,
  setTimeIntervalId: () => {},
  timerValue: 0,
  setTimerValue: () => {},
  wpm: 0,
  setWpm: () => {},
  textToType: "",
  setTextToType: () => {},
  userInput: "",
  setUserInput: () => {},
  incorrectIndices: new Set(),
  setIncorrectIndices: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

// Component that provides the application state to its children.
export const AppProvider = ({ children }: AppProviderProps) => {
  // State hooks for different aspects of the game.
  const [gameState, setGameState] = useState<GameState>(GameState.READY);
  const [timeIntervalId, setTimeIntervalId] = useState<number | undefined>(
    undefined
  );
  const [timerValue, setTimerValue] = useState<number>(100);
  const [wpm, setWpm] = useState<number>(0);
  const [textToType, setTextToType] = useState<string>("");
  // Consider truncating the default text or loading it from a resource.
  const [userInput, setUserInput] = useState<string>("");
  const [incorrectIndices, setIncorrectIndices] = useState<Set<number>>(
    new Set()
  );

  // Context value that will be provided to the children.
  const contextValue = {
    gameState,
    setGameState,
    timeIntervalId,
    setTimeIntervalId,
    timerValue,
    setTimerValue,
    wpm,
    setWpm,
    userInput,
    setUserInput,
    textToType,
    setTextToType,
    incorrectIndices,
    setIncorrectIndices,
  };

  // Render the context provider with the contextValue applied.
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
