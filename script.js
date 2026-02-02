// DOM Elements
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const success = document.getElementById("success");
const buttonContainer = document.getElementById("buttonContainer");
const heartsContainer = document.getElementById("heartsContainer");
const hintText = document.querySelector(".hint-text");
const confettiContainer = document.getElementById("confettiContainer");

// Playful hint messages when trying to click No
const hints = [
    "Hehe, nice try! 😏",
    "You can't escape my love! 💕",
    "That button is feeling shy...",
    "Are you sure about that? 🥺",
    "The button says 'nope!' 😆",
    "Come on, you know you want to! ❤️",
    "I'll wait... forever if I have to 😌",
    "That's not how this works! 🙃",
    "Button.exe has stopped working 💔",
    "Just say yes already! 🥰"
];

let hintIndex = 0;
let noButtonEscapes = 0;

// Heart emojis for floating effect
const heartEmojis = ['💖', '💕', '💗', '💘', '💝', '💓', '💞', '❤️', '🩷', '💜',
    '🥰', '😍', '😘', '🤟', '🫶', '😻', '😽', '💏', '💑', '🏩', '💌', '💘', '💖', '💗', '💓', '💞', '💕', '🧡', '❤️',
    '🎀', '💌', '🩰', '🌸', '🧸', '🥰', '💖', '🍓', '🍓', '✨', '☁️', '🧸', '☕', '🩰', '🦢',
    '💋', '💕', '😉', '✨', '😍', '🐶', '🐱', '🐰', '🐹', '🐻', '🐨', '🦊', '🦋', '🌸', '🌼', '🌺', '🦢', '🐾'
];

// Create floating hearts continuously
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 16) + 'px';
    heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heartsContainer.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 15000);
}

// Start creating hearts
setInterval(createFloatingHeart, 800);

// Create initial batch of hearts
for (let i = 0; i < 8; i++) {
    setTimeout(createFloatingHeart, i * 200);
}

// Move the No button away
function moveNoButton() {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate maximum positions within the entire container
    const maxX = container.clientWidth - noBtn.offsetWidth - 100; // 100px padding from edges
    const maxY = container.clientHeight - noBtn.offsetHeight - 100;

    // Random position anywhere in the container
    let newX = Math.random() * maxX + 50; // 50px minimum from left
    let newY = Math.random() * maxY + 50; // 50px minimum from top

    // Make it more unpredictable - sometimes jump far away
    if (Math.random() > 0.5) {
        newX = Math.random() > 0.5 ? maxX * 0.9 : maxX * 0.1;
        newY = Math.random() > 0.5 ? maxY * 0.9 : maxY * 0.1;
    }

    // Position relative to container, not button container
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${containerRect.left + newX}px`;
    noBtn.style.top = `${containerRect.top + newY}px`;
    noBtn.style.transform = 'none';

    // Show hint
    noButtonEscapes++;
    hintText.textContent = hints[hintIndex % hints.length];
    hintText.style.animation = 'none';
    hintText.offsetHeight; // Trigger reflow
    hintText.style.animation = 'fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    hintIndex++;

    // Make the Yes button grow slightly each time
    const currentScale = 1 + (noButtonEscapes * 0.03);
    yesBtn.style.transform = `scale(${Math.min(currentScale, 1.3)})`;

    // Add shake effect to No button
    noBtn.style.animation = 'shake 0.3s ease';
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 300);
}

// Add shake animation dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) rotate(0); }
        25% { transform: translateX(-5px) rotate(-5deg); }
        75% { transform: translateX(5px) rotate(5deg); }
    }
`;
document.head.appendChild(shakeStyle);

// Desktop hover
noBtn.addEventListener("mouseover", moveNoButton);

// Mobile touch
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
});

// Create confetti
function createConfetti() {
    const colors = ['#ff4d6d', '#ff758f', '#2ecc71', '#f39c12', '#9b59b6', '#3498db', '#e74c3c', '#1abc9c'];
    const shapes = ['❤️', '💕', '✨', '🎉', '💖', '🌟', '💗'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            // Randomly choose between shape emoji or colored square
            if (Math.random() > 0.5) {
                confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.style.fontSize = (Math.random() * 15 + 10) + 'px';
            } else {
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            }

            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';

            confettiContainer.appendChild(confetti);

            // Remove after animation
            setTimeout(() => confetti.remove(), 4000);
        }, i * 50);
    }
}

// Create burst of hearts
function createHeartBurst() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 25 + 20) + 'px';
            heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
            heartsContainer.appendChild(heart);

            setTimeout(() => heart.remove(), 8000);
        }, i * 100);
    }
}

// Prevent No button from being clicked
noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Add a fun shake animation
    noBtn.style.animation = 'shake 0.3s ease';
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 300);

    // Show a random hint
    hintText.textContent = hints[Math.floor(Math.random() * hints.length)];
    hintText.style.animation = 'none';
    hintText.offsetHeight; // Trigger reflow
    hintText.style.animation = 'fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
});

// Success handler
yesBtn.addEventListener("click", () => {
    const contentWrapper = document.querySelector('.content-wrapper');

    // Hide entire content wrapper with animation
    contentWrapper.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    contentWrapper.style.opacity = '0';
    contentWrapper.style.transform = 'scale(0.9)';

    setTimeout(() => {
        contentWrapper.style.display = "none";
        success.classList.remove("hidden");

        // Create celebrations
        createConfetti();
        createHeartBurst();

        // Change background to more celebratory
        document.body.style.transition = 'background 1s ease';
        document.body.style.background = 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 25%, #ffb6c1 50%, #ff9a8b 75%, #ff758c 100%)';
        document.body.style.backgroundSize = '400% 400%';
    }, 600);
});

// Add subtle parallax effect to container
document.addEventListener('mousemove', (e) => {
    const container = document.querySelector('.container');
    const xAxis = (window.innerWidth / 2 - e.pageX) / 80;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 80;

    container.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    container.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Reset transform on mouse leave
document.addEventListener('mouseleave', () => {
    const container = document.querySelector('.container');
    container.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    container.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
});

// Add touch support for parallax
let isTouching = false;
document.addEventListener('touchstart', () => isTouching = true);
document.addEventListener('touchend', () => {
    isTouching = false;
    const container = document.querySelector('.container');
    container.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    container.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
});

document.addEventListener('touchmove', (e) => {
    if (!isTouching) return;
    const touch = e.touches[0];
    const container = document.querySelector('.container');
    const xAxis = (window.innerWidth / 2 - touch.pageX) / 100;
    const yAxis = (window.innerHeight / 2 - touch.pageY) / 100;

    container.style.transition = 'transform 0.1s ease-out';
    container.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

console.log('💕 Code by Vivek with love 💕');