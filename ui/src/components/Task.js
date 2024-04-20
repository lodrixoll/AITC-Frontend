import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const Task = ({ task, onToggleComplete, index }) => {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setOpacity(1);
        }, 1000 + index * 100);  // Initial delay of 1000ms added, then stagger based on index
        return () => clearTimeout(timeoutId);
    }, [index]);

    return (
        <div className={`flex items-center justify-between p-4 bg-white rounded-lg shadow ${task.completed ? 'bg-green-100' : 'bg-gray-100'}`} style={{ opacity: opacity, transition: 'opacity 500ms ease-in-out' }}>
            <div className="flex items-center">
                <button onClick={() => onToggleComplete(task.id)}>
                    {task.completed ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaRegCircle className="text-gray-500 mr-2" />}
                </button>
                <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{task.title}</span>
            </div>
            <span className="text-sm text-gray-500">{task.date}</span>
        </div>
    );
};

export default Task;