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

        Engine.score=0;
        Engine.level=1;
        Engine.speedFactor = 10;
        Engine.running = 1;
        Engine.stopped = 0;
        Engine.engine = setInterval(Engine.run,1000/Engine.speedFactor);

        Canvas.levelContainer.innerHTML = Engine.level+ "";

        document.addEventListener("keydown", Engine.keyPush);
        document.addEventListener("keypress", Engine.keyPush);

    },
    run : function () {

    },
    stop : function () {
        Engine.running = 0;
        Engine.stopped = 1;
        clearInterval(Engine.engine);
    },
    keyPush : function (event) {
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
                if(Engine.running == 1 && Engine.stopped==0){
                    clearInterval(Engine.engine);
                    Engine.running = 0;
                }
                else if(Engine.running ==0 && Engine.stopped==0){
                    Engine.engine = setInterval(Engine.run,1000/Engine.speedFactor);
                    Engine.running = 1;
                }
                else{
                    Engine.init();
                }
                break;
            case 82: // press r to restart
                if(Engine.stopped == 1){
                    Engine.init();
                }
                break;
            case 107: // press + to increase level and speed
                if(Engine.level<10 && Engine.stopped == 0){
                    Engine.level++;
                    Engine.speedFactor+=2;
                    Canvas.levelContainer.innerHTML=Engine.level+"";
                    clearInterval(Engine.engine);
                    Engine.engine = setInterval(Engine.run,1000/Engine.speedFactor);
                }
                break;
            case 109: // press - to decrease level and speed
                if(Engine.level>1 && Engine.stopped == 0){
                    Engine.level--;
                    Engine.speedFactor-=2;
                    Canvas.levelContainer.innerHTML=Engine.level+"";
                    clearInterval(Engine.engine);
                    Engine.engine = setInterval(Engine.run,1000/Engine.speedFactor);
                }
                break;
        }
    }

};

Engine.init();
