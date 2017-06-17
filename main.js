/*
  Here is a guide for the steps you could take:
*/

// 1. First select and store the elements you'll be working with

const API = "?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f";
var artistID;
var artistTracks;
const WEBSITE = "https://api.soundcloud.com/users/";
var trackResults = document.querySelector(".results");

// 2. Create your `onSubmit` event for getting the user's search term

var submitButton = document
  .getElementById("searchButton")
  .addEventListener("click", e => {
    var userInput = document.getElementById("searchInput").value;
    console.log("inputText: ", userInput);
    searchSoundCloud(userInput);
    console.log(artistID);
  });

// 3. Create your `fetch` request that is called after a submission

function searchSoundCloud(input) {
  // "use strict";
  var url = WEBSITE + input + "/" + API;
  console.log(url);
  axios.get(WEBSITE + input + "/" + API).then(function(response) {
    var artist = response.data; // gives entire data of object
    artistID = response.data.id;
    console.log("artist: ", artist);
    console.log("artist ID: ", artistID);
    populateTracks(artistID);
  });
}

function populateTracks(artistID) {
  axios.get(WEBSITE + artistID + "/tracks" + API).then(function(response) {
    artistTracks = response.data;
    console.log("Tracks: ", artistTracks);
    trackLister(artistTracks);
  });
}

// 4. Create a way to append the fetch results to your page

function trackLister(artistTracks) {
  for (var i = 0; i < artistTracks.length; i++) {
    console.log(artistTracks[i].title);
    displayMaker();

    // make a box for the track results:

    function displayMaker() {
      var trackContainer = document.createElement("div");
      trackContainer.classList.add("trackContainer");
      trackResults.appendChild(trackContainer);

      var albumArt = document.createElement("img");
      albumArt.src = artistTracks[i].artwork_url;
      albumArt.classList.add("artwork");
      trackContainer.appendChild(albumArt);

      var trackTitle = document.createElement("h5");
      trackTitle.textContent = artistTracks[i].title;
      trackTitle.classList.add("trackTitle");
      trackContainer.appendChild(trackTitle);

      var trackArtist = document.createElement("h3");
      trackArtist.textContent = artistTracks[i].user.username;
      trackArtist.classList.add("trackArtist");
      trackContainer.appendChild(trackArtist);
    }
  }
}

// 5. Create a way to listen for a click that will play the song in the audio play
