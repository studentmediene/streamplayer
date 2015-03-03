define(['jquery', 'soundmanager2', 'config'], function ($, soundManager, config) {
    soundManager.setup({
        url: '../bower_components/soundmanager2/swf/',
        debugMode: config.debug,
        preferFlash: config.preferFlash,
        onready: function () {
            var sound = soundManager.createSound({
                id: 'revoltstream',
                url: 'http://streamer.radiorevolt.no:8000/revolt',
                volume: 50,
                autoPlay: false
            });
            $(config.playerDivId).click(function(){
                sound.togglePause();
               $(this).toggleClass('playing').toggleClass('paused');
            });
        }});
});
