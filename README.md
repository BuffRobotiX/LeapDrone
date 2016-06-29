# LeapDrone
A leap motion controlled parrot drone.

# Setup
Make sure the leap Motion is plugged in and the Leap Motion Control Panel program is running in the tray, https://www.leapmotion.com/setup
Install Node, https://nodejs.org/ and make sure node and npm are in your path.
Clone this repository.
cd to the cloned directory.
"npm install" to install the required packages, this project uses two Node packages, ar-drone, https://www.npmjs.com/package/ar-drone and leapjs, https://www.npmjs.com/package/leapjs
Plug in the battery to turn the Parrot drone on.
Connect your computer to the Ar-Drone wifi network.
"node app.js" to run the program.
Place your hand over the leap motion and the Parrot drone should take off.

# Future Developments
Look at the ar-drone package api for more features, particularly drone.on('navdata', function(var data) {}), whcih gives you a data from the drone in json form and a callback function. With this you can get the battery percentage, gps locations, accelerometer data, etc.

Getting the video stream from the drone can be quite difficult and requires some server knowledge, take a look at the dronestream package, https://www.npmjs.com/package/dronestream

A similar project that may be of some use is this one, https://github.com/charliegerard/leap_drone
