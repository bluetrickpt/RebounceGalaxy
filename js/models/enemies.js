var Enemies = {

	constants : {
		MAX_SPAWNED : 3,
		MIN_SPAWN_TIME : 500 //ms
	},

	normalEnemy : {
		damage: 10,
		speed: 120,
		hp: 35,
		ranged: false, //for now only non ranged
		spawnProbability: 0.7,
		spriteKey: 'normalEnemy' 
	},

	//Similar to the elementPools we startUp our enemies in spawnPools
	createPools : function() {
		this.normalEnemyPool = game.add.group();
		this.normalEnemyPool.enableBody = true;

		// this.barriersEnemyPool = game.add.group();
		// this.barriersEnemyPool = true;

		// this.runnersEnemyPool = game.add.group();
		// this.runnersEnemyPool = true;

		// this.tunnelsEnemyPool = game.add.group();
		// this.tunnelsEnemyPool = true;

		for(var i=0; i < this.constants.MAX_SPAWNED; i++){
			this.normalEnemyPool.add(this.createEnemy(this.normalEnemy));
		}
	},
	

	createEnemy : function(typeEnemy) {
		if(typeEnemy){
			var enemy = game.add.sprite(0,0, typeEnemy.spriteKey);
			game.physics.arcade.enable(enemy);
			enemy.body.setSize(40, 64, -15, 5);
			enemy.anchor.setTo(0.3,0.5); //The sprite has a lot of free space after the bear

			enemy.body.collideWorldBounds = true;
			enemy.kill();

			enemy.damage = typeEnemy.damage;
			enemy.speed = typeEnemy.speed;
			enemy.hp = typeEnemy.hp;

			if(typeEnemy === this.normalEnemy){
				enemy.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
				enemy.animations.add('up', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 10, true);
				enemy.animations.add('down', [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 10, true);
			}

			return enemy;
		}
	},

	spawnEnemy : function() { //similar to shootElement function on Player
		if (this.lastSpawnAt === undefined) this.lastSpawnAt = 0;
        if (game.time.now - this.lastSpawnAt < this.constants.MIN_SPAWN_TIME) return;
        this.lastSpawnAt = game.time.now;

        var enemy = this.normalEnemyPool.getFirstDead();

        if(enemy === null || enemy === undefined) return;

        enemy.revive();
        //Set enemy to random location
        var x = game.rnd.integerInRange(0, game.width);
        var y = game.rnd.integerInRange(0, game.height);
        enemy.reset(x,y);
	},

	persuePlayer : function (enemy, player){
		var orientation = enemy.body.velocity.angle(new Phaser.Point())+ Math.PI;
		orientation *= (180/Math.PI); //degree
		//Orientation € [0, 360]

		if(orientation <= 45 || orientation >= 325) { //Walking to the right
			enemy.scale.x = 1;
			enemy.animations.play('right');
		} else if (orientation > 45 && orientation <= 135) {
			enemy.scale.x = 1;
			enemy.animations.play('down'); //note to self: y grows to the bottom!!!
		} else if (orientation > 135 && orientation <= 225) {
			enemy.scale.x = -1; //Walk to left
			enemy.animations.play('right');
		} else {
			enemy.scale.x = 1;
			enemy.animations.play('up');
		}
		console.log(orientation);
		game.physics.arcade.moveToObject(enemy, player, enemy.speed);
	}
};