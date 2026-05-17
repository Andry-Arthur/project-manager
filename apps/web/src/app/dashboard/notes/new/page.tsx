'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'
import { useAuth } from '@/contexts/AuthContext'
import axios from 'axios'
import dynamic from 'next/dynamic'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)

export default function NewNotePage() {
  const router = useRouter()
  const { token } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    projectId: '',
    isPublic: false,
  })

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await axios.post(`${API_URL}/notes`, {
        ...formData,
        projectId: formData.projectId || undefined,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data.success) {
        router.push('/dashboard/notes')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create note')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/notes"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux notes
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Créer une nouvelle note</h1>
          <p className="text-gray-600 mt-2">Rédigez votre note avec le support Markdown</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Titre *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Ex: Réunion équipe projet"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                Contenu *
              </label>
              <div data-color-mode="light">
                <MDEditor
                  value={formData.content}
                  onChange={(val) => setFormData({ ...formData, content: val || '' })}
                  height={400}
                  preview="live"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <input
                id="isPublic"
                name="isPublic"
                type="checkbox"
                checked={formData.isPublic}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label htmlFor="isPublic" className="text-sm text-gray-700">
                Rendre cette note publique
              </label>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <Link
                href="/dashboard/notes"
                className="px-6 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition-all"
              >
                Annuler
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                <Save className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
