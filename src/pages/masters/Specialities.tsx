import React, { useState } from 'react';
import { Plus, Search, Pencil, Trash2, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Speciality } from '../../types/masters';

interface SpecialityFormProps {
  speciality: Speciality;
  onSubmit: (speciality: Speciality) => void;
  onClose: () => void;
  isEditing: boolean;
  isDark: boolean;
}

const emptySpeciality: Speciality = {
  id: '',
  code: '',
  name: '',
};

const SpecialityForm = ({ speciality, onSubmit, onClose, isEditing, isDark }: SpecialityFormProps) => {
  const [formData, setFormData] = useState(speciality);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const inputClasses = `w-full px-3 py-2 rounded-lg border ${
    isDark
      ? 'bg-gray-700 border-gray-600 text-gray-200'
      : 'bg-white border-gray-300 text-gray-900'
  } focus:outline-none focus:ring-2 focus:ring-blue-500`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl w-full max-w-md`}>
        <div className={`flex justify-between items-center p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isEditing ? 'Edit Speciality' : 'Add Speciality'}
          </h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Code
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SpecialitiesPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [specialities, setSpecialities] = useState<Speciality[]>([
    { id: '1', code: 'CARD', name: 'Cardiology' },
    { id: '2', code: 'DERM', name: 'Dermatology' },
    { id: '3', code: 'NEUR', name: 'Neurology' },
    { id: '4', code: 'ORTH', name: 'Orthopedics' },
    { id: '5', code: 'PEDI', name: 'Pediatrics' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSpeciality, setCurrentSpeciality] = useState<Speciality>(emptySpeciality);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenModal = (speciality?: Speciality) => {
    if (speciality) {
      setCurrentSpeciality(speciality);
      setIsEditing(true);
    } else {
      setCurrentSpeciality(emptySpeciality);
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSpeciality(emptySpeciality);
    setIsEditing(false);
  };

  const handleSubmit = (speciality: Speciality) => {
    if (isEditing) {
      setSpecialities(prev => prev.map(s => s.id === speciality.id ? speciality : s));
    } else {
      setSpecialities(prev => [...prev, { ...speciality, id: Date.now().toString() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setSpecialities(prev => prev.filter(s => s.id !== id));
  };

  const filteredSpecialities = specialities.filter(speciality =>
    speciality.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    speciality.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className={`flex-1 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Specialities
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
              Manage medical specialities
            </p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Speciality
          </button>
        </div>

        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow flex-1 flex flex-col overflow-hidden`}>
          <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'} w-5 h-5`} />
              <input
                type="text"
                placeholder="Search specialities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                } border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full">
              <thead>
                <tr className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Code
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Name
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {filteredSpecialities.map((speciality) => (
                  <tr key={speciality.id} className={isDark ? 'bg-gray-800' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {speciality.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                        {speciality.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleOpenModal(speciality)}
                          className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-500'}`}
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(speciality.id)}
                          className="text-red-400 hover:text-red-500"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <SpecialityForm
            speciality={currentSpeciality}
            onSubmit={handleSubmit}
            onClose={handleCloseModal}
            isEditing={isEditing}
            isDark={isDark}
          />
        )}
      </div>
    </main>
  );
};

export default SpecialitiesPage;