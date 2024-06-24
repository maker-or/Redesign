

/*const races = document.querySelector(".races");
console.log(races.offsetWidth)

function getScrollAmount() {
	let racesWidth = races.scrollWidth;
	return -(racesWidth - window.innerWidth);
}

const tween = gsap.to(races, {
	x: getScrollAmount,
	duration: 3,
	ease: "none",
});


ScrollTrigger.create({
	trigger:".racesWrapper",
	start:"top 0%",
	end: () => `+=${getScrollAmount() * -1}`,
	pin:true,
	animation:tween,
	scrub:1,
	invalidateOnRefresh:true,
	markers:true
})
*/


gsap.registerPlugin(ScrollTrigger);

gsap.to(".container", {
  x: () => -(document.querySelector(".container").scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
	trigger: ".container",
	start: "top top",
	end: () => "+=" + document.querySelector(".container").scrollWidth,
	scrub: true,
	pin: true,
	anticipatePin: 1
  }
});

const lenis = new lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

