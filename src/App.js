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

function isSteve(input) {
  return /^[ste ve]+$/.test(input);
}

function toSteve(english) {
  return english
    .split('')
    .map((c) => morse[c.toLowerCase()] || '')
    .join(' ')
    .replace(/\./g, 'ste')
    .replace(/-/g, 've')
    .replace(/ +/g, ' ');
}

function toEnglish(steve) {
  return steve
    .replace(/ste/g, '.')
    .replace(/ve/g, '-')
    .split(' ')
    .map((w) => morseReversed[w] || '')
    .join('')
    .replace(/ +/g, ' ');
}

function App() {
  const [englishText, setEnglishText] = useState("");
  const [steveText, setSteveText] = useState("");

  const handleEnglishChange = e => {
    const value = e.target.value.toLowerCase();
    if (value && !morse[value.substr(-1)]) return false;
    setEnglishText(value);
    setSteveText(toSteve(value));
  };

  const handleSteveChange = e => {
    const value = e.target.value.replace(/(\r\n|\n|\r)/gm, "");
    if (value && !isSteve(value)) return false;
    setSteveText(value);
    setEnglishText(toEnglish(value));
  };

  const charCount = `${steveText.length} / 320`;

  return (
    <>
      <textarea
        onChange={handleEnglishChange}
        value={englishText}
        placeholder="english"
      />
      <textarea
        onChange={handleSteveChange}
        value={steveText}
        placeholder="steve"
      />
      <input
        disabled
        value={charCount}
      />
    </>
  );
}

export default App;
