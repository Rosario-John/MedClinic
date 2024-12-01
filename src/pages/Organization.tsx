import React, { useState } from 'react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import OrganizationForm from '../components/organization/OrganizationForm';
import { Organization } from '../types/organization';

const facilities = [
  { id: '1', code: 'MCC001', name: 'MedClinic Central' },
  { id: '2', code: 'MCN001', name: 'MedClinic North' },
];

const initialOrganizations: Organization[] = [
  {
    id: '1',
    code: 'ORG001',
    name: 'Healthcare Group A',
    facilityIds: ['1', '2'],
    status: 'active',
  },
  {
    id: '2',
    code: 'ORG002',
    name: 'Medical Centers Inc',
    facilityIds: ['1'],
    status: 'active',
  },
];

const emptyOrganization: Organization = {
  id: '',
  code: '',
  name: '',
  facilityIds: [],
  status: 'active',
};

const OrganizationPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrganization, setCurrentOrganization] = useState<Organization>(emptyOrganization);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = (organization?: Organization) => {
    if (organization) {
      setCurrentOrganization(organization);
      setIsEditing(true);
    } else {
      setCurrentOrganization(emptyOrganization);
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentOrganization(emptyOrganization);
    setIsEditing(false);
  };

  const handleSubmit = (updatedOrganization: Organization) => {
    if (isEditing) {
      setOrganizations(prev => prev.map(org => 
        org.id === updatedOrganization.id ? updatedOrganization : org
      ));
    } else {
      const newOrganization = {
        ...updatedOrganization,
        id: Date.now().toString(),
      };
      setOrganizations(prev => [...prev, newOrganization]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setOrganizations(prev => prev.filter(org => org.id !== id));
  };

  const getFacilityNames = (facilityIds: string[]) => {
    return facilityIds
      .map(id => facilities.find(f => f.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className={`flex-1 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Organizations
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
              Manage your organizations
            </p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Organization
          </button>
        </div>

        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow flex-1 flex flex-col overflow-hidden`}>
          <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'} w-5 h-5`} />
              <input
                type="text"
                placeholder="Search organizations..."
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
                    Organization Code
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Organization Name
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Facilities
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
                {filteredOrganizations.map((organization) => (
                  <tr key={organization.id} className={isDark ? 'bg-gray-800' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {organization.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                        {organization.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {getFacilityNames(organization.facilityIds)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        organization.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {organization.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleOpenModal(organization)}
                          className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-500'}`}
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(organization.id)}
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
          <OrganizationForm
            organization={currentOrganization}
            isEditing={isEditing}
            onClose={handleCloseModal}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  );
};

export default OrganizationPage;