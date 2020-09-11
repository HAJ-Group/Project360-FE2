let renderer = null;
let camera = null;
function build(image) {
    let domElement =  document.getElementById('canvasDIV');
    // ---------------------------------------------------------------------------------------------------------------------
    // SETTING SCENE
    const scene = new THREE.Scene();
    // ---------------------------------------------------------------------------------------------------------------------
    // SETTING CAMERA
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // ---------------------------------------------------------------------------------------------------------------------
    // CREATING SPHERE
    const geometry = new THREE.SphereGeometry( 50, 32, 32 );
    // ---------------------------------------------------------------------------------------------------------------------
    // BASIC MATERIAL
    //const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    // ---------------------------------------------------------------------------------------------------------------------
    // TEXTURE MATERIAL
    const texture = new THREE.TextureLoader().load(image);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = -1;
    const material = new THREE.MeshBasicMaterial( {
        map: texture,
        side: THREE.DoubleSide
    } );
    const sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
    // ---------------------------------------------------------------------------------------------------------------------
    // RENDERING
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth - 10, 700 );
    domElement.appendChild( renderer.domElement );
    // ---------------------------------------------------------------------------------------------------------------------
    // CONTROLS
    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.rotateSpeed = 0.2;
    controls.enableZoom = false;
    //controls.autoRotate = true;
    camera.position.set( -1, 0, 0 );
    controls.update();
    // ---------------------------------------------------------------------------------------------------------------------
    // ANIMATE
    function animate() {
        requestAnimationFrame( animate );
        //controls.update();
        renderer.render( scene, camera );
    }
    animate();
    // ---------------------------------------------------------------------------------------------------------------------
    // RESIZING
    function onResize() {
        renderer.setSize(window.innerWidth - 10, 700);
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onResize);
    // ---------------------------------------------------------------------------------------------------------------------
}
let toggle = false;
function toggleFull() {
  toggle = !toggle;
  if(toggle) {
    renderer.setSize(window.innerWidth - 10, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    document.getElementById('details').style.display = 'none';
  } else {
    renderer.setSize(window.innerWidth - 10, 700);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    document.getElementById('details').style.display = 'block';
  }
}


