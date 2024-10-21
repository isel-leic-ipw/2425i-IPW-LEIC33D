

// Returns a promise of an array with the team ids present in the given file path
export function getTeamIds(filePath) {

}

// Returns a promise of an object array with all temas information obtained from football-api
export function getTeams(ids) {
    // ....
    // fetch()
    // 
}

export function main() {
    getTeamIds(process.argv[2])
        .then(getTeams)
}


import { argv } from 'node:process';

// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});