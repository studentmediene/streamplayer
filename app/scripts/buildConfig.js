define(['jquery', 'baseConfig'], function($, baseConfig){
    var newConfig = {
        debug: false,
        flashUrl: 'swf'
    };
    return $.extend({}, baseConfig, newConfig);
});
