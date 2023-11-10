title = "I Love Fishing";

description = `
`;

characters = [
`
  RR
  yy
  yy
llllll
 llll
  ll
`,`
BBB
`
];

const G = {
	WIDTH: 100,
	HEIGHT: 150
};

options = {
    viewSize: {x: G.WIDTH, y: G.HEIGHT}
};

/** @type {{angle: number, length: number, RodEnd: Vector}} */
let Rod;
const RodLength = 7;
// Let bubbles be an array made of Bubble objects
/**
 * @typedef {{
 * pos: Vector,
 * speed: number
 * }} Bubble
 */

/**
 * @type { Bubble [] }
 */
let bubbles;

// Streams at the top of water
/**
 * @typedef {{
* pos: Vector,
* speed: number
* }} Stream
*/

/**
* @type { Bubble [] }
*/
let stream;

// Clouds in Sky
/**
 * @typedef {{
* pos: Vector,
* speed: number
* }} Clouds
*/

/**
* @type { Bubble [] }
*/
let clouds;

// Define a boat
/**
 * @typedef {{
 * pos: Vector
 * }} Boat
 */

/**
 * @type { Boat }
 */
let boat;
let turnaround = 2.5;
function update() {
  if (!ticks) {
    // Initialize objects
    boat = {
        pos: vec(10, 41)
    };
    Rod = { angle: 0, length: RodLength, RodEnd: vec(40, 20)};
  
    bubbles = times(20, () => {
        const posX = rnd(0, G.WIDTH);
        const posY = rnd(50, G.HEIGHT);
        return {
            pos: vec(posX, posY),
            speed: rnd(0.3, .8)
        };
    });

    stream = times(7, () => {
      const posX = rnd(0, G.WIDTH);
      const posY = rnd(50, G.HEIGHT);
      return {
          pos: vec(posX, posY),
          speed: rnd(0.2, .4)
      };
  });

    clouds = times(3, () => {
      const posX = rnd(0, G.WIDTH);
      const posY = rnd(50, G.HEIGHT);
      return {
          pos: vec(posX, posY),
          speed: rnd(0.1, .2)
      };
    });
  }
  //Draw Sky
  color("light_blue");
  line(0, 0, 100, 0, 107);
  //Draw Sun
  color("yellow");
  //Draw Clouds
  box(70, 7, 7);
  // Draw water
  color("blue");
  line(0, 97, 100, 97, 107);
  //Spawn each bubble
  bubbles.forEach((b) => {
    b.pos.x += b.speed;
    // Bring the bubble back to left once it's past the right screen
    b.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);
    color("light_blue");
    box(b.pos, 1, 1);
    });
  //spawn each stream
  stream.forEach((b) => {
    b.pos.x += b.speed;
    // Bring the Stream back to left once it's past the right screen
    b.pos.wrap(0, 100, 45, 50);
    color("white");
    box(b.pos, 3, 1);
    });

  clouds.forEach((b) => {
    b.pos.x += b.speed;
    // Bring the Clouds back to left once it's past the right screen
    b.pos.wrap(0, 100, 0, 20);
    color("white");
    box(b.pos, 8 , 3);
    });


    //draw rod handle
    color("light_yellow");
    line(12, 40, 40, 20, 2);
    // Draw a boat
    color("black");
    char("a", boat.pos);
  
    //Input
    if (input.isPressed) {
      //Wire Extend
      Rod.length += 1.5;
    } else {
      //Wire Retract
      Rod.length += (RodLength - Rod.length) * 0.5;
      //Wire Swining
      if(Rod.angle < turnaround) {
        turnaround = 2.5;
        Rod.angle += 0.03;
      }
      else {
        turnaround = .3;
        Rod.angle -= 0.03;
      }
      if(Rod.angle >= 2.5 || Rod.angle <= .3) {
        Rod.length = 0;
      }
    }
    color("light_red");
    //Draw rodwire
    line(Rod.RodEnd, vec(Rod.RodEnd).addWithAngle(Rod.angle, Rod.length), 2);

}