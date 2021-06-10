# autonomous-agents
A study of autonomous agents with theoretical and practical perspective. This is to improve my understandings of simple motions and physical world simulations

the first topic is action selection, seeking and locomotive simulation using a physical engine(Euler integration in htis case)

physics engine:
  -motion simulation by discrete position updates:
  
  ```
      update() {
        // Euler integration for motion simulation
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.set(0, 0);
    }
  ```
 
 steering motion:
  -seeking algorithm using steering equations
  
  ```
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
  ```
 
  
