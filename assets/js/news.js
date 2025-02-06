/*----------------------------------------------------------
------------------NEWS Slider-------------------------------------
---------------------------------------------------------*/

let index = 0;
const slides = document.querySelectorAll("#carousel > div");
const totalSlides = slides.length;

function showSlide(i) {
  index = (i + totalSlides) % totalSlides;
  document.getElementById("carousel").style.transform = `translateX(-${
    index * 100
  }%)`;
}

function prevSlide() {
  showSlide(index - 1);
}

function nextSlide() {
  showSlide(index + 1);
}

function autoScroll() {
  nextSlide();
}

setInterval(autoScroll, 2000); // Auto scroll every 2 seconds

/*----------------------------------------------------------
------------------NEWS-------------------------------------
---------------------------------------------------------*/
  // Sample data for news articles
  const newsData = [
    { headline: "New Update on Tailwind CSS", date: "2025-02-07", downloadLink: "#", year: 2025 },
    { headline: "JavaScript Updates: What's New?", date: "2025-02-06", downloadLink: "#", year: 2025 },
    { headline: "CSS Grid: Best Practices", date: "2024-12-15", downloadLink: "#", year: 2024 },
    { headline: "HTML5 Semantic Tags", date: "2023-08-25", downloadLink: "#", year: 2023 },
    { headline: "Understanding Flexbox", date: "2023-05-10", downloadLink: "#", year: 2023 },
    { headline: "React.js Best Practices", date: "2025-02-03", downloadLink: "#", year: 2025 },
    { headline: "Vue.js vs React", date: "2025-01-15", downloadLink: "#", year: 2025 },
    { headline: "Learning Angular: A Complete Guide", date: "2024-11-30", downloadLink: "#", year: 2024 },
    { headline: "Intro to Webpack and Babel", date: "2024-11-10", downloadLink: "#", year: 2024 },
    { headline: "GraphQL API: Benefits and Use Cases", date: "2023-09-18", downloadLink: "#", year: 2023 },
    // More entries...
];

let currentPage = 0; // Track current page for "Load More"
const itemsPerPage = 5; // Number of news entries to show per load

// Function to render news data dynamically
function renderNews(filteredNews = newsData) {
    const newsTableBody = document.getElementById('news-table-body');
    newsTableBody.innerHTML = ''; // Clear any existing rows

    // Pagination logic to show entries based on the current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToRender = filteredNews.slice(startIndex, endIndex);

    itemsToRender.forEach((news) => {
        const row = document.createElement('tr');
        row.classList.add('border-b', 'table-row');
        row.innerHTML = `
            <td class="px-6 py-4">${news.headline}</td>
            <td class="px-6 py-4">${news.date}</td>
            <td class="px-6 py-4">
                <a href="${news.downloadLink}" class="text-blue-600 hover:text-yellow-500">Download</a>
            </td>
        `;
        newsTableBody.appendChild(row);
    });

    // Update page info
    const pageInfo = document.getElementById('pageInfo');
    pageInfo.textContent = `Showing ${startIndex + 1} to ${Math.min(endIndex, filteredNews.length)} of ${filteredNews.length} entries`;
}

// Function to filter news based on the year input
function filterNews() {
    const searchYear = document.getElementById('yearSearch').value;
    const filteredNews = newsData.filter(news => {
        return news.year.toString().includes(searchYear);
    });

    currentPage = 0; // Reset to the first page when search input changes
    renderNews(filteredNews);
}

// Function to load more news entries
function loadMoreNews() {
    currentPage++; // Increase the current page to load the next set of entries
    const searchYear = document.getElementById('yearSearch').value;
    let filteredNews = newsData;

    // Apply filtering if search input exists
    if (searchYear) {
        filteredNews = newsData.filter(news => news.year.toString().includes(searchYear));
    }

    // If there are no more entries to load, show the modal
    if (currentPage * itemsPerPage >= filteredNews.length) {
        showModal();
    } else {
        renderNews(filteredNews); // Render the next set of entries
    }
}

// Sort news by latest date (default)
newsData.sort((a, b) => new Date(b.date) - new Date(a.date));

// Initial render
renderNews();

// Show modal function
function showModal() {
    const modal = document.getElementById('noMoreDataModal');
    modal.style.display = "block";
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('noMoreDataModal');
    modal.style.display = "none";
}