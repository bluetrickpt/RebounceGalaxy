var FireBall = {
	createFireBall : function (fireSpriteKey){
		var fireBall = game.add.sprite(0,0,fireSpriteKey);
		fireBall.anchor.setTo(0.5,0.5);
		game.physics.arcade.enable(fireBall);
	    
	    fireBall.checkWorldBounds = true;
	    fireBall.events.onOutOfBounds.add(this.boundsCollision, this);
	    fireBall.body.bounce.setTo(1,1);

	    fireBall.kill();

		//Stats
		fireBall.damage = 10;
		fireBall.speed = 250;

		return fireBall;
	},

	boundsCollision : function(fireBall) {
        fireBall.rotation += Math.PI;
        fireBall.body.velocity.x = Math.cos(fireBall.rotation) * fireBall.speed;
        fireBall.body.velocity.y = Math.sin(fireBall.rotation) * fireBall.speed;
    }
	
};