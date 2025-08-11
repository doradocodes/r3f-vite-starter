import {Canvas, useFrame, useThree} from "@react-three/fiber";
import ImagePlane from "./components/ImagePlane.jsx";
import {useEffect} from "react";

function CameraSetup({speed = 0.01, startZ = 5, stopZ = 1}) {
    const {camera} = useThree()

    useEffect(() => {
        camera.position.set(0, 0, startZ) // start position
        camera.lookAt(0, 0, 0) // aim at the center
    }, [camera, startZ])

    useFrame(() => {
        if (camera.position.z > stopZ) {
            camera.position.z -= speed
        }
    })

    return null
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function App() {

    const images = [];
    for (let i = 1; i <= 15; i++) {
        images.push({
            image_url: `/_${i}.png`,
            short_description: `Image ${i}`,
            image_id: i,
            position: [randomInt(-5, 5), randomInt(-5, 5), randomInt(-5, 5)],
        });
    }

    return (
        <Canvas shadows>
            <CameraSetup speed={0.01} startZ={10} stopZ={1}/>
            <color attach="background" args={["#ececec"]}/>
            {/*<OrbitControls/>*/}
            <ambientLight/>
            {images.map((img) => (
                <ImagePlane
                    key={img.image_id}
                    url={img.image_url}
                    width={2}
                    height={2}
                    position={img.position}
                />
            ))}
        </Canvas>
    );
}

export default App;
