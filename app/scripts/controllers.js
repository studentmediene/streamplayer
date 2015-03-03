define(['angular', 'config', 'SoundManager', 'moment'], function (angular, config, SoundManager, moment) {
    var soundManager = window.soundManager = new SoundManager.SoundManager();
    return angular.module('streamplayerApp.controllers', [])
        .controller('currentShowCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
            function fetchCurrentShow() {
                $http.get(config.currentShowsUrl)
                    .success(function (data) {
                        if (data.current.title) {
                            $scope.title = data.current.title;

                        } else {
                            $scope.title = config.defaultShowTitle;
                        }
                        var waitDuration;
                        if (data.next.starttime) {
                            waitDuration = moment(data.next.starttime) - moment();
                        } else {
                            var nextHour = moment();
                            nextHour.startOf('hour');
                            nextHour.hour(nextHour.hour() + 1);
                            waitDuration = nextHour - moment();
                        }
                        $timeout(fetchCurrentShow, waitDuration);
                    }).error(function () {
                        $scope.title = config.defaultShowTitle;
                    });
            }

            fetchCurrentShow();
        }])
        .controller('soundCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
            $scope.playing = true;
            soundManager.setup({
                url: config.flashUrl,
                debugMode: config.debug,
                preferFlash: config.preferFlash,
                onready: function () {
                    $scope.$apply(function ($scope) {
                        var sound = soundManager.createSound({
                            id: 'revoltstream',
                            url: 'http://streamer.radiorevolt.no:8000/revolt',
                            volume: 50,
                            autoPlay: false
                        });
                        $rootScope.loaded = true;
                        sound.play();
                        $scope.togglePlay = function () {
                            $scope.playing = !$scope.playing;
                            sound.togglePause();
                        };
                    });
                }});
            soundManager.beginDelayedInit();
        }]);
});
