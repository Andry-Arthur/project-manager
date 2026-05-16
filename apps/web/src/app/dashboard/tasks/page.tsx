'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckSquare, Plus, Search, Filter, Calendar, Flag, MoreVertical, Circle } from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'

const tasks = [
  { id: 1, title: 'Finaliser maquette homepage', project: 'Site Web E-commerce', priority: 'Haute', status: 'En cours', dueDate: '2024-02-15', assignee: 'AA' },
  { id: 2, title: 'Intégrer API de paiement', project: 'Site Web E-commerce', priority: 'Haute', status: 'À faire', dueDate: '2024-02-20', assignee: 'SR' },
  { id: 3, title: 'Tests utilisateurs mobile', project: 'Application Mobile', priority: 'Moyenne', status: 'En cours', dueDate: '2024-02-18', assignee: 'KA' },
  { id: 4, title: 'Documentation technique', project: 'Application Mobile', priority: 'Basse', status: 'À faire', dueDate: '2024-03-01', assignee: 'VR' },
  { id: 5, title: 'Optimiser performances', project: 'Refonte UI/UX', priority: 'Moyenne', status: 'Terminé', dueDate: '2024-02-10', assignee: 'AA' },
  { id: 6, title: 'Créer guide utilisateur', project: 'Formation Équipe', priority: 'Basse', status: 'En cours', dueDate: '2024-02-25', assignee: 'SR' },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Haute': return 'bg-red-100 text-red-700'
    case 'Moyenne': return 'bg-green-100 text-green-700'
    case 'Basse': return 'bg-gray-100 text-gray-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Terminé': return 'bg-green-100 text-green-700'
    case 'En cours': return 'bg-green-100 text-green-700'
    case 'À faire': return 'bg-gray-100 text-gray-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

export default function TasksPage() {
  const [selectedTasks, setSelectedTasks] = useState<number[]>([])

  const toggleTask = (taskId: number) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tâches</h1>
            <p className="text-gray-600 mt-1">Gérez et suivez toutes vos tâches</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl">
            <Plus className="w-5 h-5" />
            Nouvelle Tâche
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une tâche..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Filtrer</span>
          </button>
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tâche</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Projet</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Priorité</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Statut</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Échéance</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Assigné à</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedTasks.includes(task.id)}
                        onChange={() => toggleTask(task.id)}
                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedTasks.includes(task.id) 
                              ? 'bg-green-500 border-green-500' 
                              : 'border-gray-300 hover:border-green-500'
                          }`}
                        >
                          {selectedTasks.includes(task.id) && (
                            <div className="w-3 h-3 bg-white rounded-full" />
                          )}
                        </button>
                        <span className="font-medium text-gray-900">{task.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{task.project}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">{task.assignee}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24</div>
                <div className="text-gray-600 text-sm">Tâches totales</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Flag className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">8</div>
                <div className="text-gray-600 text-sm">Haute priorité</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Circle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-gray-600 text-sm">Terminées</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
