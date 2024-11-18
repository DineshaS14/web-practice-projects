'use client';

import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { useEffect, useState } from "react";

export default function TopicsList() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const res = await fetch('/api/topics');
                if (!res.ok) {
                    throw new Error('Failed to fetch topics');
                }
                const data = await res.json();
                setTopics(data.topics);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (loading) return <div>Loading...</div>;

    return (
        <>
            {topics.length === 0 ? (
                <p>No topics available.</p>
            ) : (
                topics.map((t) => (
                    <div
                        key={t._id}
                        className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start hover:border-slate-500"
                    >
                        <div>
                            <h2 className="font-bold text-2xl hover:text-red-500">
                                {t.title}
                            </h2>
                            <p className="hover:text-2xl">{t.description}</p>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                            <RemoveBtn id={t._id} />
                            <Link href={`/editTopic/${t._id}`}>
                                <HiPencilAlt size={24} />
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}
 // TopicList