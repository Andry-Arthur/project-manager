'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { LayoutDashboard, Brain, Mic, CheckSquare, Star, FileText, Bell, BarChart3, Globe, Smartphone, CreditCard, Shield, Zap } from 'lucide-react'

const features = [
  {
    name: 'Diagramme de Gantt',
    description: 'Visualisez vos projets avec un diagramme de Gantt interactif. Glissez-déposez les tâches pour ajuster les dates et les dépendances.',
    icon: <LayoutDashboard className="w-6 h-6" />,
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'IA Intégrée',
    description: "Génération automatique de projets à partir d'une description textuelle. L'IA analyse vos besoins et crée la structure optimale.",
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-red-100 text-red-600',
  },
  {
    name: 'Assistant Vocal',
    description: "Contrôlez vos projets par la voix en Français ou en Malgache. Créez des tâches, définissez des rappels, obtenez des mises à jour.",
    icon: <Mic className="w-6 h-6" />,
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Suivi des Tâches',
    description: 'Gérez les tâches avec statuts, priorités, assignations et dépendances. Suivez le temps passé et respectez les délais.',
    icon: <CheckSquare className="w-6 h-6" />,
    color: 'bg-red-100 text-red-600',
  },
  {
    name: 'Évaluations',
    description: 'Système de notation des tâches et évaluations de projet avec recommandations automatiques pour améliorer les performances.',
    icon: <Star className="w-6 h-6" />,
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Prise de Notes',
    description: 'Éditeur Markdown riche avec historique des versions. Liez vos notes aux projets et tâches pour une documentation complète.',
    icon: <FileText className="w-6 h-6" />,
    color: 'bg-red-100 text-red-600',
  },
  {
    name: 'Notifications Intelligentes',
    description: 'Rappels automatiques, alertes de retard, suggestions de l\'IA. Notifications par email, SMS et push.',
    icon: <Bell className="w-6 h-6" />,
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Tableaux de Bord',
    description: 'Vue d\'ensemble de tous vos projets avec indicateurs de performance, santé des projets et analyses prédictives.',
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'bg-red-100 text-red-600',
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Fonctionnalités de MadaProject
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Une suite complète d'outils pour gérer vos projets efficacement,
              propulsée par l'intelligence artificielle.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* AI Features Section */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Intelligence Artificielle
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre IA vous assiste à chaque étape de vos projets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Génération de Projets
              </h3>
              <p className="text-gray-700 mb-4">
                Décrivez votre projet en langage naturel et notre IA génère automatiquement
                la structure complète : phases, tâches, jalons et dépendances.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <div className="w-8 h-8 bg-green-200 rounded-lg flex items-center justify-center mr-3 text-green-700">
                    <Zap className="w-4 h-4" />
                  </div>
                  Analyse des besoins
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-8 h-8 bg-green-200 rounded-lg flex items-center justify-center mr-3 text-green-700">
                    <Zap className="w-4 h-4" />
                  </div>
                  Estimation automatique
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-8 h-8 bg-green-200 rounded-lg flex items-center justify-center mr-3 text-green-700">
                    <Zap className="w-4 h-4" />
                  </div>
                  Suggestions d'optimisation
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Assistant Vocal
              </h3>
              <p className="text-gray-700 mb-4">
                Interagissez avec vos projets par la voix en Français ou en Malgache.
                Créez des tâches, demandez des rapports, définissez des rappels.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <div className="w-8 h-8 bg-red-200 rounded-lg flex items-center justify-center mr-3 text-red-700">
                    <Mic className="w-4 h-4" />
                  </div>
                  Reconnaissance vocale
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-8 h-8 bg-red-200 rounded-lg flex items-center justify-center mr-3 text-red-700">
                    <Mic className="w-4 h-4" />
                  </div>
                  Bilingue FR/MG
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-8 h-8 bg-red-200 rounded-lg flex items-center justify-center mr-3 text-red-700">
                    <Mic className="w-4 h-4" />
                  </div>
                  Commandes naturelles
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-3xl border border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Évaluations Automatiques
              </h3>
              <p className="text-gray-700 mb-4">
                Notre IA analyse les performances de vos projets et fournit
                des évaluations objectives avec recommandations.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <div className="w-8 h-8 bg-green-200 rounded-lg flex items-center justify-center mr-3 text-green-700">
                    <Star className="w-4 h-4" />
                  </div>
                  Notation automatique
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-8 h-8 bg-green-200 rounded-lg flex items-center justify-center mr-3 text-green-700">
                    <Star className="w-4 h-4" />
                  </div>
                  Analyses prédictives
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-8 h-8 bg-green-200 rounded-lg flex items-center justify-center mr-3 text-green-700">
                    <Star className="w-4 h-4" />
                  </div>
                  Recommandations
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Madagascar Features */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Adapté à Madagascar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conçu spécifiquement pour les besoins des PME malgaches
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Localisation</h3>
              <ul className="space-y-5">
                <li className="flex items-start">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4 mt-1 text-green-600">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Multilingue</h4>
                    <p className="text-gray-600">Interface en Français, Malgache et Anglais</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4 mt-1 text-red-600">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Ariary Malgasy</h4>
                    <p className="text-gray-600">Gestion des budgets en MGA</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Paiements Locaux</h3>
              <ul className="space-y-5">
                <li className="flex items-start">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4 mt-1 text-green-600">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">MVola</h4>
                    <p className="text-gray-600">Paiement par Mobile Money Telma</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4 mt-1 text-red-600">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Airtel Money & Orange Money</h4>
                    <p className="text-gray-600">Solutions de paiement mobiles</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Prêt à découvrir toutes les fonctionnalités?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Essayez MadaProject gratuitement pendant 14 jours. Aucune carte de crédit requise.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
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
    </div>
  )
}