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


// Snow Effect

const canvas = document.querySelector("#snow");     // Canvas
const ctx = canvas.getContext("2d");                // Drawing tool

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);    // Resize again if window size changes

function drawSnowflake(x, y, size) {

    ctx.beginPath();    
    ctx.arc(x, y, size, 0, Math.PI * 2);            // Draw a circle
    ctx.fillStyle = "rgba(253, 244, 220, 0.8)";   // Set its color & opacity
    ctx.fill();                                     // Fill the circle

}

// Give a flake a new starting position
function resetSnowflake(snowflake) {

    const spawnFromRight = Math.random() < 0.3;    // 50% chance to use right edge

    if (spawnFromRight) {

        snowflake.x = canvas.width;                      // Put at right edge
        snowflake.y = Math.random() * canvas.height;     // Randomize its height

    } else {
        snowflake.x = Math.random() * canvas.width;     // Randomize its horizontal position
        snowflake.y = 0;                                // Put it at the top
    }

}

const snowflakes = [];

for (let i = 0; i < 80; i++) { 

    snowflakes.push({
        x: Math.random() * canvas.width,          // Random Horizontal position
        y: Math.random() * canvas.height,         // Random Vertical position
        size: Math.random() * 1,                  // Random size b/w 0.1 and 1.1

        vx: -(Math.random() * 0.3 + 0.5),         // Leftward speed b/w 0.5 and 0.8
        vy: Math.random() * 0.2 + 0.2           // Downward speed b/w 0.1 and 0.3
    });

}

function drawSnow() { 

    ctx.clearRect(0, 0, canvas.width, canvas.height);       // Clear the previous frame

    
    
    for (const snowflake of snowflakes) {

        snowflake.x += snowflake.vx;
        snowflake.y += snowflake.vy;
        
        if (snowflake.x < 0 || snowflake.y > canvas.height) {   // Check if flake left the screen
            resetSnowflake(snowflake);
        }

        drawSnowflake(snowflake.x, snowflake.y, snowflake.size);

    }

}

function animate() {
    
    drawSnow();                         // Update & Draw snow
    requestAnimationFrame(animate);     // Ask the browser to run it again

}

animate();


console.log("All good");