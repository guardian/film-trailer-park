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
            console.log("bindings");
        }
    };
});