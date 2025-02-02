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
const newsData = [
    { title: "New Product Launch", date: "Feb 3, 2025", summary: "We are excited to launch our latest innovation..." },
    { title: "Award Recognition", date: "Jan 20, 2025", summary: "Our company received an industry-leading award..." },
    { title: "Office Expansion", date: "Jan 10, 2025", summary: "We have expanded our offices to a new location..." },
    { title: "Sustainability Efforts", date: "Dec 22, 2024", summary: "Our latest sustainability report highlights..." },
    { title: "Partnership Announcement", date: "Dec 10, 2024", summary: "We have partnered with a leading tech company..." }
];

const container = document.querySelector(".newsgrid");

newsData.forEach((news) => {
    const newsItem = `
<div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
<h3 class="text-xl font-semibold text-gray-900">${news.title}</h3>
<p class="text-sm text-gray-500">${news.date}</p>
<p class="mt-2 text-gray-700">${news.summary}</p>
<div class="mt-4 border-t border-gray-300 pt-2 text-right">
<a href="#" class="text-blue-600 hover:underline">Read more →</a>
</div>
</div>
    `;
    container.innerHTML += newsItem;
});


const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".pagination-dot");
let currentSlide = 0;

function changeSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("opacity-100", "translate-x-0", "z-10");
        slide.classList.add("opacity-0", "translate-x-full", "z-0");
    });

    slides[index].classList.remove("opacity-0", "translate-x-full");
    slides[index].classList.add("opacity-100", "translate-x-0", "z-10");

    animateContent(index);

    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove("active-dot"));

    // Add active class to the selected dot
    dots[index].classList.add("active-dot");

    currentSlide = index;
}

// Set initial active dot
dots[0].classList.add("active-dot");

// Event listener for dots
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => changeSlide(index));
});


function animateContent(index) {
    const elements = slides[index].querySelectorAll(".slide-small-heading, .slide-big-heading, .slide-paragraph, .slide-button");
    elements.forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        setTimeout(() => {
            el.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, i * 800);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => changeSlide(index));
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    changeSlide(currentSlide);
}, 7000);



const notices = ["Notice 1: Important update! ", "Notice 2: Scheduled maintenance at 2 PM ", "Notice 3: New feature release this week! "];
const wrapper = document.getElementById("notice-wrapper");
// Create duplicate notices for infinite effect
function createNotices() {
    notices.forEach(notice => { let span = document.createElement("span"); span.className = "inline-block px-6 text-lg font-semibold"; span.innerText = notice; wrapper.appendChild(span); });
    // Duplicate notices for seamless looping            
    notices.forEach(notice => { let span = document.createElement("span"); span.className = "inline-block px-6 text-lg font-semibold"; span.innerText = notice; wrapper.appendChild(span); });
} createNotices();
// Apply animation 
wrapper.style.display = "flex"; wrapper.style.animation = "marquee 10s linear infinite";
// Add CSS animation dynamically
const style = document.createElement("style"); style.innerHTML = ` @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } } `; document.head.appendChild(style);