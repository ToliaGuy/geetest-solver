// This script that generates humanlike mouse movements, I bought from random dude on discord for 120$
// To be fair this is the only script, that worked in the geetest solver

async function getRandomCoor(min,max){
    return Math.ceil(
        Math.random() * (max - min) + min
    )
}

async function getRandomItem(myArray) {
    return myArray[Math.floor(Math.random()*myArray.length)]
}


async function GenerateRealisticMouseMovement(x) {
    const count = x
    // split it into 5ths
    let firstSection = null
    let secondSection = null
    let lastSection = null

    if(x >= 73) {
        firstSection = Math.round(x / 6) * 1
        secondSection = Math.round(x / 6) * 6
        lastSection = x
    } else {
        firstSection = Math.round(x / 4) * 1
        secondSection = Math.round(x / 4) * 5
        lastSection = x
    }

    const movements = []
    // fast delay is 2
    // slow is anything above like 5

    // first section we'll go slow
    // we will split this first section into two
    for (let i = 0; i < firstSection; i++) {
        // speed up
        // slow then fast
        if ( i < ( firstSection / 3) ) {
            const base = 5
            movements.push({
                x: i,
                y: 0,
                delay: base + await getRandomCoor( Math.round( i / 2 ), i )
            })

        } else {
            const base = 15
            movements.push({
                x: i,
                y: 0,
                delay: base - await getRandomCoor( 0,  Math.round(i / 2 ) )
            })
        }     
    }

    let lastSkippedIndex = 0
    // we go fast
    for (let i = firstSection; i < secondSection; i++) {
        let base = Math.random() < 0.3 ? 4 : 2
        Math.random() < 0.3 ? base += 1 : {}

        // lets skip one randomly (low chance)
        const chanceToSkip = Math.random() < 0.05
        if (chanceToSkip) {
            movements.push({
                x: i + 1,
                y: 0,
                delay: base
            })

            lastSkippedIndex = i + 1

        } else {
            if (lastSkippedIndex != i)
                movements.push({
                   x: i,
                   y: 0,
                   delay: base
                })
        }
    }

    // slow down
    for (let i = secondSection; i < lastSection; i++) {
        let base = 12
        // random chance to slow down a little
        Math.random() < 0.1 ? base -= await getRandomCoor(1, 2) : {}
        Math.random() < 0.05 ? base += await getRandomCoor(10, 20) : {}
        movements.push({
            x: i,
            y: 0,
            delay: base + await getRandomCoor(0, Math.round((i / count ) * 5 ) )
        })
    }

    let touch_events = []
    touch_events.push([await getRandomCoor(-31,-25), await getRandomCoor(-30,-22), 0])
    touch_events.push([0,0,0])

    let time_events = []
    let x_events = []
    let y_events = []
    let timer = await getRandomCoor(90,120)
    for(let i = 0; i < movements.length;i++) {
        x_events.push(movements[i]['x'])
        y_events.push(movements[i]['y'])
        timer += movements[i]['delay']
        time_events.push(timer)
    }

    time_events[time_events.length - 1] = time_events[time_events.length - 2] + await getRandomCoor(90,130)
    passtime = time_events[time_events.length - 1]

    for(let i=0;i<x_events.length;i++) {
        if (x_events[i] > x) {
            x_events[i] = x
        }
        touch_events.push([Math.floor(x_events[i]),Math.floor(y_events[i]),Math.floor(time_events[i])])
    }


    return [touch_events,passtime]
}



module.exports = {
    generateMouse : GenerateRealisticMouseMovement
}


