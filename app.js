// Imports removed for local file support
// import { videos, googleSheetUrl } from './video-data.js';
// import { init3DBackground } from './fish-background.js';

const videoGrid = document.getElementById('video-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

let allVideos = [];

// Initialize
// Initialize
init();

// Scroll Effect for Logo
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});

async function init() {
    initCyberpunkCity();

    if (googleSheetUrl && googleSheetUrl.length > 0) {
        try {
            const data = await fetchGoogleSheet(googleSheetUrl);
            allVideos = data;
        } catch (error) {
            console.error("Failed to load Google Sheet:", error);
            allVideos = videos;
        }
    } else {
        allVideos = videos;
    }

    // Initial Render
    renderVideos('all');
}

async function fetchGoogleSheet(url) {
    const response = await fetch(url);
    const csvText = await response.text();
    return parseCSV(csvText);
}

function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const result = [];
    // Normalize headers: lowercase and remove 'js ' prefix if present
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace('js ', ''));

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const obj = {};
        // Handle CSV split respecting quotes
        const currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

        headers.forEach((header, index) => {
            let val = currentline[index] ? currentline[index].trim() : '';
            // Remove quotes if present
            if (val.startsWith('"') && val.endsWith('"')) {
                val = val.substring(1, val.length - 1);
            }
            obj[header] = val;
        });

        // Push if we have a valid ID
        if (obj.id) result.push(obj);
    }
    return result;
}

// Filter Event Listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        renderVideos(filter);
    });
});

function renderVideos(filter) {
    videoGrid.innerHTML = '';

    // Safety check
    if (!allVideos) allVideos = videos;

    const filteredVideos = filter === 'all'
        ? allVideos
        : allVideos.filter(video => video.category.toLowerCase() === filter.toLowerCase());

    if (filteredVideos.length === 0) {
        videoGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No videos found in this category.</p>';
        return;
    }

    filteredVideos.forEach(video => {
        const card = document.createElement('div');
        card.classList.add('video-card');

        // Handle potentially missing thumbnail
        const thumb = video.thumbnail || `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;

        // Storing video ID and Type
        card.innerHTML = `
            <div onclick="openModal('${video.id}', '${video.type}')">
                <div class="thumbnail-container">
                    <img src="${thumb}" alt="${video.title}">
                    <div class="play-icon">▶</div>
                </div>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <p>${video.category}</p>
                </div>
            </div>
        `;

        videoGrid.appendChild(card);
    });
}

// Modal Logic
const modal = document.getElementById("video-modal");
const videoFrame = document.getElementById("video-frame");
const closeBtn = document.querySelector(".close-btn");

// Make openModal available globally
window.openModal = function (videoId, type) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling

    if (type === 'youtube') {
        videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&origin=${window.location.origin}`;
    } else if (type === 'drive') {
        // Google Drive Preview URL
        videoFrame.src = `https://drive.google.com/file/d/${videoId}/preview?autoplay=1`;
    }
}

// Close Modal Function
function closeModal() {
    modal.style.display = "none";
    videoFrame.src = ""; // Stop video
    document.body.style.overflow = "auto"; // Restore scrolling
}

// Event Listeners for Closing
closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});
