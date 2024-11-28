import React from 'react';
import { Calendar } from 'lucide-react';
import { useAcademicYearStore } from '../../../stores/academicYearStore';
import type { Action } from '../../../types/action';

interface BasicInfoProps {
  data: Partial<Action>;
  onChange: (data: Partial<Action>) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ data, onChange }) => {
  const { activeYear } = useAcademicYearStore();
  const activeQuarters = activeYear?.quarters.filter(q => q.isActive) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de la Acción
          </label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => onChange({ name: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lugar
          </label>
          <input
            type="text"
            value={data.location || ''}
            onChange={(e) => onChange({ location: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Inicio
          </label>
          <input
            type="date"
            value={data.startDate || ''}
            onChange={(e) => onChange({ startDate: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Fin
          </label>
          <input
            type="date"
            value={data.endDate || ''}
            onChange={(e) => onChange({ endDate: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trimestre
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <select
              value={data.quarter || ''}
              onChange={(e) => onChange({ quarter: e.target.value })}
              className="pl-10 w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Seleccionar trimestre</option>
              {activeQuarters.map(quarter => (
                <option key={quarter.id} value={quarter.id}>
                  {quarter.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;