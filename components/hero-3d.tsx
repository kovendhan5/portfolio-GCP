"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, ContactShadows, Environment } from "@react-three/drei"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import * as THREE from "three"

function SpinningCube() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01
      ref.current.rotation.y += 0.01
    }
  })
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#6366f1" />
    </mesh>
  )
}

export default function Hero3D() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <motion.div
        className="w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
    )
  }
  
  return (
    <motion.div className="w-full h-96 rounded-xl overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={[theme === 'dark' ? '#111827' : '#f8fafc']} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
        <ambientLight intensity={0.7} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <pointLight 
          position={[0, 2, 0]} 
          intensity={0.3}
          color={theme === 'dark' ? '#94a3b8' : '#e2e8f0'}  
        />
        
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={theme === 'dark' ? 0.4 : 0.3} 
          scale={10} 
          blur={2.5} 
          far={5} 
        />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          rotateSpeed={0.5} 
          autoRotate 
          autoRotateSpeed={0.3}
        />
        <SpinningCube />
      </Canvas>
    </motion.div>
  )
}
