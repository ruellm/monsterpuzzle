/**
 *   splash.js
 *   animated splash sprite
 *   Author: Ruell Magpayo <ruellm@yahoo.com>
 *   Created: July 29, 2014
*/

function Sparkle()
{
    this.fnDone = 0;
}

Sparkle.prototype = new BaseObject;

Sparkle.prototype.Load = function ()
{
    this.sprite = new ImageObject();
    this.sprite.Load("images/purchase_window/splash sparkle.png");

    this._width = 0;
    this._height = 0;

    var pct = Math.random();
    this.targetWidth = Math.floor(pct * (this.sprite._image.width+10));
    this.targetHeight = Math.floor(pct * (this.sprite._image.height+10));
    this.dir = 0;
    this.angle = 0;
}

Sparkle.prototype.Update = function (elapsed) {
    var friction = 200;
    if (this.dir == 0) {
        //this.angle += friction * elapsed;
        var done = 0;
        if (this._width < this.targetWidth) {
            this._width += (friction) * elapsed;
		}else{
            done++;
        }

        if (this._height < this.targetHeight) {
            this._height += (friction) * elapsed;
        } else {
            done++;
        }

        if (done >= 2) {
            this.dir = 1;
           // this.targetWidth = 0;
           // this.targetHeight = 0;
        }

    } else if(this.dir ==1){
        var done = 0;
       // this.angle -= friction * elapsed;
       
        if (this._width > 0) {
            this._width -= (friction) * elapsed;
			
			if(this._width < 0 ){
				this._width = 0;
			}
        } else {
            done++;
        }

        if (this._height > 0) {
            this._height -= (friction) * elapsed;
			
			if(this._height < 0 ){
				this._height = 0;
			}
        } else {
            done++;
        }

        if (done >= 2) {
            //... we are done
            this.dir = 3;
            if (this.fnDone) {
                this.fnDone();
            }
        }
    }

    this.angle += (friction * elapsed);
}

Sparkle.prototype.Draw = function (gfx) {
    var centerX = this._X + ((this.targetWidth / 2) - (this._width / 2));
    var centerY = this._Y + ((this.targetHeight / 2) - (this._height / 2));

    gfx.DrawRotate(this.sprite._image,
           0, 0,
           this.sprite._image.width,
           this.sprite._image.height,

           centerX,
           centerY,

           this._width,
           this._height,

           1.0, //Alpha
           this._width / 2,
           this._height / 2,
           this.angle
           );
}


/**/
/**/

function SplashSprite()
{
    this.bg = new ImageObject();
    this.bg.Load("images/purchase_window/splash.png");
}

SplashSprite.prototype = new BaseObject;

SplashSprite.prototype.LoadSparkle = function ()
{
    var context = this;
    var sparkol = new Sparkle;
    
    sparkol._X = (Math.random() * 160) + (this._X+( (this.bg._image.width/2) - 110));
    sparkol._Y = (Math.random() * 160) + (this._Y + ((this.bg._image.height / 2) - 80));
    sparkol.Load();
    sparkol.fnDone = function () {

        for (var m = 0; m < context.sparkle.length; m++) {
            if (context.sparkle[m] == this) {
                context.sparkle.splice(m, 1);
                break;
            }
        }

        context.LoadSparkle();
    };

    this.sparkle.push(sparkol);
}

SplashSprite.prototype.Load = function ()
{

    this.sparkle = new Array();

    for (var iz = 0; iz < 20; iz++) {
        this.LoadSparkle();
    }
}

SplashSprite.prototype.Update = function (elapsed)
{
    for (var m = 0; m < this.sparkle.length; m++) {
        this.sparkle[m].Update(elapsed);
    }
}

SplashSprite.prototype.Draw = function (gfx)
{
    this.bg.Draw(gfx, this._X, this._Y);
    for (var m = 0; m < this.sparkle.length; m++) {
        this.sparkle[m].Draw(gfx);
    }
}
