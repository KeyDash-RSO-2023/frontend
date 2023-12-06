import { useContext, useCallback, useRef, useEffect, useState } from "react";
import "./Typing.css";
import { AppContext, GameState } from "../AppProvider/AppProvider";

/**
 * Utility function to replace a character in a string at a given index.
 * @param {string} string - The original string.
 * @param {number} index - The index of the character to replace.
 * @param {string} replacement - The replacement character.
 * @returns {string} - The resulting string after replacement.
 */
function replaceAt(string, index, replacement) {
  return (
    string.substr(0, index) +
    replacement +
    string.substr(index + replacement.length)
  );
}

/**
 * Custom hook to get the position of the n-th letter in a container.
 * @param {React.RefObject} containerRef - A ref to the container element.
 * @param {number} n - The index of the letter.
 * @returns {Object} - The position { x, y } of the n-th letter.
 */
function useNthLetterPosition(containerRef, n) {
  const getPosition = useCallback(() => {
    if (!containerRef.current) {
      return { x: 0, y: 0 };
    }

    const container = containerRef.current;
    const tempSpan = document.createElement("span");
    const textBefore = container.textContent.substring(0, n);
    const textAfter = container.textContent.substring(n);

    container.textContent = "";
    container.append(
      document.createTextNode(textBefore),
      tempSpan,
      document.createTextNode(textAfter)
    );

    const position = { x: tempSpan.offsetLeft, y: tempSpan.offsetTop + 1.5 }; // Adjust Y position as needed

    container.textContent = textBefore + textAfter;
    return position;
  }, [containerRef, n]);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPosition(getPosition());
  }, [getPosition]);

  return position;
}

const Typing = () => {
  const {
    gameState,
    setGameState,
    userInput,
    setUserInput,
    textToType,
    incorrectIndices,
    setIncorrectIndices,
  } = useContext(AppContext);

  const hiddenContainerRef = useRef(null);

  const caretPosition = useNthLetterPosition(
    hiddenContainerRef,
    userInput.length
  );

  const visibleContainerRef = useRef(null);

  useEffect(() => {
    const visibleContainer = visibleContainerRef.current;
    if (!visibleContainer) return;

    const lineHeight = 30; // Set the line height based on your CSS
    const fixedLines = 2; // First n number of lines that do not scroll

    const handleScrolling = () => {
      // Calculate the current line based on the caret position
      const currentLine = Math.ceil(caretPosition.y / lineHeight);

      // Determine if we need to scroll
      if (currentLine > fixedLines) {
        const scrollAmount = (currentLine - fixedLines) * lineHeight;
        // Scroll to show the line where the caret is
        visibleContainer.scrollTop = scrollAmount;
      } else {
        // Adjust the caret to the current line position when not scrolling
        // This logic would depend on how you're displaying the caret.
        // You might need to adjust its position within the visible text area.
      }
    };

    // Attach the handler to the appropriate event
    // Depending on your application, this might be keyup, input, or another event
    document.addEventListener("input", handleScrolling);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("input", handleScrolling);
    };
  }, [caretPosition.y]);

  // Prevents the textarea from losing focus
  const handleBlur = (e) => {
    e.target.focus();
    e.preventDefault();
  };

  // Prevents copy and paste operations in the textarea
  const handleCopyPaste = useCallback((e) => e.preventDefault(), []);

  // Handles key down events for the textarea
  const handleKeyDown = useCallback((e) => {
    if (e.ctrlKey && e.key === "a") {
      e.preventDefault();
    }
  }, []);

  // Handles changes in the textarea
  const handleChange = useCallback(
    (e) => {
      if (gameState !== GameState.PLAY) {
        setGameState(GameState.PLAY);
      }

      const input = e.target.value;
      const lastCharIndex = input.length - 1;
      let correctedInput = input;

      const newIncorrectIndices = new Set(incorrectIndices);
      if (input[lastCharIndex] === textToType[lastCharIndex]) {
        newIncorrectIndices.delete(lastCharIndex);
      } else {
        correctedInput = replaceAt(
          correctedInput,
          lastCharIndex,
          textToType[lastCharIndex]
        );
        newIncorrectIndices.add(lastCharIndex);
      }

      setIncorrectIndices(newIncorrectIndices);
      setUserInput(correctedInput);

      // Check if all the text to typed was typed
      if (userInput.length == textToType.length - 1) {
        setGameState(GameState.GAME_OVER);
        console.log("Game over");
      }
    },
    [
      gameState,
      incorrectIndices,
      textToType,
      setIncorrectIndices,
      setUserInput,
      userInput.length,
      setGameState,
    ]
  );

  // State to store the rendered text
  const [renderedText, setRenderedText] = useState([]);

  // Function to render text with highlighting
  const renderTextToType = useCallback(() => {
    return Array.from(textToType).map((char, index) => (
      <span
        key={index}
        className={
          index > userInput.length - 1
            ? "normal-char"
            : incorrectIndices.has(index)
            ? "incorrect-char"
            : "correct-char"
        }
      >
        {char}
      </span>
    ));
  }, [textToType, userInput, incorrectIndices]); // Added userInput and incorrectIndices as dependencies

  // Effect to update rendered text when userInput or textToType changes
  useEffect(() => {
    const a = renderTextToType();
    setRenderedText(a);
  }, [userInput, textToType, renderTextToType]); // Effect dependencies are correct

  return (
    <div className="textsContainer">
      <div className="texts" ref={visibleContainerRef}>
        {renderedText}
      </div>
      <div
        className="texts"
        ref={hiddenContainerRef}
        style={{ visibility: "hidden" }}
      >
        {renderedText}
      </div>
      <div
        className={`caret ${gameState === GameState.GAME_OVER ? "hidden" : ""}`}
        style={{
          left: `${caretPosition.x}px`,
          top: `${
            caretPosition.y +
            16 -
            (visibleContainerRef.current
              ? visibleContainerRef.current.scrollTop
              : 0)
          }px`,
        }}
      />

      <textarea
        autoFocus
        readOnly={gameState === GameState.GAME_OVER}
        className="texts"
        autoCorrect="off"
        spellCheck="false"
        rows={5}
        onChange={handleChange}
        onCopy={handleCopyPaste}
        onPaste={handleCopyPaste}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        value={userInput}
      />
    </div>
  );
};

export default Typing;
