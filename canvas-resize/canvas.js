var WINDOW_WIDTH
var WINDOW_HEIGHT
var RADIUS = 12
var MARGIN_TOP = 150
var MARGIN_LEFT = 220

var hours
var minutes
var seconds

var balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]

window.onload = function () {
    const canvas = document.getElementById('canvas')

    WINDOW_WIDTH = document.documentElement.clientWidth
    WINDOW_HEIGHT = document.documentElement.clientHeight
    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10)
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1

    canvas.width = WINDOW_WIDTH
    canvas.height = WINDOW_HEIGHT
    const ctx = canvas.getContext('2d')

    setInterval(() => {
        let date = new Date()
        update(date)
        render(ctx, date)
    }, 50)

}

function update(date) {
    let curHours = date.getHours()
    let curMinutes = date.getMinutes()
    let curSeconds = date.getSeconds()

    if (hours && curHours !== hours) {
        if (parseInt(curHours / 10) != parseInt(hours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
        }
        if (parseInt(curHours % 10) != parseInt(hours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours / 10));
        }
    }
    if (minutes && curMinutes !== minutes) {
        if (parseInt(curMinutes / 10) != parseInt(minutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        }
        if (parseInt(curMinutes % 10) != parseInt(minutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        }
    }
    if (seconds && curSeconds !== seconds) {
        if (parseInt(curSeconds / 10) != parseInt(seconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        }
        if (parseInt(curSeconds % 10) != parseInt(seconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10));
        }
    }

    updateBalls()
    console.log(balls.length)
}

function updateBalls() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx
        balls[i].y += balls[i].vy
        balls[i].vy += balls[i].g
        if (balls[i].vx > 0) {
            balls[i].vx += balls[i].g*0.1
        } else {
            balls[i].vx -= balls[i].g*0.1
        }

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS
            balls[i].vy = - balls[i].vy * 0.6
        }
    }
    let count = 0

    for (let i=0; i < balls.length; i++) {
        if(balls[i].x-RADIUS >0 && balls[i].x+RADIUS < WINDOW_WIDTH) {
            balls[count++] = balls[i]
        }
    }

    while(balls.length > Math.min(500, count)) {
        balls.pop()
    }
}

function addBalls(x, y, num) {
    for (let i = 0; i < digit[num].length; i++) {
        for (let j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] === 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -Math.floor(Math.random()*10) ,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                balls.push(aBall)
            }
        }
    }

}

function render(ctx, date) {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)

    hours = date.getHours()
    minutes = date.getMinutes()
    seconds = date.getSeconds()

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx)
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx)
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx)

    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx)
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx)
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx)

    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx)
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx)

    for (var i = 0; i < balls.length; i++) {
        ctx.fillStyle = balls[i].color;

        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        ctx.closePath();

        ctx.fill();
    }
}

function renderDigit(x, y, num, ctx) {
    ctx.fillStyle = "rgb(0, 102, 153)"

    for (let i = 0; i < digit[num].length; i++) {
        for (let j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                ctx.beginPath()
                ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
                ctx.closePath()
                ctx.fill()
            }
        }
    }
}
