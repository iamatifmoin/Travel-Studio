import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useStore } from '../store/useStore';
import * as THREE from 'three';

interface RoomProps {
  position: [number, number, number];
  color: string;
  id: number;
  title: string;
  description: string;
  type: 'internal' | 'external';
  name?: string;
  rating?: number;
  distance?: string;
  cuisine?: string;
  priceRange?: string;
}

const Room: React.FC<RoomProps> = ({ position, color, id, title, description, type, name, rating, distance, cuisine, priceRange }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { 
    selectedInternalRoom, 
    selectedExternalRoom, 
    setSelectedInternalRoom, 
    setSelectedExternalRoom, 
    setSelectedExperience, 
    internalExperiences, 
    externalExperiences 
  } = useStore();

  const isSelected = type === 'internal' ? selectedInternalRoom === id : selectedExternalRoom === id;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += hovered ? 0.02 : 0.01;
      meshRef.current.scale.setScalar(hovered ? 1.2 : isSelected ? 1.1 : 1);
    }
  });

  const handleClick = () => {
    if (type === 'internal') {
      setSelectedInternalRoom(id);
      setSelectedExternalRoom(null);
      const experience = internalExperiences.find(exp => exp.id === id);
      if (experience) {
        setSelectedExperience(experience);
      }
    } else {
      setSelectedExternalRoom(id);
      setSelectedInternalRoom(null);
      const experience = externalExperiences.find(exp => exp.id === id);
      if (experience) {
        setSelectedExperience(experience);
      }
    }
  };

  const displayTitle = title || name || '';
  const isExternal = type === 'external';

  return (
    <group position={position}>
      {/* Room/Restaurant base */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <boxGeometry args={isExternal ? [1.2, 0.6, 1.2] : [1.8, 0.8, 1.8]} />
        <meshStandardMaterial 
          color={isSelected ? (isExternal ? '#F97316' : '#4F46E5') : color} 
          transparent 
          opacity={hovered ? 0.9 : 0.7}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Top section for internal rooms only */}
      {!isExternal && (
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[1.6, 0.4, 1.6]} />
          <meshStandardMaterial 
            color={isSelected ? '#6366F1' : '#F3F4F6'} 
            transparent 
            opacity={0.8}
          />
        </mesh>
      )}
      
      {/* Identifier marker */}
      <mesh position={[0, isExternal ? 0.8 : 1.2, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial 
          color={isSelected ? '#EF4444' : (isExternal ? '#F97316' : '#10B981')} 
          emissive={isSelected ? '#EF4444' : (isExternal ? '#F97316' : '#10B981')}
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Distance indicator for external experiences */}
      {isExternal && distance && (
        <mesh position={[0, 1.0, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial 
            color="#FCD34D" 
            emissive="#FCD34D"
            emissiveIntensity={0.2}
          />
        </mesh>
      )}
      
      <Text
        position={[0, isExternal ? 1.2 : 1.5, 0]}
        fontSize={isExternal ? 0.2 : 0.25}
        color="#1F2937"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {displayTitle}
      </Text>
    </group>
  );
};

const HotelFloor: React.FC = () => {
  return (
    <>
      {/* Main floor */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial 
          color="#F8FAFC" 
          transparent 
          opacity={0.8}
          roughness={0.8}
        />
      </mesh>
      
      {/* Floor pattern */}
      <mesh position={[0, -0.49, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial 
          color="#E2E8F0" 
          transparent 
          opacity={0.3}
        />
      </mesh>
      
      {/* Hotel building outline */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[8, 0.1, 6]} />
        <meshStandardMaterial 
          color="#CBD5E1" 
          transparent 
          opacity={0.4}
        />
      </mesh>
      
      {/* Hotel walls */}
      <group>
        {/* Front wall */}
        <mesh position={[0, 1, 3]}>
          <boxGeometry args={[8, 2, 0.1]} />
          <meshStandardMaterial color="#E5E7EB" transparent opacity={0.6} />
        </mesh>
        {/* Back wall */}
        <mesh position={[0, 1, -3]}>
          <boxGeometry args={[8, 2, 0.1]} />
          <meshStandardMaterial color="#E5E7EB" transparent opacity={0.6} />
        </mesh>
        {/* Left wall */}
        <mesh position={[-4, 1, 0]}>
          <boxGeometry args={[0.1, 2, 6]} />
          <meshStandardMaterial color="#E5E7EB" transparent opacity={0.6} />
        </mesh>
        {/* Right wall */}
        <mesh position={[4, 1, 0]}>
          <boxGeometry args={[0.1, 2, 6]} />
          <meshStandardMaterial color="#E5E7EB" transparent opacity={0.6} />
        </mesh>
      </group>
      
      {/* Street markings for external restaurants */}
      <mesh position={[0, -0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[9, 10, 32]} />
        <meshStandardMaterial 
          color="#D1D5DB" 
          transparent 
          opacity={0.4}
        />
      </mesh>
    </>
  );
};

const HotelMap3D: React.FC = () => {
  const { internalExperiences, externalExperiences } = useStore();

  // Position external experiences around the hotel
  const getExternalPosition = (index: number): [number, number, number] => {
    const radius = 6;
    const angle = (index * 2 * Math.PI) / externalExperiences.length;
    return [
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    ];
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
      <Canvas 
        camera={{ position: [8, 8, 8], fov: 50 }}
        shadows
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1.2} 
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, -10, -5]} intensity={0.6} color="#4F46E5" />
          <spotLight 
            position={[0, 15, 0]} 
            intensity={0.8} 
            angle={0.3} 
            penumbra={0.2}
            castShadow
          />
          
          <HotelFloor />
          
          {/* Internal Experiences (inside hotel) */}
          {internalExperiences.map((experience) => (
            <Room
              key={`internal-${experience.id}`}
              position={[
                experience.position?.x || 0,
                experience.position?.y || 0,
                experience.position?.z || 0
              ]}
              color={experience.color || '#E5E7EB'}
              id={experience.id}
              title={experience.title || ''}
              description={experience.description || ''}
              type="internal"
            />
          ))}
          
          {/* External Experiences (outside hotel) */}
          {externalExperiences.map((experience, index) => (
            <Room
              key={`external-${experience.id}`}
              position={getExternalPosition(index)}
              color="#FED7AA"
              id={experience.id}
              title=""
              name={experience.name}
              description={`${experience.cuisine} restaurant • ${experience.rating}⭐ • ${experience.distance} • ${experience.priceRange}`}
              type="external"
              rating={experience.rating}
              distance={experience.distance}
              cuisine={experience.cuisine}
              priceRange={experience.priceRange}
            />
          ))}
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={6}
            maxDistance={25}
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-200">
        <p className="text-xs text-gray-600 font-medium mb-2">
          🖱️ Drag to rotate • 🔍 Scroll to zoom • ✨ Click to explore
        </p>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <span className="text-gray-600">Hotel Amenities</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-gray-600">Nearby Restaurants</span>
          </div>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gray-200">
        <div className="text-xs text-gray-700 font-medium">
          🏨 Interactive Hotel Map
        </div>
      </div>
    </div>
  );
};

export default HotelMap3D;
