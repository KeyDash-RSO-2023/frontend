import React, { useContext } from "react";
import "./Toolbar.css";
import punctuationSrc from "../../assets/punctuation.svg";
import languageSrc from "../../assets/language.svg";
import timeSrc from "../../assets/time.svg";
import { AppContext } from "../AppProvider/AppProvider";

const Toolbar = () => {
  const {
    punctuationOption,
    setPunctuationOption,
    languageOption,
    setLanguageOption,
    timeOption,
    setTimeOption,
  } = useContext(AppContext);

  const handlePunctuationClick = () => {
    setPunctuationOption(!punctuationOption);
  };

  const handleLanguageClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement; // Asserting the target is an HTMLElement
    setLanguageOption(target.innerText);
  };

  const handleTimeClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement; // Asserting the target is an HTMLElement
    setTimeOption(parseInt(target.innerText));
  };

  return (
    <div className="toolbar">
      <div className="punctuation">
        <img src={punctuationSrc}></img>
        <span>
          <span
            className={punctuationOption ? "active" : ""}
            onClick={handlePunctuationClick}
          >
            punctuation
          </span>
        </span>
      </div>
      <div className="language">
        <img src={languageSrc}></img>
        <span>
          <span
            className={languageOption == "en" ? "active" : ""}
            onClick={handleLanguageClick}
          >
            en
          </span>
          <span
            className={languageOption == "sl" ? "active" : ""}
            onClick={handleLanguageClick}
          >
            sl
          </span>
          {/* <span
            className={languageOption == "de" ? "active" : ""}
            onClick={handleLanguageClick}
          >
            de
          </span> */}
        </span>
      </div>
      <div className="time">
        <img src={timeSrc}></img>
        <span>
          <span
            className={timeOption == 30 ? "active" : ""}
            onClick={handleTimeClick}
          >
            30
          </span>
          <span
            className={timeOption == 60 ? "active" : ""}
            onClick={handleTimeClick}
          >
            60
          </span>
          <span
            className={timeOption == 120 ? "active" : ""}
            onClick={handleTimeClick}
          >
            120
          </span>
        </span>
      </div>
    </div>
  );
};

export default Toolbar;
