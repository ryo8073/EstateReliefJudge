import React from 'react';

interface FilterSelectorProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const FilterSelector: React.FC<FilterSelectorProps> = ({ label, options, value, onChange, disabled }) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#333' }}>
        {label}
      </label>
      <div
        style={{
          background: disabled ? '#f4f6fb' : '#e0e7ff', // 周囲に色（非活性時はグレー）
          borderRadius: 8,
          padding: 12,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          transition: 'background 0.2s',
        }}
      >
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '2px solid #6366f1',
            borderRadius: 6,
            background: '#fff', // 入力欄は白抜き
            color: '#222',
            fontSize: 16,
            outline: 'none',
            boxShadow: disabled ? 'none' : '0 0 0 2px #6366f1',
            transition: 'box-shadow 0.2s',
            cursor: disabled ? 'not-allowed' : 'pointer',
            appearance: 'none',
          }}
          aria-label={label}
        >
          <option value="" disabled>
            {label}を選択してください
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