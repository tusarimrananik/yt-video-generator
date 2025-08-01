import { bundle } from '@remotion/bundler';
import { getCompositions, renderMedia } from '@remotion/renderer';
import fs from "fs";
import path from "path";
import { uploadVideo } from './uploadVideo';

const newsTitle: string[] = [];
const subreddit = "facebook";

// Step 1: Fetch data
async function getAndPrintData() {
  const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json`);
  const data = await response.json();

  for (let i = 0; i < 5; i++) {
    newsTitle.push(data.data.children[i].data.title);
  }
}

// Step 2: Save JSON & Render Video
async function main() {
  await getAndPrintData();

  // Save news titles
  fs.writeFileSync(
    path.resolve(process.cwd(), "public/news.json"),
    JSON.stringify(newsTitle, null, 2)
  );

  console.log("✅ News saved to public/news.json");

  // Correct entry file path
  const entry = path.join(process.cwd(), "remotion", "index.ts");

  // Bundle Remotion project
  const bundled = await bundle(entry);

  // Get compositions
  const comps = await getCompositions(bundled, { inputProps: {} });
  const video = comps.find((c) => c.id === "NewsVideo");

  if (!video) throw new Error("❌ Composition 'MyVideo' not found");

  // Render video
  await renderMedia({
    composition: video,
    serveUrl: bundled,
    codec: "h264",
    outputLocation: "renders/video.mp4", // save inside /renders
  });

  console.log("✅ Video rendered to renders/video.mp4");
}

// Run script
main()
  .then(() => {
    uploadVideo();
  })
  .catch((err: unknown) => console.error(err));


