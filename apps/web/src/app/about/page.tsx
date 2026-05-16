'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { Target, Heart, Users, Award, Globe, Zap } from 'lucide-react'

const team = [
  {
    name: 'Andry Arthur',
    role: 'Fondateur & CEO',
    bio: 'Passionné par la gestion de projets et l\'innovation technologique.',
    image: 'A',
  },
  {
    name: 'Soa Razafy',
    role: 'Directrice Technique',
    bio: 'Experte en intelligence artificielle et développement full-stack.',
    image: 'S',
  },
  {
    name: 'Koto Andria',
    role: 'Lead Designer',
    bio: 'Spécialiste en expérience utilisateur et design d\'interfaces.',
    image: 'K',
  },
  {
    name: 'Vololona Raso',
    role: 'Chef de Produit',
    bio: 'Focalisée sur les besoins des PME malgaches et l\'adoption utilisateur.',
    image: 'V',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              À propos de MadaProject
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Notre mission est de révolutionner la gestion de projet à Madagascar grâce à l'IA et à l'innovation locale.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Notre Mission
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              MadaProject est né d'une vision simple mais ambitieuse : rendre la gestion de projet accessible, efficace et intelligente pour toutes les entreprises malgaches, des petites startups aux grandes organisations.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Nous croyons que la technologie, et particulièrement l'intelligence artificielle, peut transformer la façon dont les équipes travaillent ensemble. Notre plateforme combine des outils de gestion de projet éprouvés avec des fonctionnalités IA avancées pour vous aider à atteindre vos objectifs plus rapidement.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Adaptée spécifiquement au contexte malgache, MadaProject prend en compte les réalités locales : paiements Mobile Money, support multilingue (Français, Malgache, Anglais), et une interface intuitive qui fonctionne parfaitement même avec des connexions internet limitées.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
              Notre Objectif
            </h3>
            <p className="text-gray-700 text-center leading-relaxed">
              Devenir la plateforme de gestion de projet de référence à Madagascar et dans l'océan Indien, en offrant des solutions innovantes qui répondent aux besoins réels des entreprises locales.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident notre action au quotidien
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Passion
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nous sommes passionnés par la technologie et son potentiel pour transformer les entreprises. Chaque fonctionnalité est conçue avec soin pour offrir la meilleure expérience possible.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Collaboration
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nous croyons que la collaboration est la clé du succès. Notre plateforme facilite le travail d'équipe et la communication transparente entre tous les membres d'un projet.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Excellence
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nous nous engageons à offrir une qualité exceptionnelle. De l'interface utilisateur au support client, chaque aspect de MadaProject est conçu pour dépasser les attentes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600">Entreprises actives</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">22</div>
            <div className="text-gray-600">Régions couvertes</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">10 000+</div>
            <div className="text-gray-600">Projets créés</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
            <div className="text-gray-600">Satisfaction client</div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Notre Équipe
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Les talents derrière MadaProject
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">{member.image}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-green-600 text-sm font-semibold mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8">
            Notre Histoire
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <p>
              En 2023, face au constat que de nombreuses PME malgaches utilisaient encore
              des méthodes traditionnelles de gestion de projets (tableaux blancs, Excel,
              cahiers), nous avons décidé de créer une solution moderne et adaptée.
            </p>
            <p>
              MadaProject a été développé en tenant compte des spécificités locales :
              support multilingue (Français, Malgache), gestion en Ariary, intégration
              avec les solutions de Mobile Money locales, et une interface optimisée
              pour les connexions internet à débit limité.
            </p>
            <p>
              Aujourd'hui, nous accompagnons des centaines d'entreprises malgaches dans
              leur transformation numérique, en leur offrant des outils puissants et
              accessibles pour gérer leurs projets avec efficacité.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Rejoignez notre communauté
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Découvrez comment MadaProject peut transformer votre façon de gérer les projets.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="inline-block bg-white text-green-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-green-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
            >
              Commencer gratuitement
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 transition-all"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}