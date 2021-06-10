// autonomous agents
//      [ ]steering of boids
//      [ ]autonomous behavior

// autnomous behavior involoves:
//      [ ]Action selection = strategy, goals and planning
//      [ ]steering         = path determination
//      [ ]locomotion       = animation, articulation

// these behaviours help in making life-like simulations
// and hence help in understanding the world around us.

// topic 1 - seeking and physics engine

// this vehicle is a Braitenberg vehicle
// this has senses and can react according to the environment
// it has synthetic psychology
let vehicle;

function setup() {
    createCanvas(windowWidth, windowHeight);
    vehicle = new Vehicle(width / 2, height / 2);
}

function draw() {
    background(0);
    // the target of the Braitenberg vehicle is set as the mouse pointer
    let mouse = createVector(mouseX, mouseY);

    // vehicle processes
    vehicle.show();
    vehicle.seek(mouse);
    vehicle.update();
}
