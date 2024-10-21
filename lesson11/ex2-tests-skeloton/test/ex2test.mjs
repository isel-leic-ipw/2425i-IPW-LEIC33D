
//fetch = memoise(fetch)

import * as ex2 from '../ex2.mjs'
import assert from 'node:assert'

const IDS_PATH = "";
const TEAM_IDS = [211, 228,212]
const TEAMS = {
    "teams": [
       {
         "id": 211,
         "name": "Benfica",
         "stadium" : "Estádio do Sport Lisboa e Benfica (da Luz)"
   
       },
       {
         "id": 228,
         "name": "Sporting CP",
         "stadium" : "Estádio José Alvalade"
   
       }, 
       {
       "id": 212,
        "name": "FC Porto",
        "stadium" : "Estádio Do Dragão"
   
      }
     ]
   }

it("should return the ids present in the given file", function(done) {

    ex2.getTeamIds(IDS_PATH)
        .then(verifyIds)

    function verifyIds(ids) {
        assert.equal(ids, TEAM_IDS)
        done()
    }

})

it("should return teams for the given ids", function(done) {

    ex2.getTeams(TEAM_IDS)
        .then(verifyTeams)

    function verifyIds(teams) {
        assert.equal(teams, TEAMS)
        done()
    }

})