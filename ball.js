function Ball(random_pos = true, radius = 1.1, velocity = 5) {

    if (random_pos) {
        r_position = random(80, height / 2);
        alpha_position = random(0, 2 * PI);
    } else {
        r_position = 0;
        alpha_position = 1;
    }

    this.position = createVector(width / 2 + r_position * cos(alpha_position), height / 2 + r_position * sin(alpha_position));
    // Maxwell - Boltzmann
    if (velocity > 0) {
        this.velocity = createVector(randomGaussian(0, velocity), randomGaussian(0, velocity));
    } else {
        this.velocity = createVector(0, 0);
    }
    
    this.radius = radius;
    this.b_color = 0;

    this.m = radius ** 2; // we asume equal densities


    this.update = function () {
        this.checkBoundaries();
        this.position.add(this.velocity);
    }

    this.checkBoundaries = function () {
        if (this.position.x + this.radius > width) {
            this.position.x = width - this.radius;
            this.velocity.x *= -1;
        } else if (this.position.x - this.radius < 0) {
            this.position.x = this.radius;
            this.velocity.x *= -1;
        } else if (this.position.y + this.radius > height) {
            this.position.y = height - this.radius;
            this.velocity.y *= -1;
        } else if (this.position.y - this.radius < 0) {
            this.position.y = this.radius;
            this.velocity.y *= -1;
        }
    }

    this.checkCollision = function (j) {
        var other = balls[j];
        distanceVect = p5.Vector.sub(other.position, this.position);
        distanceVectMag = distanceVect.mag();

        minDistance = this.radius + other.radius;

        if (distanceVectMag < minDistance) {

            theta = distanceVect.heading();
            sine = sin(theta);
            cosine = cos(theta);

            bTemp = [createVector(), createVector()];
            bTemp[1].x = cosine * distanceVect.x + sine * distanceVect.y;
            bTemp[1].y = cosine * distanceVect.y - sine * distanceVect.x;

            vTemp = [createVector(), createVector()];

            vTemp[0].x = cosine * this.velocity.x + sine * this.velocity.y;
            vTemp[0].y = cosine * this.velocity.y - sine * this.velocity.x;
            vTemp[1].x = cosine * other.velocity.x + sine * other.velocity.y;
            vTemp[1].y = cosine * other.velocity.y - sine * other.velocity.x;

            vFinal = [createVector(), createVector()];

            vFinal[0].x = ((this.m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) / (this.m + other.m);
            vFinal[0].y = vTemp[0].y;

            vFinal[1].x = ((other.m - this.m) * vTemp[1].x + 2 * this.m * vTemp[0].x) / (this.m + other.m);
            vFinal[1].y = vTemp[1].y;

            // hack to avoid clumping
            bTemp[0].add(vFinal[0]);
            bTemp[1].add(vFinal[1]);

            // Rotate ball positions and velocities back
            // Reverse signs in trig expressions to rotate 
            // in the opposite direction 
            bFinal = [createVector(), createVector()];

            bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
            bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
            bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
            bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

            // update balls to screen position
            other.position.x = this.position.x + bFinal[1].x;
            other.position.y = this.position.y + bFinal[1].y;

            this.position.add(bFinal[0]);

            // update velocities
            this.velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
            this.velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
            other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
            other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
            balls[j] = other;
        }
    }

    this.draw = function () {

        colorMode(HSB, 360, 100, 100);        
        this.b_color = map(this.velocity.mag(), 0, max_velocity, 0, 360);
        fill(this.b_color, 100, 100)

        if (this.m < 200) {
            
            stroke(this.b_color, 100, 100);
        } else {
            stroke(0, 0, 100);
        }
        colorMode(RGB, 255, 255, 255);
        ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    }

}