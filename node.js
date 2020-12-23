class Node {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.r = r;
        this.fill = '#999999'
        this.stroke = '#DDDDDD'
    }
    draw = function () {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    };
    update = function () {
        this.x += this.vx;
        this.y += this.vy;
    };
    setV = function(vx, vy){
        this.vx = vx;
        this.vy = vy;
    }
    addForce = function(x, y){
        this.vx += x;
        this.vy += y;
    }
    clipSpeed = function(speed){
        this.vx = Math.min(this.vx, speed);
        this.vy = Math.min(this.vy, speed);
        this.vx = Math.max(this.vx, -speed);
        this.vy = Math.max(this.vy, -speed);
    }
    dampen = function (amount){
        this.addForce(-this.vx*amount, -this.vy*amount);
    }
}
class Bond{
    constructor(node1, node2, strokeWidth, strength) {
        this.node1 = node1;
        this.node2 = node2;
        this.strokeWidth = strokeWidth;
        this.stroke = '#DDD'
        this.strength = strength;
    }
    draw = function () {
        if (this.strength > 0){
            ctx.beginPath();
            let power = Math.min(this.strength+0.3, 0.7)
            ctx.lineWidth = this.strokeWidth*power;
            ctx.strokeStyle = '#'+toHex(Math.ceil(power*255)).repeat(3); //this.stroke;
            ctx.moveTo(this.node1.x, this.node1.y);
            ctx.lineTo(this.node2.x, this.node2.y);
            ctx.stroke();
            ctx.fillStyle = '#FFFFFF';
            //ctx.fillText(String(Math.round(this.strength*100)/100), (this.node1.x+this.node2.x)/2, (this.node1.y+this.node2.y)/2);
        }
    };
    update = function () {
        let xDist = this.node2.x-this.node1.x;
        let yDist = this.node2.y-this.node1.y;
        let length2 = Math.sqrt(Math.pow(xDist, 2)+Math.pow(yDist, 2));
        // length2 / Math.pow(Math.max(width, height), 2) -0.5
        this.strength +=   (1/length2 - 0.008)*3;
        this.strength = Math.max(Math.min(this.strength, 1), 0);
    };
}
function toHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }