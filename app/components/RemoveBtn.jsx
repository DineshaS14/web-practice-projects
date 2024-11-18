"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

export default function RemoveBtn({ id, onDelete }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const removeTopic = useCallback(async () => {
        if (isDeleting) return;
        
        try {
            setIsDeleting(true);
            const confirmed = confirm('Are you sure you want to delete this topic?');
            
            if (!confirmed) {
                setIsDeleting(false);
                return;
            }

            const res = await fetch(`/api/topics?id=${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                // Call the onDelete callback to trigger local state update
                onDelete(id);
                // Still refresh the router to ensure server-state consistency
                router.refresh();
            } else {
                throw new Error('Failed to delete topic');
            }
        } catch (error) {
            console.error('Error deleting topic:', error);
            alert('Failed to delete topic');
        } finally {
            setIsDeleting(false);
        }
    }, [id, router, isDeleting, onDelete]);

    return (
        <button
            onClick={removeTopic}
            disabled={isDeleting}
            className={`
                text-red-400 
                transition-colors 
                duration-200 
                hover:text-red-600 
                focus:outline-none 
                focus:ring-2 
                focus:ring-red-500 
                focus:ring-offset-2
                disabled:opacity-50
                disabled:cursor-not-allowed
                p-2
                rounded-full
            `}
            aria-label="Delete topic"
        >
            <HiOutlineTrash 
                size={24} 
                className={`transform transition-transform duration-200 ${
                    isDeleting ? 'animate-pulse' : 'hover:scale-110'
                }`}
            />
        </button>
    );
}// RemoveBtn