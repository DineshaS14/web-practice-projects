import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

// function to pull topics from MongoDB
const getTopics = async () => {
    try {
        const res = await fetch("http://localhost:3003/api/topics", {
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to getch topics");
        } // if
    return res.json();
    } catch (error) {
        console.log("Error loading topics: ", error);
    }
};
// async function if when called its await.

export default async function TopicList() {
    // destructure getTopics using const topics.
    const { topics } = await getTopics();
    return (
        <>
        {topics.map((t) => (
        <div key={t.id}
        className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
            <div>
                <h2 className="font-bold text-2xl">{t.title}</h2>
                <div>
                    {t.description}
                </div>
            </div>

            <div className="flex justify-between items- start gap-2">
                <RemoveBtn id={t._id}/>
                <Link href={'/editTopic/${t._id}'}>
                <HiPencilAlt size={24}/>
                </Link>
            </div>
        </div>
        ))}
        </>
    );
} // TopicList