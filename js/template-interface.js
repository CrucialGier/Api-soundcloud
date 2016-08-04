var currentList = [];

$(document).ready(function() {
  SC.initialize({
    client_id: '7cf07043235f0e04f0a9bc58300b6c07',
    redirect_uri: 'login-dummie.html'
  });
  $('#userConnect').click(function () {
    SC.connect(function () {
        SC.get("/me", function (me) {
            user_perma = me.permalink;
            setUI(me.username, me.avatar_url, me.description);
        });
        if (SC.isConnected) {
            console.log("logged in");
        }
        getTracks();
        getPlaylists();
    });
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
      SC.get("/tracks", function(response){
        for (var i = response.length-1; i >= 0; i --){
          currentList.push(response[i]);
          SC.oEmbed(response[i].permalink_url, {
            maxheight: 400
          }, function(res){
            $('#player').html(res.html);
          });
        }
        for (var i = 0; i < response.length; i++) {
          $("#random").append("<li>" + currentList[i].title + "</li>");
        }
      });
    });

    $('#skip').click(function(event) {
      event.preventDefault();

    })
    SC.stream("/tracks", function(sound) {
        $('#start').click(function(e) {
            e.preventDefault();
            sound.start();
        });
        $('#stop').click(function(e) {
            e.preventDefault();
            sound.stop();
        });
      });
});
