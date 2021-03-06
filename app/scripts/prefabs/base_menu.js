'use strict';

define(['phaser', 'prefabs/toggle_sprite'], function(Phaser, ToggleSprite) {
    
    function Menu(game, parent, menuIdx, background) {
        background = background || 'DIALOG_MENU_BG';
        Phaser.Group.call(this, game, parent);

        this.menuItems = [];
        this.menuIdx = menuIdx;
        
        this.menuBg = this.create(0, 0, 'marbleatlas', background);

        var menuWidth = this.menuBg.width;
        var menuHeight = this.menuBg.height;

        //this.x = (this.game.width - menuWidth) / 2;
        //this.y = (this.game.height - menuHeight) / 2;
        //this.y = 43;

        this.pivot = { x: menuWidth/2, y: menuHeight/2 };
        this.x = this.game.width / 2;
        //this.y = this.game.height / 2;
        this.y = 43 + (menuHeight / 2);

        this.scale = { x: 0, y: 0};
    }

    Menu.prototype = Object.create(Phaser.Group.prototype);
    Menu.prototype.constructor = Menu;
    
    Menu.Select = {
        LEFT: 0,
        RIGHT: 1,
        UP: 2,
        DOWN: 3
    };


    Menu.prototype.makeSelection = function(newIdx) {
        if (newIdx !== this.menuIdx) {
            this.menuItems[this.menuIdx].animations.play('off');
            this.menuIdx = newIdx;
            this.menuItems[this.menuIdx].animations.play('on');
        }
    };
    
    Menu.prototype.addToggleMenuItem = function(x, y, atlas, keyOn, keyOff, menuIdx) {
        var menuItem = new ToggleSprite(this.game, x, y, atlas, keyOn, keyOff);
        this.add(menuItem);
        this.menuItems[menuIdx] = menuItem;

        return menuItem;
    };
    
    Menu.prototype.getSelection = function() {
        return this.menuIdx;
    };

    
    Menu.prototype.tap = function(pos) {
        var items = this.menuItems.filter(function(item) {
            if (Phaser.Rectangle.containsPoint(item.getBounds(), pos)) {
                return true;
            }
            return false;
        });

        if (items.length > 0) {
            var itemIdx = this.menuItems.indexOf(items[0]);
            
            this.makeSelection(itemIdx);

            return this.menuIdx;
        }

        return -1;
    };

    return Menu;
});
