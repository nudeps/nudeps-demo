import { computePosition, flip, shift } from "@floating-ui/dom";

const button = document.getElementById("button");
const tooltip = document.getElementById("tooltip");

function update () {
	computePosition(button, tooltip, {
		placement: "top",
		middleware: [flip(), shift()],
	}).then(({x, y}) => {
		Object.assign(tooltip.style, { left: `${x}px`, top: `${y}px` });
	});
}

function showTooltip () {
	tooltip.style.display = "block";
	update();
}

function hideTooltip () {
	tooltip.style.display = "";
}

[
	["mouseenter", showTooltip],
	["mouseleave", hideTooltip],
	["focus", showTooltip],
	["blur", hideTooltip],
].forEach(([event, handler]) => {
	button.addEventListener(event, handler);
});
