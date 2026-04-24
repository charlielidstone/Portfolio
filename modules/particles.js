import * as THREE from "three";

const EFFECT_SCALE = 0.3;
const STAR_DENSITY = 1/32000;

const spreadX = 800;
const spreadY = 400;
const spreadZ = 300;

const spreadVOL = spreadX*spreadY*spreadZ;


const particles = (function() {
    const canvas = document.querySelector("#particles-bg")
    
    if (!canvas) {
        console.warn("Canvas of form 'canvas#particles-bg' not found.");
        return { render: function() {} };
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
    });
    const pivot = new THREE.Group();
    scene.add(pivot);

    const pivotOffset = -1000;
    
    pivot.position.set(0, 0, pivotOffset);


    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(200);

    const addStar = () => {
        const geometry = new THREE.SphereGeometry(0.25, 24, 24);
        const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const star = new THREE.Mesh(geometry, material);
        
        // const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));


        const x = THREE.MathUtils.randFloatSpread(spreadX);
        const y = THREE.MathUtils.randFloatSpread(spreadY);
        const z = THREE.MathUtils.randFloatSpread(spreadZ);

        star.position.set(x, y, z - pivotOffset);
        pivot.add(star);
    };

    Array(spreadVOL*STAR_DENSITY).fill().forEach(addStar);

    function rotateScene(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const offsetX = mouseX - centerX;
        const offsetY = mouseY - centerY;

        pivot.rotation.x = -offsetY * 0.00003 * EFFECT_SCALE;
        pivot.rotation.y = -offsetX * 0.00003 * EFFECT_SCALE;
    }

    // on mouse move, rotate the scene based on the mouse position
    document.body.addEventListener("pointermove", (e) => { rotateScene(e); });

    return {
        render: function() {
            requestAnimationFrame(particles.render);

            renderer.render(scene, camera);
        },
    };
})();

export default particles;