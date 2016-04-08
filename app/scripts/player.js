window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	//var SPEED = 30; // * 10 pixels per second
	var SPEED = 20;
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var GROUND_SIZE        = 5.6;

	var Player = function(el, game, pipes) {
		this.el = el;
		this.game = game;
		this.acceleration = 0;
		this.rotation = 0;
		this.pos = { x: 0, y: 0 };
		this.pipes = pipes;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x        = INITIAL_POSITION_X;
		this.pos.y        = INITIAL_POSITION_Y;
		this.acceleration = 0;
		this.rotation     = 0;
	};

	Player.prototype.onFrame = function(delta) {
		this.checkCollisionWithBounds();
		this.checkCollisionWithPipes();

		if(Controls.didJump()) {
			this.game.isPlaying = true;
			
			this.acceleration = 0;
			this.rotation     = 23;
			this.pos.y -= delta * SPEED*27;

			this.game.sound.currentTime = 0;
			this.game.sound.play();

			this.el.css('transform','translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + this.rotation + 'deg)');
			return;
		}
		else {
			this.acceleration += 0.019;
			this.pos.y += delta * SPEED + this.acceleration;

			this.rotation < -89 ? this.rotation : this.rotation -= 2;
			this.el.css('transform','translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + -this.rotation + 'deg)');
			return;
		}
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y + HEIGHT + GROUND_SIZE > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}


	};

	// X hja pipe
	// Y hja player

	Player.prototype.checkCollisionWithPipes = function() {
		//console.log("X: [%d] Y: [%d]", this.pos.x, this.pos.y);
		//console.log("PIPE X: [%d] PIPE Y: [%d]", this.pipes.pos.x, this.pipes.pos.y);
			//console.log(this.pipes.el[0].offset());
			if((this.pipes.el[0].offset().left <= 748 && this.pipes.el[0].offset().left >= 743) || 
			   (this.pipes.el[2].offset().left <= 749 && this.pipes.el[2].offset().left >= 744) || 
			   (this.pipes.el[4].offset().left <= 749 && this.pipes.el[4].offset().left >= 744)){
				console.log("stig");
			}
	
	}
		/*
		if(Math.floor(this.pos.y) === Math.floor(this.pipes.pos.x + this.game.WORLD_WIDTH - 10)) {
					this.game.gameover();
			}
		}*/

	return Player;

})();
