import React, { useState } from "react";

interface StarDropdownProps {
  onSelect: (value: number) => void;
}

const StarDropdown: React.FC<StarDropdownProps> = ({ onSelect }) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleSelect = (value: number) => {
    setSelectedValue(value);
    onSelect(value);
  };

  const renderOptions = () => {
    const options = [];

    for (let i = 0.5; i <= 5; i += 0.5) {
      options.push(
        <option key={i} value={i}>
          {i} Stars
        </option>
      );
    }

    return options;
  };

  return (
    <div>
      <label>Select Stars:</label>
      <select
        value={selectedValue || ""}
        onChange={(e) => handleSelect(Number(e.target.value))}
      >
        <option value="" disabled>
          Select...
        </option>
        {renderOptions()}
      </select>
    </div>
  );
};

export default StarDropdown;
