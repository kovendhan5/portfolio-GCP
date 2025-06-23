"use client"

import { MeshDistortMaterial, OrbitControls, Text } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { motion } from "framer-motion"
import { Suspense, useEffect, useState } from "react"

function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[10, -10, -5]} intensity={0.5} color="#06b6d4" />
      
      <Suspense fallback={null}>
        <group>
          {/* Main sphere with distortion */}
          <mesh rotation={[0, 0, 0]}>
            <sphereGeometry args={[1.5, 64, 64]} />
            <MeshDistortMaterial
              color="#8b5cf6"
              attach="material"
              distort={0.6}
              speed={2}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
          
          {/* Floating text */}
          <Text
            position={[0, 0, 2]}
            fontSize={0.5}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            KP
          </Text>
          
          {/* Additional geometric elements */}
          <mesh position={[3, 1, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#06b6d4" wireframe />
          </mesh>
          
          <mesh position={[-3, -1, 0]}>
            <octahedronGeometry args={[0.7]} />
            <meshStandardMaterial color="#f59e0b" transparent opacity={0.7} />
          </mesh>
        </group>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={2}
        />
      </Suspense>
    </Canvas>
  )
}

export default function Hero3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative w-full h-full bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
            <motion.div 
              className="text-white text-4xl font-bold"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              KP
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full h-full"
    >
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <motion.div 
                className="text-white text-4xl font-bold"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Loading...
              </motion.div>
            </div>
          </div>
        </div>
      }>
        <ThreeScene />
      </Suspense>
    </motion.div>
  )
}
