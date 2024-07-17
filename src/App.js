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

function isEeeee(input) {
  return /^[E e]+$/.test(input);
}

function toEeeee(english) {
  return english
    .split('')
    .map((c) => morse[c.toLowerCase()] || '')
    .join(' ')
    .replace(/\./g, 'E')
    .replace(/-/g, 'e')
    .replace(/ +/g, ' ');
}

function toEnglish(eeeee) {
  return eeeee
    .replace(/E/g, '.')
    .replace(/e/g, '-')
    .split(' ')
    .map((w) => morseReversed[w] || '')
    .join('')
    .replace(/ +/g, ' ');
}

function App() {
  const [englishText, setEnglishText] = useState("");
  const [eeeeeText, setEeeeeText] = useState("");

  const handleEnglishChange = e => {
    const value = e.target.value.toLowerCase();
    if (value && !morse[value.substr(-1)]) return false;
    setEnglishText(value);
    setEeeeeText(toEeeee(value));
  };

  const handleEeeeeChange = e => {
    const value = e.target.value.replace(/(\r\n|\n|\r)/gm, "");
    if (value && !isEeeee(value)) return false;
    setEeeeeText(value);
    setEnglishText(toEnglish(value));
  };

  const charCount = `${eeeeeText.length} / 320`;

  return (
    <>
      <textarea
        onChange={handleEnglishChange}
        value={englishText}
        placeholder="english"
      />
      <textarea
        onChange={handleEeeeeChange}
        value={eeeeeText}
        placeholder="eeeee"
      />
      <input
        disabled
        value={charCount}
      />
    </>
  );
}

export default App;
