// Function to detect base path dynamically
function getBasePath() {
    let path = window.location.pathname;
    let depth = path.split("/").length - 2; // Adjust based on folder structure
    return depth > 0 ? "../".repeat(depth) : "./";
}

// Function to load HTML components dynamically
function loadComponent(componentId, filePath, callback) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(componentId).innerHTML = data;
            if (callback) callback(); // Run callback after loading
        })
        .catch(error => console.error("Error loading component:", error));
}

// Function to highlight the active navbar link
function highlightActiveNav() {
    let navLinks = document.querySelectorAll(".navbar-links a");
    // console.log("🔍 Found nav links:", navLinks.length);

    if (navLinks.length === 0) {
        console.error("❌ No navigation links found! Check if navbar loaded properly.");
        return;
    }

    let currentPage = window.location.pathname.replace(/\/$/, ""); // Remove trailing slash
    // console.log("🌐 Current Page:", currentPage);

    navLinks.forEach(link => {
        let linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, "");
        // console.log("🔗 Checking Link:", linkPath, "vs", currentPage);

        if (linkPath === currentPage || (linkPath === "/" && currentPage === "")) {
            link.classList.add("active");
            // console.log("✅ Active class added to:", linkPath);
        }
    });
}

// Function to handle navbar scroll animation
function handleNavbarScroll() {
    let lastScrollTop = 0;
    const navbar = document.getElementById("navbarScroll");

    if (!navbar) {
        console.error("❌ Navbar element not found!");
        return;
    }
    // console.log("Navbar element found!");

    navbar.classList.add("transition-all", "duration-500"); // Add smooth animation


    window.addEventListener("scroll", () => {
        let scrollTop = window.scrollY;

        if (scrollTop > lastScrollTop) {
            navbar.classList.add("-top-10");
            navbar.classList.remove("top-0");
        } else {
            navbar.classList.add("top-0");
            navbar.classList.remove("-top-10");
        }

        lastScrollTop = scrollTop;
    });
}


// Load Navbar and Footer
document.addEventListener("DOMContentLoaded", function () {
    let basePath = getBasePath();
    // loadComponent("navbar", basePath + "./components/navbar.html");
    loadComponent("navbar", basePath + "./components/navbar.html", function () {
        // console.log("✅ Navbar loaded. Running highlight script.");
        highlightActiveNav(); // Run function AFTER navbar loads
        handleNavbarScroll(); // Attach scroll event only after navbar exists
    });
    loadComponent("footer", basePath + "./components/footer.html");
});
