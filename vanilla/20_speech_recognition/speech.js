window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = createParagraph();
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', handleSpeech);
recognition.addEventListener('end', recognition.start);

recognition.start();

function handleSpeech (e) {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  p.textContent = transcript;

  if (e.results[0].isFinal) {
    p = createParagraph();
    words.appendChild(p);
  }
}

function createParagraph() {
  return document.createElement('p');
}
