import {useRef} from 'react'
import {Suspense,useEffect,useState} from 'react';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import { Group } from 'three';
import {OrbitControls,Preload,useGLTF} from '@react-three/drei';
import CanvasLoader from '../Loader';

const Cake = ({isMobile}:{isMobile?:boolean}) => {
  const tartalet = useGLTF('./strawberryCake/scene.gltf');
  const groupRef = useRef<Group>(null);
  const { scene } = useThree();

  useEffect(() => {
    if (groupRef.current) {
      // Set the pivot point for the group
      //{isMobile ? [2, -1, -1.5] : [5, -0.4, -5.0]}
      if(isMobile){
        groupRef.current!.position.set(0.5, 3.5, 0);
      }else{
        groupRef.current!.position.set(4, 6, -2);
      }
      // Adjust the position of the Tartalet model within the group
      tartalet.scene.position.set(-1, 0, -0.1);
      // Add the Tartalet model to the group
      groupRef.current!.add(tartalet.scene);
    }
  }, [tartalet, scene]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current!.rotation.y += 0.4 * delta; // Adjust the speed by changing the multiplier
    }
  });

  return (
    <mesh >
      <hemisphereLight intensity={0.8} groundColor='black' />
      <spotLight
        position={[-2, 50, 10]}
        angle={0.20}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <group ref={groupRef}>
        <primitive
          object={tartalet.scene}
          scale={isMobile ? 3.5 : 4}
          rotation={[-0.1, -0.1, 0.0]}
        />
      </group>
    </mesh>
  )
}

const CakeCanvas = () => {
  const [isMobile, setIsMobile] = useState<boolean|undefined>(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
        />
        <Cake isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
}

export default CakeCanvas;
