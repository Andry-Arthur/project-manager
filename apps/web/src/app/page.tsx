'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { BarChart3, Brain, CheckCircle2, MessageSquare, FileText, Bell, LayoutDashboard, Globe, Smartphone, Shield, Database, Zap } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: <LayoutDashboard className="w-6 h-6" />,
      title: 'Diagramme de Gantt',
      description: 'Visualisez vos projets avec un diagramme de Gantt interactif et glisser-déposer pour une planification optimale.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'IA Intégrée',
      description: 'Génération automatique de projets, assistant vocal bilingue (Français/Malgache) et suggestions intelligentes.',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: 'Évaluations',
      description: 'Système de notation des tâches et évaluations de projet avec recommandations d\'amélioration.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Assistant Vocal',
      description: 'Contrôlez vos projets par la voix en Français ou en Malgache.',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Prise de Notes',
      description: 'Éditeur Markdown riche avec historique des versions.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Notifications',
      description: 'Rappels automatiques, alertes de retard et suggestions de l\'IA.',
      color: 'bg-red-100 text-red-600',
    },
  ]

  const madagascarFeatures = [
    { icon: <Globe className="w-5 h-5" />, text: 'Support multilingue (FR, MG, EN)' },
    { icon: <Smartphone className="w-5 h-5" />, text: 'Intégration Mobile Money' },
    { icon: <Shield className="w-5 h-5" />, text: 'Optimisé pour connexions lentes' },
    { icon: <Database className="w-5 h-5" />, text: 'Gestion en Ariary Malgasy' },
  ]

  const techFeatures = [
    { icon: <Database className="w-5 h-5" />, text: 'Base de données Supabase PostgreSQL' },
    { icon: <Shield className="w-5 h-5" />, text: 'Authentification sécurisée' },
    { icon: <Zap className="w-5 h-5" />, text: 'API REST complète' },
    { icon: <BarChart3 className="w-5 h-5" />, text: 'Tableaux de bord avancés' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Nouveau: Assistant IA bilingue
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Gestion de Projets{' '}
              <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                Intelligente
              </span>
              <br />
              pour les PME Malgaches
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              MadaProject est une solution complète de gestion de projets conçue spécifiquement pour les PME à Madagascar.
              Intégrez l'intelligence artificielle pour automatiser les tâches, générer des projets et assister vos équipes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/signup"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                Commencer gratuitement
              </Link>
              <Link
                href="/demo"
                className="bg-white text-gray-900 px-8 py-4 rounded-2xl text-lg font-semibold border-2 border-gray-200 hover:border-green-500 transition-all shadow-md hover:shadow-lg"
              >
                Voir la démo
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fonctionnalités Principales
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une suite complète d'outils pour gérer vos projets efficacement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Madagascar Adaptation */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Adapté à Madagascar
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Conçu spécifiquement pour les besoins des PME malgaches, avec une compréhension profonde des réalités locales.
              </p>
              <ul className="space-y-4">
                {madagascarFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4 text-green-600">
                      {feature.icon}
                    </div>
                    <span className="font-medium">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Puissant et Moderne</h3>
              <ul className="space-y-4">
                {techFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4 text-red-600">
                      {feature.icon}
                    </div>
                    <span className="font-medium">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à transformer votre gestion de projets?
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Rejoignez des centaines de PME malgaches qui utilisent déjà MadaProject pour gérer leurs projets plus efficacement.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-green-700 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-green-50 transition-all shadow-2xl transform hover:-translate-y-1"
          >
            Commencer maintenant - C'est gratuit!
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="ml-3 text-2xl font-bold">MadaProject</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Solution de gestion de projets intelligente pour les PME malgaches.
                Propulsée par l'IA, adaptée à Madagascar.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Produit</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/features" className="hover:text-white transition-colors">Fonctionnalités</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Tarifs</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">À propos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li>contact@madaproject.mg</li>
                <li>+261 34 00 000 00</li>
                <li>Antananarivo, Madagascar</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MadaProject. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}