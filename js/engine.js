var Canvas = require('./canvas');
var Snake = require('./snake');
var Food = require('./food');

var Engine = {
    engine : null,
    score : 0,
    level : 1,


    init : function () {



        Canvas.init();
        Snake.init(Canvas);
        Food.init(Canvas);

        this.score=0;
        this.level=1;
        this.speedFactor = 10;
        this.running = 1;
        this.stopped = 0;
        this.engine = setInterval(this.run,1000/this.speedFactor);

        Canvas.levelContainer.innerHTML = this.level+ "";

        document.addEventListener("keydown", this.keyPush);
        document.addEventListener("keypress", this.keyPush);

    },
    run : function () {

        Snake.updatePosition(Canvas);

        Canvas.updateCanvas();

        Food.renderGraphics(Canvas);

        Canvas.context.fillStyle="lime";
        for(var i = 0; i< Snake.trail.length; i++){
            Canvas.context.fillRect(Snake.trail[i].x * Canvas.gridSize, Snake.trail[i].y * Canvas.gridSize, Canvas.gridSize-2, Canvas.gridSize-2);
            if(Snake.trail[i].x == Snake.position.x && Snake.trail[i].y == Snake.position.y){
                this.stop();
            }
        }

        Snake.trail.push({x:Snake.position.x, y: Snake.position.y});
        while (Snake.trail.length > Snake.tail){
            Snake.trail.shift();
        }

        this.score = Food.updatePosition(Snake,Canvas,this.level);
        Canvas.scoreContainer.innerHTML = this.score + "";


    },
    stop : function () {
        this.running = 0;
        this.stopped = 1;
        clearInterval(engine);
    },
    keyPush : function (event) {
        var self = Engine;
        switch (event.keyCode){
            case 37:
            case 65:// left
                if(Snake.direction!=0){
                    Snake.velocity.x=-1;
                    Snake.velocity.y=0;
                    Snake.direction=0;
                }
                break;
            case 38:
            case 87:// up
                if(Snake.direction!=1){
                    Snake.velocity.x=0;
                    Snake.velocity.y=-1;
                    Snake.direction=1;
                }
                break;
            case 39:
            case 68:// right
                if(Snake.direction!=0){
                    Snake.velocity.x=1;
                    Snake.velocity.y=0;
                    Snake.direction = 0;
                }
                break;
            case 40:
            case 83:// down
                if(Snake.direction!=1){
                    Snake.velocity.x=0;
                    Snake.velocity.y=1;
                    Snake.direction=1;
                }
                break;
            case 80: // press p to pause or resume
                if(this.running == 1 && this.stopped==0){
                    clearInterval(setInterval(this.run,1000/this.speedFactor));
                    this.running = 0;
                }
                else if(this.running ==0 && this.stopped==0){
                    this.engine = setInterval(this.run,1000/this.speedFactor);
                    this.running = 1;
                }
                else{
                    self.init();
                }
                break;
            case 82: // press r to restart
                if(this.stopped == 1){
                    self.init();
                }
                break;
            case 107: // press + to increase level and speed
                if(this.level<10 && this.stopped == 0){
                    this.level++;
                    this.speedFactor+=2;
                    Canvas.levelContainer.innerHTML=this.level+"";
                    clearInterval(this.engine);
                    this.engine = setInterval(this.run,1000/speedFactor);
                }
                break;
            case 109: // press - to decrease level and speed
                if(this.level>1 && this.stopped == 0){
                    this.level--;
                    this.speedFactor-=2;
                    Canvas.levelContainer.innerHTML=this.level+"";
                    clearInterval(this.engine);
                    this.engine = setInterval(this.run,1000/speedFactor);
                }
                break;
        }
    }

};

Engine.init();
