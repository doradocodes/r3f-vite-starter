import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
    const { nodes, materials } = useGLTF('/src.glb')
    return (
        <group {...props} dispose={null}>
            <ambientLight/>
            <pointLight position={[10, 10, 10]}/>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Text.geometry}
                material={materials['Material.005']}
                position={[-0.111, -0.008, 0.048]}
                scale={1.908}
            />
        </group>
    )
}

useGLTF.preload('/src.glb')
