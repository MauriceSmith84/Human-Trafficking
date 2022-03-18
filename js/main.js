window.addEventListener('load', init);

// Globals

// Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 1
};

// To change level
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const currentRanking = document.querySelector('#ranking');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');

const cities = [
  'Houston',
  'New York',
  'Los Angeles',
  'Washington DC',
  'Chicago',
  'Las Vegas',
  'Atlanta',
  'Columbus',
  'Dallas',
  'San Diego',
  'Miami',
  'San Francisco',
  'Sacamento',
  'Austin',
  'San Antonio',
  'Philadelphia',
  'Seattle',
  'Phoenix',
  'Baltimore',
  'Orlando',
  'Portland',
  'Detroit',
  'Charlotte',
  'San Jose',
  'Boston',
  'St. Louis',
  'Tampa',
  'Fresno',
  'Denver',
  'Cleveland'
];

const rank = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30'
];

// Initialize Game
function init() {
  // Show number of seconds in UI
 // seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(cities, rank);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(cities, rank);
    wordInput.value = '';
    score++;
  }
  
  // Highscore based on score value for Session Storage
  if (typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']) {
    sessionStorage['highscore'] = score;
  } else {
    sessionStorage['highscore'] = sessionStorage['highscore'];
  }

  // Prevent display of High Score: -1
  if (sessionStorage['highscore'] >= 0) {
  //highscoreDisplay.innerHTML = sessionStorage['highscore'];
  }

  // If score is -1, display 0
  if (score === -1) {
    //scoreDisplay.innerHTML = 0;
  } else {
    //scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// Pick & show random word
function showWord(words, rank) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
  currentRanking.innerHTML = rank[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Help End Human Trafficking!!!';
    score = -1;
  }
}
