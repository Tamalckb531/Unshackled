import React from "react";

interface profileEditorProps {
  setShowEdit: (value: boolean) => void;
}

const ProfileEditor: React.FC<profileEditorProps> = ({ setShowEdit }) => {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen z-50 bg-transparent backdrop-blur-lg flex items-center justify-center"
      onClick={() => setShowEdit(false)}
    >
      <form
        className=" bg-white text-xl font-bold p-5 rounded-lg w-[650px] border shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        Hi there
      </form>
    </div>
  );
};

export default ProfileEditor;
