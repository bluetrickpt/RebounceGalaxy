//Global variables
var game;
var cursors;

// Create a new game instance 800x600. Phaser_AUTO chooses WebGL if available or simple HTML5 canvas if not
game = new Phaser.Game(800, 600, Phaser.AUTO, '');

//adds game states <key, state>
game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);

//Start the game at the menu state
game.state.start('Menu');

