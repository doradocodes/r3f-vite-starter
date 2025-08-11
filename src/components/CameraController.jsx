// CameraGsapController.jsx
import { useThree } from '@react-three/fiber'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import gsap from 'gsap'
import { Vector3 } from 'three'

const CameraGsapController = forwardRef(
    ({ startZ = 8, dollyZ = 2, dollySpeed = 0.02 }, ref) => {
        const { camera } = useThree()
        const dollyTween = useRef(null)
        const lookAt = useRef(new Vector3(0, 0, 0))

        useEffect(() => {
            camera.position.set(0, 0, startZ)
            camera.lookAt(0, 0, 0)

            // Phase 1: slow dolly-in
            const duration = Math.abs(startZ - dollyZ) / (60 * dollySpeed)
            dollyTween.current = gsap.to(camera.position, {
                z: dollyZ,
                duration,
                ease: 'none',
                onUpdate: () => camera.lookAt(lookAt.current)
            })

            return () => dollyTween.current?.kill()
        }, [camera, startZ, dollyZ, dollySpeed])

        useImperativeHandle(ref, () => ({
            moveTo: ([x, y, z], pad = 2, duration = 1.2) => {
                // stop the dolly
                dollyTween.current?.kill()

                // tween lookAt and camera together
                gsap.to(lookAt.current, {
                    x, y, z,
                    duration,
                    ease: 'power3.out',
                    onUpdate: () => camera.lookAt(lookAt.current)
                })

                gsap.to(camera.position, {
                    x, y, z: z + pad,
                    duration,
                    ease: 'power3.out',
                    onUpdate: () => camera.lookAt(lookAt.current)
                })
            }
        }))

        return null
    }
)

export default CameraGsapController
