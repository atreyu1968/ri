import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar,
  ClipboardList,
  FileSpreadsheet,
  Eye,
  Settings,
  PlaySquare
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const Sidebar = () => {
  const { user } = useAuthStore();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Cursos Académicos', path: '/academic-years' },
    { icon: ClipboardList, label: 'Registros Maestros', path: '/master-records' },
    { icon: Users, label: 'Usuarios', path: '/users' },
    { icon: PlaySquare, label: 'Acciones', path: '/actions' },
    { icon: FileSpreadsheet, label: 'Informes', path: '/reports' },
    { icon: Eye, label: 'Observatorio', path: '/observatory' },
  ];

  if (user?.role === 'admin') {
    menuItems.push({ icon: Settings, label: 'Administración', path: '/admin' });
  }

  return (
    <aside className="bg-gray-800 text-white w-64 flex-shrink-0">
      <div className="p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold">Red de Innovación FP</h2>
        </div>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;