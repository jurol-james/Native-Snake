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
    updatePosition : function (snake,canvas, engine) {
        if(Food.position.x == snake.position.x && Food.position.y == snake.position.y){
            snake.tail++;
            Food.position.x = Math.floor(Math.random()*canvas.tileCount);
            Food.position.y = Math.floor(Math.random()*canvas.tileCount);
            engine.score += 10* engine.level;
        }
    }
}

module.exports = Food;