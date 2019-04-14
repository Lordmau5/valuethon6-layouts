'use strict';
$(() => {
	// The bundle name where all the run information is pulled from.
	var speedcontrolBundle = 'nodecg-speedcontrol';
	
	// JQuery selectors.
	var gameTitle = $('#gameTitle'); // game-title.html
	var gameEstimate = $('#gameEstimate'); // game-estimate.html
	
	// This is where the information is received for the run we want to display.
	// The "change" event is triggered when the current run is changed.
	var runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
	runDataActiveRun.on('change', (newVal, oldVal) => {
		if (newVal)
			updateSceneFields(newVal);
	});
	
	// Sets information on the pages for the run.
	function updateSceneFields(runData) {
		let title = `${runData.game}<br>[${runData.category}]`;
		let fontSize = 20;
		if (gameTitle.height() > 57) {
			fontSize += Math.min((gameTitle.height() - 57) / 67 * 6, 6);
		}
		gameTitle.css('font-size', `${fontSize}px`);
		animationSetField(gameTitle, title); // game-title.html
		animationSetField(gameEstimate, runData.estimate); // game-estimate.html
	}
});