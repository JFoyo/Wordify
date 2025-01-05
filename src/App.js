import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import GenTxtCard from './Components/JS/GenTxtCard';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [convertedText, setConvertedText] = useState('');
  const [showToast, setShowToast] = useState(false);

  const numbersToWords = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety",
  };

  const scales = ["", "thousand", "million", "billion", "trillion", "quadrillion"];

  const convertNumberToWords = (number) => {
    if (number === 0) return numbersToWords[0];

    let words = '';
    let scaleIndex = 0;

    while (number > 0) {
      const chunk = number % 1000;

      if (chunk > 0) {
        const chunkWords = convertChunkToWords(chunk);
        words = chunkWords + (scales[scaleIndex] ? ` ${scales[scaleIndex]}` : '') + (words ? ` ${words}` : '');
      }

      number = Math.floor(number / 1000);
      scaleIndex++;
    }

    return words.trim();
  };

  const convertChunkToWords = (chunk) => {
    let words = '';

    if (chunk >= 100) {
      words += numbersToWords[Math.floor(chunk / 100)] + ' hundred ';
      chunk %= 100;
    }

    if (chunk > 0) {
      // No "and" is added here
      if (chunk < 20) {
        words += numbersToWords[chunk];
      } else {
        words += numbersToWords[Math.floor(chunk / 10) * 10];
        if (chunk % 10 > 0) {
          words += '-' + numbersToWords[chunk % 10];
        }
      }
    }

    return words;
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value === '' || isNaN(value) || parseFloat(value) < 0) {
      setConvertedText('');
    } else {
      const [integerPart, decimalPart] = value.split('.');

      const integerWords = convertNumberToWords(parseInt(integerPart));
      const decimalWords = decimalPart && parseInt(decimalPart) > 0 
        ? `and ${decimalPart} / 100`
        : '';

      setConvertedText(`${integerWords} ${decimalWords}`.trim());
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(convertedText)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000); // Hide the toast after 2 seconds
      })
      .catch((err) => console.error('Error copying text: ', err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="card">
          <div className="card-body m-3">
            <h1 className="Title mb-3">Numbers to Words Converter</h1>
            <input
              className="form-control"
              type="number"
              step="0.01"
              min={0}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Please input a number..."
            />
            {convertedText && <GenTxtCard text={convertedText} onCopy={copyToClipboard} />}
          </div>
        </div>
      </header>

      {/* Bootstrap Toast */}
      {showToast && (
        <div className="toast-container position-fixed top-0 end-0 p-3">
          <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-body">
              Text copied to clipboard!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;