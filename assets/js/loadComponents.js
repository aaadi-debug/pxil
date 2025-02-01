// Function to detect base path dynamically
function getBasePath() {
    let path = window.location.pathname;
    let depth = path.split("/").length - 2; // Adjust based on folder structure
    return depth > 0 ? "../".repeat(depth) : "./";
}

// Function to load HTML components dynamically
function loadComponent(componentId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(componentId).innerHTML = data;
        })
        .catch(error => console.error("Error loading component:", error));
}

// Load Navbar and Footer
document.addEventListener("DOMContentLoaded", function () {
    let basePath = getBasePath();
    loadComponent("navbar", basePath + "./components/navbar.html");
    loadComponent("footer", basePath + "./components/footer.html");
});
