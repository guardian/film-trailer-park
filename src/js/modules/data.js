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
            this.renderVideo();
            this.renderInfo();
            Interactions.init();
        },

        renderVideo: function() {
            var videoHtml = "";
            $.each(data, function(index, value) {
                var html = '<li class="trailer-playlist__item trailer-playlist__item--' + index + '" data-youtube="' + data[index].youtubeurl +'" style="background-image: url(' + data[index].imageurl + ');">' +
                                '<div class="trailer-playlist__video"></div>' +
                            '</li>';
                videoHtml += html;
            });

            $(".trailer-playlist").html(videoHtml);
        },

        renderInfo: function() {
            var infoHtml = "";
            $.each(data, function(index, value) {
                var html = '<li class="trailer-body__item trailer-body__item--' + index + '">' +   
                                '<h2 class="trailer-info__title">' + data[index].title + '</h2>' +
                                '<div class="trailer-info__description">' +
                                    '<p>' + data[index].description + '</p>' +
                                '</div>' +
                                '<div class="trailer-info__button">Hey I\'m a button</div>' +
                            '</li>'
                infoHtml += html;
            });
            $(".trailer-body__list").append(infoHtml);
        }
    };
});