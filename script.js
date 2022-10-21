let Eslides = document.getElementsByClassName("myExp");
let Edots = document.getElementsByClassName("edot");
let slides = document.getElementsByClassName("myWorks");
let dots = document.getElementsByClassName("dot");

let slideIndex = 1;
showWorks(slideIndex);

function plusSlides(n) {
  showWorks(slideIndex += n);
}

function currentSlide(n) {
  showWorks(slideIndex = n);
}

function showWorks(n) {
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}



showExp(slideIndex);

function EplusSlides(n) {
  showExp(slideIndex += n);
}

function EcurrentSlide(n) {
  showExp(slideIndex = n);
}

function showExp(n) {

  if (n > Eslides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = Eslides.length}
  for (i = 0; i < Eslides.length; i++) {
    Eslides[i].style.display = "none";
  }
  for (i = 0; i < Edots.length; i++) {
    Edots[i].className = Edots[i].className.replace(" active", "");
  }
  Eslides[slideIndex-1].style.display = "block";
  Edots[slideIndex-1].className += " active";
}