

$(document).ready(function() {
  SC.initialize({
    client_id: '7cf07043235f0e04f0a9bc58300b6c07'
  });
  $("#embedTrack").click(function(event) {
     event.preventDefault();
    var artist = $("#querySong").val();
    artist = artist.split(" ").join("");
    var track_url = "https://soundcloud.com/" + artist;
    var player = $("#player");
    SC.oEmbed(track_url, {
      maxheight: 200
    }, function(res) {
      $("#player").html(res.html);
    });
  });
    $("#getList").click(function(event){
      event.preventDefault();
      var artist = $("#querySong").val();
      artist = artist.split(" ").join("");
      SC.get("/" + artist, function(response){
        for (var i = 0; i < response.length; i++) {
          $("ul").append("<li>" + response[i].title + "</li>");
        }
      });
    });
  // $()
  //   SC.stream("/tracks/293", function(sound) {
  //       $('#start').click(function(e) {
  //           e.preventDefault();
  //           sound.start;
  //       });
  //       $('#stop').click(function(e) {
  //           e.preventDefault();
  //           sound.stop();
  //       });
  //     });
});
