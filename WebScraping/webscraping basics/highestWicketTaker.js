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
    let currentHtml = "";
    let hwt=0;
    let hwtName="";
    for (let i = 0; i < innings.length; i++) {
        //currentHtml+=$(innings[i]).html();
        //team names
        let teamNameElement = $(innings[i]).find(".header-title.label");
        let teamName = teamNameElement.text();
        teamName = teamName.split("INNINGS")[0].trim();
        if (teamName == winningTeamName) {
            //console.log(teamName);
            //team bowling table
            let tableElement = $(innings[i]).find(".table.bowler");
            let allBowlers = $(tableElement).find("tr");
            for (let j = 0; j < allBowlers.length; j++) {
                let allBowlersCols = $(allBowlers[j]).find("td");
                let bowlerName = $(allBowlersCols[0]).text();
                let bowlerWicketsTaken = $(allBowlersCols[4]).text();
                if(bowlerWicketsTaken>hwt){
                    hwt=bowlerWicketsTaken;
                    hwtName=bowlerName;
                }
            }
        }
    }
    console.log("Highest wicket taker from winning team:", hwtName);
    console.log("Wickets taken:", hwt);

}