
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

setInterval(function() {
  database.ref().once("value", function(snapshot){
    let trains = data.val()
    for (const key in trains) {
      let train = trains[key]
      database.ref().child(key).set({
        name: train.name,
        destination: train.destination,
        trainTime: train.trainTime,
        frequency: train.frequency,
        trainTime: train.trainTime,
        minsTill: train.tMinutesTillTrain,
    })
    }

  })
}, 15000)

function display(data) {
  
var trains = data.val();
var table = $("#trainSchedule");
table.empty();

for (const key in trains) {
  
  let train = trains[key] 
  console.log(train)
  let row = $("<tr>").append($("<td>").text(train.name))
    .append($("<td>").text(train.destination))
    .append($("<td>").text(train.frequency))
    .append($("<td>").text(train.trainTime))
    .append($("<td>").text(train.nextTrain))
    table.append(row)
  }
}

database.ref().on("value", display)  




  // var newRow = $("<tr>")
  // var newTrain=$("<td></td>").text(childSnapshot.val().name);
  // var newDestination=$("<td></td>").text(childSnapshot.val().destination);
  // var newFrequency=$("<td></td>").text(childSnapshot.val().frequency);
  // var newTime=$("<td></td>").text(childSnapshot.val().trainTime);
 
  // var tMinutesTillTrainTest = $("<td></td>").text(childSnapshot.val().nextTrain)
  
  
  
  
  
  // newRow.append(newTrain);
  // newRow.append(newDestination);
  // newRow.append(newFrequency);
  // newRow.append(newTime);
  // newRow.append(tMinutesTillTrainTest)
  
  // $("#trainSchedule").append(newRow);

  
  
  
  

 

