import { useState } from "react";
import { SelectedBet } from "../views/MLB";

interface BetButtonProps {
  id: string;
  betType: string;
  odds: string;
  onSelect: (bet: SelectedBet, isSelected: boolean) => void;
}

const BetButton: React.FC<BetButtonProps> = ({ id, betType, odds, onSelect }) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
    onSelect({ id, betType, odds }, !isSelected); // Notify parent of the selection state
  };

  return (
    <button
      className={`btn btn-sm btn-sml ${
        isSelected ? "btn-primary" : "btn-secondary"
      }`}
      onClick={toggleSelection}
    >
      {`${odds}`}
    </button>
  );
};

export default BetButton; 
