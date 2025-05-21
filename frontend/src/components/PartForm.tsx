import React from "react";

interface PartFormProps {
  onPartAdded: () => void;
}

export const PartForm: React.FC<PartFormProps> = ({ onPartAdded }) => {
  return (
    <div>
      <h2>Dodaj część</h2>
      <button onClick={onPartAdded}>Dodaj (symulacja)</button>
    </div>
  );
};