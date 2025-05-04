
// the transition between levels handeler
// the .run() will return false if the transition between levels is done
// the transition will fade between the different levels
// while the transition is running the player will increased friction that slowly decreases until the transition is over

let levelTransition = (function() {
	function Transition () {

		// goes between 0 and 1, shows how far done the transition is
		this.amt = 1;

		// will be the image of the completed last level
		this.lastLevelImage = false;

		// keep track if the level has been changed yet
		this.changedLevel = true;

		// keep track of if we are resetting the current level or going to the next level.
		this.resetting = false;
	};

	// run the function
	Transition.prototype.run = function () {

		if (this.amt < 0.2) {
			this.amt += 0.005
		} else {
			this.amt += 0.03;
		}
		

		let oscilating = 1 - Math.abs(1 - this.amt * 2);

		// fade out/in
		this.fade(oscilating);

		// the drag on the player
		if (this.amt < 0.5) {
			player.velocity = vector.mult(player.velocity, 1 - oscilating);
		}
		

		// go to the next level if the transition is halfway done
		if (this.amt >= 0.5 && !this.changedLevel) {
			this.changedLevel = true;
			if (!this.resetting) level.currentLevelInd ++;
			level.fillLevel();
		}

	};

	Transition.prototype.reset = function (resetting) {
		this.amt = 0;
		this.changedLevel = false;
		this.resetting = resetting;
	};

	return new Transition();
})();