

let intro = 0;

// localStorage.setItem("trail", 1);
if (document.cookie) {
  const cok = document.cookie.split("; ");
  console.log("cok:", cok);
  intro = cok[0].split("=")[1];
  console.log("intro:", intro);
}
// console.log(document.cookie);
// intro = localStorage.getItem("intro");
const loader = document.querySelector(".screen");

if (intro == 1) {
  loader.style.display = "none";
} else {
  loader.style.display = "block";
  document.cookie = "intro=1;max-age=0";
}


const lenis = new Lenis();
lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
//loader
// Check if the animation has already been played

let counter = {
  value: 0,
};

function updateLorderText() {
  let progress = Math.round(counter.value);
  $(".loader_number").text(progress + "%"); // Add "%" for clarity
}

let tl = gsap.timeline({});
tl.to(counter, { onUpdate: updateLorderText, value: 100, duration: 2 });

gsap.to(".screen", {
  y: -5000,
  delay: 2,
  ease: "power4.out",
});

var main = document.querySelector("body");
var cursor = document.querySelector(".cursor");
var imageDiv = document.querySelector(".image");

main.addEventListener("mousemove", function (dets) {
  gsap.to(cursor, {
    x: dets.x,
    y: dets.y,
  });
});

//horizantal scroll
gsap.registerPlugin(ScrollTrigger);

// Ensure that the text is hidden before the animation starts
gsap.set(".text", { x: "100vw" });

// Create the horizontal scroll animation
gsap.to(".text", {
  x: "-100vw",
  ease: "none",
  scrollTrigger: {
    trigger: ".trace",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    markers: false, // Remove this line in production
  },
});

//text animation

gsap.registerPlugin(ScrollTrigger);

const splitTypes = document.querySelectorAll(".reveal-type");
splitTypes.forEach((char, i) => {
  const text = new SplitType(char, { types: "chars" });

  gsap.from(text.chars, {
    scrollTrigger: {
      trigger: text,
      start: "top 80%", // animation starts when the top of the element hits the bottom of the viewport
      end: "top 20%", // animation ends when the bottom of the element hits the top of the viewport
      scrub: true,
      markers: false,
      pin: true, // ties the animation to the scrollbar
    },
    opacity: 0.2,
    stagger: 0.1,
    y: 10,
    duration: 1,
    ease: "power4.out",
    //markers:true
  });
});

document.addEventListener("scroll", function () {
  const trace = document.querySelector(".trace");
  const wrapper = document.querySelector(".wrapper");

  const rect = trace.getBoundingClientRect();

  if (rect.top <= window.innerHeight && rect.bottom >= 0) {
    // The trace element is in view
    wrapper.style.animation = "scrollRight 5s forwards";
  }
});

//circle animation
gsap.registerPlugin(ScrollTrigger);

gsap.to(".circle", {
  scale: 10000,
  duration: 10,
  ease: "power1.in",
  scrollTrigger: {
    trigger: ".con",
    start: "top 20%",
    end: "bottom bottom",
    scrub: true,
    //markers: true // Remove this line in production
  },
});

gsap.from(".hero-section", {
  opacity: 0,
  duration: 1,
  ease: "power1.in",
});

gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
  ".card",
  {
    x: () => window.innerWidth / 2 + 500,
    rotate: 25,
    ease: "power4.out",
  },
  {
    x: 0,
    stagger: 0.5,
    rotate: 0,
    scrollTrigger: {
      pin: ".container",
      //markers: true,
      scrub: true,
      start: "top top",
      end: "+=30000",
      invalidateOnRefresh: true,
    },
  }
);

//scrooolllll
// learn what all this code means at
// https://www.creativecodingclub.com/bundles/creative-coding-club
// unlock over 250 GSAP lessons today

const details = gsap.utils.toArray(".desktopContentSection:not(:first-child)");
const photos = gsap.utils.toArray(".desktopPhoto:not(:first-child)");

gsap.set(photos, { yPercent: 101 });

const allPhotos = gsap.utils.toArray(".desktopPhoto");

// create
let mm = gsap.matchMedia();

// add a media query. When it matches, the associated function will run
mm.add("(min-width: 600px)", () => {
  // this setup code only runs when viewport is at least 600px wide
  console.log("desktop");

  ScrollTrigger.create({
    trigger: ".gallery",
    start: "top top",
    end: "bottom bottom",
    pin: ".right",
  });

  //create scrolltrigger for each details section
  //trigger photo animation when headline of each details section
  //reaches 80% of window height
  details.forEach((detail, index) => {
    let headline = detail.querySelector("h1");
    let animation = gsap
      .timeline()
      .to(photos[index], { yPercent: 0 })
      .set(allPhotos[index], { autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: headline,
      start: "top 80%",
      end: "top 50%",
      animation: animation,
      scrub: true,
      markers: false,
    });
  });

  return () => {
    // optional
    // custom cleanup code here (runs when it STOPS matching)
    console.log("mobile");
  };
});

// Define the animation
