import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Mesh } from 'three';

const AnimatedFraction = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const Step1 = () => {
  const router = useRouter();
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Step 1: Penjumlahan dan Pengurangan Pecahan</h1>
      <div className="w-full max-w-2xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">Penjumlahan Pecahan</h2>
          <p className="mb-4">
            Penjumlahan pecahan dilakukan dengan menyamakan penyebut terlebih dahulu.
          </p>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full"
          />
          <p className="mt-2">Nilai Slider: {sliderValue}</p>
        </motion.div>
        <div className="w-full h-64">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedFraction />
          </Canvas>
        </div>
      </div>
      <button
        onClick={() => router.push('/menu')}
        className="mt-8 bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition-colors"
      >
        Kembali ke Menu
      </button>
    </div>
  );
};

export default Step1;