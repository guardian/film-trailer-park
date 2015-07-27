define([
    'libs/jquery',
    'modules/interactions'
], function(
    jQuery,
    Interactions
) {
    var url = "http://interactive.guim.co.uk/spreadsheetdata/1Gqun8cta67h9KlBriwqzqiPrUwovTBQGsaV4vQFm_7I.json";
    var data = [];
    var pageurl = window.location.href.split("#")[0];

    return {
        init: function() {
            this.fetch();
        },

        fetch: function() {
            $.getJSON(url, function(spreadsheet) {
                data = spreadsheet.sheets.blocks;
                this.render();
            }.bind(this));
        },

        render: function() {
            this.renderVideo();
            this.renderInfo();
            Interactions.init(this.getStartingPoint());
        },

        renderVideo: function() {
            var videoHtml = "";
            $.each(data, function(index, value) {
                var html = '<li class="trailer-playlist__item trailer-playlist__item--' + index + '" data-youtube="' + data[index].youtubeurl +'" style="background-image: url(' + data[index].imageurl + ');">' +
                                '<div class="trailer-playlist__button"><svg class="trailer-playlist__button__icon" width="30" height="30" viewBox="0 0 30 30"><path d="M30 15.678L1.037 27.566 0 26.848V3.23l1.037-.797L30 14.4v1.278z"/></svg></div>' +
                                '<div class="trailer-playlist__video"></div>' +
                            '</li>';
                videoHtml += html;
            });

            $(".trailer-playlist").html(videoHtml);
        },

        renderInfo: function() {
            var infoHtml = "";
            $.each(data, function(index, value) {
                console.log(data[index].tag);
                var html = '<li class="trailer-body__item trailer-body__item--' + index + '">' +   
                                '<h2 class="trailer-info__title">' + data[index].title + '</h2>' +
                                '<div class="trailer-info__description">' +
                                    '<p>' + data[index].description + '</p>' +
                                '</div>' +
                                '<ul class="trailer-info__share social social--top u-unstyled u-cf">' +
                                    '<li class="trailer-info__share__item rounded-icon social-icon social-icon--twitter">' + 
                                        '<a href="https://twitter.com/intent/tweet?text=' + this.returnShareUrl("tweet", data[index].title) + '" target="_blank"><i class="i-share-twitter--white i"></i></a>' +
                                    '</li>' +
                                    '<li class="trailer-info__share__item rounded-icon social-icon social-icon--facebook">' + 
                                        '<a href="https://www.facebook.com/sharer/sharer.php?u=' + this.returnShareUrl("facebook", data[index].title) + '&ref=responsive" target="_blank"><i class="i-share-facebook--white i"></i></a>' +
                                    '</li>' +
                                    '<li class="trailer-info__share__item rounded-icon social-icon social-icon--email">' + 
                                        '<a href="mailto:?' + this.returnShareUrl("email", data[index].title) + '" target="_blank"><i class="i-share-email--white i"></i></a>' +
                                    '</li>' +
                                    (data[index].tag !== '' ? '<a class="trailer-info__button button button--medium" href="' + data[index].tag + '">Learn more about ' + data[index].title + '</a>': "" ) +
                                '</ul>' +
                            '</li>'
                infoHtml += html;
            }.bind(this));
            $(".trailer-body__list").append(infoHtml);
        },

        returnShareUrl: function(network, film) {
            if (network === "tweet") {
                return encodeURIComponent('Watch the trailer for ' + film + ' on @guardianfilm\'s trailer park: ' + pageurl + "#" + film.toLowerCase());
            } else if (network === "facebook") {
                return encodeURIComponent(pageurl + "#" + film.toLowerCase());
            } else if (network === "email") {
                return encodeURIComponent('subject=Watch the trailer for ' + film + '&body=' + pageurl + '#' + film.toLowerCase());
            }
        },

        getStartingPoint: function() {
            var url = window.location.hash.replace("#", "");
            var current = 0;
            $.each(data, function(index, value) {
                if (url.toUpperCase() == data[index].title.toUpperCase()) {
                    current = index;
                    return;
                }
            });
            return current;
        }
    };
});