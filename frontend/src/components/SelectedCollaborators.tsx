import { userForCollaboration } from "@tamaldip/common";
import { X } from "lucide-react";
import React from "react";

interface SelectedCollaboratorsProps {
  id: string;
  firstName: string;
  photoURL?: string;
  setCollaborators: (value: any) => void;
}

const SelectedCollaborators = ({
  id,
  firstName,
  photoURL,
  setCollaborators,
}: SelectedCollaboratorsProps) => {
  const handleClick = () => {
    setCollaborators((prev: userForCollaboration[]) =>
      prev.filter(
        (collaborator: userForCollaboration) => collaborator.id !== id
      )
    );
  };

  return (
    <div key={id} className="flex-shrink-0 mt-2 mx-1 relative">
      <button
        className="absolute -top-1 -right-1 bg-red-400 text-white rounded-full p-1"
        onClick={handleClick}
      >
        <X className="w-2 h-2" />
      </button>
      <img
        className="w-10 h-10 rounded-full cursor-pointer"
        src={photoURL}
        alt={firstName}
        title={firstName}
      />
    </div>
  );
};

export default SelectedCollaborators;
