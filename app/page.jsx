
import TopicsList from "./components/TopicsList";

export default function Home() {
    return (
        <main className="p-4">
            <h1 className="text-3xl font-bold mb-4">Topic List</h1>
            <TopicsList />
        </main>
    );
}