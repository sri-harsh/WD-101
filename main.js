let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let loadimage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let imagePath = (frameNumber, animation) => {
  return animation + "/" + frameNumber + ".png";
};

let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
};

loadimages = (callback) => {
  let images = { idle: [], kick: [], punch: [] };
  let imagesToLoad = 0;

  ["idle", "kick", "punch"].forEach((animation) => {
    let animationFrames = frames[animation];
    imagesToLoad = imagesToLoad + animationFrames.length;
    animationFrames.forEach((frameNumber) => {
      let path = imagePath(frameNumber, animation);
      loadimage(path, (image) => {
        images[animation][frameNumber - 1] = image;
        imagesToLoad = imagesToLoad - 1;
        if (imagesToLoad === 0) {
          callback(images);
        }
      });
    });
  });
};

let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(image, 0, 0, 500, 500);
    }, index * 100);
  });
  setTimeout(callback, images[animation].length * 100);
};
var kick_button = document.getElementById("kick"),
  kick_count = 0;
var punch_button = document.getElementById("punch"),
  punch_count = 0;
loadimages((images) => {
  let queuedAnimations = [];

  let aux = () => {
    let selectedAnimation;
    if (queuedAnimations.length === 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queuedAnimations.shift();
    }
    animate(ctx, images, selectedAnimation, aux);
  };
  aux();
  document.getElementById("kick").onclick = () => {
    queuedAnimations.push("kick");
    kick_count += 1;
    document.getElementById("k_count").innerHTML =
      "You have kicked " + kick_count + " times.";
  };
  document.getElementById("punch").onclick = () => {
    queuedAnimations.push("punch");
    punch_count += 1;
    document.getElementById("p_count").innerHTML =
      "You have punched " + punch_count + " times.";
  };
  document.addEventListener("keyup", (event) => {
    const key = event.key;
    if (key === "ArrowLeft") {
      queuedAnimations.push("kick");
      kick_count += 1;
    } else if (key === "ArrowRight") {
      queuedAnimations.push("punch");
      punch_count += 1;
    }
    document.getElementById("p_count").innerHTML =
      "You have punched " + punch_count + " times.";
    document.getElementById("k_count").innerHTML =
      "You have kicked " + kick_count + " times.";
  });
});
/*let drawLine = (startX, startY, endX, endY) => {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
};

ctx.beginPath();
ctx.arc(250, 250, 150, 0, 2 * Math.PI);
ctx.stroke();
*/
/*
drawLine(250, 150, 250, 350);
drawLine(250, 200, 150, 150);
drawLine(250, 200, 350, 150);
drawLine(250, 350, 225, 450);
drawLine(250, 350, 275, 450);
*/
