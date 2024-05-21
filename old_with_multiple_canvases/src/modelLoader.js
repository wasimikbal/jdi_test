import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const loadModel = (container, modelPath) => {

  let distance = null;
  let center = null;

  //Fetching the canvas from html
  const canvas = document.getElementById(container)

  //Init scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('lightblue');

  //Loading the model
  const loader = new GLTFLoader();
  loader.load(modelPath, (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    model.rotation.set(0, 0.5, 0)
    model.scale.set(5, 5, 5)

    // Get the bounding box of the model and calculate its size, calculate the distance based on average length.
    const box = new THREE.Box3().setFromObject(model);
    const boxSize = new THREE.Vector3();
    box.getSize(boxSize);
    distance = (boxSize.x + boxSize.y + boxSize.z) / 3
    
    // Get the center of the bounding box for camera to look at.
    const boxCOG = new THREE.Vector3();
    box.getCenter(boxCOG);

    scene.add(model);

    //Init Camera, set the camera distance from the object as per object size.
    const camera = new THREE.PerspectiveCamera(75, 300 / 300);
    camera.position.z = distance;
    camera.lookAt(boxCOG);
    scene.add(camera);

    //Add Light source
    const light = new THREE.AmbientLight(0xfdfbd3, 2);
    light.position.y = 10;
    scene.add(light);

    // init renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
    renderer.setSize(300, 300);
    renderer.render(scene, camera);

    const animate = () => {
      requestAnimationFrame(animate);
      model.rotation.y += 0.005;
      renderer.render(scene, camera);
    }

    animate();
  });
}