//usual way to read json
let fs = require('fs');
let xlsx = require('xlsx');
/* let buffer = fs.readFileSync('./example.json');
console.log(buffer);
console.log("##################################################");
let data = JSON.parse(buffer);//return data in array format
// console.log(data);
data.push(
    {
        "name": "Raj",
        "age": 23,
        "isStudent": false,
        "friends": [
            "Kalash",
            "Yash",
            "Aditya",
            "Yash"
        ],
        "address": {
            "city": "Akola",
            "state": "Maharashtra"
        }

    }
);
let stringData= JSON.stringify(data);//convert data to string
fs.writeFileSync("example.json",stringData);//writefilesync writes data either in string or binary form */

//short and better way to read json
let data = require('./example.json');
// console.log(data);


//excel heirarchy
/* excel file
    workbook
        sheets
            columns
                rows */

//we need 3 things to make WB
// wb->fileplath, ws-> name, json data
function excelWriter(filepath, sheetName, json) {
    let newWB = xlsx.utils.book_new()//default path is current dir;
    //json data -> excel format
    let newWS = xlsx.utils.json_to_sheet(json);
    xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
    xlsx.writeFile(newWB, filepath);

}
//read from excel
function excelReader(filepath,sheetName) {
    if(fs.existsSync(filepath)==false){
        return [];
    }
    let wb = xlsx.readFile(filepath);
    //select which sheet to read
    let excelData = wb.Sheets[sheetName];
    //convert sheet to json
    let ans = xlsx.utils.sheet_to_json(excelData);
    return ans;
}
