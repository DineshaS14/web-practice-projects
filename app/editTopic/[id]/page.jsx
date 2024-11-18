// app/editTopic/[id]/page.jsx
'use client'

import EditTopicForm from "@/app/components/EditTopicForm";
import { useEffect, useState } from "react";

export default function EditTopic({ params }) {
    const { id } = params;
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTopicById = async () => {
            try {
                const res = await fetch(`/api/topics/${id}`, {
                    cache: "no-store",
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch topic");
                }
                const data = await res.json();
                setTopic(data.topic);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getTopicById();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!topic) return <div>Topic not found</div>;

    return (
        <EditTopicForm 
            id={id} 
            title={topic.title} 
            description={topic.description}
        />
    );
} // EditTopic