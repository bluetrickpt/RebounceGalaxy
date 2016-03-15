var Elements = {

	constants : {
		//Hit delay. The player can't be hit by the same element object
        //within this time
        HIT_DELAY : 650 //msecs
	},
	//Our element types
	fireElement : {
		damage : 10,
		speed : 230,
		spriteKey : 'fire'
	},

	waterElement : {
		damage : 7,
		speed : 140,
		spriteKey : 'water'
	},

	earthElement : {
		damage : 15,
		speed : 185,
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
	},

	waterFireCollision : function (waterElement, fireElement) {
		fireElement.kill();
	},

	earthLightningCollision : function (earthElement, lightningElement) {
		lightningElement.kill();
	},

    hit : function(being, element) { //Element can either be an enemy or spell
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
        if (game.time.now - this.lastHitAt < this.constants.HIT_DELAY/5) return;
        
        this.lastHitAt = game.time.now;
        this.lastHitElement = element;
    	being.hp -= element.damage;

    	if(being.hp <= 0){
    		being.kill();
    	}

    	if(being === Player.getPlayer()){
    		Player.hpText.text = 'HP: ' + Player.getPlayer().hp;
	    	if(Player.getPlayer().hp <= 0){
	    		Game.state.start('Game_Over');
	    	}
    	}
    	
    }
};