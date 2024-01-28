BATTING SUMMARY:_
/* -------------- STAGE 1 ------------ */
//------- 1.a Interaction Code ------ //
navigate('https://stats.espncricinfo.com/ci/engine/records/team/match_results.html?id=14450;type=tournament');
let links = parse().matchSummaryLinks;
for(let i of links) {
next_stage({url: i})
}

//------- 1.b Parser Code ------------//
let links = []
const allRows = $('table.engineTable > tbody > tr.data1');
allRows.each((index, element) => {
const tds = $(element).find('td');
const rowURL = "https://www.espncricinfo.com" +$(tds[6]).find('a').attr('href');
links.push(rowURL);
})
return {
'matchSummaryLinks': links
};

/* -------------- STAGE 2 ------------ */
//------- 2.a Interaction Code ------ //
navigate(input.url);
collect(parse());

//------- 2.b Parser Code ------------//
var match = $('div').filter(function(){
return $(this)
.find('span > span > span').text() === String("Match Details")
}).siblings()
team1 = $(match.eq(0)).find('span > span > span').text().replace(" Innings", "")
team2 = $(match.eq(1)).find('span > span > span').text().replace(" Innings", "")
matchInfo = team1 + ' Vs ' + team2
var tables = $('div > table.ci-scorecard-table');
var firstInningRows = $(tables.eq(0)).find('tbody > tr').filter(function(index, element){
return $(this).find("td").length >= 8
})
var secondInningsRows = $(tables.eq(1)).find('tbody > tr').filter(function(index, element){
return $(this).find("td").length >= 8
});
var battingSummary = []
firstInningRows.each((index, element) => {
var tds = $(element).find('td');
battingSummary.push({
"match": matchInfo,
(80)
"teamInnings": team1,
"battingPos": index+1,
"batsmanName": $(tds.eq(0)).find('a > span > span').text().replace(' ', ''),
"dismissal": $(tds.eq(1)).find('span > span').text(),
"runs": $(tds.eq(2)).find('strong').text(),
"balls": $(tds.eq(3)).text(),
"4s": $(tds.eq(5)).text(),
"6s": $(tds.eq(6)).text(),
"SR": $(tds.eq(7)).text()
});
});
secondInningsRows.each((index, element) => {
var tds = $(element).find('td');
battingSummary.push({
"match": matchInfo,
"teamInnings": team2,
"battingPos": index+1,
"batsmanName": $(tds.eq(0)).find('a > span > span').text().replace(' ', ''),
"dismissal": $(tds.eq(1)).find('span > span').text(),
"runs": $(tds.eq(2)).find('strong').text(),
"balls": $(tds.eq(3)).text(),
"4s": $(tds.eq(5)).text(),
"6s": $(tds.eq(6)).text(),
"SR": $(tds.eq(7)).text()
});
});
return {"battingSummary": battingSummary}

_BOWLING SUMMARY:_
/* -------------- STAGE 1 ------------ */
//------- 1.a Interaction Code ------ //
navigate('https://stats.espncricinfo.com/ci/engine/records/team/match_results.html?id=14450;type=tournament');
let links = parse().playersLinks;
for(let i of links) {
next_stage({url: i})
}


//------- 1.b Parser Code ------------//
let links = []
const allRows = $('table.engineTable > tbody > tr.data1');
allRows.each((index, element) => {
const tds = $(element).find('td');
const rowURL = "https://www.espncricinfo.com" +$(tds[6]).find('a').attr('href');
links.push(rowURL);
})
return {
'playersLinks': links
};

/* -------------- STAGE 2 ------------ */
//------- 2.a Interaction Code ------ //
navigate(input.url);
(81)
collect(parse());
//---------- 2.b Parser Code ---------//
var match = $('div').filter(function(){
return $(this)
.find('span > span > span').text() === String("Match Details")
}).siblings()
team1 = $(match.eq(0)).find('span > span > span').text().replace(" Innings", "")
team2 = $(match.eq(1)).find('span > span > span').text().replace(" Innings", "")
matchInfo = team1 + ' Vs ' + team2
var tables = $('div > table.ds-table');
var firstInningRows = $(tables.eq(1)).find('tbody > tr').filter(function(index, element){
return $(this).find("td").length >= 11
})
var secondInningsRows = $(tables.eq(3)).find('tbody > tr').filter(function(index, element){
return $(this).find("td").length >= 11
});
var bowlingSummary = []
firstInningRows.each((index, element) => {
var tds = $(element).find('td');
bowlingSummary.push({
"match": matchInfo,
"bowlingTeam": team2,
"bowlerName": $(tds.eq(0)).find('a > span').text().replace(' ', ''),
"overs": $(tds.eq(1)).text(),
"maiden": $(tds.eq(2)).text(),
"runs": $(tds.eq(3)).text(),
"wickets": $(tds.eq(4)).text(),
"economy": $(tds.eq(5)).text(),
"0s": $(tds.eq(6)).text(),
"4s": $(tds.eq(7)).text(),
"6s": $(tds.eq(8)).text(),
"wides": $(tds.eq(9)).text(),
"noBalls": $(tds.eq(10)).text()
});
});
secondInningsRows.each((index, element) => {
var tds = $(element).find('td');
bowlingSummary.push({
"match": matchInfo,
"bowlingTeam": team1,
"bowlerName": $(tds.eq(0)).find('a > span').text().replace(' ', ''),
"overs": $(tds.eq(1)).text(),
"maiden": $(tds.eq(2)).text(),
"runs": $(tds.eq(3)).text(),
"wickets": $(tds.eq(4)).text(),
"economy": $(tds.eq(5)).text(),
"0s": $(tds.eq(6)).text(),
"4s": $(tds.eq(7)).text(),
"6s": $(tds.eq(8)).text(),
"wides": $(tds.eq(9)).text(),
"noBalls": $(tds.eq(10)).text()
});
});
(82)
return {"bowlingSummary": bowlingSummary}
MATCH RESULTS:
/* -------------- STAGE 1 ------------ */
//------- 1.a Interaction Code ------ //
navigate('https://stats.espncricinfo.com/ci/engine/records/team/match_results.html?id=14450;type=tou
rnament');
collect(parse());
//------- 1.b Parser Code ------------//
//Step1: create an array to store all the records
let matchSummary = []
//Step2: Selecting all rows we need from target table
const allRows = $('table.engineTable > tbody > tr.data1');
//Step3: Looping through each rows and get the data from the cells(td)
allRows.each((index, element) => {
const tds = $(element).find('td'); //find the td
matchSummary.push({
'team1': $(tds[0]).text(),
'team2': $(tds[1]).text(),
'winner': $(tds[2]).text(),
'margin': $(tds[3]).text(),
'ground': $(tds[4]).text(),
'matchDate': $(tds[5]).text(),
'scorecard': $(tds[6]).text()
})
})
// step4: Finally returning the data
return {
"matchSummary": matchSummary
};

_PLAYER INFORMATION:_
/* -------------- STAGE 1 ------------ */
//------- 1.a Interaction Code ------ //
navigate('https://stats.espncricinfo.com/ci/engine/records/team/match_results.html?id=14450;type=tournament');
let links = parse().matchSummaryLinks;
for(let i of links) {
next_stage({url: i})
}
//------- 1.b Parser Code ------------//
(83)
let links = []
const allRows = $('table.engineTable > tbody > tr.data1');
allRows.each((index, element) => {
const tds = $(element).find('td');
const rowURL = "https://www.espncricinfo.com" +$(tds[6]).find('a').attr('href');
links.push(rowURL);
})
return {
'matchSummaryLinks': links
};

/* ------------ STAGE 2 -------------- */
//------- 2.a Interaction Code ------ //
navigate(input.url);
let playersData = parse().playersData;
for(let obj of playersData) {
name = obj['name']
team = obj['team']
url = obj['link']
next_stage({name: name, team: team, url: url})
}
//---------- 2.b Parser Code ---------//
//to store all the players in a list
var playersLinks = []
var match = $('div').filter(function(){
return $(this)
.find('span > span > span').text() === String("Match Details")
}).siblings()
team1 = $(match.eq(0)).find('span > span > span').text().replace(" Innings", "")
team2 = $(match.eq(1)).find('span > span > span').text().replace(" Innings", "")
//for batting players
var tables = $('div > table.ci-scorecard-table');
var firstInningRows = $(tables.eq(0)).find('tbody > tr').filter(function(index, element){
return $(this).find("td").length >= 8
})
var secondInningsRows = $(tables.eq(1)).find('tbody > tr').filter(function(index, element){
return $(this).find("td").length >= 8
});
firstInningRows.each((index, element) => {
var tds = $(element).find('td');
playersLinks.push({
"name": $(tds.eq(0)).find('a > span > span').text().replace(' ', ''),
"team": team1,
"link": "https://www.espncricinfo.com" + $(tds.eq(0)).find('a').attr('href')
});
});
secondInningsRows.each((index, element) => {
var tds = $(element).find('td');
playersLinks.push({
"name": $(tds.eq(0)).find('a > span > span').text().replace(' ', ''),
(84)
"team": team2,
"link": "https://www.espncricinfo.com" + $(tds.eq(0)).find('a').attr('href')
});
});
//for bowling players
var tables = $('div > table.ds-table');
var firstInningRows = $(tables.eq(1)).find('tbody > tr').filter(function(index, element){
return $(this).find("td").length >= 11
})
var secondInningsRows = $(tables.eq(3)).find('tbody > tr').filter(function(index, element){
return $(this).find("td").length >= 11
});
firstInningRows.each((index, element) => {
var tds = $(element).find('td');
playersLinks.push({
"name": $(tds.eq(0)).find('a > span').text().replace(' ', ''),
"team": team2.replace(" Innings", ""),
"link": "https://www.espncricinfo.com" + $(tds.eq(0)).find('a').attr('href')
});
});
secondInningsRows.each((index, element) => {
var tds = $(element).find('td');
playersLinks.push({
"name": $(tds.eq(0)).find('a > span').text().replace(' ', ''),
"team": team1.replace(" Innings", ""),
"link": "https://www.espncricinfo.com" + $(tds.eq(0)).find('a').attr('href')
});
});
return {"playersData": playersLinks}
/* ------------- STAGE 3 ------------ */
//------- 3.a Interaction Code ------ //
navigate(input.url);
final_data = parse()
collect(
{
"name": input.name,
"team": input.team,
"battingStyle": final_data.battingStyle,
"bowlingStyle": final_data.bowlingStyle,
"playingRole": final_data.playingRole,
"description": final_data.content,
});
//---------- 3.b Parser Code ---------//
const battingStyle = $('div.ds-grid > div').filter(function(index){
return $(this).find('p').first().text() === String('Batting Style')
})
const bowlingStyle = $('div.ds-grid > div').filter(function(index){
return $(this).find('p').first().text() === String('Bowling Style')
(85)
})
const playingRole = $('div.ds-grid > div').filter(function(index){
return $(this).find('p').first().text() === String('Playing Role')
})
return {
"battingStyle": battingStyle.find('span').text(),
"bowlingStyle": bowlingStyle.find('span').text(),
"playingRole": playingRole.find('span').text(),
"content": $('div.ci-player-bio-content').find('p').first().text()
}
