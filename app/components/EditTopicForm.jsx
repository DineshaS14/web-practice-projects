"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({id, title, description}) {
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/topics/${id}`, {
                method: "PUT", 
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ 
                    title: newTitle,  // Changed from newTitle to title
                    description: newDescription  // Changed from newDescription to description
                }),
            });
            
            if (!res.ok) {
                throw new Error("Failed To Update Topic");
            }
            
            router.push("/");
            router.refresh(); // Add this to refresh the page data
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Edit Topic</h2>
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
            >
                <input 
                    onChange={(e) => setNewTitle(e.target.value)}
                    value={newTitle}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Topic Title"
                />
                <input 
                    onChange={(e) => setNewDescription(e.target.value)}
                    value={newDescription}
                    className="border border-slate-500 px-8 py-10"
                    type="text"
                    placeholder="Topic Description"
                />
                <button 
                    type="submit" 
                    className="border-4 border-[#29637f] bg-[#060f1b] font-bold text-[#29637f] py-3 px-6 w-fit"
                >
                    Update Topic
                </button>
            </form>
        </div>
    );
}// EditTopicForm