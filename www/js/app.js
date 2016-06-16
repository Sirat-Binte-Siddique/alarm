angular.module('starter', ['ionic'])

var Alarmapp = angular.module('alarm', ['ionic'])
.controller('alarm-contro', function ($scope, $ionicModal, $filter, $interval, $ionicPopup) {
    $scope.alarms = [];
    $scope.alarm = {};
    $ionicModal.fromTemplateUrl('add-alarm.html', function (modal) {
        $scope.setalarm = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });


    $scope.createalarm = function (alarm) {
        var time = alarm.hour + ":" + alarm.min + " " + alarm.pos; // 12:00 PM Input to this format
        $scope.alarms.push({
            time: time,
            on: true
        });
        localStorage.setItem('alarms', JSON.stringify($scope.alarms)); //store alarms in localstorage as key alarms
        $scope.alarm = {}; // once saved the given data empty the form
        $scope.setalarm.hide(); //close the modal
    };

    $scope.newalarm = function () {
        $scope.setalarm.show(); //-----> open our modal
    };

    $scope.closesetalarm = function () {
        $scope.setalarm.hide(); // -----> Close our modal
    };

    $scope.offalarm = function (index) {
        if (index !== -1) {
            if ($scope.alarms[index].on) {
                $scope.alarms[index].on = true;
            } //turn on alarm
            else {
                $scope.alarms[index].on = false;
            } //turn off alarm
        }
        localStorage.setItem('alarms', JSON.stringify($scope.alarms)); //once change made save that in localstorage
    };

    $scope.removealarm = function (index) {
        $scope.alarms.splice(index, 1); //Delete the index object from the array
        localStorage.setItem('alarms', JSON.stringify($scope.alarms)); // we made a change we need to save it in localstorage
    };

    $scope.getalarms = function () {
        $scope.alarms = (localStorage.getItem('alarms') !== null) ? JSON.parse(localStorage.getItem('alarms')) : []; //retrieve form localstorage
        $scope.Time = $filter('date')(new Date(), 'hh:mm a'); //take the current time from machine
        $interval(function () {
            $scope.alarmcheck(); //Check any alarm now once a minute
        }, 60000);

        $interval(function () {
            $scope.Time = $filter('date')(new Date(), 'hh:mm a'); //Check current time one minute once
        }, 60000);
    };

    $scope.alarmcheck = function () {
        var input = $scope.alarms,
            time = $scope.Time; //Take object of arrays and time in local variable 
        var i = 0,
            len = input.length;
        for (; i < len; i++) {
            if (input[i].time.trim() == time.trim() && input[i].on) { //Check there's a alarm for now and it's in on 
                $ionicPopup.alert({
                    title: 'Alarm',
                    template: 'Wake up' // If it is there open popup to display
                
                });
            }
        }
    };


})



.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})