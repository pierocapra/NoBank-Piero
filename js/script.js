"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//IMPLEMENTING THE COOKIES BANNER
const cookiesBanner = document.createElement("div");

cookiesBanner.classList.add("cookie-message");
cookiesBanner.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookies">Got It!</button>';
const header = document.querySelector(".header");
cookiesBanner.style.backgroundColor = "grey";

header.append(cookiesBanner);

document
  .querySelector(".btn--close-cookies")
  .addEventListener("click", () => cookiesBanner.remove());

//Scroll from LEARN MORE to section1
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function () {
  const s1coords = section1.getBoundingClientRect();

  section1.scrollIntoView({ behavior: "smooth" });
});

//SMOOTH SCROLL INTO VIEW
document.querySelector(".nav__links").addEventListener("click", function (e) {
  if (!e.target.classList.contains("nav__link--btn")) {
    e.preventDefault();

    //Matching Strategy
    if (e.target.classList.contains("nav__link")) {
      const id = e.target.getAttribute("href");
      //console.log(id);
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  }
});

//OPERATION TAB

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  //console.log(tab);

  const clicked = e.target.closest(".operations__tab");
  //console.log(clicked);
  if (!clicked) return;

  tabs.forEach((but) => but.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  setTimeout(() => {
    tabsContent.forEach((cont) =>
      cont.classList.remove("operations__content--active")
    );
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  }, 200);
});

//Lower the opacity of not hovered elements in Navigation bar
const navBar = document.querySelector(".nav");

const mouseToggle = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    let link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(function (el) {
      if (el !== link) {
        el.style.opacity = opacity;
      }
      logo.style.opacity = opacity;
    });
  }
};
navBar.addEventListener("mouseover", function (e) {
  mouseToggle(e, 0.5);
});

navBar.addEventListener("mouseout", function (e) {
  mouseToggle(e, 1);
});

//STICKY NAVIGATION BAR
const barHeight = navBar.getBoundingClientRect().height;

const obsCallback = function (entries, observer) {
  entries.forEach((entry) => {
    // console.log(entry);
    if (!entry.isIntersecting) {
      navBar.classList.add("sticky");
    } else {
      navBar.classList.remove("sticky");
    }
  });
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${barHeight}px`,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);

//Appearance of sections when enter them

const sections = document.querySelectorAll(".section");

const secCallback = function (entries, secObserver) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  secObserver.unobserve(entry.target);
};

const secObserver = new IntersectionObserver(secCallback, {
  root: null,
  threshold: 0.2,
});

sections.forEach(function (sec) {
  secObserver.observe(sec);
  sec.classList.add("section--hidden");
});

//LAZY LOADING OF IMAGES

const imgTarget = document.querySelectorAll("img[data-src]");
//console.log(imgTarget);

const loadImg = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;
  //console.log(entry);

  //replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  imgObserver.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.2,
  rootMargin: "100px",
});

imgTarget.forEach((image) => imgObserver.observe(image));

//IMPLEMENTING THE SLIDER

const slides = document.querySelectorAll(".slide");

slides.forEach(function (slide, i) {
  //console.log(slide);
  slide.style.transform = `translateX(${i * 100}%)`;
});

const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");

let curSlide = 0;

const sliding = function () {
  slides.forEach(function (slide, i) {
    slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    switch (curSlide) {
      case 1:
        btnLeft.style.opacity = "100";
        btnRight.style.opacity = "100";
        break;
      case 0:
        btnLeft.style.opacity = "0";
        break;
      case 2:
        btnRight.style.opacity = "0";
        break;
    }
  });
};
btnRight.addEventListener("click", function () {
  if (curSlide < 2) {
    curSlide++;
    sliding();
  }
});

btnLeft.addEventListener("click", function () {
  if (curSlide > 0) {
    curSlide--;
    sliding();
  }
});

////////////SIDEBAR///////////////////////////////////////////

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "white";
}
