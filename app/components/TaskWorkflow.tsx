"use client";

import { CheckCircle2, Circle, Clock, ChevronRight } from "lucide-react";

interface Task {
  taskId: string;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

interface TaskWorkflowProps {
  tasks: Task[];
}

export function TaskWorkflow({ tasks }: TaskWorkflowProps) {
  // Sort tasks by status: completed first, then active, then pending
  const sortedTasks = [...tasks].sort((a, b) => {
    const statusOrder = { completed: 0, active: 1, pending: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });
  
  const statusLabels = {
    completed: 'Completed',
    active: 'In Progress',
    pending: 'To Do'
  };

  return (
    <div className="flex flex-nowrap gap-2 md:gap-3">
      {sortedTasks.map((task, index) => (
        <div key={task.taskId} className="flex items-center">
          <div 
            className={`workflow-step ${task.status}`}
            title={`${task.name} - ${statusLabels[task.status]}`}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface/80 border border-border">
              {task.status === 'completed' ? (
                <CheckCircle2 size={18} className="text-accent" aria-hidden="true" />
              ) : task.status === 'active' ? (
                <Clock size={18} className="text-accent" aria-hidden="true" />
              ) : (
                <Circle size={18} className="text-text-secondary" aria-hidden="true" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">
                {task.name}
              </div>
              <div className="text-xs text-text-secondary">
                {statusLabels[task.status]}
              </div>
            </div>
          </div>
          
          {index < sortedTasks.length - 1 && (
            <div className="flex items-center mx-1 md:mx-2">
              <ChevronRight size={16} className="text-border" aria-hidden="true" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
