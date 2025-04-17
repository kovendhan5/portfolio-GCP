"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import type * as THREE from "three"

function Model({ theme }: { theme: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={theme === "dark" ? "#22d3ee" : "#0891b2"}
        wireframe={true}
        emissive={theme === "dark" ? "#a855f7" : "#7e22ce"}
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

function FloatingCube({
  position,
  color,
  speed = 1,
  size = 0.2,
}: { position: [number, number, number]; color: string; speed?: number; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() * speed) * 0.002
      meshRef.current.rotation.x += 0.005 * speed
      meshRef.current.rotation.y += 0.01 * speed
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
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
    return null
  }

  return (
    <motion.div
      className="w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Model theme={theme} />

        <FloatingCube position={[2, 0, -1]} color={theme === "dark" ? "#22d3ee" : "#0891b2"} speed={0.8} />
        <FloatingCube position={[-2, 0, -1]} color={theme === "dark" ? "#a855f7" : "#7e22ce"} speed={1.2} />
        <FloatingCube position={[0, 1.5, -1]} color={theme === "dark" ? "#2563eb" : "#1d4ed8"} speed={1} />
        <FloatingCube position={[0, -1.5, -1]} color={theme === "dark" ? "#ec4899" : "#db2777"} speed={0.9} />

        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.5} far={4} />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
      </Canvas>
    </motion.div>
  )
}
