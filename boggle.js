document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('guess-form');
    const result = document.getElementById('result');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const guess = document.getElementById('guess').value;
  
      const response = await axios.post('/check-word', { word: guess });
      const resultText = response.data.result;
  
      if (resultText === 'ok') {
        score += guess.length;
        result.textContent = 'Valid word!';
      } else if (resultText === 'not-on-board') {
        result.textContent = 'Word is not on the board.';
      } else if (resultText === 'not-a-word') {
        result.textContent = 'Not a valid word.';
      }
  
      scoreDisplay.textContent = `Score: ${score}`;
      form.reset();
    });
  });

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('guess-form');
    const result = document.getElementById('result');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    let timer = 60;
    const timerDisplay = document.getElementById('timer');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (timer <= 0) {
        result.textContent = 'Time is up!';
        return;
      }
      const guess = document.getElementById('guess').value;
  
      const response = await axios.post('/check-word', { word: guess });
      const resultText = response.data.result;
  
      if (resultText === 'ok') {
        score += guess.length;
        result.textContent = 'Valid word!';
      } else if (resultText === 'not-on-board') {
        result.textContent = 'Word is not on the board.';
      } else if (resultText === 'not-a-word') {
        result.textContent = 'Not a valid word.';
      }
  
      scoreDisplay.textContent = `Score: ${score}`;
      form.reset();
    });
  
    const countdown = setInterval(() => {
      timer--;
      timerDisplay.textContent = `Time: ${timer}s`;
      if (timer <= 0) {
        clearInterval(countdown);
        form.querySelector('button').disabled = true;
      }
    }, 1000);
  });
  
  