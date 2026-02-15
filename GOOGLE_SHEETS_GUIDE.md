# How to Manage Your Videos with Google Sheets

You can update your website videos without ever touching a code file!

## Step 1: Create the Sheet
1.  Go to [Google Sheets](https://sheets.google.com) and create a new blank sheet.
2.  In the first row, add these headers **exactly** (no caps):
    `id`, `title`, `category`, `type`, `thumbnail`

## Step 2: Add Your Videos
Add your videos in the rows below.
-   **id**: The YouTube ID (e.g., `jfKfPfyJRdk`) or Google Drive ID.
-   **title**: The name of the video.
-   **category**: Must be one of: `ugc`, `faceless`, or `reels`.
-   **type**: Either `youtube` or `drive`.
-   **thumbnail**: (Optional) Leave blank to auto-fetch from YouTube. Or paste an image URL.

## Step 3: Publish to Web (Crucial!)
1.  Click **File** > **Share** > **Publish to web**.
2.  Change "Web page" to **Comma-separated values (.csv)**.
3.  Click **Publish**.
4.  Copy the link it gives you.

## Step 4: Connect to Website
1.  Open the file `video-data.js` on your computer.
2.  Paste the link inside the quotes for `googleSheetUrl`.
    ```javascript
    export const googleSheetUrl = "https://docs.google.com/spreadsheets/d/e/YOUR_LONG_LINK/pub?output=csv";
    ```
3.  Save the file.

**That's it!** Now, whenever you add a row to that Google Sheet, your website will update automatically (you might need to refresh the page).
