import { readFile } from "fs";
/* 
console.log("Before");
let data=fs.readFile("f1.txt");
console.log("After");
console.log("Mean While"); */
//async func
console.log("Before");
readFile("f1.txt", cb);
function cb(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("data: " + data);
    }
}
console.log("After");
console.log("Mean While");
