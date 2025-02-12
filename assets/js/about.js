let currentStep = 1;
let stepInterval;

function showNextStep() {
    const line = document.getElementById("timeline-line");
    if (line) {
        line.style.width = `${currentStep * 10}%`;
        currentStep++;
        if (currentStep > 10) clearInterval(stepInterval);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    stepInterval = setInterval(showNextStep, 2000);
    showNextStep();

    new Swiper(".mySwiper", {
        loop: true,
        autoplay: { delay: 2000, disableOnInteraction: false },
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
    });

    new Swiper(".cardSwiper", {
        loop: true,
        autoplay: { delay: 2000, disableOnInteraction: false },
    });
});

// let modalSwiper;
// function openModal() {
//     document.getElementById("imageModal").classList.remove("hidden");
//     if (!modalSwiper) {
//         modalSwiper = new Swiper(".modalSwiper", {
//             loop: true,
//             navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
//         });
//     }
// }

// function closeModal() {
//     document.getElementById("imageModal").classList.add("hidden");
// }

// let zoomLevel = 1;
// function zoomIn() {
//     let activeImg = document.querySelector(".modalSwiper .swiper-slide-active img");
//     if (activeImg) {
//         zoomLevel += 0.2;
//         activeImg.style.transform = `scale(${zoomLevel})`;
//     }
// }

// function zoomOut() {
//     let activeImg = document.querySelector(".modalSwiper .swiper-slide-active img");
//     if (activeImg && zoomLevel > 1) {
//         zoomLevel -= 0.2;
//         activeImg.style.transform = `scale(${zoomLevel})`;
//     }
// }
document.addEventListener("DOMContentLoaded", function () {
  const festivals = [
      {
          name: "Diwali",
          desc: "Festival of Lights and Prosperity.",
          images: [
              "https://via.placeholder.com/300/FFD700/000000?text=Diwali1",
              "https://via.placeholder.com/300/FFA500/000000?text=Diwali2",
              "https://via.placeholder.com/300/FF4500/000000?text=Diwali3"
          ]
      },
      {
          name: "Holi",
          desc: "Festival of Colors and Joy.",
          images: [
              "https://bsmedia.business-standard.com/_media/bs/img/article/2024-03/19/full/1710841861-1573.png",
              "https://img.freepik.com/free-vector/abstract-happy-holi-colorful-festival-background-design_1055-4157.jpg",
              "https://via.placeholder.com/300/0000FF/000000?text=Holi3"
          ]
      },
      {
          name: "Eid",
          desc: "Festival of Brotherhood and Devotion.",
          images: [
              "https://via.placeholder.com/300/008000/000000?text=Eid1",
              "https://via.placeholder.com/300/00FFFF/000000?text=Eid2",
              "https://via.placeholder.com/300/008B8B/000000?text=Eid3"
          ]
      },
      {
          name: "Christmas",
          desc: "Celebration of Love and Giving.",
          images: [
              "https://via.placeholder.com/300/FF0000/FFFFFF?text=Christmas1",
              "https://via.placeholder.com/300/008000/FFFFFF?text=Christmas2",
              "https://via.placeholder.com/300/FFFFFF/FF0000?text=Christmas3"
          ]
      },
      {
          name: "Navratri",
          desc: "Nine Nights of Worship and Dance.",
          images: [
              "https://via.placeholder.com/300/800080/FFFFFF?text=Navratri1",
              "https://via.placeholder.com/300/FFD700/000000?text=Navratri2",
              "https://via.placeholder.com/300/FF4500/000000?text=Navratri3"
          ]
      },
      {
          name: "Durga Puja",
          desc: "Festival Honoring Goddess Durga.",
          images: [
              "https://via.placeholder.com/300/8B0000/FFFFFF?text=DurgaPuja1",
              "https://via.placeholder.com/300/FFA500/FFFFFF?text=DurgaPuja2",
              "https://via.placeholder.com/300/FFD700/000000?text=DurgaPuja3"
          ]
      }
  ];

  const container = document.querySelector(".festival-container");

  // Generate Cards
  festivals.forEach((festival, index) => {
      let imagesHTML = festival.images.map(img => `<div class="swiper-slide"><img src="${img}" class="w-[400px] h-[400px]" /></div>`).join("");

      let cardHTML = `
      <div class="max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          <div class="relative">
              <div class="swiper cardSwiper-${index}">
                  <div class="swiper-wrapper w-[400px] h-[400px]">${imagesHTML}</div>
              </div>
              <button class="absolute top-2 right-2 bg-gray-700 text-white p-2 z-20 rounded-full" onclick="openModal(${index})">
                  <i class="fa-solid fa-magnifying-glass"></i>
              </button>
          </div>
          <div class="p-4">
              <h2 class="text-xl font-semibold">${festival.name}</h2>
              <p class="text-gray-600">${festival.desc}</p>
          </div>
      </div>

      <!-- Modal for Zoom -->
      <div id="imageModal-${index}" class="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center hidden">
          <div class="bg-white p-4 rounded-lg relative max-w-xl w-full">
              <div class="swiper modalSwiper-${index}">
                  <div class="swiper-wrapper">${imagesHTML}</div>
              </div>
              <div class="flex justify-between mt-4">
                  <button class="bg-gray-700 text-white px-4 py-2 rounded" onclick="zoomIn(${index})">+</button>
                  <button class="bg-red-500 text-white px-4 py-2 rounded" onclick="closeModal(${index})">Close</button>
                  <button class="bg-gray-700 text-white px-4 py-2 rounded" onclick="zoomOut(${index})">-</button>
              </div>
          </div>
      </div>
      `;

      container.innerHTML += cardHTML;
  });

  // Initialize Swipers
  festivals.forEach((festival, index) => {
      new Swiper(`.cardSwiper-${index}`, {
          loop: true,
          autoplay: { delay: 2000, disableOnInteraction: false },
      });

      new Swiper(`.modalSwiper-${index}`, {
          loop: true,
      });
  });
});

// Modal Functions
function openModal(index) {
  document.getElementById(`imageModal-${index}`).classList.remove("hidden");
}

function closeModal(index) {
  document.getElementById(`imageModal-${index}`).classList.add("hidden");
}

// Zoom Functions
let zoomLevels = Array(6).fill(1);
function zoomIn(index) {
  let img = document.querySelector(`.modalSwiper-${index} .swiper-slide-active img`);
  if (img) {
      zoomLevels[index] += 0.2;
      img.style.transform = `scale(${zoomLevels[index]})`;
  }
}

function zoomOut(index) {
  let img = document.querySelector(`.modalSwiper-${index} .swiper-slide-active img`);
  if (img && zoomLevels[index] > 1) {
      zoomLevels[index] -= 0.2;
      img.style.transform = `scale(${zoomLevels[index]})`;
  }
}
