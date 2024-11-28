import React from 'react';
import { Pencil, Trash2, Calendar, Target } from 'lucide-react';
import type { NetworkObjective } from '../../types/masterRecords';

interface ObjectiveListProps {
  objectives: NetworkObjective[];
  onEdit: (objective: NetworkObjective) => void;
  onDelete: (id: string) => void;
}

const ObjectiveList: React.FC<ObjectiveListProps> = ({ objectives, onEdit, onDelete }) => {
  const getPriorityColor = (priority: NetworkObjective['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
    }
  };

  const getStatusColor = (status: NetworkObjective['status']) => {
    switch (status) {
      case 'active':
        return 'text-blue-600 bg-blue-50';
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString('es-ES');

  return (
    <div className="space-y-4">
      {objectives.map((objective) => (
        <div key={objective.id} className="bg-white border rounded-lg shadow-sm hover:shadow transition-shadow">
          <div className="grid grid-cols-12 gap-4 p-4">
            <div className="col-span-3">
              <div className="font-medium text-gray-900">{objective.name}</div>
              <div className="text-sm text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">
                {objective.code}
              </div>
            </div>
            
            <div className="col-span-3">
              <div className="flex items-center text-sm space-x-2">
                <span className={`px-2 py-0.5 rounded ${getPriorityColor(objective.priority)}`}>
                  {objective.priority === 'high' ? 'Alta' : objective.priority === 'medium' ? 'Media' : 'Baja'}
                </span>
                <span className={`px-2 py-0.5 rounded ${getStatusColor(objective.status)}`}>
                  {objective.status === 'active' ? 'Activo' : objective.status === 'completed' ? 'Completado' : 'Cancelado'}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{formatDate(objective.startDate)} - {formatDate(objective.endDate)}</span>
              </div>
            </div>
            
            <div className="col-span-4">
              <div className="text-sm text-gray-600">{objective.description}</div>
            </div>

            <div className="col-span-2 flex items-center justify-end space-x-2">
              <button
                onClick={() => onEdit(objective)}
                className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(objective.id)}
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

export default ObjectiveList;