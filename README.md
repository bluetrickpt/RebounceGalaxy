# RebounceGalaxy

My first attempt to build a game from scratch using the Phaser.io Engine.

The purpose of this game is for me to learn how to use the Phaser.io Engine and a little bit of javascript on the way whilst having fun.

The game consists of a simple rectangular arena where the player can move in a 2d perspective. Enemies while come from random points with different abilities and the player has to hunt them down. The only problem is that the player can "shoot" different elements and these elements won't disappear after the shot. That is, the shots will bounce off walls and enemies, damaging everything (even the player) on their way. So, the more the player shoots, the harder the game gets!

One gotta remember that with great firing power comes great responsability.

***

## Game Contents
The game contents are subject to change. This was my first plan/idea and it will probably need some changes through the development.

### Arena

The arena is the map where the player and the enemies will be able to move.
For my first version of the game, the arena will be a static(fixed size) rectangle where the walls reflect all the nature elements (see The nature elements below).

The arena can evolve to:
* Obstacles in the map that also bounce the elements and may or may not explode for example;
* Fixed range of view but arena bigger than the view. That is, the player may move and the view will move through the arena;
* Addition of fog or darkness that limits the visibility of the player;

### The player

Our player is a magician and can move in any 2D dimension with the uo/down/left/right arrows or the famous wasd. The player has the following properties:
* HitPoints (HP);
* Level. The level will change the HP of the player and the damage he inflicts.;
* Control(aka shoot) four nature elements: *Fire*, *Water*, *Earth*, *Lightning* (see below).
* (...);

### The nature elements

The nature elements are "fired" by the player (mouse left clik) towards the mouse cursor direction and may bounce from walls and from enemies/player on hit. Each of the elements the following properties:

* Speed - This is the speed of the element through the map;
* Bouncing Property - This will define where does the element bounces back or continues its path;
* Side Effect - This is an effect that is produced on hit on an enemy or on the player;
* Base damage - The damage produced on hit.

Thus, the elements are defined as: (subject to change)

| Element Table       | Fire          | Water         | Earth           | Lightning	  |
|   -------------     | :-----------: | :---:         | :---:           | :---:		  |
|**Speed**            | Fast          | Slowest       | Medium          | Fastest	  |
|**Bounce**           | Only on walls | Only on walls | From everything | From everything |
|**Temporarly effect**| burn          | Slows         | Knocks back     | None		  |
|**Base Damage**      | Medium        | Low           | Highest         | High		  |

Also interested in adding the following effects:
The water element, on hit, creates a temporary pool that slows in the area
The lightning moves in zigzag.

The different elements may be more effective against a certain type of enemy and weaker against another type (see Enemies below).

***

### Enemies

The enemies are the ones trying to attack the player. Therefore they must be eliminated!

An enemy is composed of:
* Type - see below the defined types of enemies;
* Speed - the movement speed;
* HitPoints (HP);
* Ranged - This defines if the enemy atacks from afar or at closed range.
* Weakness;
* Strength;

The types of enemies are: (Still a lot to define in therms of enemy stats...)

**Normal**: These are the regular type of monsters and they will persue the player wherever he goes.

*Stats*: Normal HP, normal damage, normal Speed, Closed range or ranged.

**Barriers**: These are the slowest walking enemies and they carry a piece of wall in their fronts that reflect all the attacks. Luckily the player can outrun them and fire from the sides.

*Stats*: Highest HP, High damage, Slow, Closed range.

**Runners**: These enemies will run in a straight line as fast as they can until they collide with a wall. Upon collision they stay temporary stunned. After the stun, they will rotate towards the position of the player and start running again. The player must move to avoid being caught on the linear trajectory, that is the Runner won't change the trajectory in the middle of the run doing a straight line defined by the runner position (after collision or spawn) and the position of the player when the runner started running.

*Stats*: Lowest HP, normal damage, fastest, closed range (uppon collision), stunned on collision with wall.

**Tunnels**: These type of enemy is capable of teleporting an element from one side to the other side, changing the trajectory and (possibly) the type of element! The only way to hit this enemy is in it's middle point, but the problem is that it keeps rotating and walking randomly trough the map! (I'll soon add an image here to ilustrate this type of enemy)

*Stats*: Normal HP, high damage, Slow, Closed range (uppon collision)

**Bosses**: These will show up randomly and (for now) will simply be one bigger replica of one of the other types with the stats boosted by a multiplier.

The weaknesses and strengths of the enemies may not be assigned to the type of enemy but ratter randomly on each enemy. This will have to be perceptible to the user and so the art has to change according to this property.

## Contributers:
This is the list of people that are/were involved with the project. So the thanks goes to them:
* bluetrickpt (https://github.com/bluetrickpt) - Working as developer (program and idea wise) 





