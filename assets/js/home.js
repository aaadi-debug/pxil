function startCounters() {
    const counters = document.querySelectorAll(".counter");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute("data-target"));
                let count = 0;

                // Calculate speed dynamically based on target value
                let speed = Math.max(10, 1000 / target); // Faster increments for larger targets

                // Increment step calculation: smaller increments for larger targets
                let incrementStep = target / 100; // Increment by 1% of the target each time

                // Define a tolerance level to handle floating-point precision errors
                const tolerance = 0.01; // Small tolerance to allow counter to stop near target

                const updateCounter = () => {
                    if (count < target - tolerance) {
                        count += incrementStep; // Increment by smaller steps
                        counter.innerText = count.toFixed(2); // Display value with 2 decimals
                        setTimeout(updateCounter, speed);
                    } else {
                        // To avoid overshooting, ensure we set it to the exact target
                        counter.innerText = target.toFixed(2);
                    }
                };
                updateCounter();
                observer.unobserve(counter); // Stop observing once started
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

document.addEventListener("DOMContentLoaded", startCounters);


// function showTab(tabId) {
//     document.querySelectorAll('.tab-content').forEach(tab => {
//         tab.classList.add('hidden');
//     });
//     document.getElementById(tabId).classList.remove('hidden');
// }

function showTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.add("hidden");
        tab.classList.remove("fade-in");
    });

    // Remove active class from all buttons
    document.querySelectorAll("button").forEach(btn => {
        btn.classList.remove("active-tab");
    });

    // Show the selected tab content with animation
    const activeTab = document.getElementById(tabId);
    activeTab.classList.remove("hidden");
    setTimeout(() => {
        activeTab.classList.add("fade-in");
    }, 10);

    // Highlight active button
    document.getElementById(`btn-${tabId}`).classList.add("active-tab");
}