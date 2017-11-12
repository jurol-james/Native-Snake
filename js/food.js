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
    updatePosition : function (snake,canvas,level) {
        if(this.position.x == snake.position.x && this.position.y == snake.position.y){
            snake.tail++;
            this.position.x = Math.floor(Math.random()*canvas.tileCount);
            this.position.y = Math.floor(Math.random()*canvas.tileCount);
            return level * 10;
        }
    }
}

module.exports = Food;