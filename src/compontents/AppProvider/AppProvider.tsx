import { createContext, useState, ReactNode } from "react";

// Enum to represent the different states of the game.
// eslint-disable-next-line react-refresh/only-export-components
export enum GameState {
  READY = "ready",
  PLAY = "play",
  GAME_OVER = "game_over",
}

interface TypingSession {
  typingSessionId?: number;
  textToType: string;
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
  typingSession: TypingSession;
  setTypingSession: (typingSession: TypingSession) => void;
  userInput: string;
  setUserInput: (input: string) => void;
  incorrectIndices: Set<number>;
  setIncorrectIndices: (indices: Set<number>) => void;
  punctuationOption: boolean;
  setPunctuationOption: (value: boolean) => void;
  languageOption: string;
  setLanguageOption: (value: string) => void;
  timeOption: number;
  setTimeOption: (value: number) => void;
  wpmHistory: number[];
  setWpmHistory: (value: number[]) => void;
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
  typingSession: undefined,
  setTypingSession: () => {},
  userInput: "",
  setUserInput: () => {},
  incorrectIndices: new Set(),
  setIncorrectIndices: () => {},
  punctuationOption: false,
  setPunctuationOption: () => {},
  languageOption: "en",
  setLanguageOption: () => {},
  timeOption: 60,
  setTimeOption: () => {},
  wpmHistory: [],
  setWpmHistory: () => {},
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
  const [timerValue, setTimerValue] = useState<number>(60);
  const [wpm, setWpm] = useState<number>(0);
  const [typingSession, setTypingSession] = useState<TypingSession>({
    textToType: "",
  });
  // Consider truncating the default text or loading it from a resource.
  const [userInput, setUserInput] = useState<string>("");
  const [incorrectIndices, setIncorrectIndices] = useState<Set<number>>(
    new Set()
  );

  const [punctuationOption, setPunctuationOption] = useState<boolean>(false);
  const [languageOption, setLanguageOption] = useState<string>("en");
  const [timeOption, setTimeOption] = useState<number>(60);

  const [wpmHistory, setWpmHistory] = useState<number[]>([]);

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
    typingSession,
    setTypingSession,
    incorrectIndices,
    setIncorrectIndices,
    punctuationOption,
    setPunctuationOption,
    languageOption,
    setLanguageOption,
    timeOption,
    setTimeOption,
    wpmHistory,
    setWpmHistory,
  };

  // Render the context provider with the contextValue applied.
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
