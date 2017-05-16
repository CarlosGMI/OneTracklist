var module = angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.service('servicioTracklists',function($rootScope)
{
  var servicio = {};
  servicio.tls = '';
  servicio.agregarTracklist = function(tl)
  {
    this.tls = tl;
    this.obtenerTracklist();
  }
  servicio.obtenerTracklist = function()
  {
    $rootScope.$broadcast('manejoBroadcast');  
  }
  return servicio;
})

.controller('PlaylistsCtrl', function($scope, servicioTracklists) 
{
  var query = firebase.database().ref("tracklist");
  var tracklists = [];
  query.once("value").then(function(snapshot)
  {
    snapshot.forEach(function(childSnapshot)
    {
      var idt = childSnapshot.key;
      var nombreDj = childSnapshot.val().NombreDj;
      var evto = childSnapshot.val().NombreEvto;
      tracklists.push({title: nombreDj, id: idt, evento: evto});
    });
  });
  $scope.playlists = tracklists;
  
  $scope.clickedTracklist = function(item)
  {
    servicioTracklists.agregarTracklist(item);
  };
    //[
    /*{ title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }*/
  //];
})

.controller('PlaylistCtrl', function($scope, $stateParams, servicioTracklists) 
{
  var query = firebase.database().ref("tracklist/"+servicioTracklists.tls);
  query.once("value").then(function(snapshot)
  {
    $scope.tracklist = snapshot.val();
  });
  
  var query2 = firebase.database().ref("cancion");
  var canciones = [];
  query2.orderByChild('IDTracklist').startAt(servicioTracklists.tls).endAt(servicioTracklists.tls).on('value', function(snapshot)
  {
    snapshot.forEach(function(childSnapshot)
    {
      var nombreArt = childSnapshot.val().NombreArt;
      var nombreSong = childSnapshot.val().NombreCancion;
      var selloDisco = childSnapshot.val().SelloDisco;
      console.log("REPRODUCTOR: "+childSnapshot.val().Reproductor);
      canciones.push({artista: nombreArt, nombre: nombreSong, sello: selloDisco});
    });
  });
  $scope.canciones = canciones;
  
  $scope.canciones = [];
  for (var i=0; i<canciones.length; i++) 
  {
    $scope.canciones[i] = 
    {
      nombre: canciones[i].nombre,
      artista: canciones[i].artista,
      sello: canciones[i].sello,
      items: []
    };
    for (var j=0; j<3; j++)
    {
      $scope.canciones[i].items.push(i + '-' + j);
    }
  }
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) 
  {
    if ($scope.isGroupShown(group)) 
    {
      $scope.shownGroup = null;
    } 
    else 
    {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) 
  {
    return $scope.shownGroup === group;
  };
});
