# mars-rover-challenge

A fun coding challenge

The only requirement is having node ^4.3.0 with npm ^3.7.5 installed  
To run the challenge perform the following commands.

```
npm install
npm start
```

To run the mocha tests 
```
npm test
```

### Feedback
I enjoyed this challenge. I spent about 4 hours of actual coding time, spread over the day (commute, lunch, evening)
to get to this point, though I'd happily continue for longer. I didn't get to finish as much as I would have liked 
but I prefer to do things right and not rush and end up with buggy untested code. 

- I used a TDD approach and committed regularly each dealing with a single concern.
- Linting and Tests must pass before committing and pushing is allowed.
- I chose to write it in node since there was no requirement for a nice user interface and was instructed to keep
it simple, so I focused on solving the core problem.
- It has been written in a way that it
can easily be extended/decorated with a nice user interface later.

#### Tech stack
- **engine:** node & npm
- **build tools:** node scripts & git hooks
- **language version:** es2015
- **transpiler:** babel
- **linting:** eslint
- **test runner:** mocha
- **assertion library:** chai

### Todo
- Create a missionControl module that handles parsing the mission from a text file, creating/linking
the grid and rovers together then executing instructions
- get index.js to use the missionControl module
- use a build tool like webpack or gulp to create a prod build
- add integration/acceptance BBD tests using cucumber.js -  e.g. something like this...
    ```
    Given a grid of "5" "3"
    AND a rover named "rover1" starting at "1" "1" "E"
    WHEN i execute Instructions "RFRFRFRF" for "rover1" 
    THEN "rover1" should be at "1" "1" "E"
    ```
- add a client side user interface likely in React, where it can accept the Grid and Rovers as props then draw them.

### The Problem: Martian Robots

The surface of Mars can be modelled by a rectangular grid around which robots are able to
move according to instructions provided from Earth. You are to write a program that
determines each sequence of robot positions and reports the final position of the robot.

A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by
y-coordinate) and an orientation (N, S, E, W for north, south, east, and west).
A robot instruction is a string of the letters “L”, “R”, and “F” which represent, respectively, the

**Instructions:**
- Left : the robot turns left 90 degrees and remains on the current grid point.
- Right : the robot turns right 90 degrees and remains on the current grid point.
- Forward : the robot moves forward one grid point in the direction of the current orientation and maintains the same orientation.

The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1).
There is also a possibility that additional command types may be required in the future and
provision should be made for this.

Since the grid is rectangular and bounded (...yes Mars is a strange planet), a robot that
moves “off” an edge of the grid is lost forever. However, lost robots leave a robot “scent” that
prohibits future robots from dropping off the world at the same grid point. The scent is left at
the last grid position the robot occupied before disappearing over the edge. An instruction to
move “off” the world from a grid point from which a robot has been previously lost is simply
ignored by the current robot.

### The Input

The first line of input is the upper-right coordinates of the rectangular world, the lower-left
coordinates are assumed to be 0, 0.

The remaining input consists of a sequence of robot positions and instructions (two lines per
robot). A position consists of two integers specifying the initial coordinates of the robot and
an orientation (N, S, E, W), all separated by whitespace on one line. A robot instruction is a
string of the letters “L”, “R”, and “F” on one line.

Each robot is processed sequentially, i.e., finishes executing the robot instructions before the
next robot begins execution.

The maximum value for any coordinate is 50.

All instruction strings will be less than 100 characters in length.

### The Output

For each robot position/instruction in the input, the output should indicate the final grid
position and orientation of the robot. If a robot falls off the edge of the grid the word “LOST”
should be printed after the position and orientation.

### Sample Input

```
5 3  
1 1 E  
RFRFRFRF

3 2 N  
FRRFLLFFRRFLL

0 3 W  
LLFFFLFLFL
```

### Sample Output

```
1 1 E  
3 3 N LOST  
2 3 S
```
