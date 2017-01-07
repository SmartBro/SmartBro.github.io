import * as PIXI from 'pixi.js';

const renderer = PIXI.autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);
const stage = new PIXI.Container();
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

const texture = PIXI.utils.TextureCache["img/maxresdefault.jpg"];
PIXI.loader
  .add("img/maxresdefault.jpg")
  .add("img/ukraine.jpg")
  .load(setup);

function setup() {
  const map = new PIXI.Sprite(
    PIXI.loader.resources["img/ukraine.jpg"].texture
  );
  map.width = window.innerWidth;
  map.height = window.innerHeight;

  stage.addChild(map);
  renderer.render(stage);
}
