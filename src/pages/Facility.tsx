import React, { useState } from 'react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Facility as FacilityType } from '../types/facility';
import FacilityForm from '../components/facility/FacilityForm';

const initialFacilities: FacilityType[] = [
  {
    id: '1',
    code: 'MCC001',
    name: 'MedClinic Central',
    email: 'central@medclinic.com',
    phone: '+1 (555) 123-4567',
    address: '123 Healthcare Ave, Medical District, MD 12345',
    status: 'active',
    workingHours: [
      { day: 'monday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
      { day: 'tuesday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
      { day: 'wednesday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
      { day: 'thursday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
      { day: 'friday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
      { day: 'saturday', isOpen: false, openTime: '09:00', closeTime: '13:00' },
      { day: 'sunday', isOpen: false, openTime: '09:00', closeTime: '13:00' },
    ],
    holidays: [
      {
        id: '1',
        name: 'Christmas Day',
        date: '2024-12-25',
        description: 'Closed for Christmas Day'
      },
      {
        id: '2',
        name: 'New Year\'s Day',
        date: '2024-01-01',
        description: 'Closed for New Year\'s Day'
      }
    ],
  },
  {
    id: '2',
    code: 'MCN001',
    name: 'MedClinic North',
    email: 'north@medclinic.com',
    phone: '+1 (555) 234-5678',
    address: '456 Medical Plaza, North District, MD 23456',
    status: 'active',
    workingHours: [
      { day: 'monday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
      { day: 'tuesday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
      { day: 'wednesday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
      { day: 'thursday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
      { day: 'friday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
      { day: 'saturday', isOpen: false, openTime: '09:00', closeTime: '13:00' },
      { day: 'sunday', isOpen: false, openTime: '09:00', closeTime: '13:00' },
    ],
    holidays: [],
  },
];

const emptyFacility: FacilityType = {
  id: '',
  code: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  status: 'active',
  workingHours: [
    { day: 'monday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
    { day: 'tuesday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
    { day: 'wednesday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
    { day: 'thursday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
    { day: 'friday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
    { day: 'saturday', isOpen: false, openTime: '09:00', closeTime: '13:00' },
    { day: 'sunday', isOpen: false, openTime: '09:00', closeTime: '13:00' },
  ],
  holidays: [],
};

const FacilityPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [facilities, setFacilities] = useState<FacilityType[]>(initialFacilities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFacility, setCurrentFacility] = useState<FacilityType>(emptyFacility);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = (facility?: FacilityType) => {
    if (facility) {
      setCurrentFacility(facility);
      setIsEditing(true);
    } else {
      setCurrentFacility(emptyFacility);
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentFacility(emptyFacility);
    setIsEditing(false);
  };

  const handleSubmit = (updatedFacility: FacilityType) => {
    if (isEditing) {
      setFacilities(prev => prev.map(f => 
        f.id === updatedFacility.id ? updatedFacility : f
      ));
    } else {
      const newFacility = {
        ...updatedFacility,
        id: Date.now().toString(),
      };
      setFacilities(prev => [...prev, newFacility]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setFacilities(prev => prev.filter(f => f.id !== id));
  };

  const filteredFacilities = facilities.filter(facility =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className={`flex-1 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Facilities
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
              Manage your medical facilities
            </p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Facility
          </button>
        </div>

        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow flex-1 flex flex-col overflow-hidden`}>
          <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'} w-5 h-5`} />
              <input
                type="text"
                placeholder="Search facilities..."
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
                    Facility Code
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Facility Name
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Email
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Phone
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Address
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Status
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {filteredFacilities.map((facility) => (
                  <tr key={facility.id} className={isDark ? 'bg-gray-800' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {facility.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                        {facility.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {facility.email}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {facility.phone}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {facility.address}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        facility.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {facility.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleOpenModal(facility)}
                          className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-500'}`}
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(facility.id)}
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
          <FacilityForm
            facility={currentFacility}
            isEditing={isEditing}
            onClose={handleCloseModal}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  );
};

export default FacilityPage;