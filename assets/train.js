
  var config = {
    apiKey: "AIzaSyDvpuKHK_ptnNSmviAviVtGT11fAkcbBok",
    authDomain: "traindatabase-2a2cd.firebaseapp.com",
    databaseURL: "https://traindatabase-2a2cd.firebaseio.com",
    projectId: "traindatabase-2a2cd",
    storageBucket: "traindatabase-2a2cd.appspot.com",
    messagingSenderId: "493456836184"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrain").on("click",function(){
  event.preventDefault();
  var trainName=$("#trainName").val();
  
  var destination=$("#destination").val();
  var trainTime=$("#trainTime").val().trim();
  var frequency=$("#frequency").val();

  var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % frequency;
  var tMinutesTillTrain = frequency - tRemainder;

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var test = moment(nextTrain).format("HH:mm")
 
  
  database.ref().push({
      name: trainName,
      destination: destination,
      trainTime: test,
      frequency: frequency,
      trainTime1: trainTime,
      nextTrain: tMinutesTillTrain
  })


      

});

database.ref().on("child_added",function(childSnapshot) {


  // var updatedTrain = childSnapshot.val().trainTime;
  // var updatedFrequency = childSnapshot.val().frequency;
  // var updatedDiffTime = moment().diff(moment(updatedTrain), "minutes")
  // var updatedRemainder = updatedDiffTime % updatedFrequency;
  // var updatedMinutes = updatedFrequency - updatedRemainder

  // moment(updatedDiffTime).format("HH:mm");
  // console.log(updatedDiffTime);
  
  // var test1 = moment(nextTrain).format("HH:mm");
  // console.log(test1)

  var newRow = $("<tr>")
  var newTrain=$("<td></td>").text(childSnapshot.val().name);
  var newDestination=$("<td></td>").text(childSnapshot.val().destination);
  
  var newFrequency=$("<td></td>").text(childSnapshot.val().frequency);
 
  var newTime=$("<td></td>").text(childSnapshot.val().trainTime);
 
  var tMinutesTillTrainTest = $("<td></td>").text(childSnapshot.val().nextTrain)
  
  
  
  
  
  newRow.append(newTrain);
  newRow.append(newDestination);
  newRow.append(newFrequency);
  newRow.append(newTime);
  newRow.append(tMinutesTillTrainTest)
  
  $("#trainSchedule").append(newRow);

  
  
  
  });

 

