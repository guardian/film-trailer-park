define([
    'libs/jquery',
    'modules/interactions'
], function(
    jQuery,
    Interactions
) {
    var url = "http://interactive.guim.co.uk/spreadsheetdata/1Gqun8cta67h9KlBriwqzqiPrUwovTBQGsaV4vQFm_7I.json";
    var data = [];

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
            this.renderInfo();
            this.renderVideo();
            Interactions.init();
        },

        renderInfo: function() {
            var infoHtml = "";
            $.each(data, function(index, value) {
                var html = '<li class="trailer-body__item">' +
                                '<h3 class="trailer-info__status">Now Playing</h3>' +
                                '<h2 class="trailer-info__title">' + data[index].title + '</h2>' +
                                '<div class="trailer-info__description">' +
                                    '<p>' + data[index].description + '</p>' +
                                '</div>' +
                                '<div class="trailer-info__button">Hey I\'m a button</div>' +
                            '</li>"'
                infoHtml += html;
            });
            $(".trailer-body__list").html(infoHtml);
        },

        renderVideo: function() {
            var videoHtml = "";
            $.each(data, function(index, value) {
                var html = '<li class="trailer-playlist__item" data-youtube="' + data[index].youtubeurl +'"><img class="trailer-playlist__image" src="' + data[index].imageurl + '" /></li>';
                videoHtml += html;
            });
            $(".trailer-playlist").html(videoHtml);
        }
    };
});