'use client'

import Link from 'next/link'
import { FolderKanban, Plus, Search, Filter, MoreVertical, Calendar, Users } from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'

const projects = [
  { id: 1, name: 'Site Web E-commerce', description: 'Développement plateforme vente en ligne', status: 'En cours', progress: 65, tasks: 12, completed: 8, team: 5, deadline: '2024-03-15' },
  { id: 2, name: 'Application Mobile', description: 'App iOS et Android pour clients', status: 'En retard', progress: 40, tasks: 20, completed: 8, team: 8, deadline: '2024-02-28' },
  { id: 3, name: 'Campagne Marketing', description: 'Lancement nouveau produit', status: 'Terminé', progress: 100, tasks: 15, completed: 15, team: 4, deadline: '2024-01-31' },
  { id: 4, name: 'Refonte UI/UX', description: 'Amélioration interface utilisateur', status: 'En cours', progress: 25, tasks: 8, completed: 2, team: 3, deadline: '2024-04-30' },
  { id: 5, name: 'Intégration API', description: 'Connexion services tiers', status: 'Planifié', progress: 0, tasks: 6, completed: 0, team: 2, deadline: '2024-05-15' },
  { id: 6, name: 'Formation Équipe', description: 'Onboarding nouveaux membres', status: 'En cours', progress: 80, tasks: 10, completed: 8, team: 6, deadline: '2024-02-15' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Terminé': return 'bg-green-100 text-green-700'
    case 'En cours': return 'bg-green-100 text-green-700'
    case 'En retard': return 'bg-red-100 text-red-700'
    case 'Planifié': return 'bg-gray-100 text-gray-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const getProgressColor = (progress: number) => {
  if (progress === 100) return 'bg-green-500'
  if (progress < 50) return 'bg-red-500'
  return 'bg-green-500'
}

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projets</h1>
            <p className="text-gray-600 mt-1">Gérez tous vos projets en un seul endroit</p>
          </div>
          <Link
            href="/dashboard/projects/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Nouveau Projet
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Filtrer</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FolderKanban className="w-6 h-6 text-white" />
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progression</span>
                    <span className="font-semibold text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${getProgressColor(project.progress)}`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <CheckSquare className="w-4 h-4" />
                    <span>{project.completed}/{project.tasks} tâches</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{project.team}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.deadline).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
