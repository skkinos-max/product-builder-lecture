const drawButton = document.getElementById('draw-button');
const lottoNumbersDiv = document.getElementById('lotto-numbers');

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
