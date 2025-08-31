"use client";

import { FolderOpen, Plus } from "lucide-react";

interface Task {
  taskId: string;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

interface Project {
  projectId: string;
  name: string;
  description: string;
  tasks: Task[];
}

interface ProjectSidebarProps {
  projects: Project[];
  currentProject: Project | null;
  onProjectSelect: (project: Project) => void;
}

export function ProjectSidebar({ projects, currentProject, onProjectSelect }: ProjectSidebarProps) {
  return (
    <div className="flex-1 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
          Projects
        </h3>
        <button className="text-text-secondary hover:text-accent transition-colors">
          <Plus size={16} />
        </button>
      </div>

      <div className="space-y-2">
        {projects.map((project) => {
          const completedTasks = project.tasks.filter(t => t.status === 'completed').length;
          const totalTasks = project.tasks.length;
          
          return (
            <div
              key={project.projectId}
              onClick={() => onProjectSelect(project)}
              className={`sidebar-item ${currentProject?.projectId === project.projectId ? 'active' : ''}`}
            >
              <FolderOpen size={16} />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">
                  {project.name}
                </div>
                <div className="text-xs text-text-secondary">
                  {completedTasks}/{totalTasks} tasks
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-surface/50 rounded-lg border border-border">
        <h4 className="text-sm font-semibold text-text-primary mb-2">
          Pro Tip
        </h4>
        <p className="text-xs text-text-secondary">
          Break down complex goals into smaller, actionable tasks for better focus and productivity.
        </p>
      </div>
    </div>
  );
}
