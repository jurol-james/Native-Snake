var Food = {
    position:{
        x:0,
        y:0
    },
    color:"white",

    init : function (canvas) {
        var self=Food;
        self.position.x=Math.floor(Math.random()*canvas.tileCount);
        self.position.y=Math.floor(Math.random()*canvas.tileCount);
    },
    renderGraphics : function (canvas) {
        canvas.context.fillStyle = Food.color;
        canvas.context.fillRect(this.position.x * canvas.gridSize, this.position.y * canvas.gridSize, canvas.gridSize-5, canvas.gridSize-5);
    },
    updatePosition : function (snake,canvas, engine) {
        if(Food.position.x == snake.position.x && Food.position.y == snake.position.y){
            snake.tail++;
            engine.score += 10* engine.level;
            for(var i = 0; i < snake.trail.length; i++){
                var newFoodPositionX = Math.floor(Math.random()*canvas.tileCount);
                var newFoodPositionY = Math.floor(Math.random()*canvas.tileCount);
                if(snake.trail[i].x != newFoodPositionX && snake.trail[i].y != newFoodPositionY) {
                    Food.position.x = newFoodPositionX;
                    Food.position.y = newFoodPositionY;
                    Food.color = canvas.getRandomColor()
                    break;
                }
            }

        }
    }
}

module.exports = Food;