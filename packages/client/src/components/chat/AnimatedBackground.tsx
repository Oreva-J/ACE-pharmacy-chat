import { FaPills } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";

// Animated Pharmacy Background Component
const AnimatedBackground = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none"
      aria-hidden="true"
    >
      {/* Floating Pills */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        >
          <FaPills
            className="text-blue-300"
            size={20 + Math.random() * 30}
            style={{
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          />
        </div>
      ))}

      {/* Floating Medical Crosses */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`cross-${i}`}
          className="absolute animate-float-slow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${20 + Math.random() * 15}s`,
          }}
        >
          <MdHealthAndSafety
            className="text-green-300"
            size={25 + Math.random() * 35}
            style={{ opacity: 0.2 + Math.random() * 0.3 }}
          />
        </div>
      ))}

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
    </div>
  );
};

export default AnimatedBackground;
