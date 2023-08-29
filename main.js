import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

// scene camera setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 2000 );
camera.position.set( 0, 0, 125 );


// renderer setup
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xC5C5C3 );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );

// light setup
var ambientLight = new THREE.AmbientLight( 0xcccccc );
scene.add( ambientLight );
			
var directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.set( 0, 1, 1 ).normalize();
scene.add( directionalLight );	

// loader setup
var loader = new GLTFLoader();
var modelPath = '/assets/medieval_fantasy_book.gltf';

// trackball control setup
const controls = new TrackballControls(camera, renderer.domElement)

loader.load(modelPath, function ( gltf ) {
	var model = gltf.scene;
	gltf.scene.scale.set( 2, 2, 2 );
	gltf.scene.position.x = 0;
	gltf.scene.position.y = 0;
	gltf.scene.position.z = 0;
	scene.add( gltf.scene );
	}, 
	undefined, function ( error ) {
		console.error ( error );
	}
)

function animate() {
	render();
	controls.update()
	requestAnimationFrame( animate );
}

function render() {
	renderer.render( scene, camera );
}

render();
animate();