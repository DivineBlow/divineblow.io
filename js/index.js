import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import Splitting from "splitting";
import throttle from "lodash.throttle";
import Cursor from "./cursor";

gsap.registerPlugin(TextPlugin);

function heroIntro() {
	const hero = document.querySelector("[data-hero]");

	/* Menu */
	const menuButton = document.querySelector('[data-btn="menu"]');
	const menu = document.querySelector("[data-menu]");

	menuButton.addEventListener("click", () => {
		menu.classList.toggle("is-open");
		menuButton.classList.toggle("is-active");
	});

	/* Cursor */
	const onMouseMove = (e) => {
		const { clientX, clientY } = e;
		const x = Math.round((clientX / window.innerWidth) * 103);
		const y = Math.round((clientY / window.innerHeight) * 103);

		gsap.to(hero, {
			"--x": `${x}%`,
			"--y": `${y}%`,
			duration: 0.3,
			ease: "sine.out",
		});
	};

	/* Text animation */
	Splitting();

	// Set initial text styles (before animation)
	gsap.set(".hero--primary .char", {
		opacity: 0,
		y: 25,
	});

	/* Timeline */
	const tl = gsap.timeline({ delay: 1 });

	tl.to(".hero--primary .char", {
		opacity: 1,
		y: 0,
		duration: 0.75,
		stagger: 0.1,
	})
		.to(hero, {
			"--maskSize1": "20%",
			duration: 0.5,
			ease: "back.out(2)",
		})
		.to(hero, {
			"--maskSize2": "28%",
			"--maskSize3": "calc(28% + 0.1rem)",
			duration: 0.5,
			delay: 0.3,
			ease: "back.out(2)",
		})
		.then(() => {
			window.addEventListener("mousemove", throttle(onMouseMove, 30));
		});
}

setTimeout(() => {
	document.body.classList.remove("loading");
	heroIntro();
	// Initialize custom cursor
	const cursor = new Cursor(document.querySelector(".cursor"));
	// Mouse effects on all links
	[...document.querySelectorAll("a")].forEach((link) => {
		link.addEventListener("mouseenter", () => cursor.enter());
		link.addEventListener("mouseleave", () => cursor.leave());
	});
	[...document.querySelectorAll("button")].forEach((link) => {
		link.addEventListener("mouseenter", () => cursor.enter());
		link.addEventListener("mouseleave", () => cursor.leave());
	});
}, 2000);
