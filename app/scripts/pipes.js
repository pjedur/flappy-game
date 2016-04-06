window.Pipes = (function() {
  'use strict';

  var Pipes = function(el, game) {
      this.el = el;
      this.game = game;
      this.pos = { x: 0, y: 0};
  };

  Pipes.prototype.reset = function() {
    this.pos.x = 0;
    this.pos.y = 0;
  };

  Pipes.prototype.onFrame = function(delta) {
    while(true)
    this.pos.x -= delta * 30;
    this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
  };


  Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			this.pos.x =
		}
	};

  return Pipes;
})();
