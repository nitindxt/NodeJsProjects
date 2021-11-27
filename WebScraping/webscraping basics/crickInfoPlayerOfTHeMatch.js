import request from 'request';
import {load} from 'cheerio';
import chalk from 'chalk';

request('https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard',cb);
function cb(err,response,html) {
    if (err) {
        console.error('error:', err); // Print the error if one occurred
    } else {
        handlehtml(html);
        // Print the HTML for the Google homepage.
    }
}

function handlehtml(html) {
    let selectorTool=load(html);
    let contentArr=selectorTool("span.playerofthematch-name");
    console.log(chalk.yellowBright("Player of the match:",selectorTool(contentArr[0]).text()));
}