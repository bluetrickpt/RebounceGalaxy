// The shooting stuff was based on http://gamemechanicexplorer.com/#bullets-2
// With the needed change
// which is
// Copyright © 2014 John Watson
// Licensed under the terms of the MIT License

var Game = {

    preload : function() { 
        //Load our resources
        game.load.image('game_bg', 'assets/images/game_bg.png');
        game.load.spritesheet('player', 'assets/images/player.png', 32, 48);
        game.load.image('fire', 'assets/images/fire.png')
    },

    create : function() {
        //Stop space event from going to browser (prevents page down on space click)
        game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR);

        // Set up a Phaser controller for keyboard input.
        cursors = game.input.keyboard.createCursorKeys();

        //Using arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'game_bg');

        // The player and its settings
        player = game.add.sprite(game.world.width/2, game.world.height/2, 'player');

        //  Enable arcade physics over player
        game.physics.arcade.enable(player);
        //Set the physics to the player
        player.body.collideWorldBounds = true;
        player.anchor.setTo(0.5,0.5);


        //  Player walking animations
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        //shot delay
        this.SHOT_DELAY = 100; // milliseconds 
        this.NUMBER_OF_SHOTS = 25; //Max shots currently fired

        this.firePool = game.add.group();
        this.firePool.enableBody = true;

        for(var i=0; i <this.NUMBER_OF_SHOTS; i++){
            var fireShot = game.add.sprite(0,0,'fire');
            fireShot.anchor.setTo(0.5,0.5);

            this.firePool.add(fireShot);
            game.physics.arcade.enable(fireShot);
            //fireShot.body.collideWorldBounds = true; //To bounce
            fireShot.checkWorldBounds = true;
            fireShot.events.onOutOfBounds.add(this.boundsCollision, this);
            fireShot.body.bounce.setTo(1,1);

            //The shot starts dead to be revived upon shot trigger
            fireShot.kill();
        }

    },

    update: function() {
        // The update function is called constantly at a high rate (somewhere around 60fps),
        this.handleInput();

        game.physics.arcade.overlap(player, this.firePool, this.hit, null, this);
    },

    handleInput: function() {
        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        var playerMoving = false;

        var leftIsDown = cursors.left.isDown || game.input.keyboard.isDown(Phaser.KeyCode.A);
        var rightIsDown = cursors.right.isDown || game.input.keyboard.isDown(Phaser.KeyCode.D);
        var upIsDown = cursors.up.isDown || game.input.keyboard.isDown(Phaser.KeyCode.W);
        var downIsDown = cursors.down.isDown || game.input.keyboard.isDown(Phaser.KeyCode.S);

        if (leftIsDown){ //Move left

            player.body.velocity.x = -250;
            player.animations.play('left');
            playerMoving = true;

        } else if (rightIsDown) { //move right

            player.body.velocity.x = 250;
            player.animations.play('right');
            playerMoving = true;
        } 

        if (upIsDown) { //move up
            player.body.velocity.y = -250;
            playerMoving = true;

        } else if (downIsDown) { //move down
            player.body.velocity.y = 250;
            playerMoving = true;
        } 

        if (!playerMoving) { //Idle animation
            //  Stand still
            player.animations.stop();
            player.frame = 4;
        } else {
            if(player.body.velocity.x != 0 && player.body.velocity.y != 0) {
                //Normalyze speed
                player.body.velocity.x /= Math.sqrt(2);
                player.body.velocity.y /= Math.sqrt(2);

            }
        }

        if(game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)){ //emulate dead
            this.state.start('Game_Over');
        }

        if (game.input.activePointer.isDown) {
            this.shootElement();
        }
    },

    shootElement : function() {
        //TODO: Add different elements

        // Enforce a short delay between shots by recording
        // the time that each bullet is shot and testing if
        // the amount of time since the last shot is more than
        // the required delay.
        if (this.lastShotAt === undefined) this.lastShotAt = 0;
        if (game.time.now - this.lastShotAt < this.SHOT_DELAY) return;
        this.lastShotAt = game.time.now;

        var elementToShoot = this.firePool.getFirstDead();

        // If there aren't any bullets available then don't shoot
        if(elementToShoot === null || elementToShoot === undefined) return;
        
        // Revive the elementToShoot
        // This makes the elementToShoot "alive"
        elementToShoot.revive();

        // Set the bullet position to the gun position.
        var xOffset = player.x + Math.cos(game.physics.arcade.angleToPointer(player)) * player.width;
        var yOffset = player.y + Math.sin(game.physics.arcade.angleToPointer(player)) * player.height;
        elementToShoot.reset(xOffset, yOffset);
        //aim from player to mouse
        elementToShoot.rotation = game.physics.arcade.angleToPointer(player);

        // Shoot it in the right direction
        elementToShoot.body.velocity.x = Math.cos(elementToShoot.rotation) * 100;
        elementToShoot.body.velocity.y = Math.sin(elementToShoot.rotation) * 100;
    },

    boundsCollision : function(element) {
        console.log("hello");
        element.rotation += Math.PI;
        element.body.velocity.x = Math.cos(element.rotation) * 100;
        element.body.velocity.y = Math.sin(element.rotation) * 100;
    },

    hit : function(being, element) {
        console.log("Player hit")
    }




};
