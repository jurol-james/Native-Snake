/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Canvas = __webpack_require__(1);
var Snake = __webpack_require__(2);
var Food = __webpack_require__(3);

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

        this.score = Food.updatePosition(Snake,Canvas,this);
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var Canvas = {
    canvas:document.getElementById("area"),
    context:null,
    dimensions:400,
    scoreContainer : document.getElementById("score"),
    levelContainer : document.getElementById("level"),
    gridSize:0,
    tileCount:0,

    init:function () {
        var self = Canvas;
        this.context = this.canvas.getContext("2d");
        self.canvas.width=this.dimensions;
        self.canvas.height=this.dimensions;
        self.gridSize=Math.sqrt(self.canvas.width);
        self.tileCount=Math.sqrt(self.canvas.width);
    },
    updateCanvas:function () {
        this.context.fillStyle="black";
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height);

    }

}

module.exports = Canvas;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var Snake = {
    position : {
        x : 0,
        y : 0
    },
    velocity : {
        x : 0,
        y : 0
    },
    trail : [],
    tail : 5,
    direction : -1,

    init:function (canvas) {
        var self=Snake;
        self.position.x=Math.floor(Math.random()*canvas.tileCount);
        self.position.y=Math.floor(Math.random()*canvas.tileCount);
        self.velocity.x=1;
        self.velocity.y=0;
        self.trail=[];
        self.tail = 5;
        self.direction = -1;
    },

    updatePosition:function (canvas) {
        var self=Snake;
        self.position.x += self.velocity.x;
        self.position.y += self.velocity.y;

        if(self.position.x < 0){
            self.position.x = canvas.tileCount - 1;
        }
        if(self.position.x > canvas.tileCount - 1){
            self.position.x = 0;
        }
        if(self.position.y < 0){
            self.position.y = canvas.tileCount - 1;
        }
        if(self.position.y > canvas.tileCount - 1){
            self.position.y = 0;
        }

    }

}

module.exports = Snake;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Food = {
    position:{
        x:0,
        y:0
    },

    init : function (canvas) {
        var self=Food;
        self.position.x=Math.floor(Math.random()*canvas.tileCount);
        self.position.y=Math.floor(Math.random()*canvas.tileCount);
    },
    renderGraphics : function (canvas) {
        canvas.context.fillStyle="yellow";
        canvas.context.fillRect(this.position.x * canvas.gridSize, this.position.y * canvas.gridSize, canvas.gridSize-5, canvas.gridSize-5);
    },
    updatePosition : function (snake,canvas,engine) {
        if(this.position.x == snake.position.x && this.position.y == snake.position.y){
            snake.tail++;
            this.position.x = Math.floor(Math.random()*canvas.tileCount);
            this.position.y = Math.floor(Math.random()*canvas.tileCount);
            return engine.level * 10;
        }
    }
}

module.exports = Food;

/***/ })
/******/ ]);