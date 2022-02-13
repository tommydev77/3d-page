import {
  GLTFLoader
} from "./GLTFLoader.js";

import {
  OrbitControls
} from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js'


document.getElementById('big').style.display = 'none';
document.getElementById('load').style.display = 'block';

 window.addEventListener('load', () => {
  document.getElementById('big').style.display = 'block';
  document.getElementById('load').style.display = 'none';
   
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    8,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );


  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement);


  //OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  controls.enableDamping = true;
  controls.minDistance = 40;

  var loader = new GLTFLoader();
  var obj;
  loader.load("scene.gltf", function (gltf) {
    obj = gltf.scene;
    scene.add(gltf.scene);
    obj.rotation.y -= 3.5;
    ok();
  });


  function ok() {
    scene.background = new THREE.Color(0xdee0de);
    var light = new THREE.HemisphereLight(0xffffff, 0x000000, 10);
    scene.add(light);
    camera.position.set(0, 0, 10);



    //Resize
    window.addEventListener('resize', onWindowResize, false)

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight)
    }





    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }


    animate();
  }
 })
