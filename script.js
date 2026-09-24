history.scrollRestoration = "manual"; // Do not remember position before refresh (fixes glitch)

const hero = document.querySelector("#hero");

window.addEventListener("load", () => {
    hero.classList.add("loaded");
});
