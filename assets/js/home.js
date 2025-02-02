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

        const newsData = [
            { title: "New Product Launch", date: "Feb 3, 2025", summary: "We are excited to launch our latest innovation..." },
            { title: "Award Recognition", date: "Jan 20, 2025", summary: "Our company received an industry-leading award..." },
            { title: "Office Expansion", date: "Jan 10, 2025", summary: "We have expanded our offices to a new location..." },
            { title: "Sustainability Efforts", date: "Dec 22, 2024", summary: "Our latest sustainability report highlights..." },
            { title: "Partnership Announcement", date: "Dec 10, 2024", summary: "We have partnered with a leading tech company..." }
        ];
 
        const container = document.querySelector(".grid");
 
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
