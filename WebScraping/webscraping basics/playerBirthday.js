//here we have to scrape highest wicket taker from winning team
import request from "request";
import { load } from 'cheerio'
request('https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard', cb);
function cb(err, response, html) {
    if (err) {
        console.log("error:", err);
    } else {
        extractHtml(html);
    }
}

function extractHtml(html) {
    const $ = load(html);
    const teamsArr = $(".match-info.match-info-MATCH.match-info-MATCH-half-width .team");
    let winningTeamName;
    for (let i = 0; i < teamsArr.length; i++) {
        let hasClass = $(teamsArr[i]).hasClass("team-gray");
        if (hasClass == false) {
            let winningTeamNameElement = $(teamsArr[i]).find(".name");
            winningTeamName = winningTeamNameElement.text().trim();
            //console.log(winningTeamName);//print winning team name
        }
    }
    //there are two innings 
    //we have to take bowling chart of winning team
    let innings = $(".card.content-block.match-scorecard-table>.Collapsible");//returns html in string format
    for (let i = 0; i < innings.length; i++) {
        //team names
        let teamNameElement = $(innings[i]).find(".header-title.label");
        let teamName = teamNameElement.text();
        teamName = teamName.split("INNINGS")[0].trim();

        //team batting table
        let tableElement = $(innings[i]).find(".table.batsman");
        let allBatters = $(tableElement).find("tr");
        for (let j = 0; j < allBatters.length; j++) {
            let allBattersCols = $(allBatters[j]).find("td");
            let isBatsmanCol = $(allBattersCols[0]).hasClass("batsman-cell");
            if (isBatsmanCol == true) {
                let href = $(allBattersCols[0]).find('a').attr('href');
                let batsmanName= $(allBattersCols[0]).text();
                let fullLink = "https://www.espncricinfo.com" + href;
                handleBirthdayPage(fullLink,batsmanName,teamName);
            }
        }

    }

    function handleBirthdayPage(url,batsmanName,teamName) {
        request(url, cb);
        function cb(err, response, html) {
            if (err) {
                console.log("error:", err);
            } else {
                extractBirthdayHtml(html,batsmanName,teamName);
            }
        }
    }

    function extractBirthdayHtml(html,batsmanName,teamName) {
        let $=load(html);
        let playerOverviewArr=$(".player_overview-grid .player-card-description.gray-900");
        let birthDay=$(playerOverviewArr[1]).text().split(',');
        console.log(`${batsmanName}plays for ${teamName} and was born on ${birthDay[0]+birthDay[1]}.`);
    
    }
    /*  console.log("Highest wicket taker from winning team:", hwtName);
     console.log("Wickets taken:", hwt); */

}