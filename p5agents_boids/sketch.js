// autonomous agents
//      [ ]steering of boids
//      [ ]autonomous behavior

// autnomous behavior involoves:
//      [ ]Action selection = strategy, goals and planning
//      [ ]steering         = path determination
//      [ ]locomotion       = animation, articulation

// these behaviours help in making life-like simulations
// and hence help in understanding the world around us.

// topic 2 - flocking
// three rules to produce the flocking simulation
//      [ ]alignment
//      [ ]cohesion
//      [ ]seperation

let vehicles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 100; i++) {
        vehicles.push(new Vehicle(random(width), random(height)));
    }
}

function draw() {
    background(0);

    for (let vehicle of vehicles) {
        vehicle.show();
        vehicle.flock(vehicles);
        vehicle.edges();
        vehicle.update();
    }
}
