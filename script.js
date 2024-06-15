const c = document.getElementById("mycanvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
var ctx = c.getContext('2d');


//.............for rectangle

// ctx.beginPath();
// ctx.fillStyle ='red';
// ctx.fillRect(100,100,40,30);
// ctx.fillRect(400,50,40,30);
// ctx.fillRect(800,20,40,30);
// ctx.stroke();

//.............for Circle

// ctx.beginPath();
// ctx.fillStyle ='red';
// ctx.arc(100,300,20,0,2*Math.PI,false    );
// ctx.stroke();


//..............for random circle using for loop

// for ( i=0 ; i<1000 ; i++){

//     ctx.beginPath();
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     ctx.arc(x,y,20,0,2*Math.PI);
//     var rand = '#'+Math.floor(Math.random()*16777215).toString(16);
//     ctx.strokeStyle = rand ;
//     ctx.stroke();
// }


//...............for animation

var mouse = {
    x: undefined,
    y: undefined
}

var max = 30;
var min = 4;
var colors =[
    'red','blue','yellow','black','pink','green',
]

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;

    })

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.min = radius;
    this.color=colors[Math.floor( Math.random()*colors.length)];
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        // ctx.strokeStyle = this.color;
        // ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;


        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < max) {
                this.radius += 1;
            }

        }
        else if (this.radius > this.min) {
            this.radius -= 1;
        }


        this.draw();
    }

}

var array = [];
for (var i = 0; i < 500; i++) {
    var radius = Math.random()*3+2;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    // var dx = 1;
    // var dy = 1;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    array.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < array.length; i++) {
        array[i].update();
    }
}

animate();
