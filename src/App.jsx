import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import {OrbitControls, useGLTF, Sky, Stars, Text } from "@react-three/drei"


function App() {

  const NasaModel = ({scale}) => {
    const ref = useRef()

    useFrame((Stars, delta) => {
      ref.current.rotation.y += delta * .2
    })

    const {scene} = useGLTF('nasaModel.glb')
    return <primitive object={scene} scale={scale} ref={ref}/>
  }

  const [NasaModelScale, setNasaModelScale] = useState(0.005)
  const [textSize, setTextSize] = useState(0.5)
  useEffect(() => {
    const checkWidth = () => {
        if(window.innerWidth > 500){ setNasaModelScale(0.005); setTextSize(0.5)}
        else {setNasaModelScale(0.003); setTextSize(0.3)}
    }

    window.addEventListener('load', checkWidth)
    window.addEventListener('resize', checkWidth)
    


  },[])

  return (
    <div className="h-screen bg-black">
      <Canvas>
          <directionalLight position={[0,0,1]}/>
          <ambientLight intensity={.5}/>

          {/* <Sky sunPosition={[100,20,100]}/>*/}
            <Stars
              radius={100}     
              depth={50}       
              count={5000}    
              factor={4}      
              saturation={0}  
              fade        
            /> 
          <NasaModel scale={NasaModelScale}/>

          <Text
            position={[0, 2, 0]}  
            fontSize={textSize}         
            color="white"     
              >Hello 3D World!
            </Text>
      

        <OrbitControls/>
      </Canvas>
    </div>
  )
}

export default App






