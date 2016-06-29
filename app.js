var leap =  require('leapjs')
var drone = require("ar-drone").createClient()

var roll, pitch, yaw, height, takeoff = false, takenoff = false

//get nav data
//drone.on('navdata', console.log)

leap.loop(function(frame) {
	if (frame.hands.length > 0) {
		takeoff = true
	  	var hand = frame.hands[0]

		roll = hand.roll() * 180 / 3.14159265
		pitch = hand.pitch() * 180 / 3.14159265
		yaw = hand.yaw() * 180 / 3.14159265
		height = hand.stabilizedPalmPosition[1]

		console.log("Roll:" + roll)
		console.log("Pitch:" + pitch)
		console.log("Yaw:" + yaw)
		console.log("Height: " + height)
	}
	else
		takeoff = false

	if (takenoff) {
		if (!takeoff) {
			drone.land()
			takenoff = false
		}
		else {
			//drone control code
			if (height > 125 && height < 175) //gap for zeros
				height = 0
			else if (height < 125) {
				height = 1 - Math.max(0, Math.min(1, (height - 50) / (125 - 50)))
				//drone.down(height)
			}
			else {
				height = Math.max(0, Math.min(0.25, (height - 175) / (300 - 175)))
				//drone.up(height)
			}

			if (pitch < 0) {
				pitch *= -1
				pitch = Math.max(0, Math.min(1, pitch / 50))
				drone.front(pitch)
			}
			else {
				pitch = Math.max(0, Math.min(1, pitch / 50))
				drone.back(pitch)
			}

			if (roll < 0) {
				roll *= -1
				roll = Math.max(0, Math.min(1, roll / 80))
				drone.right(roll)
			}
			else {
				roll = Math.max(0, Math.min(1, roll / 60))
				drone.left(roll)
			}

			if (yaw < 0) {
				yaw *= -1
				yaw = Math.max(0, Math.min(1, yaw / 50))
				drone.counterClockwise(yaw)
			}
			else {
				yaw = Math.max(0, Math.min(1, yaw / 50))
				drone.clockwise(yaw)
			}
		}
	}
	else {
		if (takeoff) {
			drone.takeoff()
			takenoff = true
		}
	}
})