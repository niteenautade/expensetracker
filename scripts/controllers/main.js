'use strict';

/**
 * @ngdoc function
 * @name expensetrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the expensetrackerApp
 */
 var profile=null;
function onSignIn(googleUser) {
    profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
}
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  auth2.disconnect();
  profile = null;
  location.reload();
}
angular.module('expensetrackerApp')
  .controller('MainCtrl',['$scope', '$http','$window','$timeout', function ($scope,$http,$window,$timeout) {
    $scope.user = $window.profile;
    $scope.timeInMs = 0;
    var countUp = function() {
        $scope.timeInMs+= 1;
        $scope.user = $window.profile;

        $scope.allfeatures = false;
    if($scope.user == null){
      $scope.allfeatures = false;
    }
    else $scope.allfeatures = true;

        $timeout(countUp, 1000);
    }
    $timeout(countUp, 1000);

    

  	$scope.list = {};
  	$scope.noOfElements = 0;
    $scope.var_show = false;

    $scope.show_viewfeature = true;
    $scope.show_addfeature = false;
    $scope.show_updatefeature = false;
    $scope.show_deletefeature = false;
  	
    $scope.addItem = function(x,y){
    	$scope.list[x]=y;
    	$scope.noOfElements = _.size($scope.list);
      $scope.var_show = false;

      document.getElementById("itemName").value = null;
      document.getElementById("itemPrice").value = null;
    };
    $scope.removeItem = function(x){
    	delete $scope.list[x];
    	$scope.noOfElements = _.size($scope.list);
    };
    $scope.clearAll = function(){
    	$scope.list = {};
    	$scope.noOfElements = _.size($scope.list);
    };

    //SUBMIT TO DATABASE
    $scope.retrievelist = {};
    $scope.submitToDatabase = function() {
      $scope.show_viewfeature = true;
      $scope.list['loginid']=$scope.user.getId();
      var json_string = JSON.stringify($scope.list);
      console.log("string"+json_string);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("submit_status").innerHTML = this.responseText;

          
          waitfunction();
        }
      };
      xhttp.open("POST", "php/submit.php", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(json_string);
      
      $scope.var_show = true;

      $scope.list = {};
      $scope.noOfElements = _.size($scope.list);

      document.getElementById("itemName").value = null;
      document.getElementById("itemPrice").value = null;
     }

     //INITIAL LOAD OF WEB PAGE
     //$scope.testf = function(){
      var waitfunction = function(){
        if($scope.user!=null){
        $scope.testname = null;
        var xmlhttp = new XMLHttpRequest();
        var str = $scope.user.getId();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                $scope.retrievelist = JSON.parse(this.responseText);

            }
        };
        xmlhttp.open("GET", "php/retrieve.php?par=" + str, true);
        xmlhttp.send();
        }
        else $timeout(waitfunction,1000);
      };
      $timeout(waitfunction,1000);

       

      

      $scope.getTotal = function(){
        var total = 0;
        for(var i=0;i<$scope.retrievelist.length;i++){
          total+=parseInt($scope.retrievelist[i].price);
        }
        return total;
      }

      
      

      //UPDATE ITEM IN DATABASE
      $scope.updateItemFunction = function(updateItem,updatePrice) {
        var list1 = {};
        list1[updateItem]=updatePrice;
        var json_string = JSON.stringify(list1);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            document.getElementById("update_status").innerHTML = this.responseText;

            waitfunction();
          }
        };
        xhttp.open("POST", "php/update.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("item_to_be_updated="+json_string+"&loginid="+$scope.user.getId());
        
        myform1.reset();
     }

      //DELETE ONE ITEM FROM DATABASE
      $scope.delete = function(del_name){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("delete_status").innerHTML = this.responseText;
          
          waitfunction();
        }
      };
      xhttp.open("POST", "php/delete.php", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send("del="+del_name+"&loginid="+$scope.user.getId());
      
     };

     //DELETE ALL ITEMS FROM DATABASE
     $scope.deleteall = function(){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("delete_status").innerHTML = this.responseText;

          waitfunction();
        }
      };
      xhttp.open("POST", "php/deleteall.php", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send("loginid="+$scope.user.getId());
     };

     //SHOW THE VIEW EXPENSES FEATURE
     $scope.showViewFeature = function(){
      $scope.show_viewfeature = !$scope.show_viewfeature;
     }

     //SHOW THE ADD EXPENSES FEATURE
     $scope.showAddFeature = function(){
      $scope.show_addfeature = !$scope.show_addfeature;

      $scope.show_updatefeature = false;
      $scope.show_deletefeature = false;
     }

     //SHOW THE UPDATE EXPENSES FEATURE
     $scope.showUpdateFeature = function(){
      $scope.show_updatefeature = !$scope.show_updatefeature;

      $scope.show_addfeature = false;
      $scope.show_deletefeature = false;
     }

     //SHOW THE DELETE EXPENSES FEATURE
     $scope.showDeleteFeature = function(){
      $scope.show_deletefeature = !$scope.show_deletefeature;

      $scope.show_addfeature = false;
      $scope.show_updatefeature = false;
     }


  }]);

