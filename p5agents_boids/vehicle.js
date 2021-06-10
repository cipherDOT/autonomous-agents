// The Vehicle object is a Braitenberg vehicle with synthetic virtual senses
// and reacts to changes in the enviroinment by analysing it
// In this case the vehicle follows the mouse with a maximum speed and maximum applicable force

class Vehicle {
    constructor(origin_x, origin_y) {
        this.location = createVector(origin_x, origin_y);
        this.velocity = createVector(random(2), random(2));
        this.acceleration = createVector(0, 0);
        this.maximum_speed = 4;
        this.maximum_force = 0.2;
        this.tail = 20; // the hypotenuse(length of the tail)
        this.perception_radius = 75;
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

    edges() {
        if (this.location.x > width) {
            this.location.x = 0;
        } else if (this.location.x < 0) {
            this.location.x = width;
        }

        if (this.location.y > height) {
            this.location.y = 0;
        } else if (this.location.y < 0) {
            this.location.y = height;
        }
    }

    update() {
        // Euler integration for motion simulation
        this.location.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maximum_speed);
        this.acceleration.set(0, 0);
    }

    steer(target) {
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

    // the alignment forces determine the velocity of the vehicle
    // it makes the desired direction of movement the direction of the
    // average velocity vector of the local group
    align(vehicles) {
        let alignment_direction = createVector();
        let total_neighbours = 0;
        for (let other of vehicles) {
            let distance = dist(
                this.location.x,
                this.location.y,
                other.location.x,
                other.location.y
            );

            if (other != this && distance <= this.perception_radius) {
                alignment_direction.add(other.velocity);
                total_neighbours++;
            }
        }
        if (total_neighbours > 0) {
            alignment_direction.div(total_neighbours);
            alignment_direction.setMag(this.maximum_speed);
            alignment_direction.sub(this.velocity);
            alignment_direction.limit(this.maximum_force);
        }

        return alignment_direction;
    }

    // cohesion is also another important rule in flocking as it
    // makes the vehicles move towards the center of the local group
    // this results in life like simulations
    cohesion(vehicles) {
        let cohesion_direction = createVector();
        let total_neighbours = 0;
        for (let other of vehicles) {
            let distance = dist(
                this.location.x,
                this.location.y,
                other.location.x,
                other.location.y
            );

            if (other != this && distance <= this.perception_radius) {
                cohesion_direction.add(other.location);
                total_neighbours++;
            }
        }
        if (total_neighbours > 0) {
            cohesion_direction.div(total_neighbours);
            cohesion_direction.sub(this.location);
            cohesion_direction.setMag(this.maximum_speed);
            cohesion_direction.sub(this.velocity);
            cohesion_direction.limit(this.maximum_force);
        }

        return cohesion_direction;
    }

    // seperation is the rule to avoid other vehicles in the
    // local group to stop crashing/colliding into each other
    // and also produces life like simulations of the
    // local group monobehaviour
    seperation(vehicles) {
        let seperation_direction = createVector();
        let total_neighbours = 0;
        for (let other of vehicles) {
            let distance = dist(
                this.location.x,
                this.location.y,
                other.location.x,
                other.location.y
            );

            if (other != this && distance <= this.perception_radius) {
                let difference = p5.Vector.sub(this.location, other.location);
                difference.div(distance);
                seperation_direction.add(difference);
                total_neighbours++;
            }
        }
        if (total_neighbours > 0) {
            seperation_direction.div(total_neighbours);
            seperation_direction.setMag(this.maximum_speed);
            seperation_direction.sub(this.velocity);
            seperation_direction.limit(this.maximum_force);
        }

        return seperation_direction;
    }

    // the flock function to apply all the forces
    // in play to set the resultant force acting on the body
    flock(vehicles) {
        let alignment = this.align(vehicles);
        let cohesion = this.cohesion(vehicles);
        let seperation = this.seperation(vehicles);
        this.apply_force(alignment);
        this.apply_force(cohesion);
        this.apply_force(seperation);
    }
}
