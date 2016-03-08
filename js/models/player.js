
var Player = {


	createPlayer : function(playerSpriteKey) {
		if(game && playerSpriteKey){
			//The gameObject will be the instance of the player Class
			this.instance = game.add.sprite(game.world.width/2, game.world.height/2, playerSpriteKey);
			//  Enable arcade physics over player
	        game.physics.arcade.enable(this.instance);
	        //Set the physics to the player
	        this.instance.body.collideWorldBounds = true;
	        //Set size to perfectly fit the image bounds
	        this.instance.body.setSize(20, 32, 5, 16);
	        this.instance.anchor.setTo(0.5,0.5);
	        //  Player walking animations
	        this.instance.animations.add('left', [0, 1, 2, 3], 10, true);
	        this.instance.animations.add('right', [5, 6, 7, 8], 10, true);
			
	        this.hpText = game.add.text(game.width - 128, 16, 'HP: 100', { fontSize: '32px', fill: '#FFF' });

			//Player Stats
			this.instance.hp = 100;
			this.instance.movSpeed = 200;

			//shot delay
	        this.SHOT_DELAY = 100; // milliseconds 
	        this.NUMBER_OF_SHOTS = 25; //Max shots currently fired for each element

	        //Creates the pools (containers) of the elements to be shot
	        Elements.createPools(this);

	        //Default active element is fire
	        this.activeElementPool = this.firePool;

	        //Hit delay. The player can't be hit by the same element object
	        //within this time
	        this.HIT_DELAY = 350; //msecs
		}

	},

	getPlayer : function (){ 
		if(this.instance)
			return this.instance;
	},

	handleInput : function() {
		if(this.instance){ //
			//  Reset the players velocity (movement)
	        this.instance.body.velocity.x = 0;
	        this.instance.body.velocity.y = 0;
	        var playerMoving = false;

	        var leftIsDown = cursors.left.isDown || game.input.keyboard.isDown(Phaser.KeyCode.A);
	        var rightIsDown = cursors.right.isDown || game.input.keyboard.isDown(Phaser.KeyCode.D);
	        var upIsDown = cursors.up.isDown || game.input.keyboard.isDown(Phaser.KeyCode.W);
	        var downIsDown = cursors.down.isDown || game.input.keyboard.isDown(Phaser.KeyCode.S);

	        if (leftIsDown){ //Move left

	            this.instance.body.velocity.x = -this.instance.movSpeed;
	            this.instance.animations.play('left');
	            playerMoving = true;

	        } else if (rightIsDown) { //move right

	            this.instance.body.velocity.x = this.instance.movSpeed;
	            this.instance.animations.play('right');
	            playerMoving = true;
	        } 

	        if (upIsDown) { //move up
	            this.instance.body.velocity.y = -this.instance.movSpeed;
	            playerMoving = true;

	        } else if (downIsDown) { //move down
	            this.instance.body.velocity.y = this.instance.movSpeed;
	            playerMoving = true;
	        } 

	        if (!playerMoving) { //Idle animation
	            //  Stand still
	            this.instance.animations.stop();
	            this.instance.frame = 4;
	        } else {
	            if(this.instance.body.velocity.x != 0 && this.instance.body.velocity.y != 0) {
	                //Normalyze speed
	                this.instance.body.velocity.x /= Math.sqrt(2);
	                this.instance.body.velocity.y /= Math.sqrt(2);
	            }
	        }

	        if(game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)){ //emulate dead
            	Game.state.start('Game_Over');
	        }

	        if(game.input.keyboard.isDown(Phaser.KeyCode.ONE)){ //emulate dead
            	if(this.activeElementPool !== this.firePool){
            		this.activeElementPool = this.firePool;
            	}
	        }

	        if(game.input.keyboard.isDown(Phaser.KeyCode.TWO)){ //emulate dead
            	if(this.activeElementPool !== this.waterPool){
            		this.activeElementPool = this.waterPool;
            	}
	        }

	        if (game.input.activePointer.isDown) {
	            this.shootElement();

	        }
		}
	},

	shootElement : function() {
        //TODO: Add different elements (change the pool to the element pool)

        // Enforce a short delay between shots by recording
        // the time that each bullet is shot and testing if
        // the amount of time since the last shot is more than
        // the required delay.
        if (this.lastShotAt === undefined) this.lastShotAt = 0;
        if (game.time.now - this.lastShotAt < this.SHOT_DELAY) return;
        this.lastShotAt = game.time.now;

        var elementToShoot = this.activeElementPool.getFirstDead();

        // If there aren't any bullets available then don't shoot
        if(elementToShoot === null || elementToShoot === undefined) return;
        
        // Revive the elementToShoot
        // This makes the elementToShoot "alive"
        elementToShoot.revive();



    	// Set the shot starting position to the player + offset position.
        var xOffset = Player.getPlayer().x + 1.5*Math.cos(game.physics.arcade.angleToPointer(Player.getPlayer())) * Player.getPlayer().width;
        var yOffset = Player.getPlayer().y + 1.2*Math.sin(game.physics.arcade.angleToPointer(Player.getPlayer())) * Player.getPlayer().height;
        elementToShoot.reset(xOffset, yOffset);

        //  Enable arcade physics over the element
        game.physics.arcade.enable(elementToShoot);
        //aim from player to mouse
        elementToShoot.rotation = game.physics.arcade.angleToPointer(Player.getPlayer());

        // Shoot it in the right direction
        elementToShoot.body.velocity.x = Math.cos(elementToShoot.rotation) * elementToShoot.speed;
        elementToShoot.body.velocity.y = Math.sin(elementToShoot.rotation) * elementToShoot.speed;
	         
    },

    hit : function(player, element) {
    	//Even if lastHitElement is undefined it means that this hit is with a new element
    	var newElementHit = false;
    	if(this.lastHitElement !== element){
    		newElementHit = true;
    	}

    	if (this.lastHitAt === undefined) this.lastHitAt = 0;

		//If it's an element different from the last collision or enough time as passed, there's an hit
        if (game.time.now - this.lastHitAt < this.HIT_DELAY && !newElementHit) return;
        
        //Even if it's a new element on collision, we should wait a small amount between hits,
        //Else there's hits at 60 fps with lots of elements near
        if (game.time.now - this.lastHitAt < this.HIT_DELAY/5) return;
        
        this.lastHitAt = game.time.now;
        this.lastHitElement = element;
    	this.instance.hp -= element.damage;
    	this.hpText.text = 'HP: ' + this.instance.hp;
    	if(this.instance.hp <= 0){
    		Game.state.start('Game_Over');
    	}
    }
};