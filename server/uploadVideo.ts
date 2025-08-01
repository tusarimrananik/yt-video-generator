import { google } from "googleapis";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    OAUTH_REDIRECT_URI,
    REFRESH_TOKEN,
} = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error("Missing required env vars.");
}

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    OAUTH_REDIRECT_URI
);

// Attach the refresh token; googleapis will auto-refresh access tokens.
oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
});

const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
});

export async function uploadVideo() {
    try {
        const videoPath = path.resolve("renders/video.mp4"); // adjust if path differs

        const res = await youtube.videos.insert({
            part: ["snippet", "status"],
            requestBody: {
                snippet: {
                    title: "Automated Upload",
                    description: "Uploaded via YouTube Data API with refresh token",
                    tags: ["api", "upload"],
                },
                status: {
                    privacyStatus: "public",
                },
            },
            media: {
                body: fs.createReadStream(videoPath),
            },
        });

        console.log("Upload successful. Video ID:", res.data.id);
    } catch (err) {
        console.error("Upload failed:", err);
    }
}
