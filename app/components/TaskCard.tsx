"use client";

import { CheckCircle2, Circle, Clock, Flag } from "lucide-react";

interface Task {
  taskId: string;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

interface TaskCardProps {
  task: Task;
  onToggle: (taskId: string) => void;
}

export function TaskCard({ task, onToggle }: TaskCardProps) {
  const priorityColors = {
    high: 'text-red-400',
    medium: 'text-yellow-400',
    low: 'text-green-400',
  };

  const statusIcons = {
    completed: <CheckCircle2 size={20} className="text-accent" />,
    active: <Clock size={20} className="text-accent" />,
    pending: <Circle size={20} className="text-text-secondary" />,
  };

  return (
    <div className={`task-card ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.taskId)}
          className="mt-1 hover:scale-110 transition-transform"
        >
          {statusIcons[task.status]}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={`font-medium ${task.status === 'completed' ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
              {task.name}
            </h4>
            <Flag size={14} className={priorityColors[task.priority]} />
          </div>
          
          <p className="text-sm text-text-secondary mb-2">
            {task.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className={`text-xs px-2 py-1 rounded-full capitalize ${
              task.status === 'completed' 
                ? 'bg-accent/20 text-accent'
                : task.status === 'active'
                ? 'bg-primary/20 text-primary'
                : 'bg-surface text-text-secondary'
            }`}>
              {task.status}
            </span>
            
            <span className={`text-xs font-medium capitalize ${priorityColors[task.priority]}`}>
              {task.priority} priority
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
