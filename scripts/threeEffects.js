import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const threeEffects = (function() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
        alpha: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(-40);

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);

    const ambientLight = new THREE.AmbientLight(0x777777);

    scene.add(pointLight, ambientLight);

    // const controls = new OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({
        color: 0xFF6347,
        wireframe: true,
        opacity: 0.1,
        transparent: true,
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);


    const loader = new GLTFLoader();
    let torusCube,
        mixer;
    loader.load('public/torus_cube.glb', function(gltf) {
        torusCube = gltf.scene;
        torusCube.position.set(0, 0, 0);
        torusCube.scale.set(1, 1, 1);

        mixer = new THREE.AnimationMixer(torusCube);
        const animation = gltf.animations[0];
        const action = mixer.clipAction(animation);
        action.play();

        const material = new THREE.MeshBasicMaterial({
            color: 0xFF6347,
            wireframe: true,
            opacity: 0.1,
            transparent: true,
        });
        torusCube.traverse((o) => {
            if (o.isMesh) o.material = material;
        });

        scene.add(torusCube);
    }, undefined, function (error) {
        console.error( error );
    });


    function addStar() {
        const geometry = new THREE.SphereGeometry(0.25, 24, 24);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const star = new THREE.Mesh(geometry, material);
      
        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
      
        star.position.set(x, y, z);
        scene.add(star);
    }

    Array(200).fill().forEach(addStar);

    function addCube() {
        const geometry = new THREE.BoxGeometry(3, 3, 3);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
        const cube = new THREE.Mesh(geometry, material);

        cube.rotation.x = Math.random() * 2 * Math.PI;
        cube.rotation.y = Math.random() * 2 * Math.PI;
        cube.rotation.z = Math.random() * 2 * Math.PI;

        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

        cube.position.set(x, y, z);
        scene.add(cube);
    }

    Array(50).fill().forEach(addCube);


    function moveCamera() {
        const t = document.body.getBoundingClientRect().top;

        camera.position.z = t * -0.01 - 40;
        camera.position.x = t * -0.0002;
        camera.rotation.y = t * -0.001;
    }

    document.body.onscroll = moveCamera;

    return {
        animate: function() {
            requestAnimationFrame(threeEffects.animate);

            torus.rotation.x += 0.01;
            torus.rotation.y += 0.005;
            torus.rotation.z += 0.01;

            // controls.update();

            // mixer.update(0.01);

            renderer.render(scene, camera);
        },
    };
})();

export default threeEffects;