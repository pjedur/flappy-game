window.Background = (function () {
    'use strict';

    var SPEED = 15;

    var Background = function (el, game) {
        this.el = el;
        this.game = game;
        this.pos = [];
        this.pos[0] = {x: 0, y: 0};
        this.pos[1] = {x: 120, y: 0};
    };

    Background.prototype.onFrame = function (delta){
        this.pos[0].x -= delta * SPEED;
        this.pos[1].x -= delta * SPEED;


        if(this.pos[0].x <= -this.game.WORLD_WIDTH - 40){
            this.pos[0].x = 118;
        }
        if(this.pos[1].x <= -this.game.WORLD_WIDTH - 40){
            this.pos[1].x = 118;
        }
        this.el[0].css('transform', 'translateZ(0) translate(' + this.pos[0].x + 'em, ' + this.pos[0].y + 'em)');
        this.el[1].css('transform', 'translateZ(0) translate(' + this.pos[1].x + 'em, ' + this.pos[1].y + 'em)');
    };

    return Background;
})();
