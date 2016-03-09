var Elements = {

	//Our element types
	fireElement : {
		damage : 10,
		speed : 230,
		spriteKey : 'fire'
	},

	waterElement : {
		damage : 7,
		speed : 180,
		spriteKey : 'water'
	},

	earthElement : {
		damage : 15,
		speed : 200,
		spriteKey : 'earth'
	},

	lightningElement : {
		damage: 12,
		speed : 265,
		spriteKey : 'lightning'
	},

	createPools : function (Player) {
		//The pools are the containers of the elementBalls
		Player.firePool = game.add.group();
        Player.firePool.enableBody = true;

        Player.waterPool = game.add.group();
        Player.waterPool.enableBody = true;

        Player.earthPool = game.add.group();
        Player.earthPool.enableBody = true;

        Player.lightningPool = game.add.group();
        Player.lightningPool.enableBody = true;
        

        // Create the pools(containers) of elements
        for(var i=0; i <Player.NUMBER_OF_SHOTS; i++){
        	Player.firePool.add(this.createElementBall(this.fireElement));
        	Player.waterPool.add(this.createElementBall(this.waterElement));
        	Player.earthPool.add(this.createElementBall(this.earthElement));
        	Player.lightningPool.add(this.createElementBall(this.lightningElement));
        }
	},
	createElementBall : function (typeElement){
		var elementBall = game.add.sprite(0,0, typeElement.spriteKey);
		elementBall.anchor.setTo(0.5,0.5);
		game.physics.arcade.enable(elementBall);
		elementBall.body.collideWorldBounds = true;
	    elementBall.body.bounce.setTo(1,1);

	    elementBall.kill();

		//Stats
		elementBall.damage = typeElement.damage;
		elementBall.speed = typeElement.speed;

		return elementBall;
	}
};