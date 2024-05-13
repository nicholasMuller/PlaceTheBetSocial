import React, { useState } from "react";

interface BetButtonProps {
  bet: string;
}

const BetButton: React.FC<BetButtonProps> = ({ bet }) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div>
      <button
        className={`btn ${isSelected ? "btn-primary" : "btn-secondary"}`}
        onClick={toggleSelection}
      >
        {bet}
      </button>
    </div>
  );
};

export default BetButton;
