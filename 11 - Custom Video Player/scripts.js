const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const sliders = player.querySelectorAll(".player__slider");
const skips = player.querySelectorAll("[data-skip]");
const fullscreen = player.querySelector(".fullscreen");

function togglePlay() {
  video.paused ? video.play() : video.pause();
  video.paused ? (toggle.innerHTML = "►") : (toggle.innerHTML = "||");
}

function handleSkip() {
  console.log(this.dataset.skip);
  console.log(video.currentTime);
  video.currentTime += parseInt(this.dataset.skip);
}

function handleSlider() {
  console.log(this.name, this.value);
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  console.log(e);
  const scrubTime = (e.offsetX / progress.offsetwidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleFullScreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
}

video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);

skips.forEach((skip) => skip.addEventListener("click", handleSkip));
sliders.forEach((slider) => slider.addEventListener("mousemove", handleSlider));

let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));

fullscreen.addEventListener("click", handleFullScreen);
