define([
    'libs/jquery',
    'modules/data'
], function(
    jQuery,
    Data
) {
    'use strict';

    function init(el, context, config, mediator) {
        var muted =  false;

        @@template@@
        $(".content--interactive, .article--feature").html(template["index.html"]);

        $(window).ready(function() {
            Data.init(mediator);
        });
    }

    return {
        init: init
    };
});