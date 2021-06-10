// The Vehicle object is a Braitenberg vehicle with synthetic virtual senses
// and reacts to changes in the enviroinment by analysing it
// In this case the vehicle follows the mouse with a maximum speed and maximum applicable force

class Vehicle {
    constructor(origin_x, origin_y) {
        this.location = createVector(origin_x, origin_y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.maximum_speed = 8;
        this.maximum_force = 0.2;
        this.tail = 20; // the hypotenuse(length of the tail)
    }

    show() {
        stroke(40, 120, 255);
        strokeWeight(4);

        // the x_offset of the tail is given by = cos(theta)*hypotenuse, and similarly,
        // the y_offset of the tail is given by = sin(theta)*hypotenuse
        line(
            this.location.x,
            this.location.y,
            this.location.x - cos(this.velocity.heading()) * this.tail,
            this.location.y - sin(this.velocity.heading()) * this.tail
        );
    }

    apply_force(force) {
        // since the mass is assumed to be 1
        // the acceleration becoomes,
        //      F = ma
        //      F = (1)a
        //      F = a

        // for multiple forces to work, the forces are added vectorially to the acceleration
        this.acceleration.add(force);
    }

    update() {
        // Euler integration for motion simulation
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.set(0, 0);
    }

    seek(target) {
        // the desire direction is calculated by
        //      desired direction = target - current location

        let desired_direction = p5.Vector.sub(target, this.location);

        // normalize and scale the desired direction to maximum speed
        desired_direction.setMag(this.maximum_speed);

        // steering = desired - velocity
        let steering_force = p5.Vector.sub(desired_direction, this.velocity);
        steering_force.limit(this.maximum_force);

        this.apply_force(steering_force);
    }
}
