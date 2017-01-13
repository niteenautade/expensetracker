'use strict';

/**
 * @ngdoc function
 * @name expensetrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the expensetrackerApp
 */
angular.module('expensetrackerApp')
  .controller('MainCtrl', function ($scope,$http) {
  	$scope.list = {};
  	$scope.noOfElements = 0;
    $scope.var_show = false;
  	
    $scope.addItem = function(x,y){
    	$scope.list[x]=y;
    	$scope.noOfElements = _.size($scope.list);
      $scope.var_show = false;
    };
    $scope.removeItem = function(x){
    	delete $scope.list[x];
    	$scope.noOfElements = _.size($scope.list);
    };
    $scope.clearAll = function(){
    	$scope.list = {};
    	$scope.noOfElements = _.size($scope.list);
    };

    $scope.retrievelist = {};
    $scope.loadDoc = function() {
      var json_string = JSON.stringify($scope.list);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("submit_status").innerHTML = this.responseText;

          
          $http.get("php/retrieve.php")
          .then(function (response) {$scope.retrievelist = response.data;});
        }
      };
      xhttp.open("POST", "php/submit.php", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(json_string);
      
      $scope.var_show = true;

      $scope.list = {};
      $scope.noOfElements = _.size($scope.list);
     }

     
     $http.get("php/retrieve.php")
      .then(function (response) {$scope.retrievelist = response.data;});

      $scope.getTotal = function(){
        var total = 0;
        for(var i=0;i<$scope.retrievelist.length;i++){
          total+=parseInt($scope.retrievelist[i].price);
        }
        return total;
      }


      $scope.updateItemFunction = function(updateItem,updatePrice) {
        var list1 = {};
        list1[updateItem]=updatePrice;
        var json_string = JSON.stringify(list1);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            document.getElementById("update_status").innerHTML = this.responseText;

            $http.get("php/retrieve.php")
        .then(function (response) {$scope.retrievelist = response.data;});
          }
        };
        xhttp.open("POST", "php/update.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(json_string);
        
        
     }

      $scope.delete = function(del_name){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("delete_status").innerHTML = this.responseText;
          $http.get("php/retrieve.php")
      .then(function (response) {$scope.retrievelist = response.data;});
        }
      };
      xhttp.open("POST", "php/delete.php", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(del_name);
      
     };

     $scope.deleteall = function(){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("delete_status").innerHTML = this.responseText;

          $http.get("php/retrieve.php")
      .then(function (response) {$scope.retrievelist = response.data;});
        }
      };
      xhttp.open("POST", "php/deleteall.php", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send();
      
     };
  });

