define([
    'libs/jquery',
    'modules/data',
    'modules/interactions'
], function(
    jQuery,
    Data,
    Interactions
) {
    'use strict';

    function init(el) {
        var muted =  false;

        @@template@@
        $(".content--interactive, .article--feature").html(template["index.html"]);

        $(window).ready(function() {
            Data.init();
            Interactions.init();
        });
    }

    return {
        init: init
    };
});