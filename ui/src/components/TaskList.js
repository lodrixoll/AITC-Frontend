import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onToggleComplete }) => {
    return (
        <div className="space-y-4">
            {tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} onToggleComplete={onToggleComplete} />
            ))}
        </div>
    );
};

export default TaskList;