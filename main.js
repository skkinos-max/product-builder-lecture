const URL = "https://teachablemachine.withgoogle.com/models/M-Y_hKNnS/";
let model, maxPredictions;

const themeButton = document.getElementById('theme-button');
const body = document.body;
const imageInput = document.getElementById('image-input');
const imagePreview = document.getElementById('image-preview');
const resultContainer = document.getElementById('result-container');
const labelContainer = document.getElementById('label-container');
const loading = document.getElementById('loading');

// Theme Logic
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

// Load Model
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  loading.classList.remove('hidden');
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
  loading.classList.add('hidden');
}

// Handle Image Upload
imageInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (event) => {
    imagePreview.src = event.target.result;
    resultContainer.classList.remove('hidden');
    
    // Wait for image to load before predicting
    imagePreview.onload = async () => {
      await predict();
    };
  };
  reader.readAsDataURL(file);
});

// Predict
async function predict() {
  const prediction = await model.predict(imagePreview);
  labelContainer.innerHTML = '';
  
  for (let i = 0; i < maxPredictions; i++) {
    const className = prediction[i].className;
    const probability = (prediction[i].probability * 100).toFixed(0);
    
    const barWrapper = document.createElement('div');
    barWrapper.className = 'result-bar-wrapper';
    
    barWrapper.innerHTML = `
      <div class="result-label">
        <span>${className}</span>
        <span>${probability}%</span>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${probability}%"></div>
      </div>
    `;
    
    labelContainer.appendChild(barWrapper);
  }
}

// Initialize
init();
