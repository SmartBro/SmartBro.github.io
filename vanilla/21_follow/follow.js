const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.append(highlight);

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));

function highlightLink () {
  const { width, height, top, left } = this.getBoundingClientRect();
  highlight.style.width = `${width}px`;
  highlight.style.height = `${height}px`;
  highlight.style.transform = `translate(${left + window.scrollX}px, ${top + window.scrollY}px)`;
}