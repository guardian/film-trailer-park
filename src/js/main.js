define([
    'libs/jquery'
], function(
    jQuery
) {
    'use strict';

    function init(el) {
        var muted =  false;

        @@template@@
        $(".content--interactive, .article--feature").html(template["index.html"]);

        $(window).ready(function() {
            console.log("ready");
        });
    }

    return {
        init: init
    };
});