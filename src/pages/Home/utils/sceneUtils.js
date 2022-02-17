import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import {
  CAMERA_FAR,
  CAMERA_FOV,
  CAMERA_NEAR,
  CAMERA_POSITION_Z,
  ORBIT_CONTROLS_ENABLE_ROTATE,
  ORBIT_CONTROLS_MAX_DISTANCE,
  ORBIT_CONTROLS_MIN_DISTANCE,
  SCENE_DEFAULT_COLOR,
} from './constants';

export const createCamera = ({ width, height }) => {
  const camera = new THREE.PerspectiveCamera(
    CAMERA_FOV,
    width / height,
    CAMERA_NEAR,
    CAMERA_FAR,
  );
  camera.position.z = CAMERA_POSITION_Z;

  return camera;
};

export const createOrbitControls = ({ camera, renderer }) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = ORBIT_CONTROLS_MIN_DISTANCE;
  controls.maxDistance = ORBIT_CONTROLS_MAX_DISTANCE;
  controls.enableRotate = ORBIT_CONTROLS_ENABLE_ROTATE;
  controls.update();

  return controls;
};

export const createScene = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(SCENE_DEFAULT_COLOR);
  return scene;
};
