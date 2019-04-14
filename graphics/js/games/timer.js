'use strict';
$(() => {
	// The bundle name where all the run information is pulled from.
	var speedcontrolBundle = 'nodecg-speedcontrol';
	
	// This is where the timer information is received.
	// The "change" event is triggered whenever the time changes or the state changes.
	var timer = nodecg.Replicant('timer', speedcontrolBundle);
	timer.on('change', (newVal, oldVal) => {
		if (newVal)
			updateTimer(newVal, oldVal);
	});
	
	// Sets the timer text and classes.
	function updateTimer(newVal, oldVal) {
		// Change class on the timer to change the colour if needed.
		// See the common.css file for more information.
		if (oldVal) $(`.timerContainer .timer`).toggleClass('timer_'+oldVal.state, false);
		$(`.timerContainer .timer`).toggleClass('timer_'+newVal.state, true);

		$(`.timerContainer .timer`).html(newVal.time);

		const finishTimes = newVal.teamFinishTimes;
		if (Object.keys(finishTimes).length) {
			for (let id in finishTimes) {
				id = Number(id);

				const time = finishTimes[id].time;
				$(`.timerContainer[timer-id=${id + 1}] .timer`).html(time).toggleClass('timer_stopped timer_running timer_paused', false).toggleClass('timer_finished', true);
			}
		}
	}
});