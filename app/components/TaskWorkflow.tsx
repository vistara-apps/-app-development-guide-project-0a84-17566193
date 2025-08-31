"use client";

import { CheckCircle2, Circle, Clock } from "lucide-react";

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
  return (
    <div className="flex flex-wrap gap-3">
      {tasks.map((task, index) => (
        <div key={task.taskId} className="flex items-center">
          <div className={`workflow-step ${task.status}`}>
            {task.status === 'completed' ? (
              <CheckCircle2 size={20} className="text-accent" />
            ) : task.status === 'active' ? (
              <Clock size={20} className="text-accent" />
            ) : (
              <Circle size={20} className="text-text-secondary" />
            )}
            
            <div className="flex-1">
              <div className="font-medium text-sm">
                {task.name}
              </div>
              <div className="text-xs text-text-secondary capitalize">
                {task.status}
              </div>
            </div>
          </div>
          
          {index < tasks.length - 1 && (
            <div className="w-8 h-px bg-border mx-2" />
          )}
        </div>
      ))}
    </div>
  );
}
