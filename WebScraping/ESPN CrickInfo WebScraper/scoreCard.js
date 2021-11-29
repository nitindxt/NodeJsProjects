const request = require("request");
const cheerio = require("cheerio");
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
    const result=$('.match-info.match-info-MATCH.match-info-MATCH-half-width .status-text').text();
    let venue=$('.match-header-info.match-info-MATCH .description').text();
    venue=venue.split(',');
    let date=venue[2].trim();
    venue=venue[1].trim();
    
    let innings=$('.card.content-block.match-scorecard-table>.Collapsible');
    //let htmlstr="";
    for (let i = 0; i < innings.length; i++) {
        //htmlstr+=$(innings[i]).html();
        let teamName= $(innings[i]).find('h5').text();
        teamName=teamName.split("INNINGS")[0].trim();
        let opponentTeamName=$(innings[(i==0?1:0)]).find('h5').text();
        opponentTeamName=opponentTeamName.split("INNINGS")[0].trim();
        console.log(venue,date,teamName,opponentTeamName,result);

        let currentInning=$(innings[i]);
        let allRows=currentInning.find(".table.batsman tbody tr");
        for (let j = 0; j < allRows.length; j++) {
            let allCols=$(allRows[j]).find('td');
            let isWorthy=$(allCols[0]).hasClass('batsman-cell');//if row is of batsman's stats and not other comment
            if(isWorthy==true){
                let batsmanName=$(allCols[0]).text();
                let runs=$(allCols[2]).text();
                let balls=$(allCols[3]).text();
                let four=$(allCols[5]).text();
                let sixes=$(allCols[6]).text();
                let strikeRate=$(allCols[7]).text();
                console.log(`${batsmanName} | ${runs}|${balls}|${four}|${sixes}|${strikeRate}`)
            }
        }
    }
    
    // console.log(htmlstr);
}

module.exports={
    ps:processScoreCard
}