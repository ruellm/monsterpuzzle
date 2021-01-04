// MergeFiles.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <stdio.h>
#include <stdlib.h>
#include <memory.h>

#define MAX_FNAME 200

int cbd_merge_files(const char filenames[][MAX_FNAME], int n, const char* final_filename) {

  FILE* fp = fopen(final_filename, "w");

  if (fp == NULL) return 1;

  char buffer[4097];

  for (int i = 0; i < n; ++i) {

    const char* fname = filenames[i];
	char ch = 0;
    FILE* fp_read = fopen(fname, "r");
	
	printf("Processing %s ...\n\r", fname);
 	 while( ( ch = fgetc(fp_read) ) != EOF )
		fputc(ch,fp);

	fputc('\r', fp);
	fputc('\n', fp);

    fclose(fp_read);

 }

 fclose(fp);

 return 0;
}
int _tmain(int argc, _TCHAR* argv[])
{
	//////////////////////////////////////////////////////////////
	// SPirit BUbble
	// File list as of July 28, 2014, 3:53pm - PNoy SONA
	//////////////////////////////////////////////////////////////
	const char filenames[][MAX_FNAME]={
		"../../../source/web/SpiritBubble/SpiritBubble/js/common.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/resource.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/core/baseObject.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/core/engine.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/core/graphics.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/core/state.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/utility/timer.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/utility/animator.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/utility/point.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/utility/longAudio.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/utility/vector2D.js"  ,
		"../../../source/web/SpiritBubble/SpiritBubble/js/utility/rectangle.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/utility/collisionHandler.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/scene/imageObject.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/scene/animatedObject.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/scene/animatedText.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/scene/repeatingImage.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/ui/uibase.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/ui/uimanager.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/ui/button.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/ui/listBoxBase.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/ui/customListBox.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/ui/textBoxBase.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/ui/customTextBox.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/game/bubble.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/game/field.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/game/launcher.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/game/demons.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/game/china.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/game/levelHandle.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/game/worldMap.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/game/level_background.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/game/splash.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/data/level.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/data/level_data/pattern_builder.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/data/level_data/level_info_1.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/data/level_data/predefine_fields.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/data/inapp_items.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/data/fb_data.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/data/fbaccess.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/data/gameData.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/data/rc4.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/data/ajaxAdapter.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/states/storyState.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/states/splashState.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/states/animScrollWindow.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/states/purchaseWindow.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/game/reward.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/states/giveLifeWindow.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/states/utilityWindows.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/states/topBarCommon.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/states/loadState.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/states/gameState.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/states/dailySpinWindow.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/states/mapState.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/states/levelInfoScreen.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/main.js",
		"../../../source/web/SpiritBubble/SpiritBubble/js/default.js"
	};

	cbd_merge_files(filenames, 58, "../../compiler-latest/spiritBubble_Merge.js");
	return 0;
}

