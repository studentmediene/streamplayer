define(['jquery', 'config'], function ($, config) {
    var exports = {};

    var getCurrentShow = function () {
        return $.getJSON(config.currentShowsUrl);
    };

    exports.displayCurrentShow = function () {
        getCurrentShow().done(function (data) {
            $(config.currentShowId).html('<p>'+ data.current.title || "Radio Revolt" + '</p>');
        });
    };

    return exports;

});