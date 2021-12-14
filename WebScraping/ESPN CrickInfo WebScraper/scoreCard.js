const request = require("request");
const cheerio = require("cheerio");
const fs = require('fs');
const path = require('path');
const xlsx= require('xlsx');
// things to scrape
// Venue date opponent result runs balls fours sixes sr
//const scoreCardUrl='https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard';
function processScoreCard(url) {
    request(url, function cb(err, response, html) {
        if (err) {
            console.log("error:", err);
        } else {
            extractMatchDetails(html);
        }
    });
}


// venue, date and result would be same for both teams so scrape them once
function extractMatchDetails(html) {
    let $ = cheerio.load(html);
    const result = $('.match-info.match-info-MATCH.match-info-MATCH-half-width .status-text').text();
    let venue = $('.match-header-info.match-info-MATCH .description').text();
    venue = venue.split(',');
    let date = venue[2].trim();
    venue = venue[1].trim();

    let innings = $('.card.content-block.match-scorecard-table>.Collapsible');
    //let htmlstr="";
    for (let i = 0; i < innings.length; i++) {
        //htmlstr+=$(innings[i]).html();
        let teamName = $(innings[i]).find('h5').text();
        teamName = teamName.split("INNINGS")[0].trim();
        let opponentTeamName = $(innings[(i == 0 ? 1 : 0)]).find('h5').text();
        opponentTeamName = opponentTeamName.split("INNINGS")[0].trim();
        console.log(venue, date, teamName, opponentTeamName, result);

        let currentInning = $(innings[i]);
        let allRows = currentInning.find(".table.batsman tbody tr");
        for (let j = 0; j < allRows.length; j++) {
            let allCols = $(allRows[j]).find('td');
            let isWorthy = $(allCols[0]).hasClass('batsman-cell');//if row is of batsman's stats and not other comment
            if (isWorthy == true) {
                let playerName = $(allCols[0]).text();
                let runs = $(allCols[2]).text();
                let balls = $(allCols[3]).text();
                let four = $(allCols[5]).text();
                let sixes = $(allCols[6]).text();
                let strikeRate = $(allCols[7]).text();
                console.log(`${playerName} | ${runs}|${balls}|${four}|${sixes}|${strikeRate}`)
                processPlayer(teamName, playerName, runs, balls, four, sixes, strikeRate, opponentTeamName, venue, date, result);
            }
        }
    }

    // console.log(htmlstr);
}

function processPlayer(teamName, playerName, runs, balls, four, sixes, strikeRate, opponentTeamName, venue, date, result) {
    let teamPath = path.join(__dirname, "ipl", teamName);
    dirCreator(teamPath);
    //read excel file
    let filePath = path.join(teamPath, playerName + ".xlsx");
    let content = excelReader(filePath, playerName);
    let playerObj = {
        teamName,
        playerName,
        runs,
        balls,
        four,
        sixes,
        strikeRate,
        opponentTeamName,
        venue,
        date,
        result
    }
    content.push(playerObj);
    excelWriter(filePath, playerName, content);
}

function dirCreator(filePath) {
    if (fs.existsSync(filePath) == false) {
        fs.mkdirSync(filePath);
    }
}
function excelWriter(filepath, sheetName, json) {
    let newWB = xlsx.utils.book_new()//default path is current dir;
    //json data -> excel format
    let newWS = xlsx.utils.json_to_sheet(json);
    xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
    xlsx.writeFile(newWB, filepath);

}
//read from excel
function excelReader(filepath, sheetName) {
    if (fs.existsSync(filepath) == false) {
        return [];
    }
    let wb = xlsx.readFile(filepath);
    //select which sheet to read
    let excelData = wb.Sheets[sheetName];
    //convert sheet to json
    let ans = xlsx.utils.sheet_to_json(excelData);
    return ans;
}
module.exports = {
    ps: processScoreCard
}