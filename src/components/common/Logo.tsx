import React from 'react';
import { Mountain } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textColor?: 'dark' | 'light';
  isStacked?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 40, 
  className, 
  showText = true,
  textColor = 'dark',
  isStacked = false
}) => {
  const iconColor = "#10B981";
  const textPrimary = textColor === 'dark' ? "#0f172a" : "#ffffff";

  return (
    <div className={cn(
      "flex items-center gap-2",
      isStacked ? "flex-col text-center" : "flex-row",
      className
    )}>
      {/* Abstract Circular Swirl Icon */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path 
          d="M50 10C72.1 10 90 27.9 90 50C90 72.1 72.1 90 50 90C27.9 90 10 72.1 10 50C10 38.9 14.5 28.9 21.7 21.7" 
          stroke={iconColor} 
          strokeWidth="8" 
          strokeLinecap="round"
        />
        <path 
          d="M35 35C40.6 29.4 49.4 29.4 55 35C60.6 40.6 60.6 49.4 55 55C49.4 60.6 40.6 60.6 35 55" 
          stroke={iconColor} 
          strokeWidth="6" 
          strokeLinecap="round"
          opacity="0.4"
        />
        <circle cx="50" cy="50" r="3" fill={iconColor} />
      </svg>

      {showText && (
        <div className={cn(
          "font-sans font-black tracking-tighter leading-none",
          isStacked ? "mt-2" : ""
        )}
        style={{ fontSize: size * 0.6 }}
        >
          <span style={{ color: textPrimary }}>GHoomers</span>
        </div>
      )}
    </div>
  );
};
