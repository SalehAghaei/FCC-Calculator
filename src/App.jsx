import { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState("0");
  const [lastWasEqual, setLastWasEqual] = useState(false);

  const appendToDisplay = (event) => {
    const number = event.target.textContent;
    if (display === "0" || lastWasEqual) {
      setDisplay(number);
      setLastWasEqual(false);
    } else {
      setDisplay(display + number);
    }
  };

  const addToDisplay = (event) => {
    const dot = event.target.textContent;
    if (dot === '.') {
      const lastNumber = display.split(/[\+\-\*\/]/).pop();
      if (lastNumber.includes('.')) {
        return;
      }
    }
    if (lastWasEqual) {
      setDisplay("0" + dot);
      setLastWasEqual(false);
    } else {
      setDisplay(display + dot);
    }
  };

  const addOperator = (event) => {
    const operator = event.target.textContent;
    const lastChar = display.slice(-1);

    if (lastWasEqual) {
      setLastWasEqual(false);
    }

    if (['+', '*', '/'].includes(lastChar) && operator !== '-') {
      setDisplay(display.slice(0, -1) + operator);
    } else {
      setDisplay(display + operator);
    }
  };

  const removeDisplay = () => {
    setDisplay("0");
    setLastWasEqual(false);
  };

  const equal = () => {
    try {
      const sanitizedDisplay = display.replace(/(\*|\/|\+|\-)+(?=\*|\/|\+)/g, '');
      const result = eval(sanitizedDisplay).toString();
      setDisplay(result);
      setLastWasEqual(true);
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className='calculator'>
      <div id="display">{display}</div>
      <div id="btns">
        <button id="seven" onClick={appendToDisplay}>7</button>
        <button id="eight" onClick={appendToDisplay}>8</button>
        <button id="nine" onClick={appendToDisplay}>9</button>
        <button id="subtract" className='operator' onClick={addOperator}>-</button>
        <button id="four" onClick={appendToDisplay}>4</button>
        <button id="five" onClick={appendToDisplay}>5</button>
        <button id="six" onClick={appendToDisplay}>6</button>
        <button id="add" className='operator' onClick={addOperator}>+</button>
        <button id="one" onClick={appendToDisplay}>1</button>
        <button id="two" onClick={appendToDisplay}>2</button>
        <button id="three" onClick={appendToDisplay}>3</button>
        <button id="divide" className='operator' onClick={addOperator}>/</button>
        <button id="zero" onClick={appendToDisplay}>0</button>
        <button id="decimal" onClick={addToDisplay}>.</button>
        <button id="equals" onClick={equal}>=</button>
        <button id="multiply" className='operator' onClick={addOperator}>*</button>
      </div>
      <button id="clear" onClick={removeDisplay}>AC</button>
    </div>
  );
}

export default App;
