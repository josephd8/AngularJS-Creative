angular.module("myApp",['uiGmapgoogle-maps'])
.controller("MainCtrl",[
'$scope',
'$http',
function($scope,$http){

$scope.spots = [
];

$scope.lats = [
40.2338
];

$scope.longs = [
-111.6585
];

$scope.refresher=false;

$scope.addSpot = function(){
	$scope.spots.push({name: $scope.name,address:$scope.address});
	$scope.name = "";
	$scope.address = "";
};

$scope.updateMapCenter = function(address){

var geocoder = new google.maps.Geocoder();
geocoder.geocode( { "address": address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
        var location = results[0].geometry.location;
        console.log(results);
        console.log(results[0].geometry.viewport.f.b);
        console.log(results[0].geometry.viewport.b.b);
        $scope.lats.push(results[0].geometry.viewport.f.b);
        $scope.longs.push(results[0].geometry.viewport.b.b);
        console.log($scope.lats);
        console.log($scope.longs);
        $scope.refresher = true;

    }
});

};


$scope.spotLength = function(){
	return $scope.spots.length;
};

$scope.map = {center: {latitude: $scope.lats[$scope.lats.length - 1], longitude: $scope.longs[$scope.longs.length - 1]} , zoom: 8 };
        $scope.options = {scrollwheel: false};

$scope.getCoord = function(){
	
var geocoder = new google.maps.Geocoder();
geocoder.geocode( { "address": $scope.spots[$scope.spots.length - 1].address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
        var location = results[0].geometry.location;
        console.log(results);
	console.log(results[0].geometry.viewport.f.b);
        console.log(results[0].geometry.viewport.b.b);
	$scope.lats.push(results[0].geometry.viewport.f.b);
	$scope.longs.push(results[0].geometry.viewport.b.b);
	console.log($scope.lats);
	console.log($scope.longs);
	$scope.refresher = true;

    }
});

};

$scope.$watch('lats', function() {
    console.log($scope.lats);
});

$scope.$watch('longs', function() {
    console.log($scope.longs);
});

}
]);
