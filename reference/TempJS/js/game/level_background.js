/**
  *  level_background.js
  *  The level background classes
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: July 8, 2014
*/

function Background_1()
{
    //...
}

Background_1.prototype = new BaseObject();

Background_1.prototype.Load = function ()
{
    this.bgwaterfall = new AnimatedObject();
    this.bgwaterfall.Load("images/game_screen/bg/waterfall bground.png");
    this.bgwaterfall.Set(3, 5.0, true);
    this.bgwaterfall._frameWidth = 1138;
    this.bgwaterfall._fnCallback = (function () {
        //...
    });

    this.bg1 = new ImageObject();
    this.bg1.Load("images/game_screen/bg/waterfall mground.png");
}

Background_1.prototype.Update = function (elapsed) {
    //TODO: make this a class to handle changing background
    this.bgwaterfall.Update(elapsed);
}

Background_1.prototype.Draw = function (gfx) {

    this.bgwaterfall.Draw(gfx, 0, 0);
    this.bg1.Draw(gfx, 0, 0);
}

/**/

function Background_2() {
    //...
}

Background_2.prototype = new BaseObject();

Background_2.prototype.Load = function () {
   

    this.bg1 = new ImageObject();
    this.bg1.Load("images/game_screen/bg/2/forest bg.png");

    this.bg_cloud_list = new Array();

    for (var i = 0; i < MAX_CLOUD_TYPE; i++) {
        this.SpawnCloud();
    }
}

Background_2.prototype.SpawnCloud = function (re) {
    var x = Math.floor(Math.random() * (DEFAULT_WINDOW_WIDTH + 200));
    var y = Math.floor(Math.random() * (CLOUD_BORDER_Y));
    var cloudImg = new ImageObject();

    if (re) {
        x = DEFAULT_WINDOW_WIDTH;
    }

    cloudImg._X = x;
    cloudImg._Y = y;
    cloudImg.speed = Math.floor(Math.random() * (CLOUD_FAST_SPEED)) + CLOUD_SLOW_SPEED;

    var type = Math.floor(Math.random() * (CLOUD_TYPES));
    
    var cloud = ["images/game_screen/bg/2/fog1.png",
        "images/game_screen/bg/2/fog2.png",
        "images/game_screen/bg/2/fog3.png"];

    cloudImg.Load(cloud[type]);
    this.bg_cloud_list.push(cloudImg);

}


Background_2.prototype.Update = function (elapsed) {
    
    for (var i = 0; i < this.bg_cloud_list.length; i++) {
        this.bg_cloud_list[i]._X -= /*CLOUD_BG_SPEED*/ this.bg_cloud_list[i].speed * elapsed;

        if (this.bg_cloud_list[i]._X + this.bg_cloud_list[i]._image.width < 0) {
            this.bg_cloud_list.splice(i, 1);
        }
    }

    var diffbj = MAX_CLOUD_TYPE - this.bg_cloud_list.length;
    while (diffbj-- > 0) {
        this.SpawnCloud( true);
    }


}

Background_2.prototype.Draw = function (gfx) {

    this.bg1.Draw(gfx, 0, 0);

    for (var i = 0; i < this.bg_cloud_list.length; i++) {
        this.bg_cloud_list[i].Draw(gfx);
    }
}

/**/
function Background_3() {
    //...
}

Background_3.prototype = new BaseObject();

Background_3.prototype.Load = function () {
    this.bg = new AnimatedObject();
    this.bg.Load("images/game_screen/bg/3/river bg.png");
    this.bg.Set(3, 10.0, true);
    this.bg._frameWidth = 1138;
    this.bg._fnCallback = (function () {
        //...
    });

    this.boat = new ImageObject();
    this.boat.Load("images/game_screen/bg/3/river fg.png");
    this.angle = 0;
    this.dir = 0;
}

Background_3.prototype.Update = function (elapsed) {
    //TODO: make this a class to handle changing background
    this.bg.Update(elapsed);

    /*var value = Math.random() * 10;
    var sign = 100;
    if (value % 2) {
        sign = -10;
    }

    if (Math.abs(this.angle) < 10) {
        this.angle += sign * elapsed;
    }*/
    var speed = 1;
    if (this.dir == 0) {
        if (this.angle > -1) {
            this.angle -= speed * elapsed;
        } else {
            this.dir = 1;
        }

    } else if (this.dir == 1) {
        if (this.angle < 1) {
            this.angle += speed * elapsed;
        } else {
            this.dir = 0;
        }
    }
}

Background_3.prototype.Draw = function (gfx) {

    this.bg.Draw(gfx, 0, 0);
}

Background_3.prototype.DrawBoat = function (gfx)
{
    var x = (DEFAULT_WINDOW_WIDTH / 2) - (this.boat._image.width / 2) + 150;
    var y = 560;
    

    //this.boat.Draw(gfx,
       // ,
    //570);

    gfx.DrawRotateFull(x, y,
       this.boat._image.width / 2,
        80,
        this.angle,
        this.boat._image,
        1.0);
}

/*
"images/game_screen/bg/4/mountain bg.png",
    "images/game_screen/bg/4/mountain fg.png",
    "images/game_screen/bg/4/cloud a.png",
    "images/game_screen/bg/4/cloud b.png",
    "images/game_screen/bg/4/cloud c.png",
*/

/**/
function Background_4() {
    //...
}

Background_4.prototype = new BaseObject();

Background_4.prototype.Load = function () {
    this.bg = new ImageObject();
    this.bg.Load("images/game_screen/bg/4/mountain bg.png");

    this.fg = new ImageObject();
    this.fg.Load("images/game_screen/bg/4/mountain fg.png");

    this.bg_cloud_list = new Array();

    for (var i = 0; i < MAX_CLOUD_TYPE; i++) {
        this.SpawnCloud();
    }
}

Background_4.prototype.Update = function (elapsed) {
    for (var i = 0; i < this.bg_cloud_list.length; i++) {
        this.bg_cloud_list[i]._X -= /*CLOUD_BG_SPEED*/ this.bg_cloud_list[i].speed * elapsed;

        if (this.bg_cloud_list[i]._X + this.bg_cloud_list[i]._image.width < 0) {
            this.bg_cloud_list.splice(i, 1);
        }
    }

    var diffbj = MAX_CLOUD_TYPE - this.bg_cloud_list.length;
    while (diffbj-- > 0) {
        this.SpawnCloud(true);
    }
}

Background_4.prototype.Draw = function (gfx) {
    this.bg.Draw(gfx, 0, 0);

    for (var i = 0; i < this.bg_cloud_list.length; i++) {
        this.bg_cloud_list[i].Draw(gfx);
    }

    this.fg.Draw(gfx, 0, 0);
}

Background_4.prototype.SpawnCloud = function (re) {
    var x = Math.floor(Math.random() * (DEFAULT_WINDOW_WIDTH + 200));
    var y = Math.floor(Math.random() * (CLOUD_BORDER_Y));
    var cloudImg = new ImageObject();

    if (re) {
        x = DEFAULT_WINDOW_WIDTH;
    }

    cloudImg._X = x;
    cloudImg._Y = y;
    cloudImg.speed = 300;

    var type = Math.floor(Math.random() * (CLOUD_TYPES));

    var cloud = ["images/game_screen/bg/4/cloud a.png",
        "images/game_screen/bg/4/cloud b.png",
        "images/game_screen/bg/4/cloud c.png"];

    cloudImg.Load(cloud[type]);
    this.bg_cloud_list.push(cloudImg);

}
