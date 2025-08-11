import {Canvas, useFrame, useThree} from "@react-three/fiber";
import ImagePlane from "./components/ImagePlane.jsx";
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {Vector3} from "three";
import CameraGsapController from "./components/CameraController.jsx";
import * as THREE from "three";

function App() {
    const camRef = useRef()

    const images = Array.from({ length: 15 }, (_, i) => ({
        image_url: `/_${i + 1}.png`,
        image_id: i + 1,
        position: [
            Math.floor(Math.random() * 11) - 5,
            Math.floor(Math.random() * 11) - 5,
            Math.floor(Math.random() * 11) - 5
        ]
    }))

    return (
        <Canvas shadows>
            <color attach="background" args={["#ececec"]}/>

            {/*<OrbitControls/>*/}

            <ambientLight/>

            <CameraGsapController ref={camRef} startZ={20} dollyZ={2} dollySpeed={0.02} />

            {images.map((img) => (
                <ImagePlane
                    key={img.image_id}
                    url={img.image_url}
                    width={2}
                    height={2}
                    position={img.position}
                    onClick={(e) => {
                        const p = e.object.getWorldPosition(new THREE.Vector3())
                        camRef.current?.moveTo([p.x, p.y, p.z], 2) // pad by 2 in front
                    }}
                />
            ))}
        </Canvas>
    );
}

export default App;
