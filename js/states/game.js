// The shooting stuff was based on http://gamemechanicexplorer.com/#bullets-2
// Copyright © 2014 John Watson
// Licensed under the terms of the MIT License


var Game = {

    preload : function() { 
        //Load our resources
        game.load.image('game_bg', 'assets/gfx/game_bg.png');
        game.load.spritesheet('player', 'assets/gfx/player.png', 32, 48);
        game.load.image('fire', 'assets/gfx/fire.png');
        game.load.image('water', 'assets/gfx/water.png');
    },

    create : function() {

        // Set up a Phaser controller for keyboard input.
        cursors = game.input.keyboard.createCursorKeys();

        //Using arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'game_bg');

        Player.createPlayer('player');
    },

    update: function() {
        // The update function is called constantly at a high rate (somewhere around 60fps),

        Player.handleInput();
        //Check colision between player and fireBullets
        game.physics.arcade.overlap(Player.getPlayer(), [Player.firePool, Player.waterPool], Player.hit, null, Player);
        
        Player.firePool.forEachAlive(Collisions.handleBoundCollisions, this);
        Player.waterPool.forEachAlive(Collisions.handleBoundCollisions, this);
    }


};
