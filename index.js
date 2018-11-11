'use strict';

// Each data field within a player array
var INDEX_PLAYER_ID = 0;
var INDEX_PLAYER_NAME = 1;
var INDEX_PLAYER_STATUS = 2;
var INDEX_PLAYER_TARGET = 3;

 var playerOne = ["12345678", "Jon", "false", "98765432"];
 var playerTwo = ["98765432", "Joey", "false", "12345678"];

// ----- Initialize Firebase -----------------------------------------------------
// Get the config info from the database settings area on your firestore database

var config = {
      apiKey: "AIzaSyAvFcFmevEn-NImhiKSA31L6MT4bWTxC0Q",
       authDomain: "firestore-crud-prototype.firebaseapp.com",
       databaseURL: "https://firestore-crud-prototype.firebaseio.com",
       projectId: "firestore-crud-prototype",
       storageBucket: "firestore-crud-prototype.appspot.com",
       messagingSenderId: "71672822272"
};

// init firebase
firebase.initializeApp(config);

// create shorthand reference to the database
var db = firebase.firestore();

// -----  end init firebase ---------------------------------------

// Grab data from input boxes and store in global vars
var id;
var name;
var status;
var target;

// create reference to message board
var message = document.getElementById("messageBoard");

function getScreenData()
{
  // Grab data from input boxes and store in global vars
  id = document.getElementById("idInputBox").value;
  name = document.getElementById("nameInputBox").value;
  status = document.getElementById("statusInputBox").value;
  target = document.getElementById("targetInputBox").value;

  console.log("Form data: id = " + id + "  Name = " + name + "  status = " + status + "  target = " + target );
}

// Start CRUD functions -------------------------------------------

// Start "Create" function -----------------------------------------
// Use .set function - this code creates 2 players

function createDB()
{

  // hard code player 1
  db.collection("players").doc(playerOne[INDEX_PLAYER_ID]).set({
      status: playerOne[INDEX_PLAYER_STATUS],
      name: playerOne[INDEX_PLAYER_NAME],
      target: playerOne[INDEX_PLAYER_TARGET]
    })
    .then(function() {
      console.log("db reset success player 1");
    })
    .catch(function(error) {
      console.error("reset db fail player 1", error);
    });

  // hard code player 2
  db.collection("players").doc(playerTwo[INDEX_PLAYER_ID]).set({
      status: playerTwo[INDEX_PLAYER_STATUS],
      name: playerTwo[INDEX_PLAYER_NAME],
      target: playerTwo[INDEX_PLAYER_TARGET]
    })
    .then(function() {
      console.log("db reset success player 2");
    })
    .catch(function(error) {
      console.error("reset db fail player 2", error);
    });

    message.innerHTML = "DB Reset Success.  Player 1 id : " + playerOne[INDEX_PLAYER_ID] + " - Name is " + playerOne[INDEX_PLAYER_NAME] + " -- Player 2 id : " + playerTwo[INDEX_PLAYER_ID] + " - Name is " + playerTwo[INDEX_PLAYER_NAME];

}

  // ----------------- End Create ---------------------

  // ----- Start "Retrieve" function ------------------
  // use the .get function

  function retrievePlayerData()
  {

    getScreenData();

    // create a reference to the document
    var playerRef = db.collection("players").doc(id);

    playerRef.get().then(function(doc)
    {
      if (doc.exists)
      {
          // display player name in the message board
          message.innerHTML = "Player " + id + " found.  Name is " + doc.data().name;
      }

    }).catch(function(error) {
      console.log("Error getting playerRef.get() document:", error);
      });

  }

// --------------------------------
// retrieve all player documents in the db and show each in an alert

function getAllPlayers()
{
  db.collection("players").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        alert (doc.data().name);
    });

  });

}

// --------------------------------

function retrieveGameData()
{
  // create a reference to the document
  var gameDataRef = db.collection("gameData").doc("gameData");

  gameDataRef.get().then(function(doc)
  {
    if (doc.exists)
    {
        // display game status in the message board
        message.innerHTML = "Game status is " + doc.data().status;
    }

  }).catch(function(error) {
    console.log("Error getting gameRefData.get() document:", error);
    });

}

// ----- Start "Update" function ------------------
// use the .update function

function updateData()
{
    // use the data from the form to update the document
    getScreenData();

    db.collection("players").doc(id).update({
      name: name,
      status: status,
      target: target
    })
    .then(function() {
      console.log("Players update success.");
    })
    .catch(function(error) {
      console.error("Error player update to db.", error);
    });

}

// ----- Start "Delete" function ------------------
// use the .delete function

function deleteData()
{

  getScreenData();

  db.collection("players").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });

}


// ----- Start "Add" function ------------------
// use the .add function if you want an autogenerated ID
// use .set if you want to define the id yourself

function addAdmin()
{

  getScreenData();

  db.collection("admins").add({
      id: id,
      name: name
  })
  .then(function(docRef) {
      console.log("admin Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding admin document: ", error);
  });

}

// ----------------------------------------

function readArray()
{

    console.log("Got into readArray");

    // create a reference to the queue document
    var queueRef = db.collection("queue").doc("queue");

    queueRef.get().then(function(doc)
    {
      if (doc.exists)
      {
          console.log("Doc exists");
          // display players array in the message board
          message.innerHTML = "Players queue is " + doc.data().players;
      }
      else {
        console.log("Doc does not exist.");
      }
    }).catch(function(error) {
      console.log("Error getting queue document:", error);
      });

} // end function readArray


// ----------------------------------------

function writeArray()
{

    console.log("Got into writeArray");

    // create a reference to the queue document
    var queueRef = db.collection("queue").doc("queue");

    var myPlayersArray = ["11112222", "44445555", "88883333", "99992222"];

    // update players queue
    db.collection("queue").doc("queue").set({
        players: myPlayersArray
      })
      .then(function() {
        console.log("Success writing to queue");
      })
      .catch(function(error) {
        console.error("Error writing to queue", error);
      });

} // end function writeArray
