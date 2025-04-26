import React from "react";

// Interface for all cute shape components
interface CuteShapeProps {
  size?: number;
  color?: string;
  className?: string;
}

// A cute heart shape
export const CuteHeart: React.FC<CuteShapeProps> = ({ 
  color = "#EC4899", 
  size = 30, 
  className = "" 
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`drop-shadow-md ${className}`}
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={color}
      />
    </svg>
  );
};

// A cute star shape
export const CuteStar: React.FC<CuteShapeProps> = ({ 
  color = "#FCD34D", 
  size = 30, 
  className = "" 
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`drop-shadow-md ${className}`}
    >
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"
        fill={color}
      />
    </svg>
  );
};

// A cute strawberry
export const CuteStrawberry: React.FC<CuteShapeProps> = ({ 
  size = 30, 
  className = "" 
}) => {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`drop-shadow-md ${className}`}
    >
      <path
        d="M320 0c-17.7 0-32 14.3-32 32V60.8l-43.5 14.5C225.7 83.1 209.7 92.1 195.9 102.4c-13.4 10.1-25.3 21.6-34.4 34.6c-9.1 13-16.3 27-20.5 41.6c-4.3 14.6-5.3 29.2-2.9 43.3c0 0-.1 0-.1 0c-5.7-1.4-11.3-2-16.8-2c-5.6 0-11.1 .7-16.4 2.3C92.1 227.5 81 236.4 72.4 249c-8.6 12.6-14.8 28-17.2 45.8c-2.4 17.8-1 37.7 6 58.5c7 20.8 19.5 43.1 38.9 65.8c12 14 26.7 28.4 43.6 43.2c-6.3 4.2-11.4 10.5-13.8 18.3c-3.6 11.7 1.1 24.3 11.3 31.3c10.2 7 23.7 5.8 32.5-2.9c6.2-6.1 8.7-14.9 7.3-23.2c18-14.9 36.3-30.1 53.5-46c17.3-15.9 33.3-32.3 46.9-48.3c13.6-16.1 24.1-31.7 30.6-46.9c6.5-15.1 9.1-29.8 7.2-44.1c-1.9-14.2-8.5-28.1-21.4-39.8c-12.9-11.6-31.2-20.4-55.7-21.6c-5.4-31.9 5-60.2 28.3-78.9c17.8-14.4 41.1-22.8 68.5-22.8c0-17.6-14.3-32-32-32l0 0z"
        fill="#ED1B24"
      />
      <path
        d="M177.6 355.3c-2.5-8.4-13.2-9.9-17.8-2.3c-2.2 3.6-1.1 8.3 2.5 10.5s8.3 1.1 10.5-2.5c2.1-3.5 5.9-4.9 4.8-5.7zm111.2-83.2c-2.5-8.4-13.2-9.9-17.8-2.3c-2.2 3.6-1.1 8.3 2.5 10.5s8.3 1.1 10.5-2.5c2.1-3.5 5.9-4.9 4.8-5.7zM301.6 222c-2.5-8.4-13.2-9.9-17.8-2.3c-2.2 3.6-1.1 8.3 2.5 10.5s8.3 1.1 10.5-2.5c2.1-3.5 5.9-4.9 4.8-5.7zm-77.2 55.9c-2.5-8.4-13.2-9.9-17.8-2.3c-2.2 3.6-1.1 8.3 2.5 10.5s8.3 1.1 10.5-2.5c2.1-3.5 5.9-4.9 4.8-5.7zm28.3 92.3c-2.5-8.4-13.2-9.9-17.8-2.3c-2.2 3.6-1.1 8.3 2.5 10.5s8.3 1.1 10.5-2.5c2.1-3.5 5.9-4.9 4.8-5.7zm-72.9-139.5c-2.5-8.4-13.2-9.9-17.8-2.3c-2.2 3.6-1.1 8.3 2.5 10.5s8.3 1.1 10.5-2.5c2.1-3.5 5.9-4.9 4.8-5.7zm88 33.2c-2.5-8.4-13.2-9.9-17.8-2.3c-2.2 3.6-1.1 8.3 2.5 10.5s8.3 1.1 10.5-2.5c2.1-3.5 5.9-4.9 4.8-5.7zM187.6 314c-2.5-8.4-13.2-9.9-17.8-2.3c-2.2 3.6-1.1 8.3 2.5 10.5s8.3 1.1 10.5-2.5c2.1-3.5 5.9-4.9 4.8-5.7z"
        fill="#006400"
      />
    </svg>
  );
};

// A cute ice cream cone
export const CuteIceCream: React.FC<CuteShapeProps> = ({ 
  size = 30, 
  className = "" 
}) => {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`drop-shadow-md ${className}`}
    >
      <path
        d="M127.7 291.8L201.1 441.6C202.5 444.5 205.3 446.4 208.6 446.4H303.4C306.7 446.4 309.5 444.5 310.9 441.6L384.3 291.8C397.4 260 384.4 222.3 352.5 209.2C345.6 206.1 338.3 204.5 331 204.2C331 204.1 331 204.1 331 204C331 181.9 313.1 164 291 164C288.6 164 286.2 164.2 283.9 164.6C283.3 164.4 282.6 164.1 281.9 163.8C268.9 158 254.5 156.2 240.6 158.3C218.5 161.5 200.1 178.5 194.7 200.2C188.8 200.5 182.9 201.8 177.2 204.2C145.3 217.4 132.2 255 145.4 286.9C146.1 288.3 146.8 289.8 147.5 291.3C147.5 291.4 147.6 291.6 147.6 291.8H127.7z"
        fill="#FDA4AF"
      />
      <path
        d="M207.3 458.5L333.1 458.5C342.6 458.5 349.1 449.8 346.9 440.6L313.5 321.3C311.3 312.1 303.2 307.4 294.4 310.7C285.6 314 282.2 322.8 287.5 330.9L312.4 371.2C316.4 377.6 311.7 385.8 304.1 385.8L229.9 385.8C223.8 385.8 217.7 382.6 213.1 376.9L181.4 321.9C173.1 314.8 162.8 312 154.7 319.3C149.9 325.3 152.5 334.8 158.7 339.6L207.3 458.5z"
        fill="#854D0E"
      />
    </svg>
  );
};

// A cute cookie
export const CuteCookie: React.FC<CuteShapeProps> = ({ 
  size = 30, 
  className = "" 
}) => {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`drop-shadow-md ${className}`}
    >
      <circle cx="256" cy="256" r="200" fill="#C59B76" />
      <circle cx="180" cy="180" r="25" fill="#3A1E04" />
      <circle cx="300" cy="160" r="25" fill="#3A1E04" />
      <circle cx="340" cy="280" r="25" fill="#3A1E04" />
      <circle cx="220" cy="320" r="25" fill="#3A1E04" />
      <circle cx="150" cy="260" r="25" fill="#3A1E04" />
    </svg>
  );
};

// Export all shapes in an object
const CuteShapes = {
  Heart: CuteHeart,
  Star: CuteStar,
  Strawberry: CuteStrawberry,
  IceCream: CuteIceCream,
  Cookie: CuteCookie
};

export default CuteShapes;