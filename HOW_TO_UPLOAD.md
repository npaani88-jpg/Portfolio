# How to Upload Videos 🎥

Your portfolio is connected to a **Google Sheet**. To add new videos, you don't need to touch the code! Just add a row to your spreadsheet.

## 🔒 Privacy Setting (IMPORTANT)
*   **YouTube**: Set visibility to **Unlisted**.
*   **Google Drive**: Set sharing to **"Anyone with the link"** (Viewer).

## ❓ What is the 'ID'?
The **ID** is the unique code for your video.

**YouTube Example:**
Link: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
**ID**: `dQw4w9WgXcQ`

**Google Drive Example:**
Link: `https://drive.google.com/file/d/1a2b3c4d5eFgHiJk/view?usp=sharing`
**ID**: `1a2b3c4d5eFgHiJk`

---

## 📝 Column by Column Guide

Here is exactly what to put in each column of your Google Sheet:

### 1. `id` (The Code)
*    **YouTube**: The code after `v=`
*   **Google Drive**: The long code between `/d/` and `/view`.

### 2. `title`
The name of your video (e.g., "My Project").

### 3. `category`
The filter button name (e.g., `Reel`, `Vlog`).

### 4. `type`
*   Type **`youtube`** for YouTube videos.
*   Type **`drive`** for Google Drive videos.

---

## 🚀 How to Publish (The Tricky Part)

You need to turn your sheet into a public CSV file for the website to read it.

1.  **File > Share > Publish to web**.
2.  Change "Web page" to **Comma-separated values (.csv)**.
3.  Click **Publish**.
4.  Copy the link it gives you.

## Final Step: Connect to Website
1.  Open `video-data.js`.
2.  Paste your link into the `googleSheetUrl` variable.
3.  Refresh `index.html`.
