import request from "request";
import {load} from 'cheerio'
request('https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary',cb);
function cb(err,response,html) {
    if(err){
        console.log("error:",err);
    }else{
        extractHtml(html);
    }
}
function extractHtml(html) {
    const $= load(html);
    const elementArr= $(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    console.log($(elementArr[0]).text());//last ball commentary scraping
}