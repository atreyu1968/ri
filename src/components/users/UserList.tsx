import React from 'react';
import { Pencil, Trash2, Mail, Phone, Building2 } from 'lucide-react';
import type { User } from '../../types/user';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  const getRoleName = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'general_coordinator':
        return 'Coordinador General';
      case 'subnet_coordinator':
        return 'Coordinador de Subred';
      case 'manager':
        return 'Gestor';
      default:
        return role;
    }
  };

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="bg-white border rounded-lg shadow-sm hover:shadow transition-shadow">
          <div className="grid grid-cols-12 gap-4 p-4">
            <div className="col-span-1">
              <img
                src={user.imageUrl || `https://ui-avatars.com/api/?name=${user.name}+${user.lastName}`}
                alt={`${user.name} ${user.lastName}`}
                className="w-12 h-12 rounded-full"
              />
            </div>

            <div className="col-span-3">
              <div className="font-medium text-gray-900">
                {user.name} {user.lastName}
              </div>
              <div className="text-sm text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">
                {user.medusaCode}
              </div>
            </div>
            
            <div className="col-span-3">
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Mail className="w-4 h-4 mr-1" />
                <span>{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-1" />
                  <span>{user.phone}</span>
                </div>
              )}
            </div>
            
            <div className="col-span-3">
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Building2 className="w-4 h-4 mr-1" />
                <span>{user.center}</span>
              </div>
              <div className="text-sm font-medium text-gray-700">
                {getRoleName(user.role)}
              </div>
            </div>

            <div className="col-span-2 flex items-center justify-end space-x-2">
              <button
                onClick={() => onEdit(user)}
                className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;