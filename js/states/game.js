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
        game.load.image('earth', 'assets/gfx/earth.png');
        game.load.image('lightning', 'assets/gfx/lightning.png');
        game.load.spritesheet('normalEnemy', 'assets/gfx/enemy_normal.png', 96, 96);
    },

    create : function() {

        // Set up a Phaser controller for keyboard input.
        cursors = game.input.keyboard.createCursorKeys();

        //Using arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'game_bg');

        Player.createPlayer('player');
        Enemies.createPools();
    },

    update: function() {
        // The update function is called constantly at a high rate (somewhere around 60fps),

        Player.handleInput();

        //Start spawning enemies
        Enemies.spawnEnemy();

        //Check collisions
        game.physics.arcade.overlap(Player.getPlayer(), [Player.firePool, Player.waterPool, Player.earthPool, Player.lightningPool], Elements.hit, null, Elements);
        game.physics.arcade.overlap(Enemies.normalEnemyPool, [Player.firePool, Player.waterPool, Player.earthPool, Player.lightningPool], Elements.hit, null, Elements);
        game.physics.arcade.overlap(Player.waterPool, Player.firePool, Elements.waterFireCollision, null, Elements);
        game.physics.arcade.overlap(Player.earthPool, Player.lightningPool, Elements.earthLightningCollision, null, Elements);
        game.physics.arcade.overlap(Player.getPlayer(), Enemies.normalEnemyPool, Elements.hit, null, Elements);

        Player.firePool.forEachAlive(Collisions.handleBoundCollisions, this);
        Player.waterPool.forEachAlive(Collisions.handleBoundCollisions, this);
        Player.earthPool.forEachAlive(Collisions.handleBoundCollisions, this);
        Player.lightningPool.forEachAlive(Collisions.handleBoundCollisions, this);
    

        Enemies.normalEnemyPool.forEachAlive(Enemies.persuePlayer, Enemies, Player.getPlayer());

    }


};
