/**
    pattern_builder.js
    Functions to generate different bubble field patterns
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: June 13, 2014
*/

function GenerateParam()
{
    this.blankpct = 0;
    this.gray_bubble_pct = 0;
    this.gray_include_top = false;
    //
    //TODO: add more parameters for generation
    //
}

function InitFieldTemplate(field)
{
    
    for (var y = 0; y < FIELD_HEIGHT; y++) {
        field[y] = new Array();

        for (var x = 0; x < FIELD_WIDTH; x++) {
            field[y].push(0);
        }
    }
}

function setBubble(x, y, bubbleField, param) {

    var bubble = Math.floor(Math.random() * BUBBLE_TYPE_COUNT) + 1;

    if (param) {       
        var pct = Math.random() * 10;
        if (pct <= param.blankpct && param.blankpct > 0) {
            bubble = 0;
        }
        if (param.gray_bubble_pct > 0) {
            var pct = Math.random() * 10;
            if (pct <= param.gray_bubble_pct) {
                if ( (y != 0) || (y == 0 && param.gray_include_top)){
                    bubble = 11;
                }                              
            }
        }
    }

    if( y % 2 && x == FIELD_WIDTH-2){
        return;	
    }
    
    if( x < 0 || x >= FIELD_WIDTH	){
        return;
    }

    if( y > 0 ){
        //check parent if valid
        var prev = x;
        var next = x;
        if(y%2){
            next = x + 1;
        }else{
            prev = x-1;
            next = x;
        }

        if ((prev >= 0 && bubbleField[y - 1][prev] != 0) ||
            (next < 16 && bubbleField[y - 1][next] != 0)) {
            bubbleField[y][x] = bubble;
        }
    } else {
        bubbleField[y][x] = bubble;
    }
}


function GenerateRect(width, height, bubbleField, param)
{
    var starIdx = Math.floor((16/2) - (width/2));
    for(var y=0; y<height; y++){		
        for( var x = starIdx; x < starIdx+width;x++) {
            setBubble(x, y, bubbleField, param);
        }
    }
}

function GenerateBranchSingle(index, width, height, bubbleField, param)
{
    //...
    for(var y = 0; y < height; y++){
        var start = index;
        for(var w=0; w < width; w++){          
            setBubble(start,y,bubbleField, param);
            start++;
        }
    }
}

function GenerateSlantPattern(index, width, height, dir, bubbleField, param)
{
    var start = index;
    for(var y=0; y < height; y++) {
		
        if (y != 0 && y % 2 == 0 && dir == 0) {
            start++;
        } else if (dir == 1 && y > 0 && y % 2 != 0) {
            start--;
        }

        var wid = 0;
        var x = start;
        while (wid < width){
			
            setBubble(x,y, bubbleField, param);

            if( dir == 0 )
                x++;
            else 
                x--;
			
            wid++;
        }
    }
}

function GenerateTrianglePattern(index, width, height, bubbleField, param)
{
    var start = index;

    for(var y=0; y < height; y++) {
		
        if( y != 0 && y %2 == 0 ){
            start++;
        }

        var wid = 0;
        var x = start;
        while (wid < width){
			      
            setBubble(x,y, bubbleField, param);

            x++;
            wid++;
        }

        width--;
    }
}