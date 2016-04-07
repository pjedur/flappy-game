window.Pipes = (function() {
  'use strict';

  var SPEED = 15;
  var WIDTH = 10;
  var HEIGHT = 15;
  var INITIAL_POSITION_X = 0;
  var INITIAL_POSITION_Y = 0;
  var rand = 0;

  var Pipes = function(el, game) {
      this.el = el;
      this.game = game;
      this.pos = { x: 0, y: 0 };
  };

  Pipes.prototype.reset = function() {
    this.pos.x = INITIAL_POSITION_X;
    this.pos.y = INITIAL_POSITION_Y;
  };

  Pipes.prototype.onFrame = function(delta) {
    this.checkCollisionWithBounds();
    //console.log("This.x : [%d]", this.pos.x);
    console.log(this.game.WORLD_WIDTH)

    this.pos.x -= delta * 30;
    this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
  };


  Pipes.prototype.checkCollisionWithBounds = function() {
		if (
			//this.pos.x < -100
    this.pos.x + this.game.WORLD_WIDTH < 0) {
			     this.pos.x = INITIAL_POSITION_X;
           this.pos.y = INITIAL_POSITION_Y;
           //this.reset();
           rand = (Math.random() * 20) + 10;
           this.el.css({"height" : rand+'em'});
		}
	};

  return Pipes;
})();
