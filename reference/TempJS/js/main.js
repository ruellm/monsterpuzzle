
function OnGameLaunch() {

    // Initialize global
    g_Engine = new Engine();
    g_gameData = new GameData();

    //Initialize engine
    g_Engine.Init();
    g_gameData.Init();

    //TODO: Add States in here
    //..
    g_Engine.AddState(new LoadState);
    g_Engine.AddState(new GameState);
    g_Engine.AddState(new MapState);
    g_Engine.AddState(new SplashScreenState);
    g_Engine.AddState(new StoryState_1);
    g_Engine.AddState(new StoryState_2);

    //Setting the initial state
    g_Engine.SetState(SPLASH_SCREEN_STATE_ID);

    //Run the Engine
    g_Engine.Run();
}

function OnGameFocus()
{ }

function OnGameBlur()
{ }

function OnGameExit(e)
{
	if (g_mainUser.id == -1) return;
    if(g_gameData.life <= 0){		
		var currentTime = new Date().getTime();
		var hitTime = g_targetTimer - (DEFAULT_WAIT_MINUTES * 1000.0);
		var diff = currentTime - hitTime;
		value = g_targetTimer - diff;
		
		Ajax_doRequest(REQ_SET_EPOCH, value);
	}

}
