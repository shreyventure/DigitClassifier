let nn;
let div_0, div_1, div_2, div_3;
function setup() {
  canvas = createCanvas(400, 400);
  background(0);
  textP = createP("Loading...");
  textP.style("font-size", "20px");

  div_0 = select(".div_0");
  div_1 = select(".div_1");
  div_2 = select(".div_2");
  div_3 = select(".div_3");

  nn = ml5.neuralNetwork({
    inputs: [56, 56, 4],
    task: "imageClassification",
    debug: true,
  });
  const modelDetails = {
    model: "model/model.json",
    metadata: "model/model_meta.json",
    weights: "model/model.weights.bin",
  };
  nn.load(modelDetails, () => {
    console.log("Model Loaded!");
    textP.html("Press C to clear the screen.");
    classifyCanvas();
  });
}

function draw() {
  if (mouseIsPressed) {
    stroke(255);
    strokeWeight(8);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function keyPressed() {
  if (keyCode == 67) background(0);
}
let input;
function classifyCanvas() {
  input = createGraphics(28, 28);
  input.copy(canvas, 0, 0, width, height, 0, 0, 28, 28);
  //   image(input, 0, 0);
  nn.classify({ image: input }, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }

    div_0.removeClass("text-white");
    div_0.removeClass("bg-dark");
    div_1.removeClass("text-white");
    div_1.removeClass("bg-dark");
    div_2.removeClass("text-white");
    div_2.removeClass("bg-dark");
    div_3.removeClass("text-white");
    div_3.removeClass("bg-dark");

    if (result[0].label == "zero") {
      div_0.addClass("text-white");
      div_0.addClass("bg-dark");
    } else if (result[0].label == "one") {
      div_1.addClass("text-white");
      div_1.addClass("bg-dark");
    } else if (result[0].label == "two") {
      div_2.addClass("text-white");
      div_2.addClass("bg-dark");
    } else {
      div_3.addClass("text-white");
      div_3.addClass("bg-dark");
    }

    // textP.html(
    //   `${result[0].label} : ${result[0].confidence * 100} %<br>${
    //     result[1].label
    //   } : ${result[1].confidence * 100} %<br>${result[2].label} : ${
    //     result[2].confidence * 100
    //   } %<br>${result[3].label} : ${result[3].confidence * 100} %<br>`
    // );
    classifyCanvas();
  });
}
