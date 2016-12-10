const drums = document.querySelectorAll('.drum');

drums.forEach(drum => drum.addEventListener('transitionend', removePlayingClass));
window.addEventListener('keydown', keyHandler);

function keyHandler (event) {
  const { audio, drum } = selectElements(event.keyCode);
  if (!audio || !drum) return;

  playFromStart(audio);
  markAsPlaying(drum);
}

function selectElements (keyCode) {
  return {
    audio: document.querySelector(`audio[data-key="${keyCode}"]`),
    drum: document.querySelector(`.drum[data-key="${keyCode}"]`)
  };
}

function playFromStart (audio) {
  audio.currentTime = 0;
  audio.play();
}

function markAsPlaying (drum) {
  drum.classList.add('playing');
}

function removePlayingClass (e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}
