import React from 'react';

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  squares?: number[][];
  className?: string;
}

export function GridPattern({
  width = 100,
  height = 100,
  x = 0,
  y = 0,
  squares = [[0, 0]],
  className = '',
}: GridPatternProps) {
  return (
    <svg
      className={`absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="grid-pattern"
          width={width}
          height={height}
          x={x}
          y={y}
          patternUnits="userSpaceOnUse"
        >
          <path d={`M${width} 0V${height}H0V0Z`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill="url(#grid-pattern)" />
      {squares.map(([x, y]) => (
        x !== undefined && y !== undefined ? (
          <rect
            key={`${x}-${y}`}
            width={width}
            height={height}
            x={x * width}
            y={y * height}
            className="fill-gray-50 stroke-gray-200"
            strokeWidth={1}
          />
        ) : null
      ))}
    </svg>
  );
}