"use client";
import {useState} from "react";
import { useRouter } from "next/navigation";


export default function AddTopic() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents default behavior when page is refreshed
        if (!title || !description) {
            alert("Title and Descriptions are required");
            return;
        } // if no title and description  while submitting, alerts the user.
        try {
            const res = await fetch("http://localhost:3004/api/topics", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ title, description}),
            });
            // if successful adding, we go to the mainpage using Router.
            if (res.ok) {
                router.push('/');
            } else {
                throw new Error("Failed To Create A New Topic");
            } // if res is successful, we move to main page where items are loaded again.
        } catch(error) {

        }
    } // handleSubmit
    return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input className="border border-slate-500 px-8 py-2"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        placeholder="Topic"
        />
        <input className="border border-slate-500 px-8 py-10"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        placeholder="Topic Description"
        />
        <button type="submit"
        className="border-4 border-[#29637f] bg-[#060f1b] font-bold text-[#29637f] py-3 px-6 w-fit">Add a Topic</button>
    </form>
    );
} // AddTopic