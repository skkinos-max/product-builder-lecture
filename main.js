const drawButton = document.getElementById('draw-button');
const lottoNumbersDiv = document.getElementById('lotto-numbers');
const themeButton = document.getElementById('theme-button');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  themeButton.textContent = '☀️ 라이트 모드';
}

themeButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    themeButton.textContent = '☀️ 라이트 모드';
    localStorage.setItem('theme', 'dark');
  } else {
    themeButton.textContent = '🌙 다크 모드';
    localStorage.setItem('theme', 'light');
  }
});

drawButton.addEventListener('click', () => {
  const numbers = generateLottoNumbers();
  displayLottoNumbers(numbers);
});

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function displayLottoNumbers(numbers) {
  lottoNumbersDiv.innerHTML = ''; // Clear previous numbers
  numbers.forEach(number => {
    const numberDiv = document.createElement('div');
    numberDiv.classList.add('lotto-number');
    numberDiv.textContent = number;
    lottoNumbersDiv.appendChild(numberDiv);
  });
}
