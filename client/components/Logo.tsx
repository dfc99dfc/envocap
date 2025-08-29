import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizes = {
    sm: {
      icon: 'h-4',
    },
    md: {
      icon: 'h-5',
    },
    lg: {
      icon: 'h-6',
    },
  };

  const sizeConfig = sizes[size];

  return (
    <div className={`flex items-center ${className}`}>
      {/* New ENVOCAP Logo with Text */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2Fdf2c5e12a17845a7ba13483fac72a40b%2Fcf05623410054992835441946bd6fa7d?format=webp&width=800"
        alt="ENVOCAP Logo"
        className={`${sizeConfig.icon} object-contain`}
        style={{
          imageRendering: 'crisp-edges',
          imageRendering: '-webkit-optimize-contrast',
        }}
      />
    </div>
  );
}

// For larger displays like hero sections
export function LogoLarge({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Large ENVOCAP Logo with Text */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2Fdf2c5e12a17845a7ba13483fac72a40b%2Fcf05623410054992835441946bd6fa7d?format=webp&width=800"
        alt="ENVOCAP Logo"
        className="object-contain"
        style={{
          width: '90px',
          height: '90px',
          imageRendering: 'crisp-edges',
          imageRendering: '-webkit-optimize-contrast',
        }}
      />
    </div>
  );
}

export default Logo;
