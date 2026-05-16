'use client'

import Link from 'next/link'
import { FolderKanban, CheckSquare, Clock, TrendingUp, Plus, ArrowRight } from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'

const recentProjects = [
  { id: 1, name: 'Site Web E-commerce', status: 'En cours', progress: 65, tasks: 12, completed: 8 },
  { id: 2, name: 'Application Mobile', status: 'En retard', progress: 40, tasks: 20, completed: 8 },
  { id: 3, name: 'Campagne Marketing', status: 'Terminé', progress: 100, tasks: 15, completed: 15 },
  { id: 4, name: 'Refonte UI/UX', status: 'En cours', progress: 25, tasks: 8, completed: 2 },
]

const stats = [
  { name: 'Projets actifs', value: '12', icon: FolderKanban, color: 'bg-green-100 text-green-600', change: '+2 ce mois' },
  { name: 'Tâches en cours', value: '47', icon: CheckSquare, color: 'bg-red-100 text-red-600', change: '+15 cette semaine' },
  { name: 'Heures travaillées', value: '156h', icon: Clock, color: 'bg-green-100 text-green-600', change: '+12h cette semaine' },
  { name: 'Productivité', value: '+23%', icon: TrendingUp, color: 'bg-red-100 text-red-600', change: '+5% vs dernier mois' },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Bienvenue, Andry!</h1>
          <p className="text-green-100 mb-6">Voici un aperçu de vos projets et activités.</p>
          <Link
            href="/dashboard/projects/new"
            className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Créer un nouveau projet
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm mb-2">{stat.name}</div>
              <div className="text-green-600 text-sm font-medium">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Projets Récents</h2>
            <Link
              href="/dashboard/projects"
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors"
            >
              Voir tous
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FolderKanban className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{project.status}</span>
                    <span>•</span>
                    <span>{project.completed}/{project.tasks} tâches</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="text-right mb-1">
                    <span className="font-semibold text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        project.progress === 100 ? 'bg-green-500' : project.progress < 50 ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/dashboard/projects/new"
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Nouveau Projet</h3>
            <p className="text-gray-600 text-sm">Créez un nouveau projet avec l'IA</p>
          </Link>

          <Link
            href="/dashboard/tasks"
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CheckSquare className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Voir les Tâches</h3>
            <p className="text-gray-600 text-sm">Gérez vos tâches et priorités</p>
          </Link>

          <Link
            href="/dashboard/notes"
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Prendre des Notes</h3>
            <p className="text-gray-600 text-sm">Documentez vos idées et réunions</p>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
