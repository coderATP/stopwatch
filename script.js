//bzvzgzsgvsvshjsjshhshshsbbsbsbsbvsvsvsvsvvsvsbsbsbbsbsbbsbsbsbvsvsvvsvsvsvvsvsvsvsvsvvsvsvsvsv

const hour = document.getElementById('hour');
const minute = document.getElementById('minute');
const second = document.getElementById('second');
const millisecond= document.getElementById('millisecond');

let clicked = false, running = false, interval;
let addedZero = false;

function addZero(){
    if (hour.innerHTML < 10 && !addedZero) {
        hour.innerHTML = '0' + hour.innerHTML;
    }
    if (minute.innerHTML < 10 && !addedZero) {
        minute.innerHTML = '0' + minute.innerHTML;
    }
    if (second.innerHTML < 10 && !addedZero) {
        second.innerHTML = '0' + second.innerHTML;
    }
    
    if (millisecond.innerHTML < 10 && !addedZero) {
        millisecond.innerHTML = '0' + millisecond.innerHTML;
    } 
}
function start(){
       interval = setInterval(()=>{
            millisecond.innerHTML++
            //increment second
            if(millisecond.innerHTML > 99){
                second.innerHTML++;
                millisecond.innerHTML = 0;
            }
            //increment minute
            if(second.innerHTML > 59){
                minute.innerHTML++;
                second.innerHTML = 0;
            }
            //increment hour
            if(minute.innerHTML > 59){
                hour.innerHTML++;
                minute.innerHTML = 0;
            }
            running = true;
        }, 10);
}


function stop(){
    clearInterval(interval);
    running = false;
}

function reset(){
    running = false;
    hour.innerHTML = minute.innerHTML = second.innerHTML = millisecond.innerHTML = 0;
    addZero()
}

function stopwatch(){
    addZero();
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn=>{
        btn.addEventListener('mousedown', (e)=>{
            if(e.target.id == 'start' && !running){ start(); }
            if(e.target.id == 'stop') stop();
            if(e.target.id == 'reset') reset();
            
        })
    })
    
}
stopwatch()


//ANALOG STOPWATCH
canvas.width = canvas.height = 300;
const ctx = canvas.getContext('2d');

canvas.style.backgroundColor = 'blue';
const radius = canvas.width *0.5;
ctx.translate(radius, radius);


function drawMillisecondStroke(ctx, radius){
    ctx.fillStyle = 'white';
    
    for(let i = 0; i < 100; ++i){
        ctx.save()
        let angle = i * Math.PI / 50;
        
        ctx.rotate(angle);
        ctx.fillRect(0, -radius * 0.8, 3, 10);
        ctx.restore();
    }
}

function drawSecondStroke(ctx, radius){
    ctx.fillStyle = 'gold';
    
    for(let i = 0; i < 60; i+=6){
        ctx.save()
        let angle = i * Math.PI / 30;
        
        ctx.rotate(angle);
        ctx.fillRect(0, -radius * 0.8, 5, 15);
        ctx.restore();
    }
}

function drawNumbers(ctx, radius) {
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for(let i = 0; i < 60; i+=6){
        ctx.save()
        let angle = i * Math.PI / 30;
        
        ctx.rotate(angle);
        ctx.translate(0, -radius* 0.65);
        ctx.rotate(-angle);
        ctx.fillText(i, 0, 0);
        ctx.restore();
    }
}

function drawHands(ctx, radius){
    ctx.strokeStyle = 'white'
    ctx.lineCap = 'round';
    
    //millisecond hand
    ctx.save()
    ctx.rotate(parseInt(millisecond.innerHTML) * Math.PI/50);
    ctx.beginPath()
    ctx.moveTo(0,0);
    ctx.lineTo(0, -radius *0.8)
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
    
    //second hand
    ctx.save()
    ctx.lineWidth = 3;
    ctx.rotate(parseInt(second.innerHTML) * Math.PI/30);
    ctx.beginPath()
    ctx.moveTo(0,0);
    ctx.lineTo(0, -radius *0.75)
    ctx.arc(0, -radius* 0.75, 2, 0, Math.PI*2)
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
    
    //minute hand
    ctx.save()
    ctx.strokeStyle = 'gold'
    ctx.lineWidth = 8;
    ctx.rotate(parseInt(minute.innerHTML) * Math.PI/50);
    ctx.beginPath()
    ctx.moveTo(0,0);
    ctx.lineTo(0, -radius *0.45)
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
    
    //centre dot
    ctx.save()
    ctx.beginPath()
    ctx.beginPath()
    ctx.arc(0, 0, radius * 0.05, 0, Math.PI*2 )
    ctx.fill()
    ctx.closePath()
    ctx.restore()
}

function drawClockFace(ctx, radius){
    ctx.save()
    const grad = ctx.createRadialGradient(0,0, radius * 0.9, 0,0, radius);
    
    grad.addColorStop(0, 'green')
    grad.addColorStop(0.5, 'green')
    grad.addColorStop(1, 'gold')
    
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius* 0.2
    ctx.beginPath()
    ctx.arc(0, 0, radius * 0.9, 0, Math.PI*2 )
    ctx.stroke()
    ctx.closePath()
    
    ctx.restore()
}


window.addEventListener("load", ()=>{
    function digitalStopwatch(){
       ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
   
       drawClockFace(ctx, radius);
       drawMillisecondStroke(ctx, radius);
       drawSecondStroke(ctx, radius);
       drawNumbers(ctx, radius);
       drawHands(ctx, radius)
       requestAnimationFrame(digitalStopwatch)
    }
    digitalStopwatch()
})
