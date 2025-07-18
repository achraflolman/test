
import React from 'react';
import { Book, CalendarDays, Settings, X, BrainCircuit, Camera, FileText } from 'lucide-react';
import type { AppUser } from '../../types';

interface SidebarProps {
  user: AppUser | null;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  sidebarRef: React.RefObject<HTMLDivElement>;
  t: (key: string) => string;
  getThemeClasses: (variant: string) => string;
  setCurrentView: (view: string) => void;
  currentView: string;
  currentSubject: string | null;
  setIsProfilePicModalOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, isSidebarOpen, setIsSidebarOpen, sidebarRef, t, getThemeClasses, setCurrentView, currentView, currentSubject, setIsProfilePicModalOpen }) => {
  const navItems = [
    { id: 'home', label: t('my_subjects'), icon: <Book className="w-5 h-5 mr-3" />, view: 'home' },
    { id: 'calendar', label: t('calendar'), icon: <CalendarDays className="w-5 h-5 mr-3" />, view: 'calendar' },
    { id: 'notes', label: t('notes'), icon: <FileText className="w-5 h-5 mr-3" />, view: 'notes'},
    { id: 'tools', label: t('extra_tools'), icon: <BrainCircuit className="w-5 h-5 mr-3" />, view: 'tools' },
    { id: 'settings', label: t('settings'), icon: <Settings className="w-5 h-5 mr-3" />, view: 'settings' },
  ];

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
  };

  const isHomeActive = currentView === 'home';

  return (
    <>
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out p-4 flex flex-col overflow-y-auto sidebar-scroll ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <style>{`
            .sidebar-scroll::-webkit-scrollbar { display: none; }
            .sidebar-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className={`absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors duration-200`}
        >
          <X className="w-6 h-6" />
        </button>

        {user && (
          <div className="flex flex-col items-center mb-6 mt-8 text-center">
            <button onClick={() => setIsProfilePicModalOpen(true)} className="relative group">
              <img src={user.profilePictureUrl} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover transition-all duration-300 group-hover:brightness-75" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full transition-all duration-300">
                <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className={`absolute bottom-0 right-0 p-1.5 rounded-full border-2 border-white ${getThemeClasses('bg')} text-white shadow-md`}>
                <Camera size={16} />
              </div>
            </button>
            <p className={`mt-4 text-xl font-bold ${getThemeClasses('text-strong')}`}>{user.userName}</p>
            <p className="text-sm text-gray-600">{user.className} {user.educationLevel?.toUpperCase()}</p>
            <p className="text-xs text-gray-500 break-all w-full px-2">{user.email}</p>
          </div>
        )}

        <nav className="flex-1 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.view)}
              className={`w-full text-left py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center text-gray-700
                ${(item.id === 'home' ? isHomeActive : currentView === item.view) ? `${getThemeClasses('bg')} text-white shadow-md` : `hover:${getThemeClasses('bg-light')}`}`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto py-4 text-center text-xs text-gray-400">
           <p>Schoolmaps &copy; 2025</p>
        </div>
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}></div>
      )}
    </>
  );
};

export default Sidebar;
