var game;
var player;
var cursors;

// Create a new game instance 800x600:
game = new Phaser.Game(800, 600, Phaser.AUTO, '');

//adds game states <key, state>
game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);

game.state.start('Menu');

