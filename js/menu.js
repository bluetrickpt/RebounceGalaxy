var Menu = {

    preload : function() {
        // Loading images is required so that later on we can create sprites based on the them.
        // The first argument is how our image will be refered to, 
        // the second one is the path to our file.
        game.load.image('menu_bg', './assets/images/startMenu_bg.png');
        game.load.image('menu_btn', './assets/images/startMenu_btn.png');
    },

    create: function () {
        
        //Menu background image
        this.add.sprite(0, 0, 'menu_bg');

        //Welcoming message
        this.add.text(game.width/4.5, game.height/8, 'Welcome! Please press start', { fontSize: '32px', fill: '#FFF' });

        //Start button
        var startButton = this.add.button(game.width/2 - 512/2*0.15, game.height/1.5, 'menu_btn', this.startGame, this);
        startButton.scale.setTo(0.15, 0.15);
    },

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Game');

    }

};