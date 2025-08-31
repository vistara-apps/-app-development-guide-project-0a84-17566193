"use client";

import { CheckCircle2, Circle, Clock, Flag, Calendar } from "lucide-react";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
  
  const priorityColors = {
    high: 'text-error',
    medium: 'text-warning',
    low: 'text-success',
  };

  const statusIcons = {
    completed: <CheckCircle2 size={20} className="text-accent" />,
    active: <Clock size={20} className="text-accent" />,
    pending: <Circle size={20} className="text-text-secondary" />,
  };
  
  const priorityBadges = {
    high: <span className="priority-badge priority-high">High</span>,
    medium: <span className="priority-badge priority-medium">Medium</span>,
    low: <span className="priority-badge priority-low">Low</span>,
  };
  
  const statusBadges = {
    completed: <span className="status-badge status-completed">Completed</span>,
    active: <span className="status-badge status-active">In Progress</span>,
    pending: <span className="status-badge status-pending">To Do</span>,
  };

  return (
    <div 
      className={`task-card ${task.status === 'completed' ? 'completed' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.taskId)}
          className={`mt-1 transition-all duration-200 ${isHovered ? 'scale-110' : ''}`}
          aria-label={`Mark task as ${task.status === 'completed' ? 'incomplete' : 'complete'}`}
        >
          {statusIcons[task.status]}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className={`font-medium ${task.status === 'completed' ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
              {task.name}
            </h4>
            <Flag size={14} className={priorityColors[task.priority]} aria-hidden="true" />
          </div>
          
          <p className="text-sm text-text-secondary mb-3">
            {task.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              {statusBadges[task.status]}
              {priorityBadges[task.priority]}
            </div>
            
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-text-secondary">
                <Calendar size={12} aria-hidden="true" />
                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
