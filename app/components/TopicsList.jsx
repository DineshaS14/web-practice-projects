'use client';

import { useState, useEffect } from 'react';
import RemoveBtn from './RemoveBtn';

export default function TopicsList() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch('/api/topics');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log('Fetched Topics:', data); // Debugging: Check fetched data
        setTopics(data.topics);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };
  
    fetchTopics();
  }, []);

  return (
    <div className="grid gap-4">
      {Array.isArray(topics) && topics.map((topic) => (
        <div key={topic._id} className="p-4 border rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{topic.title}</h2>
            <div className="flex gap-2">
              <RemoveBtn id={topic._id} />
            </div>
          </div>
          <p className="mt-2">{topic.description}</p>
        </div>
      ))}
    </div>
  );
}
