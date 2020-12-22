const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth; //document.width is obsolete
canvas.height = window.innerHeight; //document.height is obsolete

let width = canvas.width;
let height = canvas.height;

let nodes = [];
let bonds = [];

const maxSpeed = 2;
const pull = 0.005;
const maxPull = 1;
const burst = 0.0002;
const maxBurst = 1.2;

const dampen = 0.009;

// make nodes
for(var i = 0; i < 80; i++){
    let new_node = new Node(Math.random()*width, Math.random()*height, 3);
    new_node.setV((Math.random()-0.5)*2, (Math.random()-0.5)*2);
    nodes.push(new_node);
}
// make bonds
for(var i = 0; i < nodes.length; i++){
    for(var a = 0; a < nodes.length; a++){
        if (a != i){
            let xDist = nodes[a].x-nodes[i].x;
            let yDist = nodes[a].y-nodes[i].y;
            let dist = Math.sqrt(Math.pow(xDist, 2)+Math.pow(yDist, 2));
            let s = dist/width;
            if (dist > 200){
                s = 0;
            }
            bonds.push(new Bond(nodes[i], nodes[a], 1.5, s));
        }
    }
}

setInterval(() => {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < nodes.length; i++){
        for(var a = 0; a < nodes.length; a++){
            if (a != i){
                let xDist = (nodes[a].x-nodes[i].x);
                let yDist = (nodes[a].y-nodes[i].y);
                nodes[i].addForce(Math.min(pull/xDist, maxPull), Math.min(pull/yDist, maxPull));
                nodes[i].addForce(Math.min(burst/(xDist*xDist*xDist), maxBurst), Math.min(burst/(yDist*yDist*yDist), maxBurst));
            }
        }
        if (nodes[i].x < 0 || nodes[i].y < 0 || nodes[i].x > width || nodes[i].y > height){
            nodes[i].addForce((width/2-nodes[i].x)/width*0.1, (height/2-nodes[i].y)/height*0.1)
        }
        nodes[i].clipSpeed(maxSpeed);
        nodes[i].dampen(dampen)

        nodes[i].update();
        nodes[i].draw();
        
    }
    for(var i = 0; i < bonds.length; i++){
        bonds[i].update();
        bonds[i].draw();
        if (bonds[i].strength <= 0){
            //bonds.pop(i);
        }
    }
}, 33);

sign = function(val){
    if (val >= 0){
        return 1;
    }else{
        return -1;
    }
}