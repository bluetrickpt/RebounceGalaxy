var Elements = {
	createPools : function (Player) {
		Player.firePool = game.add.group();
        Player.firePool.enableBody = true;

        Player.waterPool = game.add.group();
        Player.waterPool.enableBody = true;
        

        // Create the pools(containers) of elements
        for(var i=0; i <Player.NUMBER_OF_SHOTS; i++){
        	Player.firePool.add(this.createFireBall());
        	Player.waterPool.add(this.createWaterBall());
        }
	},
	createFireBall : function (){
		var fireBall = game.add.sprite(0,0,'fire');
		fireBall.anchor.setTo(0.5,0.5);
		game.physics.arcade.enable(fireBall);
		fireBall.body.collideWorldBounds = true;
	    fireBall.body.bounce.setTo(1,1);

	    fireBall.kill();

		//Stats
		fireBall.damage = 15;
		fireBall.speed = 250;

		return fireBall;
	},	
	createWaterBall : function (){
		var waterBall = game.add.sprite(0,0,'water');
		waterBall.anchor.setTo(0.5,0.5);
		game.physics.arcade.enable(waterBall);
		waterBall.body.collideWorldBounds = true;
	    waterBall.body.bounce.setTo(1,1);

	    waterBall.kill();

		//Stats
		waterBall.damage = 10;
		waterBall.speed = 180;

		return waterBall;
	}
};