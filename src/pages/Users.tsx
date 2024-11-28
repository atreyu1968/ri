import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useUsersStore } from '../stores/usersStore';
import UserList from '../components/users/UserList';
import RegistrationCodeList from '../components/users/RegistrationCodeList';
import UserForm from '../components/users/UserForm';
import RegistrationCodeForm from '../components/users/RegistrationCodeForm';
import { mockUsers } from '../data/mockUsers';
import { mockRegistrationCodes } from '../data/mockRegistrationCodes';
import type { User } from '../types/user';
import type { RegistrationCode } from '../types/registrationCode';

type TabType = 'users' | 'codes';

const Users = () => {
  const {
    users,
    registrationCodes,
    setUsers,
    setRegistrationCodes,
    addUser,
    updateUser,
    deleteUser,
    addRegistrationCode,
    updateRegistrationCode,
    deleteRegistrationCode,
  } = useUsersStore();

  const [activeTab, setActiveTab] = useState<TabType>('users');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<User | RegistrationCode | null>(null);

  useEffect(() => {
    setUsers(mockUsers);
    setRegistrationCodes(mockRegistrationCodes);
  }, [setUsers, setRegistrationCodes]);

  const handleEdit = (item: User | RegistrationCode) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar este elemento?')) {
      if (activeTab === 'users') {
        deleteUser(id);
      } else {
        deleteRegistrationCode(id);
      }
    }
  };

  const handleSubmit = (data: any) => {
    if (editingItem) {
      if (activeTab === 'users') {
        updateUser(editingItem.id, data);
      } else {
        updateRegistrationCode(editingItem.id, data);
      }
    } else {
      if (activeTab === 'users') {
        addUser({ ...data, id: Date.now().toString() });
      } else {
        addRegistrationCode({ ...data, id: Date.now().toString() });
      }
    }
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Gestión de Usuarios</h1>
        <button
          onClick={() => {
            setEditingItem(null);
            setShowForm(true);
          }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>
            {activeTab === 'users' ? 'Nuevo Usuario' : 'Nuevo Código'}
          </span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('users')}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              Usuarios
            </button>
            <button
              onClick={() => setActiveTab('codes')}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'codes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              Códigos de Registro
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'users' ? (
            <UserList
              users={users}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <RegistrationCodeList
              codes={registrationCodes}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {showForm && (
        activeTab === 'users' ? (
          <UserForm
            onSubmit={handleSubmit}
            onClose={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
            initialData={editingItem as User}
          />
        ) : (
          <RegistrationCodeForm
            onSubmit={handleSubmit}
            onClose={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
            initialData={editingItem as RegistrationCode}
          />
        )
      )}
    </div>
  );
};

export default Users;