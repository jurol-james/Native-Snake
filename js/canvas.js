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