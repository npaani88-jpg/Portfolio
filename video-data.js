// ==========================================
// OPTION 1: Google Sheets (Easiest)
// Paste your "Published to Web" CSV link here:
const googleSheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMpSKMOAn8lGuZNd57Xmjbv6GQ5qVUcqkhINNXQdLJ0OmENb-2qwhMbKEWlFoF_8u3WLleeiPq_cZX/pub?output=csv";

// ==========================================
// OPTION 2: Manual (Fallback)
// If the above URL is empty, the site handles these videos:
const videos = [
    {
        id: "FVwoc4zCPMo",
        title: "18 Carat Gold",
        category: "Reels",
        thumbnail: "https://img.youtube.com/vi/FVwoc4zCPMo/maxresdefault.jpg",
        type: "youtube"
    },

    // Add more videos here manually if Google Sheets doesn't work locally!
];
