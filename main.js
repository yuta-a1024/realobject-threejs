import './style.css';
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import Image_r from "./envImage/27315330_l_r.png";
import Image_l from "./envImage/27315330_l_l.png";
import Image_u from  "./envImage/27315330_l_u.png";
import Image_d from  "./envImage/27315330_l_d.png";
import Image_f from  "./envImage/27315330_l_f.png";
import Image_b from  "./envImage/27315330_l_b.png";

const canvas = document.getElementById("canvas");

//scene
const scene = new THREE.Scene();

//sizes
const sizes = {
  width: innerWidth,
  height: innerHeight,
};

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  3000
);
camera.position.set(0, 500, 1000);
scene.add(camera);

//renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

//envImage
const urls = [
  Image_r,Image_l,Image_u,Image_d,Image_f,Image_b
];

const loader = new THREE.CubeTextureLoader();
scene.background = loader.load(urls);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1000);

//cubecamera
const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
scene.add(cubeCamera);

//object
const material = new THREE.MeshBasicMaterial({
  envMap: cubeRenderTarget.texture,
  reflectivity: 1,
});
const geometry = new THREE.SphereGeometry(350, 50, 50);
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 100, 0);
scene.add(sphere);

function animate() {
  controls.update();
  cubeCamera.update( renderer, scene );
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();
