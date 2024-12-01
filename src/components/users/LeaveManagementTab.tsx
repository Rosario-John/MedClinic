import React, { useState } from 'react';
import { Plus, Calendar, Pencil, Trash2, X } from 'lucide-react';
import { Leave } from '../../types/user';

interface LeaveFormProps {
  leave: Leave;
  onSubmit: (leave: Leave) => void;
  onClose: () => void;
  isDark: boolean;
  isEditing: boolean;
}

interface LeaveManagementTabProps {
  leaves: Leave[];
  onChange: (leaves: Leave[]) => void;
  isDark: boolean;
}

const leaveTypes = [
  { value: 'annual', label: 'Annual Leave' },
  { value: 'sick', label: 'Sick Leave' },
  { value: 'personal', label: 'Personal Leave' },
  { value: 'other', label: 'Other' },
];

const LeaveForm = ({ leave: initialLeave, onSubmit, onClose, isDark, isEditing }: LeaveFormProps) => {
  const [formData, setFormData] = useState<Leave>(initialLeave);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl w-full max-w-md`}>
        <div className={`flex justify-between items-center p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isEditing ? 'Edit Leave' : 'Add Leave'}
          </h3>
          <button
            onClick={onClose}
            className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Leave Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-200'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select leave type</option>
              {leaveTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-200'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-200'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-200'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-200'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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

const LeaveManagementTab = ({ leaves, onChange, isDark }: LeaveManagementTabProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLeave, setCurrentLeave] = useState<Leave | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddClick = () => {
    setCurrentLeave({
      id: '',
      startDate: '',
      endDate: '',
      type: 'annual',
      status: 'pending',
      description: ''
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (leave: Leave) => {
    setCurrentLeave(leave);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    onChange(leaves.filter(l => l.id !== id));
  };

  const handleSubmit = (leave: Leave) => {
    if (isEditing) {
      onChange(leaves.map(l => l.id === leave.id ? leave : l));
    } else {
      onChange([...leaves, { ...leave, id: Date.now().toString() }]);
    }
  };

  const getStatusColor = (status: Leave['status']) => {
    switch (status) {
      case 'approved':
        return isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800';
      case 'rejected':
        return isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800';
      default:
        return isDark ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800';
    }
  };

  const getLeaveTypeLabel = (type: Leave['type']) => {
    return leaveTypes.find(t => t.value === type)?.label || type;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calendar className={`w-5 h-5 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <h3 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
            Leave Management
          </h3>
        </div>
        <button
          type="button"
          onClick={handleAddClick}
          className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Leave
        </button>
      </div>

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
        <table className="w-full">
          <thead>
            <tr className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
              <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                Type
              </th>
              <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                Start Date
              </th>
              <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                End Date
              </th>
              <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                Status
              </th>
              <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                Description
              </th>
              <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {leaves.map((leave) => (
              <tr key={leave.id} className={isDark ? 'bg-gray-800' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    {getLeaveTypeLabel(leave.type)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                    {new Date(leave.startDate).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                    {new Date(leave.endDate).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(leave.status)}`}>
                    {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                    {leave.description}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleEditClick(leave)}
                      className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-500'}`}
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(leave.id)}
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

      {isModalOpen && currentLeave && (
        <LeaveForm
          leave={currentLeave}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentLeave(null);
          }}
          isDark={isDark}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default LeaveManagementTab;