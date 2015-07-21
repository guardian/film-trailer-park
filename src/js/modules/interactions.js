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
            // Load the Youtube API if needed
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
            container = $(container).find(".trailer-playlist__video")[0];
            console.log(container);
            new YT.Player(container, {
                videoId: videoId,
                // For a list of all parameters, see:
                // https://developers.google.com/youtube/player_parameters
                playerVars: {
                    autohide: 1,
                    autoplay: 1,
                    color: "#ffbb00",
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0
                }
            });
        }
    };
});