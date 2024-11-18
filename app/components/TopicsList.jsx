"use client";
import { useState, useEffect } from 'react';
import RemoveBtn from './RemoveBtn';

export default function TopicsList() {
    const [topics, setTopics] = useState([]);

    // Fetch topics on component mount
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const res = await fetch('/api/topics');
                const data = await res.json();
                setTopics(data);
            } catch (error) {
                console.error('Error fetching topics:', error);
                setTopics([]); // or some default value
            }
        };

        fetchTopics();
    }, []);

    // Handle local topic deletion
    const handleDelete = (deletedId) => {
        setTopics(currentTopics => 
            currentTopics.filter(topic => topic._id !== deletedId)
        );
    };

    return (
        <div className="grid gap-4">
            {topics?.map((topic) => (
                <div key={topic._id} className="p-4 border rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">{topic.title}</h2>
                        <div className="flex gap-2">
                            <RemoveBtn id={topic._id} onDelete={handleDelete} />
                        </div>
                    </div>
                    <p className="mt-2">{topic.description}</p>
                </div>
            ))}
        </div>
    );
}
 // TopicList