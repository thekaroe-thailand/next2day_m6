'use client'

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState('hello');

  const handleChange = () => {
    setMessage('new value');
  }

  return (
    <div className="text-4xl font-bold">
      <div>Hello Next.js {message}</div>
      <div>
        <input className="bg-white m-2 p-2"
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-600 px-4 py-2 rounded-md"
        onClick={handleChange}>
        click here
      </button>
    </div>
  );
}
