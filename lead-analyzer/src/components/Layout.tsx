import React, { useState, ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true' || 
           (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const location = useLocation();

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    // Apply dark mode class to html element
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Set initial dark mode class on mount
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/data-input', label: 'Data Input', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' },
    { path: '/heygen-integration', label: 'Heygen Integration', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
  ];

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200 z-10">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Lead Analyzer</h1>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      `flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg transition-colors ${
                        isActive ? 'bg-blue-100 dark:bg-blue-900 dark:bg-opacity-50 text-blue-700 dark:text-blue-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`
                    }
                    aria-label={item.label}
                    tabIndex={0}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                    </svg>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Dark Mode Toggle */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
              tabIndex={0}
            >
              {darkMode ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                  Light Mode
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                  Dark Mode
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="ml-64 p-6">
        <main className="pb-12">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 