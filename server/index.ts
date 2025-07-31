import fs from "fs";
import path from "path";

const newsTitle: Array<string> = [];
const subreddit: string = "science";

async function getAndPrintData() {
  let response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json`, { method: "GET" });
  let data = await response.json();
  for (let i = 0; i < 5; i++) {
    newsTitle.push(data.data.children[i].data.title)
  }
}

getAndPrintData().then(() => {
  fs.writeFileSync(path.resolve(__dirname, "../remotion/news.json"), JSON.stringify(newsTitle, null, 2));
});



