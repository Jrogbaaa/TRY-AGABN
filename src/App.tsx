import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import Dashboard from './pages/Dashboard'
import DataInput from './pages/DataInput'
import ScriptOutput from './pages/ScriptOutput'
import './custom.css'

// Navigation item type
interface NavItem {
  name: string
  href: string
  icon: (active: boolean) => JSX.Element
}

// Layout component for all pages
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<string>('')
  const location = useLocation()
  
  // Navigation items with icons
  const navigation: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/',
      icon: (active) => (
        <svg className={`w-6 h-6 ${active ? 'text-indigo-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      )
    },
    {
      name: 'Data Input',
      href: '/data-input',
      icon: (active) => (
        <svg className={`w-6 h-6 ${active ? 'text-indigo-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
      )
    },
    {
      name: 'Outreach',
      href: '/script-output',
      icon: (active) => (
        <svg className={`w-6 h-6 ${active ? 'text-indigo-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
        </svg>
      )
    }
  ]

  useEffect(() => {
    // Set active tab based on current path
    const path = location.pathname;
    const found = navigation.find(item => 
      (item.href === '/' && path === '/') || 
      (item.href !== '/' && path.startsWith(item.href))
    );
    setActiveTab(found?.name || '');
  }, [location.pathname]);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
  }
  
  // Check if nav item is active
  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === href
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden backdrop-blur-sm transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex h-full flex-col overflow-y-auto border-r border-gray-200/50 dark:border-gray-700/30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md pt-5 shadow-lg transition-all duration-300">
          <div className="flex flex-shrink-0 items-center px-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Lead Analyzer</h1>
            </div>
          </div>
          <div className="mt-8 flex flex-grow flex-col px-4">
            <div className="mb-4">
              <div className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Main Menu
              </div>
              <nav className="mt-2 flex-1 space-y-1">
                {navigation.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        active
                          ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 shadow-sm'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`}
                      aria-label={item.name}
                      tabIndex={0}
                    >
                      {item.icon(active)}
                      <span className="ml-3">{item.name}</span>
                      {active && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>
            
            <div className="mt-auto mb-6 px-2">
              <div className="space-y-4">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4 shadow-sm">
                  <h4 className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">Need help?</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Check out our documentation for tips on maximizing your lead performance.</p>
                  <a 
                    href="#" 
                    className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200 flex items-center"
                  >
                    View documentation
                    <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
                
                <div className="flex flex-shrink-0 border-t border-gray-200 dark:border-gray-700/50 pt-4 justify-between items-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    v1.0.0
                  </div>
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    aria-label="Toggle dark mode"
                    tabIndex={0}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200/70 dark:border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-7 h-7 rounded-md flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Lead Analyzer</h1>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Close menu"
              tabIndex={0}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="mb-4">
              <div className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Main Menu
              </div>
              <nav className="mt-2 space-y-1">
                {navigation.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        active
                          ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 shadow-sm'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label={item.name}
                    >
                      {item.icon(active)}
                      <span className="ml-3">{item.name}</span>
                      {active && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>
            
            <div className="mt-6">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4 shadow-sm">
                <h4 className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">Need help?</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Check out our documentation for tips on maximizing your lead performance.</p>
                <a 
                  href="#" 
                  className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200 flex items-center"
                >
                  View documentation
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700/50 p-4 flex justify-between items-center">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              v1.0.0
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
              tabIndex={0}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile top bar */}
      <div className="lg:hidden border-b border-gray-200/70 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md flex items-center justify-between h-16 px-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-7 h-7 rounded-md flex items-center justify-center shadow-sm">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Lead Analyzer</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {activeTab}
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Open menu"
            tabIndex={0}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="lg:pl-72">
        <main className="py-8 px-4 sm:px-6 lg:px-8 animate-fadeIn">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-xl ring-1 ring-gray-200/50 dark:ring-gray-700/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/30 dark:to-purple-950/30 opacity-50"></div>
              <div className="relative p-6">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <DataProvider>
      <Router basename="/lead-analyzer">
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/data-input" element={<Layout><DataInput /></Layout>} />
          <Route path="/script-output" element={<Layout><ScriptOutput /></Layout>} />
        </Routes>
      </Router>
    </DataProvider>
  )
}

export default App
