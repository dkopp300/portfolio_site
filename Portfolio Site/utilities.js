/* ASCII wave */

let asciiSymbols = ['.', ':', '-', '=', '+', '*', '%', '#', '@'];

let cols, rows;
let asciiWave;
let currentDesignFunc;
let nextDesignFunc;
let transitionProgress = 0;

function setup() {
    asciiWave = createDiv('');
    asciiWave.style('font-size', '10px');
    asciiWave.style('color', '#ffffff');
    asciiWave.style('background-color', '#121212');
    asciiWave.position(0, 0);
    asciiWave.id('ascii-wave');
    asciiWave.style('font-family', 'Courier New, monospace');
    windowResized();
    frameRate(15);

    currentDesignFunc = design1;
    nextDesignFunc = design2;
}

function draw() {
    let asciiArt = '';
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let index = floor(currentDesignFunc(x, y));
            asciiArt += asciiSymbols[index % asciiSymbols.length];
        }
        asciiArt += '<br>';
    }
    asciiWave.html(asciiArt);
}

function design1(x, y) {
    return (x + y + frameCount / 5) % asciiSymbols.length;
}

function design2(x, y) {
    return (x * y + frameCount / 10) % asciiSymbols.length;
}

function windowResized() {
    let fontSize = 10;

    // Create a temporary element to measure character dimensions
    let tempElem = createDiv('@');
    tempElem.style('font-size', fontSize + 'px');
    tempElem.style('position', 'absolute');
    tempElem.style('visibility', 'hidden');
    tempElem.parent(document.body);

    let charWidth = tempElem.elt.offsetWidth;
    let charHeight = tempElem.elt.offsetHeight;
    tempElem.remove();

    let docWidth = document.documentElement.clientWidth;
    let docHeight = document.documentElement.clientHeight;

    cols = Math.floor(docWidth / charWidth);
    rows = Math.floor(docHeight / charHeight);

    asciiWave.style('font-size', fontSize + 'px');
    asciiWave.style('width', docWidth + 'px');
    asciiWave.style('height', docHeight + 'px');
}


/* Toggle dark mode */

document.addEventListener('DOMContentLoaded', (event) => {
    const toggleBtn = document.getElementById('mode-toggle-btn');

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            toggleBtn.textContent = '☼'; // Dark mode is on, set button to moon
        } else {
            toggleBtn.textContent = '☽︎'; // Dark mode is off, set button to sun
        }

        if (document.body.classList.contains('dark-mode')) {
            asciiWave.style('color', '#ffffff');  // Setting the text color to white to resemble stars
            asciiWave.style('background-color', '#121212');  // Setting the background color to black to resemble space
        } else {
            asciiWave.style('color', '#000000');  // Setting the text color to black to resemble stars
            asciiWave.style('background-color', '#ffffff');  // Setting the background color to white to resemble space
        }
    });
});

/* glitchy text */

window.onload = function () {
    const roles = ["Artist", "Developer", "Designer", "Photographer", "Writer"];
    let currentRoleIndex = 0;
    const roleTextElement = document.getElementById('role-text');

    function getRandomString(length) {
        const chars = "!@#$%^&*()-+=<>?{}[]|.,;:'";
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    function ellipsisAnimation() {
        const ellipsisStates = ["", ".", "..", "..."];
        let currentStateIndex = 0;
        return setInterval(() => {
            roleTextElement.textContent = roles[currentRoleIndex] + ellipsisStates[currentStateIndex];
            currentStateIndex = (currentStateIndex + 1) % ellipsisStates.length;
        }, 400); // Adjust the speed of the ellipsis animation
    }

    let ellipsisInterval = ellipsisAnimation();

    setInterval(() => {
        clearInterval(ellipsisInterval);

        let glitchInterval = setInterval(() => {
            roleTextElement.textContent = getRandomString(roles[currentRoleIndex].length);
        }, 100); // Adjust the frequency of the glitch effect

        setTimeout(() => {
            clearInterval(glitchInterval);
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            roleTextElement.textContent = roles[currentRoleIndex];
            ellipsisInterval = ellipsisAnimation();
        }, 800); // Adjust the duration of the glitch effect
    }, 5000);
}

// Photo Gallery

const gallery = document.getElementById('gallery');
const viewer = new Viewer(gallery);