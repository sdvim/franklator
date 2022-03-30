import { useState } from 'react';
import './App.css';

const morse = { 
  'a': '.-',    'b': '-...',  'c': '-.-.', 'd': '-..',
  'e': '.',     'f': '..-.',  'g': '--.',  'h': '....',
  'i': '..',    'j': '.---',  'k': '-.-',  'l': '.-..',
  'm': '--',    'n': '-.',    'o': '---',  'p': '.--.',
  'q': '--.-',  'r': '.-.',   's': '...',  't': '-',
  'u': '..-',   'v': '...-',  'w': '.--',  'x': '-..-',
  'y': '-.--',  'z': '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', 
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', 
  '9': '----.', '0': '-----', 
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  '\'': '.----.',
  '!': '-.-.--',
  '/': '-..-.',
  '(': '-.--.',
  ')': '-.--.-',
  '&': '.-...',
  ':': '---...',
  ';': '-.-.-.',
  '=': '-...-',
  '+': '.-.-.',
  '-': '-....-',
  '_': '..--.-',
  '"': '.-..-.',
  '$': '...-..-',
  '@': '.--.-.',
  '¿': '..-.-',
  '¡': '--...-',
};

const morseReversed = Object.fromEntries(Object.entries(morse).map(([k, v]) => [v, k]));

function isFrank(input) {
  return /^[frank FRANK]+$/.test(input);
}

function toFrank(english) {
  return english
    .split('')
    .map((c) => morse[c.toLowerCase()] || '')
    .join(' ')
    .replace(/\./g, 'frank')
    .replace(/-/g, 'FRANK')
    .replace(/ +/g, ' ');
}

function toEnglish(frank) {
  return frank
    .replace(/frank/g, '.')
    .replace(/FRANK/g, '-')
    .split(' ')
    .map((w) => morseReversed[w] || '')
    .join('')
    .replace(/ +/g, ' ');
}

function App() {
  const [englishText, setEnglishText] = useState("");
  const [frankText, setFrankText] = useState("");

  const handleEnglishChange = e => {
    const value = e.target.value.toLowerCase();
    if (value && !morse[value.substr(-1)]) return false;
    setEnglishText(value);
    setFrankText(toFrank(value));
  };

  const handleFrankChange = e => {
    const value = e.target.value.replace(/(\r\n|\n|\r)/gm, "");
    if (value && !isFrank(value)) return false;
    setFrankText(value);
    setEnglishText(toEnglish(value));
  };

  return (
    <>
      <textarea
        onChange={handleEnglishChange}
        value={englishText}
        placeholder="???"
      />
      <textarea
        onChange={handleFrankChange}
        value={frankText}
        placeholder="frank"
      />
    </>
  );
}

export default App;
