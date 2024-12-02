function toggleNav() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active');
}

    document.addEventListener('mousemove', function(event) {
        const reviewsContainer = document.querySelector('.reviews-container');
        
        // Get the mouse position relative to the window
        const mouseX = event.clientX / window.innerWidth;
        const mouseY = event.clientY / window.innerHeight;
        
        // Calculate the amount to move the container based on mouse position
        const moveX = (mouseX - 0.5) * 100; // 100px shift to the left or right
        const moveY = (mouseY - 0.5) * 50;  // 50px shift up or down

        // Apply the calculated movement to the reviews container
        reviewsContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

document.addEventListener("DOMContentLoaded", function () {
    const upGoingElements = document.querySelectorAll('.hba-row.up-going');
    const downGoingElements = document.querySelectorAll('.hba-row.down-going');

    upGoingElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animated');
        }, index * 100); // Stagger the animations
    });

    downGoingElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animated');
        }, index * 100); // Stagger the animations
    });
});

const carouselTrack = document.querySelector('.carousel-track');
let isMouseDown = false;  // To track if mouse is pressed
let startX;  // Mouse position when drag starts
let scrollLeft;  // Scroll position at the start of the drag
let autoScrollInterval;  // To store the interval for automatic scrolling

// Clone the carousel items to create the infinite scroll effect
function duplicateItems() {
    const items = document.querySelectorAll('.review-item');
    const itemArray = Array.from(items);
    itemArray.forEach(item => {
        const clone = item.cloneNode(true); // Clone each review item
        carouselTrack.appendChild(clone); // Append the clone to the track
    });
}

// Mouse down event: Start tracking the drag
carouselTrack.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - carouselTrack.offsetLeft;  // Get starting mouse position
    scrollLeft = carouselTrack.scrollLeft;  // Get current scroll position
    carouselTrack.style.cursor = 'grabbing';  // Change cursor style to grabbing
    clearInterval(autoScrollInterval);  // Stop auto-scrolling when dragging starts
});

// Mouse leave or mouse up: Stop tracking the drag
carouselTrack.addEventListener('mouseleave', () => {
    isMouseDown = false;
    carouselTrack.style.cursor = 'grab';  // Reset cursor to grab
    startAutoScrolling();  // Restart auto-scrolling when the mouse leaves
});

// Mouse move event: Scroll the carousel
carouselTrack.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;  // Only scroll if the mouse is pressed

    const x = e.pageX - carouselTrack.offsetLeft;  // Get current mouse position
    const walk = (x - startX) * 2;  // Calculate how much to scroll (2 is speed factor)
    carouselTrack.scrollLeft = scrollLeft - walk;  // Scroll horizontally
});

// Mouse up event: Stop dragging
carouselTrack.addEventListener('mouseup', () => {
    isMouseDown = false;
    carouselTrack.style.cursor = 'grab';  // Reset cursor to grab
    startAutoScrolling();  // Restart auto-scrolling after the drag stops
});

// Automatic scrolling function for infinite scroll
function autoScroll() {
    // Check if the carousel is at the end of the first batch of items
    if (carouselTrack.scrollLeft >= carouselTrack.scrollWidth / 2) {
        carouselTrack.scrollLeft = 0;  // Reset to the beginning
    } else {
        carouselTrack.scrollLeft += 1;  // Move 1px to the right (speed can be adjusted)
    }
}

// Start automatic scrolling
function startAutoScrolling() {
    autoScrollInterval = setInterval(autoScroll, 10);  // Auto-scroll every 10ms (adjust for speed)
}

// Initialize infinite scroll by duplicating the items and starting auto-scrolling
duplicateItems();
startAutoScrolling();
