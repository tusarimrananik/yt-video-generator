import fs from "fs";
const arr = JSON.parse(fs.readFileSync('news.json', 'utf-8'));
console.log(arr);


arr.forEach(ar => {

});