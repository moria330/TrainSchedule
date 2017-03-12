// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAv4Tl1NZHlYMoZbPbV-25lxL2g8g-d8u0",
    authDomain: "trainscheduledemo.firebaseapp.com",
    databaseURL: "https://trainscheduledemo.firebaseio.com",
    storageBucket: "trainscheduledemo.appspot.com",
    messagingSenderId: "345233603041"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#add-train-btn").on("click", function(event) {  //file doesnt follow on click properly
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  console.log(trainName);
  var trainDest = $("#destination-input").val().trim();
  console.log(trainDest);
  var trainStart = moment($("#first-train-time-input").val().trim(), "HH:mm").format("HH:mm");
  console.log(trainStart);
  var trainFreq = $("#frequency-input").val().trim();
  console.log(trainFreq);

  var newTrain = {
    name: trainName,
    destination: trainDest,
    start: trainStart,
    frequency: trainFreq
  };

  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

// Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");

  // Prevents moving to new page
  return false;
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) { //File skips internal function
                        
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().frequency;

  var tFrequency = trainFreq;

	// Time
	var firstTime = trainStart;

	// First Time (pushed back 1 year to make sure it comes before current time)
	var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	// Current Time
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

	// Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % tFrequency;
	console.log(tRemainder);

	// Minute Until Train
	var tMinutesTillTrain = tFrequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Add each train's data into the table
  $("#trainTimes > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainFreq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});



    