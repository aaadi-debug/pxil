let count = 0;
let maxCount = 100; // Set max count
let speed = 20; // Adjust speed (lower = faster)
let started = false; // To ensure it starts only once

function startCounter() {
    if (started) return; // Prevent multiple triggers
    started = true;
    let interval = setInterval(() => {
        if (count < maxCount) {
            count++;
            document.getElementById("counter").innerText = count;
        } else {
            clearInterval(interval);
        }
    }, speed);
}

// Detect when the counter section is in view
let observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        startCounter();
    }
}, { threshold: 0.5 }); // Trigger when 50% visible

observer.observe(document.getElementById("counter-section"));