define([
    'libs/jquery'
], function(
    jQuery
) {
    return {
        init: function() {
            this.bindings();
        },

        bindings: function() {
            $(".trailer-playlist__item").click(function(el) {
                this.playVideo(el.currentTarget);
            }.bind(this));
        },

        playVideo: function(target) {
            console.log("hey");
            if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
                window.onYouTubeIframeAPIReady = function() {
                    this.loadPlayer(target, $(target).attr("data-youtube").split("?v=")[1]);
                }.bind(this);
                $.getScript('//www.youtube.com/iframe_api');
            } else {
                this.loadPlayer(target, $(target).attr("data-youtube").split("?v=")[1]);
            }
        },

        loadPlayer: function(container, videoId) {
            console.log(container);
            console.log(videoId);
            new YT.Player(container, {
                videoId: videoId,
                width: 356,
                height: 200,
                // For a list of all parameters, see:
                // https://developers.google.com/youtube/player_parameters
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0
                }
            });
        }
    };
});