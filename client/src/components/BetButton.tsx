import { useState } from "react";
interface BetButtonProps {
  bet: string;
}

const BetButton: React.FC<BetButtonProps> = ({ bet }) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
  };

  return (
    <button
      className={`btn btn-sm btn-sml ${
        isSelected ? "btn-primary" : "btn-secondary"
      }`}
      onClick={toggleSelection}
    >
      {bet}
    </button>
  );
};

export default BetButton;
