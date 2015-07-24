define([
    'libs/jquery'
], function(
    jQuery
) {
    var current = 0;
    var player;

    return {
        init: function(initial) {
            this.bindings();
            current = initial;
            $(".trailer").addClass("current--" + current);
            setTimeout(function() {
                $(".preload").removeClass("preload");
            }, 200);
        },

        bindings: function() {
            $(".trailer-playlist__item").click(function(el) {
                this.playVideo(el.currentTarget);
            }.bind(this));
            
            $(".trailer-video__button--next").click(function() {
                this.changeVideo("next");
            }.bind(this));

            $(".trailer-video__button--prev").click(function() {
                this.changeVideo("prev");
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
            container = $(container).find(".trailer-playlist__video")[0];
            player = new YT.Player(container, {
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

            player.addEventListener('onStateChange', this.onStateChange.bind(this));
        },

        onStateChange: function(el) {
            if (el.data === 0) {
                this.changeVideo("next", true);
            }
        },

        changeVideo: function(direction, autoplay) {
            $(".trailer").removeClass (function (index, css) {
                return (css.match (/(^|\s)current-\S+/g) || []).join(' ');
            });
            $(".trailer").removeClass("prev next");
            $(".trailer").addClass(direction);

            if (direction === "next") {
                current += 1;
            } else if (direction === "prev") {
                current = current - 1;
            }

            $(".trailer-playlist__video").replaceWith("<div class='trailer-playlist__video'></div>");
            $(".trailer").addClass("current--" + current);

            window.location.hash = $(".trailer-body__item--" + current + " .trailer-info__title").html().toLowerCase();

            if (autoplay) {
                this.playVideo($(".trailer-playlist__item--" + current));
            }
        }
    };
});