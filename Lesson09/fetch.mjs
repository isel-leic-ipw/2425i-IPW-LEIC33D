// fetch("https://v3.football.api-sports.io/players/squads?team=211", {
//     headers: {
//         "x-apisports-key": '37eb60d963f1cbea94a0544563e4e0ea' 
//     }
// })
// .then(resp => resp.json())
// .then(processResponse)
// .then( () => console.log("END"))
// console.log("First end")


async function f1() {
    let resp = await fetch("https://v3.football.api-sports.io/players/squads?team=211", {
        headers: {
            "x-apisports-key": '37eb60d963f1cbea94a0544563e4e0ea' 
        }
    })
    let obj = await resp.json()
    processResponse(obj)
    console.log("END")
}


f1().then(()=> sole.log("First end"))
con

function processResponse(bodyObj) {
    
    console.log(
        bodyObj.response[0].players
            .sort((p1, p2) => p1.number<p2.number ? -1 : (p1.number == p2.number ? 0 : 1) )
            .map(p => `${p.number} -  ${p.name}`)
            .reduce((prev, curr) => prev + "\n" + curr, "")
    
    
    )
}


