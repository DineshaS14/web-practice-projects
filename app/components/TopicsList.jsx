import { useState, useEffect } from 'react';
import RemoveBtn from './RemoveBtn';

export default function TopicsList() {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch('/api/topics');
        const data = await res.json();
        setTopics(data);
      } catch (error) {
        console.error('Error fetching topics:', error);
        setError('Failed to fetch topics');
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="grid gap-4">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        topics?.map((topic) => (
          <div key={topic._id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{topic.title}</h2>
              <div className="flex gap-2">
                <RemoveBtn id={topic._id} />
              </div>
            </div>
            <p className="mt-2">{topic.description}</p>
          </div>
        ))
      )}
    </div>
  );
}