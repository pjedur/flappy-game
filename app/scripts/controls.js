
window.Controls = (function() {
    'use strict';

    /**
     * A singleton class which abstracts all player input,
     * should hide complexity of dealing with keyboard, mouse
     * and touch devices.
     * @constructor
     */
    var Controls = function() {
        this._didJump = false;
        $(window)
            .on('keypress', this._onKeyPress.bind(this))
            .on('mousedown', this._onKeyPress.bind(this));
    };

    Controls.prototype._onKeyPress = function(e) {
        if (e.keyCode === 32 || e.type === 'mousedown') {
            this._didJump = true;
        }
    };

    /**
     * Only answers true once until a key is pressed again.
     */
    Controls.prototype.didJump = function() {
        var answer = this._didJump;
        this._didJump = false;
        return answer;
    };

    // Export singleton.
    return new Controls();
})();
