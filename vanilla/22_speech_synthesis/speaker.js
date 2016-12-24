const $ = (query) => document.querySelector(query);
const $$ = (query) => document.querySelectorAll(query);
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = $('[name="voice"]');
const options = $$('[type="range"], [name="text"]');
const speakButton = $('#speak');
const stopButton = $('#stop');

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', changeVoice);
options.forEach(option => option.addEventListener('change', changeOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', toggle.bind(null, false));

function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en') || voice.lang.includes('ru'))
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

function changeVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  startOver && speechSynthesis.speak(msg);
}

function changeOption() {
  msg[this.name] = this.value;
  toggle();
}
