import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

import {
  CAMERA_FAR,
  CAMERA_FOV,
  CAMERA_NEAR,
  CAMERA_POSITION_X,
  CAMERA_POSITION_Y,
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
  camera.position.x = CAMERA_POSITION_X;
  camera.position.y = CAMERA_POSITION_Y;
  camera.position.z = CAMERA_POSITION_Z;

  return camera;
};

const DEFAULT_TRACKBALL = {
  x: 0.0856307097897084,
  y: 0.018486931048174456,
  z: 0.9961554170516376,
};

export const createTrackballControls = ({ camera, renderer }) => {
  const controls = new TrackballControls(camera, renderer.domElement);

  controls.minDistance = ORBIT_CONTROLS_MIN_DISTANCE;
  controls.maxDistance = ORBIT_CONTROLS_MAX_DISTANCE;
  controls.rotateSpeed = 1.0;
  controls.update();
  controls.object.up.x = DEFAULT_TRACKBALL.x;
  controls.object.up.y = DEFAULT_TRACKBALL.y;
  controls.object.up.z = DEFAULT_TRACKBALL.z;
  window.aControl = controls;

  return controls;
};

export const createScene = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(SCENE_DEFAULT_COLOR);
  return scene;
};
