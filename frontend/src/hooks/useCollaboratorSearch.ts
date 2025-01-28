import { useEffect, useState } from "react";
import { userForCollaboration } from "@tamaldip/common";
import Swal from "sweetalert2";

const useCollaboratorSearch = (url:string) => {
    const [users, setUsers] = useState<userForCollaboration[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const changeSearchTerm = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
    }

    const fetchData = async (searchTerm: string) => {
        try {
            if (searchTerm.length == 0) {
                setUsers([]);
                return;
            }
            const res = await fetch(`${url}?searchTerm=${searchTerm}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            if (!res.ok) throw new Error("Can not get the users");
            const newUsers: userForCollaboration[] = await res.json();

            setUsers((prevUsers) => {
                const prevUserIds = new Set(prevUsers.map((user) => user.id));
                const newUsersIds = new Set(newUsers.map((user) => user.id));

                //? filter out the old users
                const updatedUsers = prevUsers.filter((user) => newUsersIds.has(user.id));
                //? add the news users 
                const newOnlyUsers = newUsers.filter((user) => !prevUserIds.has(user.id));

                return [...updatedUsers, ...newOnlyUsers];
            })
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: `<p>${error.message}</p>`,
            });
        }
    }

    useEffect(() => {
        if (searchTerm.trim()) fetchData(searchTerm);
    }, [searchTerm]);

    return { users, changeSearchTerm };
    
}

export default useCollaboratorSearch;