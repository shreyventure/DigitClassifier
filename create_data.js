let c;
function setup() {
  c = createCanvas(28, 28);
  background(0);
  frameRate(10);
}
let i = 0;

function draw() {
  background(0);
  rectMode(CENTER);
  let w = random(5, width);
  strokeWeight(random(2, 10));
  textSize(w);
  text("9", random(0, width / 2), random(height / 2, height));
  fill(255);
  if (i > 0 && i <= 5) {
    save_canvas();
    i++;
  } else {
    i++;
  }
}

const save_canvas = async () => {
  await saveCanvas(c, `nine`, "jpg");
};
