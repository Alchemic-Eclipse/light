history.scrollRestoration = "manual"; // Do not remember position before refresh (fixes glitch)

// Animation 

const hero = document.querySelector("#hero");

window.addEventListener("load", () => {
    hero.classList.add("loaded");
});


// Glitch Effect

const desc = document.querySelector("#hero p");     // TODO: it to #desc after Handwriting SVG is added
const originalText = desc.textContent; 

desc.innerHTML = "";
const characters = [];

for (const character of originalText) {

    const span = document.createElement("span");
    span.textContent = character === " " ? "\u00A0" : character;  // Put the character inside the span.. Ternary

    span.dataset.original = character;  // Remember what the original character was
    desc.appendChild(span);     // Add the span to the subtitle
    characters.push(span);      // Store the span in our array
};

const glitchSymbols = "!@#$%^&*+=?<>/\\|[]{}ΔΛΩΣØ¥";

function glitch() {

    const letters = characters.filter(characters => {           // Keep only actual characters
        return /[A-Za-z]/.test(characters.dataset.original)     // Check if the original character is A-Z
    });

    const numberOfLetters = Math.floor(Math.random() * 2) + 1;      // Randomly choose 1 or 2 letters

    for (let i = 0; i < numberOfLetters; i++) {
        const character = letters[Math.floor(Math.random() * letters.length)];      // Pick a random letter
        let changes = 0;    // Track how many times this letter has changed

        const scramble = setInterval(() => {    // Run the corruption repeatedly for a short time
            character.textContent = glitchSymbols[Math.floor(Math.random() * glitchSymbols.length)];    // Give the letters a random symbol
            changes++;

            if (changes >= 4) {
                clearInterval(scramble);    // Stop after 4 changes 
                character.textContent = character.dataset.original;     // Restore the original letter
            } 

        }, 45);     // Repeat every 45ms
    }
};

setInterval(glitch, 2000);      // Start a new glitch every 2 sec