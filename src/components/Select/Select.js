import React, { useState, useRef, useEffect } from "react";
import "./Select.css";

const Select = ({ onChange, options, placeholder, disabled, changeEvent, defaultValue }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);
  const [optionsState, setOptionsState] = useState(options);

  const selectInputContainer = useRef(null);
  const selectResultsContainer = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
    };
  });

  useEffect(() => {
    setOptionsState(options);
  }, [options]);

  useEffect(() => {
    if (changeEvent) {
      console.log(changeEvent);
      setInputValue("");
      onChange("");
    }
  }, [changeEvent]);

  const onMouseDown = (e) => {
    if (disabled) {
      return;
    } else if (selectInputContainer.current === e.target || selectInputContainer.current.contains(e.target)) {
      setOpen();
    } else if (selectResultsContainer.current === e.target) {
      return;
    } else {
      setClose();
    }
  };

  const setOpen = () => {
    setSelectOpen(!selectOpen);
  };

  const setClose = () => {
    setSelectOpen(false);
  };

  const selectValueHandler = (option, text = "") => {
    onChange(option);
    setInputValue(option);
    setOptionsState(options);
    setClose();
  };

  const selectInputHandler = (value) => {
    if (value === "") {
      onChange("");
    }

    const newOptionState = options.filter((item) => item.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
    setOptionsState(newOptionState);
    setInputValue(value);
  };

  return (
    <div className={`select ${disabled}`}>
      <div ref={selectInputContainer} className="select_container">
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => selectInputHandler(e.target.value)}
          disabled={disabled}
          value={inputValue || defaultValue || ""}
          defaultValue={defaultValue}
        />

        <div className="select_Svg_Container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-chevron-down"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
      </div>
      {selectOpen && (
        <div ref={(el) => (selectResultsContainer.current = el)} className="select_Results">
          {optionsState.map((option, index) => (
            <p key={`${option} ${index}`} onMouseDown={() => selectValueHandler(option)}>
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
