requirejs.config({
    paths: {
        'SoundManager': '../bower_components/soundmanager2/script/soundmanager2',
        'moment': '../bower_components/moment/moment',
        'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min',
        'config': 'baseConfig',
        'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.22/angular.min'
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        }
    },
    priority: [
        'angular',
    ]
});

requirejs(['angular', 'jquery', 'app'], function(angular, $){
    angular.element($('html')).ready(function(){
        angular.resumeBootstrap();
    })
});
