'use strict';

define(['phaser', 'prefabs/red_number'], function(Phaser, RedNumber) {
    function PopNumber(game, parent) {
        Phaser.Group.call(this, game, parent);

        this.frameRate = 7 * 5;
        
        this.number = new RedNumber(this.game, this);
        this.popFx = this.create(0, 0, 'marbleatlas', 'COMMON03_POP_1');
        this.popFx.animations.add('pop', [1, 2, 3, 4, 5, 6, 7].mapConcat('COMMON03_POP_'), this.frameRate, false);
        this.popFx.anchor = { x: 0.5, y: 0.5 };
    }

    PopNumber.prototype = Object.create(Phaser.Group.prototype);
    PopNumber.prototype.constructor = PopNumber;
    
    PopNumber.prototype.pop = function(number) {
        this.number.show(number + '');
        this.popFx.x = this.number.x + this.number.width / 2;
        this.popFx.y = this.number.y + this.number.height / 2;
        this.popFx.animations.play('pop');
    };

    return PopNumber;
});
