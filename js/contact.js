const contact = document.querySelector("#contact");
const contactContent = document.querySelector("#contact-content");

contact.addEventListener("click", () => {
	const contactBox = new WinBox({
		background: "#00aa00",
		border: 4,
		x: "center",
		y: "center",
		width: "300px",
		height: "400px",
		top: 50,
		right: 50,
		bottom: 50,
		left: 50,
		resize: true,
		mount: contactContent,
		onfocus: function () {
			this.setBackground("#00aa00");
		},
		onblur: function () {
			this.setBackground("#777");
		},
	});
});

setTimeout(() => {
	document.body.classList.remove("loading");
}, 2000);
