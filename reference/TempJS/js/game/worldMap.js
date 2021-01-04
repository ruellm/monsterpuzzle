/**
map.js
Map handler class
Author: Ruell Magpayo <ruellm@yahoo.com>
Created: May 31, 2014

Note/TODO handle different map background in the future
*/

function WorldMap() {
   
    this.mapSprite = null;

    this.fnLevelClick = null;

    this.topX = 0;
    this.topY = 0;

   // this.lookX = 0;
  //  this.lookY = 0;

    this.width = 0;
    this.height = 0;

    this.levelPoints = null;
    this.selectedIdx = 0;
}

WorldMap.prototype.Load = function () {
    //...
}

WorldMap.prototype.setTopLook = function (x, y)
{
    this.topX = x;
    this.topY = y;
}

WorldMap.prototype.LookAt = function (x, y) {
    var refPtX = x - (DEFAULT_WINDOW_WIDTH / 2);
    var refPtY = y- (DEFAULT_WINDOW_HEIGHT / 2);

    if (refPtX < 0) {
        this.topX = 0;
    } else {
        this.topX = refPtX;
    }

    if (refPtY < 0) {
        this.topY = 0;
    } else {
        this.topY = refPtY;
    }
}

WorldMap.prototype.LookAtLevel = function (lvlNum) {

    this.LookAt(this.levelPoints[lvlNum].origX,
        this.levelPoints[lvlNum].origY);
}

WorldMap.prototype.Update = function (elapsed) {

    if (this.topX < 0)
        this.topX = 0;
    if (this.topY < 0)
        this.topY = 0

    if (this.topX + DEFAULT_WINDOW_WIDTH >= this.width) {
        this.topX = this.width - DEFAULT_WINDOW_WIDTH;
    }

    if (this.topY + DEFAULT_WINDOW_HEIGHT >= this.height) {
        this.topY = this.height - DEFAULT_WINDOW_HEIGHT;
    }


    // Update level points based on Top information
    for (var i = 0; i < this.levelPoints.length; i++) {
        this.levelPoints[i]._X = this.levelPoints[i].origX - this.topX;
        this.levelPoints[i]._Y = this.levelPoints[i].origY - this.topY;

        this.levelPoints[i].Update(elapsed);        
    }
	
	this.InternalUpdate(elapsed);
}

WorldMap.prototype.Draw = function (gfx) {

    if (this.mapSprite==null) return;

    gfx.DrawImage(this.mapSprite._image,
        this.topX, this.topY,
        DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
        0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT, 1.0);

	this.InternalDraw(gfx);
}

WorldMap.prototype.InternalUpdate = function(elapsed)
{
	//...
}

WorldMap.prototype.InternalDraw = function(gfx)
{
	//...
}


WorldMap.prototype.SetUserCurrentLevel = function (level) {
    if (this.mapSprite == null) return;

    this.levelPoints[this.selectedIdx].selected = false;
    this.selectedIdx = level;
    this.levelPoints[level].selected = true;

    for (var  a= 0; a <= level; a++) {
        this.levelPoints[a].SetEnable(true);
    }
}
WorldMap.prototype.VisibleLevelText = function (flag)
{
    for (var a = 0; a < this.levelPoints.length; a++) {
        this.levelPoints[a].displayText = flag;
    }

}

/**/
/* World 1 Map */
/**/

function WorldMap_1() { 
    //..
}

WorldMap_1.prototype = new WorldMap;

WorldMap_1.prototype.Load = function (uimanager) {
    this.mapSprite = new ImageObject();
    this.mapSprite.Load("images/map/1/map.png");

    this.width = this.mapSprite._image.width;
    this.height = this.mapSprite._image.height;

    this.LoadLevelPoints(uimanager);
	
	this.bg_cloud_list = new Array();

    for (var i = 0; i < 10/*MAX_CLOUD_TYPE*/; i++) {
        this.SpawnCloud();
    }
}

WorldMap_1.prototype.SpawnCloud = function (re) {
    var x = Math.floor(Math.random() * (this.mapSprite._image.width));
    var y = Math.floor(Math.random() * (this.mapSprite._image.height));
    var cloudImg = new ImageObject();

    if (re) {
        x = this.mapSprite._image.width;
    }

    cloudImg.origX = x;
    cloudImg.origY = y;
    cloudImg.speed = Math.floor(Math.random() * (CLOUD_FAST_SPEED)) + CLOUD_SLOW_SPEED;

    var type = Math.floor(Math.random() * (CLOUD_TYPES));
    
    var cloud = ["images/map/1/cloud1.png",
        "images/map/1/cloud2.png",
        "images/map/1/cloud3.png"];

    cloudImg.Load(cloud[type]);
    this.bg_cloud_list.push(cloudImg);

}


WorldMap_1.prototype.LoadLevelPoints = function (uimanager) {

    // easy approach
    var points = new Array();
    var startX = 100;
    var startY = 1100;
    var diffx=100;
    var diffy = 90;

    for (var a=0; a < 2; a++) {
        for (var o = 0; o < 5; o++) {
            var y = startY + (diffy * o);
            var x = 0;
            for (var i = 0; i < 10; i++) {
                x = startX + (diffx * i);
                var pt = new Point(x, y);
                points.push(pt);
            }     
        }

        startX = 768;
        startY = 536;
    }



    this.levelPoints = new Array();
    var context = this;

    for (var i = 0; i < points.length; i++) {
        var lvl = new LevelHandle();
        lvl.Load();

        lvl.origX = points[i]._X;
        lvl.origY = points[i]._Y;
        lvl.levelID = i;

        lvl._fnMouseDownEvnt = (function () {
            if (context.fnLevelClick) {
                context.fnLevelClick(this.levelID);
            }
        });
        lvl.SetEnable(false);
        uimanager.Add(lvl);
        this.levelPoints.push(lvl);
    }
}

WorldMap_1.prototype.InternalUpdate = function(elapsed)
{
	for (var i = 0; i < this.bg_cloud_list.length; i++) {
	
		this.bg_cloud_list[i].origX -= this.bg_cloud_list[i].speed * elapsed;
		this.bg_cloud_list[i]._X = this.bg_cloud_list[i].origX - this.topX;
		this.bg_cloud_list[i]._Y = this.bg_cloud_list[i].origY - this.topY;
		
       // this.bg_cloud_list[i]._X -= /*CLOUD_BG_SPEED*/ this.bg_cloud_list[i].speed * elapsed;
        if (this.bg_cloud_list[i]._X + this.bg_cloud_list[i]._image.width < 0) {
            this.bg_cloud_list.splice(i, 1);
        }
		
    }

    var diffbj = MAX_CLOUD_TYPE - this.bg_cloud_list.length;
    while (diffbj-- > 0) {
        this.SpawnCloud( true);
    }
}

WorldMap_1.prototype.InternalDraw = function(gfx)
{
	for (var i = 0; i < this.bg_cloud_list.length; i++) {
        this.bg_cloud_list[i].Draw(gfx);
    }
}