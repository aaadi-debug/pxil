//number counter
function startCounters() {
  const counters = document.querySelectorAll(".counter");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
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
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

//switch tabs
function switchTab(sectionId, tabId) {
  // Hide all tab contents within the specific section
  document.querySelectorAll(`#${sectionId} .tab-content`).forEach((tab) => {
    tab.classList.add("hidden");
    tab.classList.remove("fade-in");
  });

  // Remove active styles from all buttons in the section
  document.querySelectorAll(`#${sectionId} button`).forEach((btn) => {
    btn.classList.remove("bg-primary", "text-white", "shadow-md", "active-tab");
    btn.classList.add("border-primary", "text-primary");
  });

  // Show the selected tab content with animation
  const activeTab = document.querySelector(`#${sectionId} #${tabId}`);
  if (activeTab) {
    activeTab.classList.remove("hidden");
    setTimeout(() => {
      activeTab.classList.add("fade-in");
    }, 10);
  }

  // Highlight the active button
  const activeButton = document.querySelector(`#${sectionId} #btn-${tabId}`);
  if (activeButton) {
    activeButton.classList.add("bg-primary", "text-white", "shadow-md", "active-tab");
    activeButton.classList.remove("border-primary", "text-primary");
  }
}

// Automatically open the first tab of each section on page load
document.addEventListener("DOMContentLoaded", () => {
  startCounters();
  switchTab("section1", "DAS");  // Default first tab for first section
  switchTab("section2", "idas"); // Default first tab for second section
});





const newsData = [
  {
    title: "New Product Launch",
    date: "Feb 3, 2025",
    summary: "We are excited to launch our latest innovation. At PXIL, We are excited to launch our latest innovation.",
  },
  {
    title: "Award Recognition",
    date: "Jan 20, 2025",
    summary: "Our company received an industry-leading award.",
  },
  {
    title: "Office Expansion",
    date: "Jan 10, 2025",
    summary: "We have expanded our offices to a new location.",
  },
  {
    title: "Sustainability Efforts",
    date: "Dec 22, 2024",
    summary: "Our latest sustainability report highlights. At PXIL,  Our latest sustainability report highlights",
  },
  {
    title: "Partnership Announcement",
    date: "Dec 10, 2024",
    summary: "We have partnered with a leading tech company. At PXil, We have partnered with a leading tech company.",
  },
];

const container = document.querySelector(".newsgrid");

newsData.forEach((news) => {
  const newsItem = `
    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <h3 class="text-xl font-semibold text-gray-900">${news.title}</h3>
      <p class="mt-2 text-textClr twoLinerText">${news.summary}</p>
      <div class="mt-4 border-t border-gray-300 pt-2 text-right">
        <div class="flex justify-between items-center">
          <p class="text-sm text-gray-500">${news.date}</p>
          <a href="#" class="text-primary hover:text-secondary font-semibold">Read more →</a>
        </div>
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
  dots.forEach((dot) => dot.classList.remove("active-dot"));

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
  const elements = slides[index].querySelectorAll(
    ".slide-small-heading, .slide-big-heading, .slide-paragraph, .slide-button"
  );
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

const notices = [
  "Notice 1: Important update! ",
  "Notice 2: Scheduled maintenance at 2 PM ",
  "Notice 3: New feature release this week! ",
];
const wrapper = document.getElementById("notice-wrapper");
// Create duplicate notices for infinite effect
function createNotices() {
  notices.forEach((notice) => {
    let span = document.createElement("span");
    span.className = "inline-block px-6 text-lg font-semibold";
    span.innerText = notice;
    wrapper.appendChild(span);
  });
  // Duplicate notices for seamless looping
  notices.forEach((notice) => {
    let span = document.createElement("span");
    span.className = "inline-block px-6 text-lg font-semibold";
    span.innerText = notice;
    wrapper.appendChild(span);
  });
}
createNotices();
// Apply animation
wrapper.style.display = "flex";
wrapper.style.animation = "marquee 10s linear infinite";
// Add CSS animation dynamically
const style = document.createElement("style");
style.innerHTML = ` @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } } `;
document.head.appendChild(style);


//     </script>
// let index = 0;

// const logoLeft = document.getElementById("logo-left");
// const logoActive = document.getElementById("active-logo");
// const logoRight = document.getElementById("logo-right");
// const name = document.getElementById("partner-name");
// const desc = document.getElementById("partner-desc");
// const partnerdot = document.querySelectorAll(".partnerdot");

// function updatePartner() {
//     const leftIndex = (index - 1 + partners.length) % partners.length;
//     const rightIndex = (index + 1) % partners.length;

//     logoLeft.src = partners[leftIndex].logo;
//     logoActive.src = partners[index].logo;
//     logoRight.src = partners[rightIndex].logo;
//     name.innerText = partners[index].name;
//     desc.innerText = partners[index].desc;
//     partnerdot.forEach((dot, i) => dot.classList.toggle("bg-blue-500", i === index));
// }

// document.getElementById("prev").addEventListener("click", () => {
//     index = (index - 1 + partners.length) % partners.length;
//     updatePartner();
// });
// document.getElementById("next").addEventListener("click", () => {
//     index = (index + 1) % partners.length;
//     updatePartner();
// });

// updatePartner();


// var swiper = new Swiper('.swiper-container', {
//     loop: true,
//     autoplay: {
//         delay: 3000,
//         disableOnInteraction: false,
//     },
//     effect: 'fade',
// });
var swiper = new Swiper('.swiper-container', {
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  effect: 'slide',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});










// ----------------- modal--------------------
// Function to show modal and play video
function showModal() {
  const modal = document.getElementById('aboutusVideoModal');
  const videoPlayer = document.getElementById('videoPlayer');
  const videoSource = document.getElementById('videoSource');

  // Set the video file (Replace with your actual file path)
  videoSource.src = "../assets/videos/video1.mp4";  // Example: stored inside "videos" folder
  videoPlayer.load(); // Load the new source
  videoPlayer.play(); // Auto-play when modal opens

  modal.style.display = "flex";
}

// Function to close modal and stop video
function closeModal() {
  const modal = document.getElementById('aboutusVideoModal');
  const videoPlayer = document.getElementById('videoPlayer');

  modal.style.display = "none";
  videoPlayer.pause(); // Pause video when closing
  videoPlayer.currentTime = 0; // Reset video to start
}




let currentIndex = 0;
const eventsSlides = document.querySelectorAll('.events-slide');
const totalSlides = eventsSlides.length;

// Move slide function
function moveSlide(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  } else if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }

  updateSlider();
}

// Update slide position
function updateSlider() {
  const slider = document.querySelector('.events-slider');
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}







const documents = [
  { name: "Policy Guidelines", date: "2025-02-09", url: "#" },
  { name: "Annual Report", date: "2025-01-15", url: "#" }
];

const circulars = [

  { name: "Circular 001", date: "2025-02-01", url: "#" }, 

  { name: "Notice Update", date: "2025-01-25", url: "#" }

];

function populateTable(data, tableId) {

  const table = document.getElementById(tableId);

  if (data.length === 0) {
    table.innerHTML = `
      <tr>
        <td class="p-3 text-center text-gray-500" colspan="3">No results found</td>
      </tr>
    `;
    return;
  }

  table.innerHTML = data.map(d => `
    <tr class="border-b hover:bg-gray-100">
      <td class="p-3">${d.name}</td>
      <td class="p-3">${d.date}</td>
      <td class="p-3 text-center">
        <a href="${d.url}" class="px-3 py-1 rounded-full text-xs shadow bg-primary text-white border-2 border-primary hover:bg-white hover:text-primary transition duration-300">Download</a>
      </td>
    </tr>
  `).join('');

}

function searchDocs() {

  const query = document.getElementById("docSearch").value.toLowerCase();

  const filtered = documents.filter(d => d.name.toLowerCase().includes(query));

  populateTable(filtered, "docTable");

}

function searchCirculars() {

  const query = document.getElementById("circSearch").value.toLowerCase();

  const filtered = circulars.filter(c => c.name.toLowerCase().includes(query));

  populateTable(filtered, "circTable");

}

populateTable(documents, "docTable");

populateTable(circulars, "circTable");