import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { paths } from './getItems'
import { loadModels } from './getModels'



let canvas, renderer;
const scenes = [];

loadModels(paths).then((models) => {

	console.log('Loaded models:', models);

	init(models);
	animate();

}).catch((error) => {
	console.log(error)
});



function init(models) {
	canvas = document.getElementById('c');

	const content = document.getElementById('content');

	for (let i = 0; i < models.length; i++) {

		const scene = new THREE.Scene();
		const model = models[i];

		// make a list item
		const element = document.createElement('div');
		element.className = 'list-item';

		const sceneElement = document.createElement('div');
		element.appendChild(sceneElement);

		// the element that represents the area we want to render the scene
		scene.userData.element = sceneElement;
		content.appendChild(element);

		// Get the bounding box of the model and calculate its size, calculate the distance based on average length.
		const box = new THREE.Box3().setFromObject(model);
		const boxSize = new THREE.Vector3();
		box.getSize(boxSize);
		const distance = (boxSize.x + boxSize.y + boxSize.z) / 3

		// Get the center of the bounding box for camera to look at.
		const boxCOG = new THREE.Vector3();
		box.getCenter(boxCOG);


		const camera = new THREE.PerspectiveCamera(75, 300/300);
		camera.position.z = distance * 1.5;
		camera.position.y = boxCOG.y;
		console.log(`${camera.position.y} | ${boxCOG.y}`)
		camera.lookAt(boxCOG)
		scene.userData.camera = camera;
		model.position.set(0,0,0);
		camera.position.y = 0;
		// console.log(`Model: ${model.position} | Camera: ${camera.position}`)
		// console.log(model.position)
		// console.log(camera.position)
		const controls = new OrbitControls(scene.userData.camera, scene.userData.element);
		// controls.minDistance = 2;
		// controls.maxDistance = 5;
		controls.enablePan = false;
		controls.enableZoom = false;
		scene.userData.controls = controls;

		// add one random mesh to each scene


		scene.add(model);

		scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444, 3));

		const light = new THREE.DirectionalLight(0xffffff, 1.5);
		light.position.set(1, 1, 1);
		scene.add(light);

		scenes.push(scene);

	}


	renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
	renderer.setClearColor(0xffffff, 1);
	renderer.setPixelRatio(window.devicePixelRatio);

}

function updateSize() {

	const width = canvas.clientWidth;
	const height = canvas.clientHeight;

	if (canvas.width !== width || canvas.height !== height) {

		renderer.setSize(width, height, false);
	}

}

function animate() {

	render();
	requestAnimationFrame(animate);

}

function render() {

	updateSize();


	renderer.setClearColor(0xffffff);
	renderer.setScissorTest(false);
	renderer.clear();

	renderer.setClearColor(0xe0e0e0);
	renderer.setScissorTest(true);

	scenes.forEach(function (scene) {

		// so something moves
		scene.children[0].rotation.y = Date.now() * 0.001;

		// get the element that is a place holder for where we want to
		// draw the scene
		const element = scene.userData.element;

		// get its position relative to the page's viewport
		const rect = element.getBoundingClientRect();

		// check if it's offscreen. If so skip it
		if (rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
			rect.right < 0 || rect.left > renderer.domElement.clientWidth) {

			return; // it's off screen

		}

		// set the viewport
		const width = rect.right - rect.left;
		const height = rect.bottom - rect.top;
		const left = rect.left;
		const bottom = renderer.domElement.clientHeight - rect.bottom;

		renderer.setViewport(left, bottom, width, height);
		renderer.setScissor(left, bottom, width, height);

		const camera = scene.userData.camera;

		renderer.render(scene, camera);

	});

}