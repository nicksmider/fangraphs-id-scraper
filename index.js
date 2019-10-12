const fetch = require('node-fetch');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const parser = require('node-html-parser');
const readline = require('readline');

const csvWriter = createCsvWriter({
    path: 'player_id.csv',
    header: [
        { id: 'fangraphsId', title: 'Fangraphs ID' },
        { id: 'lastName', title: 'Last Name' },
        { id: 'firstName', title: 'First Name' }
    ]
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const fangraphs = 'https://www.fangraphs.com/statss.aspx?playerid=${id}';
const getUrl = (id, site) => site.replace('${id}', id);
const args = process.argv.slice(2);

async function start() {
    let scrape = args[0];
    while (scrape < args[1]) {
        try {
            let res = await fetch(getUrl(scrape, fangraphs));
            if (res.status === 500) {
                throw new Error(res.status);
            };
            res = await res.text();
            const root = parser.parse(res);
            let name = root.querySelector('.player-info-box-name').querySelector('h1').childNodes[0].rawText;
            name = name.split(/ (.+)/);
            const record = { fangraphsId: scrape++, firstName: name[0], lastName: name[1] };
            console.log(record);
            csvWriter.writeRecords([record]);
        } catch (err) {
            if (err instanceof TypeError) {
                console.log(`RECAPTCHA detected at id: ${scrape}`);
                rl.question('Have you solved it? (Y/n)', (answer) => {
                    if (answer.toLowerCase() !== 'y') return;
                });
            }
            else {
                console.log(`No player with id: ${scrape}`);
            }
            scrape++;
            continue;
        }
    }
    process.exit();
}

start();


