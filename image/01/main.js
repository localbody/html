
const imageAfter = document.querySelector('.compare__after');
const widthImageAfter = imageAfter.offsetWidth;
const heightImageAfter = imageAfter.offsetHeight;
const delimeter = document.querySelector('.compare__delimeter')
let isActive = false;

compare();

function compare(){
  delimeter.style.left = (widthImageAfter/2) - (delimeter.offsetWidth/2) + 'px';
  imageAfter.style.width = '50%';

  setListeners()
}

function setListeners(){
  delimeter.addEventListener('mousedown', activeDelimeter);
  delimeter.addEventListener('touchstart', activeDelimeter);

  window.addEventListener('mousemove', onMoveDelimeter);
  window.addEventListener('touchmove', onMoveDelimeter);


  window.addEventListener('mouseup', () => {
    isActive = false;
  })
   window.addEventListener('touchstop', () => {
    isActive = false;
  })
}


function activeDelimeter(event) {
  event.preventDefault();

  isActive = true;
}

function onMoveDelimeter(event){
  if(!isActive) return

  moveSlide(currentPositionDelimeter(event))
}

function currentPositionDelimeter(event) {
  let image = imageAfter.getBoundingClientRect();
  let x = 0;
  x = event.pageX - image.left;

  if (x < 0) {
    x = 0;
  }

  if ( x > widthImageAfter) {
    x = widthImageAfter
  }

  return x
}


function moveSlide (x){
  imageAfter.style.width = x + 'px';

  delimeter.style.left = imageAfter.offsetWidth - (delimeter.offsetWidth / 2 ) + 'px';

}
