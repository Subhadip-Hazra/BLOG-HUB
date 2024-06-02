/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Shape,ShapeGeometry } from 'three';
import foxImg from '../assets/3d/fox.glb';

const Fox = ({ currentAnimation, ...props }) => {
    const group = useRef();
    const shadowRef = useRef();
    const { nodes, materials, animations } = useGLTF(foxImg);
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        Object.values(actions).forEach((action) => action.stop());

        if (actions[currentAnimation]) {
            actions[currentAnimation].play();
        }
    }, [actions, currentAnimation]);

    useFrame(() => {
        if (shadowRef.current && group.current) {
            shadowRef.current.position.x = group.current.position.x + 1.2;
            shadowRef.current.position.y = group.current.position.y - 1.8; // Adjust according to the height of the fox
            shadowRef.current.position.z = group.current.position.z -1.3;
        }
    });

    // Create an elliptical shape
    const ellipseShape = new Shape();
    const xRadius = 2;
    const yRadius = 1;
    const segments = 1500;
    for (let i = 0; i < segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        ellipseShape.lineTo(Math.cos(theta) * xRadius, Math.sin(theta) * yRadius);
    }
    ellipseShape.closePath();

    const ellipseGeometry = new ShapeGeometry(ellipseShape);

    return (
        <>
            <group ref={group} {...props} dispose={null}>
                <group name="Sketchfab_Scene">
                    <primitive object={nodes.GLTF_created_0_rootJoint} />
                    <skinnedMesh
                        name="Object_7"
                        geometry={nodes.Object_7.geometry}
                        material={materials.PaletteMaterial001}
                        skeleton={nodes.Object_7.skeleton}
                    />
                    <skinnedMesh
                        name="Object_8"
                        geometry={nodes.Object_8.geometry}
                        material={materials.PaletteMaterial001}
                        skeleton={nodes.Object_8.skeleton}
                    />
                    <skinnedMesh
                        name="Object_9"
                        geometry={nodes.Object_9.geometry}
                        material={materials.PaletteMaterial001}
                        skeleton={nodes.Object_9.skeleton}
                    />
                    <skinnedMesh
                        name="Object_10"
                        geometry={nodes.Object_10.geometry}
                        material={materials.PaletteMaterial001}
                        skeleton={nodes.Object_10.skeleton}
                    />
                    <skinnedMesh
                        name="Object_11"
                        geometry={nodes.Object_11.geometry}
                        material={materials.PaletteMaterial001}
                        skeleton={nodes.Object_11.skeleton}
                    />
                </group>
            </group>
            <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                <primitive attach="geometry" object={ellipseGeometry} />
                <meshBasicMaterial color="black" opacity={0.5} transparent />
            </mesh>
        </>
    );
};

export default Fox;
