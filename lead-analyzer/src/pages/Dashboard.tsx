import React from 'react';
import { useData } from '../context/DataContext';
import LeadScoring from '../components/LeadScoring';
import OptimalOutreachTiming from '../components/OptimalOutreachTiming';
import { useDataAnalysis } from '../hooks/useDataAnalysis';

// Dashboard component using a class to avoid React hooks TypeScript issues
export default function Dashboard(): JSX.Element {
  // Use the hooks outside the component function
  const { leads, isLoading, error } = useData();
  const analysis = useDataAnalysis(leads);
  
  // Basic state management
  const [activeTask, setActiveTask] = React.useState(null);
  const [tasks, setTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState('');
  const [taskFilter, setTaskFilter] = React.useState('all');
  
  // Initialize with some example tasks
  React.useEffect(() => {
    if (leads.length > 0 && tasks.length === 0) {
      const initialTasks = [
        {
          id: '1',
          text: 'Follow up with high-value lead',
          completed: false,
          dueDate: new Date().toISOString().split('T')[0],
          leadId: leads[0]?.id,
          priority: 'high'
        },
        {
          id: '2',
          text: 'Prepare presentation for client meeting',
          completed: false,
          dueDate: new Date().toISOString().split('T')[0],
          priority: 'medium'
        },
        {
          id: '3',
          text: 'Update lead scoring model',
          completed: false,
          dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          priority: 'low'
        }
      ];
      setTasks(initialTasks);
    }
  }, [leads, tasks.length]);
  
  // Handle adding a new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now().toString(),
        text: newTask,
        completed: false,
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'medium'
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };
  
  // Handle toggling task completion
  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  // Handle deleting a task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (taskFilter === 'completed') return task.completed;
    if (taskFilter === 'pending') return !task.completed;
    return true;
  });
  
  // Get tasks due today
  const todaysTasks = tasks.filter(task => 
    task.dueDate === new Date().toISOString().split('T')[0]
  );
  
  // Calculate completion percentage
  const completionPercentage = todaysTasks.length > 0
    ? Math.round((todaysTasks.filter(t => t.completed).length / todaysTasks.length) * 100)
    : 0;
  
  // Weekly progress calculation (assuming a Monday-Sunday week)
  const getWeekProgress = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    // Adjust so that 0 = Monday, 6 = Sunday
    const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return Math.min(100, Math.round((adjustedDay / 6) * 100));
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 text-red-600 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Error Loading Dashboard</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Sales Dashboard</h1>
      
      {/* THIS WEEK'S PLAN */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">THIS WEEK'S PLAN</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Weekly Goals */}
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-indigo-800">Weekly Goals</h3>
              <span className="text-xs bg-indigo-200 text-indigo-700 py-1 px-2 rounded-full">
                {getWeekProgress()}% of week complete
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Today's Tasks</span>
                  <span className="text-sm text-gray-800 font-medium">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Weekly Progress</span>
                  <span className="text-sm text-gray-800 font-medium">{getWeekProgress()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${getWeekProgress()}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Priority Leads */}
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-amber-800">Priority Leads</h3>
              <span className="text-xs bg-amber-200 text-amber-700 py-1 px-2 rounded-full">
                Top 3 Highest Value
              </span>
            </div>
            <div className="space-y-3">
              {analysis.highValueLeads.slice(0, 3).map(lead => (
                <div key={lead.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-amber-600 font-medium shadow-sm">
                      {lead.name.charAt(0)}
                    </div>
                    <span className="ml-2 text-sm text-gray-700">{lead.name}</span>
                  </div>
                  <div className={`
                    text-xs font-medium px-2 py-1 rounded-full
                    ${lead.score && lead.score >= 80 ? 'bg-green-100 text-green-800' : 
                      lead.score && lead.score >= 50 ? 'bg-amber-100 text-amber-800' : 
                        'bg-red-100 text-red-800'}
                  `}>
                    Score: {lead.score ?? 0}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Today's Contacts */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-blue-800">Today's Contacts</h3>
              <button 
                className="text-xs bg-blue-200 text-blue-700 py-1 px-2 rounded-full hover:bg-blue-300 transition-colors"
                onClick={() => setActiveTask('contact')}
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {todaysTasks.slice(0, 3).map(task => (
                <div key={task.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className={`ml-2 text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tasks Section */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Task Management</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setTaskFilter('all')}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    taskFilter === 'all' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => setTaskFilter('pending')}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    taskFilter === 'pending' 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pending
                </button>
                <button 
                  onClick={() => setTaskFilter('completed')}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    taskFilter === 'completed' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>
            
            {/* Add new task */}
            <div className="flex mb-4">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              />
              <button
                onClick={handleAddTask}
                className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
              >
                Add
              </button>
            </div>
            
            {/* Task list */}
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {filteredTasks.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No tasks found.</p>
              ) : (
                filteredTasks.map(task => (
                  <div 
                    key={task.id} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                        className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                      />
                      <div className="ml-3">
                        <span className={`block text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                          {task.text}
                        </span>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            task.priority === 'high' ? 'bg-red-100 text-red-800' :
                            task.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                          {task.leadId && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                              Lead Attached
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Delete task"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Render existing components */}
      <div className="mb-8">
        <LeadScoring />
      </div>
      
      <div>
        <OptimalOutreachTiming />
      </div>
    </div>
  );
} 