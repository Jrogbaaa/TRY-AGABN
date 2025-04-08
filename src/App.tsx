import { useState } from 'react'
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
  const location = useLocation()
  
  // Navigation items with icons
  const navigation: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/',
      icon: (active) => (
        <svg className={`w-6 h-6 ${active ? 'text-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      )
    },
    {
      name: 'Data Input',
      href: '/data-input',
      icon: (active) => (
        <svg className={`w-6 h-6 ${active ? 'text-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
      )
    },
    {
      name: 'Outreach',
      href: '/script-output',
      icon: (active) => (
        <svg className={`w-6 h-6 ${active ? 'text-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
        </svg>
      )
    }
  ]

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pt-5">
          <div className="flex flex-shrink-0 items-center px-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Lead Analyzer</h1>
          </div>
          <div className="mt-5 flex flex-grow flex-col">
            <nav className="flex-1 space-y-1 px-2">
              {navigation.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      active
                        ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    aria-label={item.name}
                  >
                    {item.icon(active)}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4 justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
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

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white dark:bg-gray-800 shadow-lg transform transition">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Lead Analyzer</h1>
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
          <nav className="mt-5 px-2 space-y-1">
            {navigation.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    active
                      ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label={item.name}
                >
                  {item.icon(active)}
                  <span className="ml-3">{item.name}</span>
                </Link>
              )
            })}
          </nav>
          <div className="absolute bottom-0 w-full border-t border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
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
      <div className="lg:hidden border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between h-16 px-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Lead Analyzer</h1>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Open menu"
          tabIndex={0}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Main content area */}
      <div className="lg:pl-64">
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
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
