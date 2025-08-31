"use client";

import { useMiniKit, useAddFrame, useOpenUrl } from "@coinbase/onchainkit/minikit";
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownDisconnect } from "@coinbase/onchainkit/wallet";
import { Name, Identity, Address, Avatar } from "@coinbase/onchainkit/identity";
import { useEffect, useState, useCallback } from "react";
import { AppShell } from "./components/AppShell";
import { ProjectSidebar } from "./components/ProjectSidebar";
import { TaskWorkflow } from "./components/TaskWorkflow";
import { AIGenerateButton } from "./components/AIGenerateButton";
import { TaskCard } from "./components/TaskCard";
import { Plus, ChevronRight } from "lucide-react";

interface Task {
  taskId: string;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

interface Project {
  projectId: string;
  name: string;
  description: string;
  tasks: Task[];
}

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [goalInput, setGoalInput] = useState("");

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  // Sample data
  const [projects] = useState<Project[]>([
    {
      projectId: '1',
      name: 'YouTube Series Launch',
      description: 'Launch a new educational YouTube series',
      tasks: [
        {
          taskId: '1',
          name: 'Define content strategy',
          description: 'Research target audience and content pillars',
          status: 'completed',
          priority: 'high',
        },
        {
          taskId: '2',
          name: 'Create content calendar',
          description: 'Plan first 10 episodes with topics and dates',
          status: 'active',
          priority: 'high',
        },
        {
          taskId: '3',
          name: 'Set up recording equipment',
          description: 'Configure camera, microphone, and lighting',
          status: 'pending',
          priority: 'medium',
        },
        {
          taskId: '4',
          name: 'Design channel branding',
          description: 'Create logo, thumbnails, and intro graphics',
          status: 'pending',
          priority: 'medium',
        },
      ]
    },
    {
      projectId: '2',
      name: 'Product Launch',
      description: 'Launch new digital product',
      tasks: [
        {
          taskId: '5',
          name: 'Market research',
          description: 'Analyze competitors and target market',
          status: 'completed',
          priority: 'high',
        },
        {
          taskId: '6',
          name: 'MVP development',
          description: 'Build minimum viable product',
          status: 'active',
          priority: 'high',
        },
      ]
    }
  ]);

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  useEffect(() => {
    if (projects.length > 0 && !currentProject) {
      setCurrentProject(projects[0]);
    }
  }, [projects, currentProject]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const handleGenerateTasks = async () => {
    if (!goalInput.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI task generation
    setTimeout(() => {
      setIsGenerating(false);
      setGoalInput("");
      // In real app, this would call OpenAI API and create new project
    }, 2000);
  };

  const handleTaskToggle = (taskId: string) => {
    if (!currentProject) return;

    const updatedTasks = currentProject.tasks.map(task => 
      task.taskId === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' as const }
        : task
    );

    setCurrentProject({
      ...currentProject,
      tasks: updatedTasks
    });
  };

  const saveFrameButton = () => {
    if (context && !context.client.added) {
      return (
        <button
          onClick={handleAddFrame}
          className="btn-secondary text-sm"
        >
          <Plus size={16} />
          Save Frame
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-accent animate-fade-in">
          <span>✓ Saved</span>
        </div>
      );
    }

    return null;
  };

  return (
    <AppShell>
      <div className="flex h-screen bg-bg">
        {/* Sidebar */}
        <div className="w-64 border-r border-border bg-surface/30 flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-text-primary">AgentFlow</h1>
              {saveFrameButton()}
            </div>
            
            <Wallet className="w-full">
              <ConnectWallet className="w-full">
                <div className="btn-primary w-full text-center">
                  Connect Wallet
                </div>
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>

          <ProjectSidebar 
            projects={projects}
            currentProject={currentProject}
            onProjectSelect={setCurrentProject}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="border-b border-border bg-surface/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">
                  {currentProject?.name || 'Select a Project'}
                </h2>
                <p className="text-text-secondary">
                  {currentProject?.description || 'Choose a project to view tasks'}
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Enter your creative goal..."
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    className="input-field w-full"
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerateTasks()}
                  />
                </div>
                <AIGenerateButton 
                  onClick={handleGenerateTasks}
                  isLoading={isGenerating}
                  disabled={!goalInput.trim()}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {currentProject ? (
              <div className="p-6">
                {/* Workflow Overview */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Workflow Progress</h3>
                  <TaskWorkflow tasks={currentProject.tasks} />
                </div>

                {/* Task List */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-text-primary">Tasks</h3>
                    <span className="text-text-secondary text-sm">
                      {currentProject.tasks.filter(t => t.status === 'completed').length} of {currentProject.tasks.length} completed
                    </span>
                  </div>
                  
                  <div className="grid gap-3">
                    {currentProject.tasks.map((task) => (
                      <TaskCard
                        key={task.taskId}
                        task={task}
                        onToggle={handleTaskToggle}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-text-secondary mb-2">
                    Welcome to AgentFlow
                  </h3>
                  <p className="text-text-secondary">
                    Select a project from the sidebar or create a new one
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => openUrl("https://base.org/builders/minikit")}
          className="text-text-secondary text-xs hover:text-text-primary transition-colors"
        >
          Built on Base with MiniKit
        </button>
      </div>
    </AppShell>
  );
}
