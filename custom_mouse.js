start = new Date().getTime();
sqrt3 = Math.sqrt(3)
sqrt5 = Math.sqrt(5)


function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function wind_mouse(start_x, start_y, dest_x, dest_y, G_0=9, W_0=1, M_0=2, D_0=12){
    // default:    start_x, start_y, dest_x, dest_y, G_0=9, W_0=3, M_0=15, D_0=12

    // WindMouse algorithm. Calls the move_mouse kwarg with each new step.
    // Released under the terms of the GPLv3 license.
    // G_0 - magnitude of the gravitational force
    // W_0 - magnitude of the wind force fluctuations
    // M_0 - maximum step size (velocity clip threshold)
    // D_0 - distance where wind behavior changes from random to damped


    let current_x = start_x
    let current_y = start_y
    let current_time = getRandomInt(110, 280);
    v_x = v_y = W_x = W_y = 0
    
    points.push(Array(getRandomInt(-5, -60), getRandomInt(-5, -60), 0))
    points.push(Array(0,0,0))

    while ((dist = Math.hypot(dest_x-start_x, dest_y-start_y)) >= 1) {
        W_mag = Math.min(W_0, dist)
        if (dist >= D_0) {
            W_x = W_x/sqrt3 + (2*Math.random()-1)*W_mag/sqrt5
            W_y = W_y/sqrt3 + (2*Math.random()-1)*W_mag/sqrt5
        } else{
            W_x /= sqrt3
            W_y /= sqrt3
            if (M_0 < 3) {
                M_0 = Math.random()*3 + 3
            } else {
                M_0 /= sqrt5
            }
        }
        v_x += W_x + G_0*(dest_x-start_x)/dist
        v_y += W_y + G_0*(dest_y-start_y)/dist
        v_mag = Math.hypot(v_x, v_y)
        if (v_mag > M_0) {
            v_clip = M_0/2 + Math.random()*M_0/2
            v_x = (v_x/v_mag) * v_clip
            v_y = (v_y/v_mag) * v_clip
        }
        start_x += v_x
        // start_y += v_y
        start_y += 0
        move_x = Number(Math.round(start_x))
        move_y = Number(Math.round(start_y))
        if (current_x != move_x || current_y != move_y) {
            points.push(Array(current_x=move_x,current_y=move_y, current_time += getRandomInt(5, 40)))
            // points.push(Array(current_x=Math.round(move_x/MUL),current_y=move_y, current_time += getRandomInt(5, 70)))
        }
    }
    passtime = current_time + getRandomInt(200, 400);
    points[points.length -1][2] = passtime;
    return [current_x,current_y]
}

points = Array();

const coordinades = wind_mouse(0,0,130,0)
console.log("[" + JSON.stringify(points)+"]")
