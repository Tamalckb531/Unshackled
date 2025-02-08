import * as Y from "yjs";
import useCollaboratorSearch from "@/hooks/useCollaboratorSearch";
import useDebounce from "@/hooks/useDebounce";
import { userForCollaboration } from "@tamaldip/common";
import React, { useEffect, useRef, useState } from "react";
import SelectedCollaborators from "./SelectedCollaborators";
import Cookies from "js-cookie";

interface collaborationSearchProps {
  setShowCollaborationSearch: (value: boolean) => void;
  collaborators: userForCollaboration[];
  setCollaborators: (value: any) => void;
  room: string;
}

const CollaboratorSearch: React.FC<collaborationSearchProps> = ({
  setShowCollaborationSearch,
  collaborators,
  setCollaborators,
  room,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { users, changeSearchTerm } = useCollaboratorSearch(
    "http://localhost:3000/api/news/editor/userSearch"
  );

  const debouncedInput: string = useDebounce(searchTerm, 500);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    changeSearchTerm(debouncedInput);
  }, [debouncedInput, changeSearchTerm]);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!token) return;

    console.log(token);

    ws.current = new WebSocket(`ws://localhost:3000?token=${token}`);
    ws.current.onopen = () => console.log("WebSocket connected");
    ws.current.onclose = () => console.log("WebSocket disconnected");

    return () => {
      ws.current?.close();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    user: userForCollaboration
  ) => {
    if (e.target.checked) {
      // Add the user to collaborators if checked
      const exist = collaborators.some((obj) => obj.id === user.id);
      if (exist) return;
      setCollaborators((prev: userForCollaboration[]) => [...prev, user]);
    } else {
      // Remove the user from collaborators if unchecked
      setCollaborators((prev: userForCollaboration[]) =>
        prev.filter(
          (collaborator: userForCollaboration) => collaborator.id !== user.id
        )
      );
    }
  };

  const sentInvitation = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          type: "send_invitation",
          collaborators: collaborators.map((col) => col.id),
          room,
        })
      );
    }
  };

  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen z-50 bg-transparent backdrop-blur-lg flex items-center justify-center"
      onClick={() => setShowCollaborationSearch(false)}
    >
      <div
        className=" bg-white text-xl font-bold p-5 rounded-lg w-[650px] border shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p className=" text-center text-2xl">Collaboration search</p>
        <input
          className="outline-none w-full p-3 text-lg font-light mt-2 border-b"
          placeholder="search by name, username or email"
          value={searchTerm}
          onChange={handleInputChange}
        />

        {/* //? render users  */}
        <div className="flex flex-col max-h-[50vh] overflow-y-auto justify-start gap-3 mt-5 pb-4 px-2 border-b scrollbar-none">
          {users.length > 0 ? (
            users.map((user) => {
              return (
                <div
                  className=" flex items-center justify-between"
                  key={user.id}
                >
                  <span className="flex gap-5 items-center">
                    <img
                      className="w-10 h-10 rounded-full cursor-pointer"
                      src={
                        user.photoURL ||
                        "https://randomuser.me/api/portraits/women/26.jpg"
                      }
                      alt="Rounded avatar"
                    />
                    <span className="flex items-center gap-2">
                      <h1 className=" font-normal text-xl">
                        {user.firstName} {user.lastName}
                      </h1>
                      <p className=" font-light text-gray-400 text-xs">
                        {user.userName}
                      </p>
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    value=""
                    className="w-4 h-4 accent-orange-300 bg-gray-100 border-gray-300 rounded-sm "
                    onChange={(e) => handleChecked(e, user)}
                  />
                </div>
              );
            })
          ) : (
            <p className=" font-normal text-lg">No users to show right now</p>
          )}
        </div>
        {/* //? show selected users  */}
        <div className=" flex flex-col justify-center items-center mt-5 ">
          <p className=" mb-3 text-2xl font-light italic">
            Selected collaborators
          </p>
          <div className="flex items-center justify-start gap-2 overflow-x-auto scrollbar-none">
            {collaborators &&
              collaborators.map((collaborator) => {
                return (
                  <SelectedCollaborators
                    id={collaborator.id}
                    firstName={collaborator.firstName}
                    photoURL={collaborator.photoURL || ""}
                    setCollaborators={setCollaborators}
                  />
                );
              })}
          </div>
        </div>

        {/* //? sent invitation button  */}

        {collaborators.length > 0 && (
          <button
            className=" bg-orange-500 text-white p-2 rounded-lg text-lg mt-6"
            onClick={sentInvitation}
          >
            Sent invitation
          </button>
        )}
      </div>
    </div>
  );
};

export default CollaboratorSearch;
