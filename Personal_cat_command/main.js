#!/usr/bin/env node
let inputArr = process.argv.slice(2);//for skipping node filename.js in input from commandline
let fs = require("fs");
let path = require("path");
let helpObj=require("./commands/help");

//segregating options and fileNames
let optionsArr = [];
let fileNameArr = [];
for (let index = 0; index < inputArr.length; index++) {
    //help option
    if(inputArr[index]=="help"){
        helpObj.helpKey();
        return;
    }
    if (inputArr[index].charAt(0)=="-") {
        optionsArr.push(inputArr[index]);
    } else {
        fileNameArr.push(inputArr[index]);
    }
}

//first of all we consider edge case like:
// 1. if -n and -b both are called in commandline args then give error
if(optionsArr.includes('-b') && optionsArr.includes('-n')){
    console.log("Enter either -n or -b option!");
    return;
}
// 2. if file doesn't exist give error
//read content of file
let content = "";
for (let index = 0; index < fileNameArr.length; index++) {
    if (fs.existsSync(fileNameArr[index])) {
        content += fs.readFileSync(fileNameArr[index])+ "\n";
    } else {
        console.log("File "+fileNameArr[index] + " doesn't exist!");
        return;
    }
}

//console.log(content);
//splitting content based on newline \n and carriage return \r
let contentArr = content.split("\n");
//console.log(contentArr);

//checking if -s command option is called
if (optionsArr.includes("-s")) {
    //removing extra newlines and keeping one newline from them \n
    //for this we'll add null to all 2 or more consecutive newlines
    for (let index = 1; index < contentArr.length; index++) {
        if (contentArr[index] == "" && contentArr[index - 1] == "") {
            contentArr[index] = null;
        } else if (contentArr[index] == "" && contentArr[index - 1] == null) {
            contentArr[index] = null;
        }
    }   

    //now we'll remove 2 or more consecutive newlines in contentArr
    //we can do this by traditional method of looping through items in contentArr
    //and adding only non-null items to another filteredArr
    let tempArr=[];
    for (let index = 0; index < contentArr.length; index++) {
        if(contentArr[index]!=null){
            tempArr.push(contentArr[index]);
        }
    }
    contentArr=tempArr;
    //but we'll use best practice of using filter() method without making another array
    
    /* filter() description short
    One typical pattern that I see often used is to remove elements that are falsy, 
    which include an empty string "", 0, NaN, null, undefined, and false.
    You can pass to the filter method, the Boolean constructor function, 
    or return the same element in the filter criteria function, for example:

    var filtered = array.filter(Boolean); 
     */
    //Take in mind that this method will return you a new array with the 
    //elements that pass the criteria of the callback function you provide to it.
    contentArr = contentArr.filter(function (element){
        return element!=null;
    });
}

//console.log(contentArr.join('\n'));
//now checking if -n command option is called in commadline args

if(optionsArr.includes('-n')){
    //then we'll append line no. to every line content
    for (let index = 0; index < contentArr.length; index++) {
        contentArr[index]=`${index+1} ${contentArr[index]}`;
    }
}

//console.log(contentArr.join('\n'));

//now checking if -b command option is called in commadline args

if(optionsArr.includes('-b')){
    //then we'll append line no. to every non-empty ("") line content
    let nonEmptyLinesCount=1;
    for (let index = 0; index < contentArr.length; index++) {
        if(contentArr[index]!=""){
            contentArr[index]=`${nonEmptyLinesCount} ${contentArr[index]}`;
            nonEmptyLinesCount++;
        }
    }
}

console.log(contentArr.join('\n'));