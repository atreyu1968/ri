import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import type { Action } from '../../types/action';
import { useAuthStore } from '../../stores/authStore';
import BasicInfo from './form/BasicInfo';
import Participants from './form/Participants';
import Attachments from './form/Attachments';
import Departments from './form/Departments';
import Families from './form/Families';

interface ActionFormProps {
  onSubmit: (data: Omit<Action, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
  initialData?: Action;
}

const steps = [
  { id: 'basic', title: 'Información Básica' },
  { id: 'participants', title: 'Participantes' },
  { id: 'attachments', title: 'Adjuntos' },
  { id: 'departments', title: 'Departamentos' },
  { id: 'families', title: 'Familias y Grupos' },
];

const ActionForm: React.FC<ActionFormProps> = ({ onSubmit, onClose, initialData }) => {
  const { user } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Action>>({
    name: initialData?.name || '',
    location: initialData?.location || '',
    description: initialData?.description || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    departments: initialData?.departments || [],
    professionalFamilies: initialData?.professionalFamilies || [],
    selectedGroups: initialData?.selectedGroups || [],
    studentParticipants: initialData?.studentParticipants || 0,
    teacherParticipants: initialData?.teacherParticipants || 0,
    rating: initialData?.rating || 5,
    comments: initialData?.comments || '',
    createdBy: initialData?.createdBy || user?.id || '',
    network: initialData?.network || user?.network || '',
    center: initialData?.center || user?.center || '',
    quarter: initialData?.quarter || '',
    imageUrl: initialData?.imageUrl,
    documentUrl: initialData?.documentUrl,
    documentName: initialData?.documentName,
  });

  const updateFormData = (data: Partial<Action>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setError(null);
  };

  const validateStep = () => {
    switch (steps[currentStep].id) {
      case 'departments':
        if (!formData.departments?.length) {
          setError('Debe seleccionar al menos un departamento');
          return false;
        }
        break;
      case 'families':
        if (!formData.professionalFamilies?.length) {
          setError('Debe seleccionar al menos una familia profesional');
          return false;
        }
        if (!formData.selectedGroups?.length) {
          setError('Debe seleccionar al menos un grupo');
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setError(null);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === steps.length - 1) {
      if (validateStep()) {
        onSubmit(formData as Required<Omit<Action, 'id' | 'createdAt' | 'updatedAt'>>);
      }
    } else {
      handleNext();
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'basic':
        return <BasicInfo data={formData} onChange={updateFormData} />;
      case 'participants':
        return <Participants data={formData} onChange={updateFormData} />;
      case 'attachments':
        return <Attachments data={formData} onChange={updateFormData} />;
      case 'departments':
        return <Departments data={formData} onChange={updateFormData} />;
      case 'families':
        return <Families data={formData} onChange={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            {initialData ? 'Editar' : 'Nueva'} Acción
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="border-b">
          <div className="flex">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex-1 ${index < steps.length - 1 ? 'relative' : ''}`}
              >
                <div
                  className={`
                    py-3 px-4 text-center text-sm font-medium
                    ${currentStep === index
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : currentStep > index
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }
                  `}
                >
                  {step.title}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`
                      absolute inset-y-0 right-0 -ml-px w-3
                      ${currentStep > index ? 'bg-green-600' : 'bg-gray-300'}
                    `}
                    style={{
                      clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {renderStepContent()}
            
            {error && (
              <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center px-6 py-4 bg-gray-50 rounded-b-lg">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              <span>
                {currentStep === steps.length - 1 ? 'Guardar' : 'Siguiente'}
              </span>
              {currentStep < steps.length - 1 && (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActionForm;