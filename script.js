window.saveDataAcrossSessions = true

const leftButton = document.querySelector('.left');
const rightButton = document.querySelector('.right');

const LOOK_DELAY = 1000 
const LEFT_CUTOFF = window.innerWidth / 4
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4

let startLookTime = Number.POSITIVE_INFINITY
let lookDirection = null

const image = document.querySelector('.image');

leftButton.addEventListener('click', () => {
   image.classList.add('left');
   randomImage();
   setTimeout(()=>{
    image.classList.remove('left');
   },1500)
})
rightButton.addEventListener('click', () => {
    image.classList.add('right');
    randomImage();
    setTimeout(()=>{
     image.classList.remove('right');
    },1500)
 })

 const nextImage = () => {

 }
const randomImage = () => {
    image.src = 'https://source.unsplash.com/random/500x700'+ Math.random()
}
randomImage()

webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null || lookDirection === "STOP") return
    if (
        data.x < LEFT_CUTOFF &&
        lookDirection !== "LEFT" &&
        lookDirection !== "RESET"
      ) {
        startLookTime = elapsedTime
        lookDirection = "LEFT"
      } else if (
        data.x > RIGHT_CUTOFF &&
        lookDirection !== "RIGHT" &&
        lookDirection !== "RESET"
      ) {
        startLookTime = elapsedTime
        lookDirection = "RIGHT"
      } else if (data.x >= LEFT_CUTOFF && data.x <= RIGHT_CUTOFF) {
        startLookTime = Number.POSITIVE_INFINITY
        lookDirection = null
      }
      if (startLookTime + LOOK_DELAY < elapsedTime) {
        if (lookDirection === "LEFT") {
          image.classList.add("left")
          randomImage()
          setTimeout(()=>{
            image.classList.remove('left');
            lookDirection = "RESET"
           },1500)
        } else {
          image.classList.add("right")
          randomImage()
          setTimeout(()=>{
            image.classList.remove('right');
            lookDirection = "RESET"
           },1500)
        }
  
        startLookTime = Number.POSITIVE_INFINITY
        lookDirection = "STOP"
    }
  /*   setTimeout(()=>{
        randomImage()
        lookDirection = "RESET"
    },500) */
}).begin();

