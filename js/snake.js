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