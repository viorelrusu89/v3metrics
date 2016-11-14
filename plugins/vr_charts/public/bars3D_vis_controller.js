import uiModules from 'ui/modules';
import AggResponseTabifyTabifyProvider from 'ui/agg_response/tabify/tabify';
import errors from 'ui/errors';	

// get the kibana/table_vis module, and make sure that it requires the "kibana" module if it
// didn't already
const module = uiModules.get('kibana/vr_vis', ['kibana']);

THREE = require("three");

	require("plugins/vr_charts/FontUtils");
  console.log(THREE.FontUtils);
	require("plugins/vr_charts/TextGeometry");
  console.log(THREE.TextGeometry);
	require("plugins/vr_charts/Projector");
  console.log(THREE.RenderableObject);
	THREEx = require("plugins/vr_charts/threex.domevents");
  console.log(THREEx.DomEvents);
	Detector = require("plugins/vr_charts/Detector");
  console.log(Detector);
/*	Stats = require("plugins/vr_charts/Stats");
  console.log(Stats);*/
	require("plugins/vr_charts/OrbitControls");
  console.log(THREE.OrbitControls);
	//require("plugins/vr_charts/THREEx.WindowResize");
  //console.log(THREEx.WindowResize);
  //console.log(THREEx.DomEvents);
	//require("plugins/vr_charts/THREEx.FullScreen");
  //console.log(THREEx.FullScreen);

  require('plugins/vr_charts/DAT.GUI.min');

	THREEDC = require("plugins/vr_charts/3dc");
  console.log(THREEDC.version);

  var typeface = require('three.regular.helvetiker');
  THREE.typeface_js.loadFace(typeface);
  var typeface2 = require('plugins/vr_charts/helvetiker_bold.typeface');
  THREE.typeface_js.loadFace(typeface2);

module.controller('BarsController', function($scope, $element, Private){


var filterManager = Private(require('ui/filter_manager'));



// standard global variables
var container, scene, camera, renderer, controls;


$scope.pie = null;

$scope.slices=[];
  $scope.$watch('esResponse', function(resp) {
    if (!resp) {
      $scope.slices = null;
      return;
    }

    if ($scope.pie){
      $scope.pie.remove();
      console.log("pie removed");
    }
    // Retrieve the id of the configured tags aggregation
    var slicesAggId = $scope.vis.aggs.bySchemaName['slices'][0].id;
    console.log(slicesAggId);
    // Retrieve the metrics aggregation configured
    var metricsAgg = $scope.vis.aggs.bySchemaName['slice_size'][0];
    console.log(metricsAgg);
    // Get the buckets of that aggregation
    var buckets = resp.aggregations[slicesAggId].buckets;

    // Transform all buckets into tag objects
    $scope.slices = buckets.map(function(bucket) {
      // Use the getValue function of the aggregation to get the value of a bucket
      var value = metricsAgg.getValue(bucket);

      return {
        key: bucket.key,
        value: value
      };
    });
    console.log($scope.slices);


  var data= [{key1:'january',key2:'apple',value:23},{key1:'february',key2:'apple',value:31},{key1:'march',key2:'apple',value:10},{key1:'april',key2:'apple',value:59},

            {key1:'january',key2:'google',value:34},{key1:'february',key2:'google',value:89},{key1:'march',key2:'google',value:53},{key1:'april',key2:'google',value:76},

            {key1:'january',key2:'microsoft',value:10},{key1:'february',key2:'microsoft',value:5},{key1:'march',key2:'microsoft',value:4},{key1:'april',key2:'microsoft',value:12},

            {key1:'january',key2:'sony',value:56},{key1:'february',key2:'sony',value:21},{key1:'march',key2:'sony',value:23},{key1:'april',key2:'sony',value:12}
  ];


var testFunction = function (argument) {
   console.log( argument);
 }

    $scope.pie = THREEDC.TDbarsChart();
      $scope.pie
      .data(data)
      .width(400)
      .height(500)
      .depth(400)
      .barSeparation(0.8)
      .clickCallBackFunction(testFunction)
      .opacity(0.95)
      .color(0xffaa00)
      .gridsOn(0xffffff);


  $scope.pie.render();

  });

    $scope.filter = function() {
    filterManager.add(
      // The field to filter for, we can get it from the config
      $scope.vis.aggs.bySchemaName['slices'][0].params.field,
      // The value to filter for, we will read out the bucket key
      $scope.slices[0].key,
      // Whether the filter is negated. If you want to create a negated filter pass '-' here
      null,
      // The index pattern for the filter
      $scope.vis.indexPattern.title
    );
  };

      init();
      // animation loop / game loop
      animate();

///////////////
// FUNCTIONS //
///////////////

function init () {


   var idchart = $element.children().find(".chartbars");
   ///////////
   // SCENE //
   ///////////
   scene = new THREE.Scene();

   ////////////
   // CAMERA //
   ////////////
   // set the view size in pixels (custom or according to window size)
   var SCREEN_WIDTH = 1280;
   var SCREEN_HEIGHT = 1024;
   // camera attributes
   var VIEW_ANGLE = 45;
   var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
   var NEAR = 0.1;
   var FAR = 20000;
      // set up camera
   camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
   // add the camera to the scene
   scene.add(camera);
   // the camera defaults to position (0,0,0)
   //    so pull it back (z = 400) and up (y = 100) and set the angle towards the scene origin
   camera.position.set(0,150,400);
   camera.lookAt(scene.position);

   //////////////
   // RENDERER //
   //////////////
   renderer = new THREE.WebGLRenderer( {antialias:true} );
   renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
   renderer.setClearColor( 0xffffff );
   container = idchart[0];
   container.appendChild(renderer.domElement);


   ///////////
   // LIGHT //
   ///////////
   var light = new THREE.PointLight(0xffffff,0.8);
   light.position.set(0,200,250);
   scene.add(light);
   var ambientLight = new THREE.AmbientLight(0x111111);


  var data1= [{key:'monday',value:20},{key:'tuesday',value:80},{key:'friday',value:30}];
  var data2 = [{key:'may',value:200},{key:'june',value:100},{key:'july',value:250}, {key:'december',value:20}, {key:'monday',value:20},{key:'tuesday',value:80},{key:'friday',value:30}];

  THREEDC.initializer(camera,scene,renderer, idchart[0]);


}

function animate()
{
   requestAnimationFrame( animate );
   render();
   update();
}

function render()
{
   renderer.render( scene, camera );
}

function update()
{
  //#TODO: fix controls
  THREEDC.controls.update();
}

});

