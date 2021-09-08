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
