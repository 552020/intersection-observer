const sections = document.querySelectorAll(".section");
const section1 = document.querySelector("#section-1");
const nav = document.querySelector(".nav");

const obsCallback = function (entries, observer) {
  entries.forEach((entry) => console.log(entry));
};

const obsOptions = {
  root: null,
  threshold: 0.1,
};

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// sections fade-in

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  // entry.target.classList.add("to-hide");
  observer.unobserve(entry.target);
};

// const hideSection = function (entries, observer) {
//   const [entry] = entries;
//   console.log(entry.target.classList.value);
//   console.log(typeof entry.target.classList);
//   console.log(entry.target.classList.value.includes("to-hide"));
//   if (!entry.isIntersecting && entry.target.classList.value.includes("to-hide"))
//     return;

//   entry.target.classList.add("section--hidden");
// };

const revealSectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// const hideSectionObserver = new IntersectionObserver(hideSection, {
//   root: null,
//   threshold: 0.1,
// });

allSections.forEach((section) => {
  revealSectionObserver.observe(section);
  // hideSectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// SLIDER
// FADE-IN: DEACTIVATED

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;

  let maxSlide = slides.length;

  // TEMPORARY START
  const slider = document.querySelector(".slider");

  // slider.style.transform = "scale(0.4) translateX(-800px";
  // slider.style.overflow = "visible";

  // TEMPORARY END ***

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const createDots = function () {
    slides.forEach((_, i) =>
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      )
    );
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add("dots__dot--active");
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();
  // Event handlers

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") nextSlide();
    // if (e.key === 'ArrowLeft') prevSlide();
    e.key && "ArrowLeft" && prevSlide();
  });
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // const slide = e.target.dataset.slide;
      const { slide } = e.target.dataset;

      goToSlide(slide);
      activateDot(slide);
    }
  });

  // SLIDER-DOTS
};

slider();
