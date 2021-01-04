// BubbleCorrect.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <math.h>

#define FIELD_HEIGHT 4

int bubblefield[][4] = { 
	{1, 1, 1, 1},
	{1, 1, 1, 0},
	{0, 0, 0, 0},
	{0, 0, 0, 0}
};

int _tmain(int argc, _TCHAR* argv[])
{

	int col = 3;
	int row = 0;
	int ccol = 2;
	int crow = 2;
	int newrow = crow;
	if( crow - row >= 2){
		newrow--;
	}

	int coldiff = abs(ccol-col);
	int newcol = ccol;
	if(coldiff >= 2) {
		if( ccol - col > 0 ){
			newcol--;	
		}else{
			newcol++;
		}
	}

	if(newrow  != crow){
		int isoddnewrow = newrow %2 != 0;
	    if( ccol >col && isoddnewrow) {
			ccol--;
		} else if (ccol < col && !isoddnewrow){ /* !!This part is new!! */
 			ccol++;
		}
	}

	//newcol = apply clip to column
	
	int cache_col = newcol;
	while(newrow < FIELD_HEIGHT &&
		bubblefield[newrow][newcol] != 0)
	{
			/* !!This part is new!! */
	        int isRowOdd = (newrow %2 == 1);
			if( ccol - col > 0 && isRowOdd){
				newcol++;
			}else if (ccol-col < 0 && !isRowOdd){
				newcol--;
			}
			newrow++;		
	}

	printf("Result col: %d row: %d", newcol, newrow);

	return 0;
}

