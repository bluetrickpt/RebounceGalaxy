var Collisions = {

	//This is an extension of the protected method checkWorldBounds
	//From physics.arcade.body
	handleBoundCollisions : function(element) {

		var body = element.body;
		if(body === undefined || !body) return;
		var pos = body.position;
        var bounds = body.game.physics.arcade.bounds;
        var check = body.game.physics.arcade.checkCollision;

        if (pos.x < bounds.x && check.left)
        {
            pos.x = bounds.x;
            body.velocity.x *= -body.bounce.x;
            body.blocked.left = true;
        }
        else if (body.right > bounds.right && check.right)
        {
            pos.x = bounds.right - body.width;
            body.velocity.x *= -body.bounce.x;
            body.blocked.right = true;
        }

        if (pos.y < bounds.y && check.up)
        {
            pos.y = bounds.y;
            body.velocity.y *= -body.bounce.y;
            body.blocked.up = true;
        }
        else if (body.bottom > bounds.bottom && check.down)
        {
            pos.y = bounds.bottom - body.height;
            body.velocity.y *= -body.bounce.y;
            body.blocked.down = true;
        }

        //Rotates the element to it's velocity orientation
        element.rotation = body.velocity.angle(new Phaser.Point()) + Math.PI;

	}
};