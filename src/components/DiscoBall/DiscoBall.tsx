'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, extend, useFrame, useThree, useLoader } from 'react-three-fiber';
import { BackSide, Mesh, Vector3, Euler, BufferGeometry, MeshMatcapMaterial, TextureLoader } from 'three';

interface DiscoBallProps {
    position: Vector3;
    radius: number;
    mirrorSize: number;
    mirrorSpacing: number;
}

const DiscoBall: React.FC<DiscoBallProps> = ({ position, radius, mirrorSize, mirrorSpacing}) => {
    const meshRef = useRef<Mesh>();
    const planeGroupRef = useRef<Mesh>();
    const [shouldRotate, setShouldRotate] = useState<boolean>(false);

    // calculates mirror placement
    // 1. calculate y angle based on how many mirrors will fit in a meridian
    // 2. calculating the circumference of the sphere at each latitude
    // 3. determine the x angle, by how many mirrors will fit in that latitude
    // 4. calculating x, y, and z using those angles, the sphere radius and the latitude radius
    const mirrorData = [];
    const latSpread = (mirrorSize * mirrorSpacing) / radius;
    const startLat = (Math.PI / 2);
    let currentLat = startLat;

    while (currentLat > -1 * startLat) {
        const latRadius = radius * Math.cos(currentLat);
        const y = radius * Math.sin(currentLat);
        const numMirrors = Math.floor((2 * Math.PI * latRadius) / (mirrorSize * mirrorSpacing));
        const angleSpread = (2 * Math.PI) / numMirrors;
     
        for (let i = 0; i < numMirrors; i++) {
            const angle = i * angleSpread;
            const x = latRadius * Math.cos(angle);
            const z = latRadius * Math.sin(angle);
            mirrorData.push({x, y, z})
        }

        currentLat -= latSpread;
    }

    // flips flag after first render
    useEffect(() => {
        setShouldRotate(true);
    }, [])


    // Rotate the disco ball
    useFrame(() => {
      if (meshRef.current && shouldRotate) {
        meshRef.current.rotation.x += 0.005;
        meshRef.current.rotation.y += 0.005;
      }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[radius, 32, 32]} />

            {/* Add mirrors */}
            <mesh ref={planeGroupRef}>
                {mirrorData.map( (m, i) => <Mirror size={mirrorSize} position={new Vector3(m.x, m.y, m.z)} center={position} key={i} /> )}
            </mesh>
        </mesh>

    )
}

interface MirrorProps {
    size: number;
    position: Vector3 | null;
    center: Vector3;
}

const Mirror: React.FC<MirrorProps> = ({size, position, center}) => {
    if (position == null) return;

    const noise = Math.random() * 0.1 + 1;
    position.multiply(new Vector3(noise, noise, noise))
    const mirrorTexture = useLoader(TextureLoader, '/ob.jpg')
    const meshRef = useRef<Mesh>();

    useEffect(() => {
        if (meshRef.current) {
            // const n = new Vector3(Math.random() * 0.1 - 0.05, Math.random() * 0.1 - 0.05, Math.random() * 0.1 - 0.05)
            // meshRef.current.lookAt(center.clone().add(n));
            meshRef.current.lookAt(center);
        }
    }, [meshRef])

    return (
        <mesh ref={meshRef} position={position}>
            <planeGeometry args={[size, size]} />
            <meshMatcapMaterial matcap={mirrorTexture} side={BackSide} />
        </mesh>
    )
}

const DiscoBallApp: React.FC = () => {
    return (
        <Canvas>
            <DiscoBall mirrorSize={0.15} mirrorSpacing={1.18} position={new Vector3(0, 0, 0)} radius={2.25} />
        </Canvas>
    );
};

export default DiscoBallApp;