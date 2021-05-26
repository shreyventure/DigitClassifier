let zeros = [],
  ones = [],
  twos = [],
  threes = [];

function preload() {
  for (let i = 0; i <= 100; i++) {
    zeros[i] = loadImage(`data/zeros/zero (${i}).jpg`);
    ones[i] = loadImage(`data/ones/one (${i}).jpg`);
    twos[i] = loadImage(`data/twos/two (${i}).jpg`);
    threes[i] = loadImage(`data/threes/three (${i}).jpg`);
  }
}
let canvas;
let textP;
let nn;
function setup() {
  nn = ml5.neuralNetwork({
    inputs: [56, 56, 4],
    task: "imageClassification",
    debug: true,
  });

  for (let i = 0; i <= 100; i++) {
    nn.addData({ image: zeros[i] }, { target: "zero" });
    nn.addData({ image: ones[i] }, { target: "one" });
    nn.addData({ image: twos[i] }, { target: "two" });
    nn.addData({ image: threes[i] }, { target: "three" });
  }

  nn.normalizeData();

  nn.train(
    {
      epochs: 32,
      batchSize: 12,
    },
    finishedTraining
  );

  function finishedTraining() {
    nn.save("model");
    console.log("Model saved!");
  }
}
