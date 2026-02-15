# Video Editor Portfolio - User Guide

## How to Run
Simply open `index.html` in your web browser.

## Where do I host my videos?
**Recommendation: YouTube**
For a portfolio, the best (and free) way is to upload your videos to a YouTube channel.
1.  Create a YouTube channel (it's free).
2.  Upload your video there.
3.  You can set the video to **"Public"** or **"Unlisted"** (if you only want people on your site to see it).
4.  Copy the **Video ID** from the link and put it in `video-data.js`.

*Does it redirect to YouTube?* **NO.**
It plays directly on your website in a popup window (modal). Your visitors stay on your page the whole time.

*Why not upload directly to the website?*
Video files are huge. Uploading them directly makes your website load very slowly and can cost you money in hosting fees. YouTube handles all the heavy lifting for free.

### Option 2: Google Drive
You **can** use Google Drive, but be careful: if too many people watch it, Google will block the video playback.
1.  Upload video to Google Drive.
2.  Right-click -> **Share** -> Change to **"Anyone with the link"**.
3.  Copy the Link. It looks like: `https://drive.google.com/file/d/YOUR_DRIVE_ID/view...`
4.  Copy ONLY the `YOUR_DRIVE_ID` part.
5.  In `video-data.js`, set `id` to `YOUR_DRIVE_ID` and `type` to `"drive"`.

## Security Note
Your website is extremely secure because it is a **Static Site**.
-   **No Database**: There is nothing for hackers to steal.
-   **No Login**: There are no passwords to crack.
-   **No Backend**: There is no server-side code to exploit.
-   **HTTPS**: When you host this (e.g., on Netlify, Vercel, or GitHub Pages), they provide free SSL (the lock icon), ensuring all connections are encrypted.


## How to Manage Videos
You have two options to manage your videos:

### Option 1: Google Sheets (Recommended)
You can manage everything from a spreadsheet!
👉 **[Read the Google Sheets Guide](GOOGLE_SHEETS_GUIDE.md)**

### Option 2: Manual Code Editing
All video content is managed in `video-data.js`. You do not need to touch the HTML.

1.  Open `video-data.js` in a text editor (like Notepad or VS Code).
2.  You will see a list of videos like this:
    ```javascript
    {
        id: "jfKfPfyJRdk", // The YouTube Video ID
        title: "Project Name",
        category: "ugc", // Options: "ugc", "faceless", "reels"
        thumbnail: "https://img.youtube.com/vi/jfKfPfyJRdk/maxresdefault.jpg", 
        type: "youtube"
    },
    ```
3.  **To Add a Video**: 
    -   Go to your YouTube video.
    -   Look at the URL: `youtube.com/watch?v=VIDEO_ID_HERE`
    -   Copy the `VIDEO_ID_HERE` part.
    -   Paste it into the `id` field in `video-data.js`.
    -   You can also use this ID to get the thumbnail: `https://img.youtube.com/vi/YOUR_ID/maxresdefault.jpg`
4.  **To Remove a Video**: Delete the entire `{ ... }` block.
5.  **Categories**: Make sure to use one of the existing categories (`ugc`, `faceless`, `reels`) so the filters work correctly.

## Customization
- **Images**: You can use local images (put them in an `images` folder) or direct URLs.
- **Contact Info**: Edit the HTML in `index.html` (look for the `<section id="contact">` part) to update your email and social links.
