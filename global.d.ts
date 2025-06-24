
// Extend the global JSX namespace to include three.js elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Geometries
      boxGeometry: any
      sphereGeometry: any
      planeGeometry: any
      cylinderGeometry: any
      coneGeometry: any
      icosahedronGeometry: any
      dodecahedronGeometry: any
      octahedronGeometry: any
      tetrahedronGeometry: any
      torusGeometry: any
      torusKnotGeometry: any
      ringGeometry: any
      
      // Materials
      meshBasicMaterial: any
      meshStandardMaterial: any
      meshPhysicalMaterial: any
      meshLambertMaterial: any
      meshPhongMaterial: any
      meshToonMaterial: any
      meshNormalMaterial: any
      meshDepthMaterial: any
      meshDistanceMaterial: any
      meshMatcapMaterial: any
      pointsMaterial: any
      lineBasicMaterial: any
      lineDashedMaterial: any
      shaderMaterial: any
      rawShaderMaterial: any
      
      // Objects
      mesh: any
      group: any
      scene: any
      object3D: any
      bone: any
      line: any
      lineLoop: any
      lineSegments: any
      lOD: any
      points: any
      skeleton: any
      skinnedMesh: any
      sprite: any
      
      // Lights
      ambientLight: any
      directionalLight: any
      hemisphereLight: any
      pointLight: any
      rectAreaLight: any
      spotLight: any
      
      // Cameras
      perspectiveCamera: any
      orthographicCamera: any
      
      // Helpers
      axesHelper: any
      boxHelper: any
      box3Helper: any
      cameraHelper: any
      directionalLightHelper: any
      gridHelper: any
      polarGridHelper: any
      hemisphereLightHelper: any
      pointLightHelper: any
      skeletonHelper: any
      spotLightHelper: any
      
      // Controls and other elements that might be used
      primitive: any
    }
  }
}
