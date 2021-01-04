// GenerateLevelField.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"

#define WIDTH 16
#define HEIGHT 12

int bubble[12][16] ={0};

void setBubble(int x, int y, int random){

	 if( y > 0 ){
		//check parent if valid
		int prev = x;
		int next = x;
		if(y%2){
			next = x + 1;
		}else{
			prev = x-1;
			next = x;
		}

		if( (prev >= 0 && bubble[y-1][prev] != 0) &&
			(next < 16 && bubble[y-1][next] != 0)) {
			bubble[y][x] = random;
		}
	} else {
		bubble[y][x] = random;
	}
}

void GenerateRect(int width, int height)
{
	int starIdx = (16/2) - (width/2);
	for(int y=0; y<height; y++){		
		int odd = y % 2;
		for( int x = starIdx; x < starIdx+width;x++) {
			int random = 1;

			setBubble(x,y,random);
		}
	}
}

void GenerateBranchSingle(int index, int width, int height)
{
	//...
	for(int y = 0; y < height; y++){
		int start = index;
		for(int w=0; w < width; w++){
			int random = 1;

			if( y % 2 && start == WIDTH-2){
				break;	
			}

			setBubble(start,y,random);
			start++;
		}
	}

}

void GenerateSlantPattern(int index, int width, int height, int dir)
{
	int start = index;

	for(int y=0; y < height; y++) {
		
		if( y != 0 && y %2 == 0 ){
			if( dir == 0 )
				start++;
			else
				start--;
		}

		int wid = 0;
		int x = start;
		while (wid < width){
			
			if( y % 2 && x == WIDTH-2){
				break;	
			}

			if( x < 0 || x >= WIDTH	){
				break;
			}

			int random = 1;
			setBubble(x,y,random);

			if( dir == 0 )
				x++;
			else 
				x--;
			
			wid++;
		}

	}
}

void GenerateTrianglePattern(int index, int width, int height)
{
	int start = index;

	for(int y=0; y < height; y++) {
		
		if( y != 0 && y %2 == 0 ){
			start++;
		}

		int wid = 0;
		int x = start;
		while (wid < width){
			
			if( y % 2 && x == WIDTH-2){
				break;	
			}

			if( x < 0 || x >= WIDTH	){
				break;
			}

			int random = 1;
			setBubble(x,y,random);

			x++;
			wid++;
		}

	   width--;
	}
}

int _tmain(int argc, _TCHAR* argv[])
{
	//GenerateRect(8,4);
	//GenerateBranch(3,2,1);
	//GenerateSlantPattern(2,1,5,0);
	GenerateTrianglePattern(1, 5, 4);
	return 0;
}

