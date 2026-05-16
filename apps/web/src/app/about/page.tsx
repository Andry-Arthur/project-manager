'use client'

import Link from 'next/link'

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
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              À propos de MadaProject
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Une solution de gestion de projets conçue à Madagascar, pour les PME malgaches.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Notre Mission
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              MadaProject est né d'un constat simple : les PME malgaches ont besoin d'outils
              de gestion de projets modernes, adaptés à leur contexte local et abordables.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Nous avons créé une plateforme qui combine la puissance de l'intelligence
              artificielle avec une compréhension profonde des réalités du marché malgache.
            </p>
            <p className="text-lg text-gray-600">
              Notre objectif est de permettre à chaque entreprise malgache de gérer ses
              projets plus efficacement, d'augmenter sa productivité et de réussir sa
              transformation numérique.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Entreprises utilisatrices</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
                <div className="text-gray-600">Projets gérés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600">Satisfaction client</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
                <div className="text-gray-600">Support disponible</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nos Valeurs
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation Locale</h3>
              <p className="text-gray-600">
                Nous développons des solutions qui répondent aux besoins spécifiques
                des entreprises malgaches, en tenant compte des réalités locales.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibilité</h3>
              <p className="text-gray-600">
                Nous croyons que chaque entreprise, quelle que soit sa taille,
                mérite accès à des outils de gestion de qualité professionnelle.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                Nous nous engageons à fournir des produits de haute qualité,
                avec un support réactif et une amélioration continue.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Notre Équipe
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{member.image}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 text-sm mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="mt-24">
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Notre Histoire
            </h2>
            <div className="max-w-3xl mx-auto space-y-6 text-gray-700">
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
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Rejoignez l'aventure MadaProject
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez comment MadaProject peut transformer la gestion de vos projets.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              Commencer gratuitement
            </Link>
            <Link
              href="/demo"
              className="bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-blue-500 transition-colors"
            >
              Voir la démo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}