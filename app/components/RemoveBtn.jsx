import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

export default function RemoveBtn({ id, onDelete }) {
    const router = useRouter();
    const [isDeletionInProgress, setIsDeletionInProgress] = useState(false);

    const removeTopic = useCallback(async () => {
        if (isDeletionInProgress) return;
        console.log(isDeletionInProgress);
        try {
            setIsDeletionInProgress(true);
            const confirmed = confirm('Are you sure you want to delete this topic?');

            if (!confirmed) {
                setIsDeletionInProgress(false);
                return;
            }
            console.log("sadhaskdgkadgkj");
            const response = await fetch(`/api/topics?id=${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("sadhaskdgkadgkj");
            if (response.ok) {
                onDelete(id); // Call onDelete callback
                router.reload(); // Simplified navigation update
            } else {
                throw new Error('Failed to delete topic');
            }
        } catch (error) {
            console.error('Error deleting topic:', error);
            alert('Failed to delete topic');
        } finally {
            setIsDeletionInProgress(false);
        }
    }, [id, router, isDeletionInProgress, onDelete]);

    return (
        <button
            onClick={removeTopic}
            disabled={isDeletionInProgress}
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
                    isDeletionInProgress ? 'animate-pulse' : 'hover:scale-110'
                }`}
            />
        </button>
    );
}