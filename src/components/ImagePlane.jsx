import React, { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

export default function ImagePlane({
                                       url,
                                       width = 1,
                                       height = 1,
                                       position = [0, 0, 0],
                                       onClick,
                                   }) {
    const meshRef = useRef()
    const texture = useLoader(THREE.TextureLoader, url)

    return (
        <mesh ref={meshRef} position={position} onClick={onClick}>
            <planeGeometry args={[width, height]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
    )
}
