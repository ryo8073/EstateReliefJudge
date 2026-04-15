import React from 'react';

interface FilterSelectorProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  isActive?: boolean;
  stepNumber: number;
  totalSteps: number;
  helpText?: string;
}

export const FilterSelector: React.FC<FilterSelectorProps> = ({
  label,
  options,
  value,
  onChange,
  disabled,
  isActive,
  stepNumber,
  totalSteps,
  helpText,
}) => {
  const isCompleted = !!value;

  return (
    <div
      style={{
        marginBottom: 16,
        animation: !disabled ? 'fadeInUp 0.3s ease-out' : undefined,
        opacity: disabled ? 0.5 : 1,
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Step header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8,
      }}>
        <div style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          fontWeight: 700,
          background: isCompleted ? '#4f46e5' : isActive ? '#818cf8' : '#e2e8f0',
          color: isCompleted || isActive ? '#fff' : '#94a3b8',
          transition: 'all 0.3s ease',
          flexShrink: 0,
        }}>
          {isCompleted ? '\u2713' : stepNumber}
        </div>
        <label style={{
          fontWeight: isActive ? 700 : 600,
          fontSize: 15,
          color: isActive ? '#4f46e5' : isCompleted ? '#1e293b' : '#64748b',
          transition: 'all 0.2s ease',
        }}>
          {label}
        </label>
      </div>

      {/* Help text */}
      {helpText && isActive && (
        <p style={{
          fontSize: 12,
          color: '#6366f1',
          margin: '0 0 8px 38px',
          lineHeight: 1.4,
        }}>
          {helpText}
        </p>
      )}

      {/* Select */}
      <div style={{ paddingLeft: 38 }}>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          style={{
            width: '100%',
            padding: '10px 36px 10px 14px',
            border: isActive ? '2px solid #6366f1' : '1.5px solid #cbd5e1',
            borderRadius: 10,
            background: disabled ? '#f1f5f9' : '#fff',
            color: value ? '#1e293b' : '#94a3b8',
            fontSize: 15,
            outline: 'none',
            boxShadow: isActive ? '0 0 0 3px rgba(99, 102, 241, 0.15)' : 'none',
            animation: isActive ? 'active-glow 1.5s infinite alternate' : 'none',
            transition: 'all 0.2s ease',
            cursor: disabled ? 'not-allowed' : 'pointer',
            appearance: 'none',
            backgroundImage: disabled ? 'none' : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
          }}
          aria-label={label}
        >
          <option value="" disabled>
            {label}を選択
          </option>
          {options.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSelector;
