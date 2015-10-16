(function() {
  var app = angular.module("myMap", []);

  app.controller("mapController", ['$scope', '$timeout', 'mapObject', 
      function($scope, $timeout, mapObject) {
    $scope.data = mapObject.tiles;
    //$scope.map = mapObject.currentMap();
    $scope.map = mapObject.map.smallBoard;
    $scope.$watch('map', function(oldMap, newMap) {
      $scope.map = newMap;
    })
    console.log($scope.map.length);

    console.log($scope.map[0].length);
    
    //$timeout(function() {
    //  mapObject.init();
    //}, 1000);
  }]);

  app.directive("mapDir", function() {
    return {
      restrict: 'EA',
      controller: 'mapController',
      scope: {
        var: '=myVar'
      },
      link: function() {
      },
      templateUrl: './components/map/mapView.html'
    }
  })

  app.factory("mapObject", ['tileObject', function(tileObject) {
    var obj = {
      /*
       * General layout of map. The rows will be centered relative
       * to the 3rd row, that being the length 5 row.
       */
      map: {
         smallBoard: 
           [
                [ [-1], [-1], [-1] ], 
              [ [-1], [-1], [-1], [-1] ],
            [ [-1], [-1], [-1], [-1], [-1] ],
              [ [-1], [-1], [-1], [-1] ],   
                [ [-1], [-1], [-1] ]
           ],
           //todo
         largeBoard: 
           [
           
           ]
      },
      /* returns the current map */
      currentMap: function() {
        return this.map.smallBoard;
      },
      /* name of current map */
      nameMap: "smallBoard",
      /* sets the current map */
      setMap: function(size) { 
        if (size < 5) {
          nameMap = "smallBoard";
          currentMap = this.map.smallBoard;
        } else {
          nameMap = "largeBoard";
          currentMap = this.map.largeBoard; 
        }
      },
      /*number of players... somewhat arbitrary */
      numPlayers: 1,
      /* set numPlayers  */
      setNumPlayers: function(count) {
        this.numPlayers = count;
      },
      /* Set tile on board  to new tile Object*/
      setTile: function(type, value, x, y) {
        var curMap = "";
        this.map = "";
      },
      init: function() {
        var numTiles;
        if (this.numPlayers < 5) {
          
        } else {
          numTiles = "placeHolder";
        }
        obj.test();
        //fill rest of function here
      } 
    } 
    //obj.init();
    return obj;
  }]);

  app.factory("tileObject", [function() {
    var x = function(type, resourceValue) {
      this.type = type;
      this.value = resourceValue;
    }  
    return x;
  }]);

  app.factory()


  
})()

