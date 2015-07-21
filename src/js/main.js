define([
    'libs/jquery',
    'modules/data'
], function(
    jQuery,
    Data
) {
    'use strict';

    function init(el) {
        var muted =  false;

        @@template@@
        $(".content--interactive, .article--feature").html(template["index.html"]);

        $(window).ready(function() {
            console.log("ready");
            Data.init();
        });
    }

    return {
        init: init
    };
});