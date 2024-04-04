'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, extend, useFrame, useThree, useLoader } from 'react-three-fiber';
import { BackSide, Mesh, Vector3, Euler, BufferGeometry, MeshMatcapMaterial, TextureLoader, CircleGeometry } from 'three';

interface DiscoBallProps {
    position?: Vector3;
    radius?: number;
    mirrorSize?: number;
    mirrorSpacing?: number;
    matCapPath?: string
}

const DiscoBall: React.FC<DiscoBallProps> = ({ 
    position = new Vector3(0,0,0), 
    radius = 2, 
    mirrorSize = 0.15, 
    mirrorSpacing = 1.18, 
    matCapPath = '/matcap/desert-2.png'
}) => {
    const meshRef = useRef<Mesh>(null);
    const planeGroupRef = useRef<Mesh>(null);
    const [shouldRotate, setShouldRotate] = useState<boolean>(false);
    const [mirrorData, setMirrorData] = useState<Vector3[]>([])

    // calculates mirror placement
    // 1. calculate y angle based on how many mirrors will fit in a meridian
    // 2. calculating the circumference of the sphere at each latitude
    // 3. determine the x angle, by how many mirrors will fit in that latitude
    // 4. calculating x, y, and z using those angles, the sphere radius and the latitude radius
    useEffect(() => {
        const _mirrorData = [];
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

                _mirrorData.push(new Vector3(x, y, z))
            }
    
            currentLat -= latSpread;
        }

        setMirrorData(_mirrorData);
    }, [mirrorSize, mirrorSpacing, radius])

    // flips flag after first render
    useEffect(() => {
        setShouldRotate(true);
    }, [])


    // Rotate the disco ball
    useFrame(() => {
      if (meshRef.current && shouldRotate) {
        meshRef.current.rotation.x += 0.0005;
        meshRef.current.rotation.y += 0.0005;
      }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[radius, 32, 32]} />

            {/* Add mirrors */}
            <mesh ref={planeGroupRef}>
                {mirrorData.map( (m, i) => <Mirror size={mirrorSize} position={m} center={position} key={i} matCapPath={matCapPath} /> )}
            </mesh>
        </mesh>

    )
}

interface MirrorProps {
    size: number;
    position: Vector3 | null;
    center: Vector3;
    matCapPath: string;
}

const Mirror: React.FC<MirrorProps> = ({size, position, center, matCapPath}) => {
    if (position == null) return;

    const noise = Math.random() * 0.1 + 1;
    position.multiply(new Vector3(noise, noise, noise))
    const mirrorTexture = useLoader(TextureLoader, matCapPath)
    const meshRef = useRef<Mesh>(null);

    const randomSize = ((Math.random() + 0.4) * size) / 2;

    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.lookAt(center);
        }
    }, [meshRef])


    return (
        <mesh ref={meshRef} position={position}>
            <circleGeometry args={[randomSize]} />
            <meshMatcapMaterial matcap={mirrorTexture} side={BackSide} />
        </mesh>
    )
}

const DiscoBallApp: React.FC<DiscoBallProps> = (props) => {
    return (
        <Canvas>
            <DiscoBall {...props} />
        </Canvas>
    );
};

export default DiscoBallApp;