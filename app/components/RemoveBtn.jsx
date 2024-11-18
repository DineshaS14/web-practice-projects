"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({id}) {
    const router = useRouter(); // to refresh after we delete
    const removeTopic = async () => {
        const confirmed = confirm('Are you sure');
        if (confirmed) {
        const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
                method: "DELETE",
            });
         //if confirmed for deletion
            if (res.ok) {
                router.refresh();
            } // if res returns true we refresh the router using useRouter
        }
    }
    return (
    <button 
    onClick={removeTopic}
    className="text-red-400">
        <HiOutlineTrash size={24}/>
        </button>
        );
} // RemoveBtn