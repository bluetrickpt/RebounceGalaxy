//The Game Over game state

var Game_Over = {

    preload : function() {
        // Load the needed image for this game screen.
        game.load.image('gameover_bg', 'assets/gfx/gameover_bg.png');
    },

    create : function() {

        // Create button to start game like in Menu.
        this.add.button(0, 0, 'gameover_bg', this.startGame, this);

        // Sugestive text for restart
        game.add.text(50, game.world.height-100, "Click anywhere to restart", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
        
        // KeyboardEventListener
        //this.input.keyboard.addCallbacks(this, null, null, this.handleInput);
    },

    startGame: function () {

        // Change the state back to Game.
        this.state.start('Game');

    },

    handleInput: function() { //Every key pressed will re-start game
        this.state.start('Game');
    }



};
