history.scrollRestoration = "manual"; // Do not remember position before refresh (fixes glitch)

// Glitch Effect

const desc = document.querySelector("#hero p"); 

if (desc) {

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

};    

// Track mouse

let mouseX = -1000;
let mouseY = -1000;

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

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

    const snowColor = getComputedStyle(document.documentElement).getPropertyValue("--snow-color").trim();
    ctx.fillStyle = snowColor;                      // Set its color & opacity
    ctx.fill();                                     // Fill the circle

}

// Give a flake a new starting position
function resetSnowflake(snowflake) {

    const spawnFromRight = Math.random() < 0.3;    // 30% chance to use right edge

    if (spawnFromRight) {

        snowflake.x = canvas.width;                      // Put at right edge
        snowflake.y = Math.random() * canvas.height;     // Randomize its height

    } else {
        snowflake.x = Math.random() * canvas.width;     // Randomize its horizontal position
        snowflake.y = 0;                                // Put it at the top
    }

}

const snowflakes = [];

for (let i = 0; i < 100; i++) { 

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


        const dx = snowflake.x - mouseX;
        const dy = snowflake.y - mouseY;

        const distance = Math.sqrt(dx * dx + dy * dy);

        const interactionRadius = 80;

        if (distance > 0 && distance < interactionRadius) {
            const force = (interactionRadius - distance) /interactionRadius;

            snowflake.x += (dx / distance) * force * 2;
            snowflake.y += (dy / distance) * force * 2;
        }       

    }

}

function animate() {
    
    drawSnow();                         // Update & Draw snow
    requestAnimationFrame(animate);     // Ask the browser to run it again

}

animate();

// Animation

const heroTitle = document.querySelector(".hero-title")

let transitioning = false;

// Only continue if hero-title exist on page
if (heroTitle) {

    // Is hero-title Light (aka is it homepage?)
    const isHeroTitle = heroTitle.textContent.trim() === "Light";

    if (isHeroTitle) {

        heroTitle.addEventListener("click", (event) => {

            // Don't navigate immediately
            event.preventDefault();

            // If Transitioning, ignore additional clicks
            if (transitioning) return;

            transitioning = true;

            // Store homepage url we're going to
            const destination = heroTitle.href;


            const glitchStates = [
                "Light",
                "Li#ht",
                "L!gΔt",
                "L█g?t",
                "░▒▓"
            ];

            // Start animation
            heroTitle.classList.add("transition-out");

            // Keep track of which corrupted state is being showed
            let state = 0;

            // Change title repeatedly during glitch
            const glitchInterval = setInterval(() => {

                // Replace title w corrupted version
                heroTitle.textContent = glitchStates[state];
                state++;

                // Stop once final state has appeared
                if (state >= glitchStates.length) {
                    clearInterval(glitchInterval);
                }

            }, 110);

            // Navigate to lab after animation's done
            setTimeout(() => {
                window.location.href = destination;
            }, 650);
            
        });
    }   
}


// Only run the entrance animation on lab page
if (heroTitle && document.body.classList.contains("lab-page")) {

    const labGlitchStates = [
        "░▒▓",
        "L█g?t's LΔb",
        "L!gΔt's L?b",
        "Li#ht's Lab",
        "Light's LΔb",
        "Light's Lab"
    ] 

    let state = 0;

    heroTitle.classList.add("transition-in");

    // Start w first corrupted state 
    heroTitle.textContent = labGlitchStates[state];

    // Advance through it
    const labGlitchInterval = setInterval(() => {
        state++;
        heroTitle.textContent = labGlitchStates[state];

        // Stop if final state has appeared
        if (state >= labGlitchStates.length - 1) {
            clearInterval(labGlitchInterval);
        }
    }, 130);

}

window.addEventListener("pageshow", () => {
    if (document.body.classList.contains("lab-page")) return;

    const heroTitle = document.querySelector(".hero-title");

    if (heroTitle) {
        heroTitle.classList.remove("transition-out");
        heroTitle.textContent = "Light";
        transitioning = false;
    }
});

console.log("All good");