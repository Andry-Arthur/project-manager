'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { Check, HelpCircle } from 'lucide-react'

const plans = [
  {
    name: 'Gratuit',
    price: '0',
    description: 'Parfait pour découvrir MadaProject',
    features: [
      'Jusqu\'à 3 projets',
      '5 membres d\'équipe',
      'Diagramme de Gantt basique',
      '1 Go de stockage',
      'Support par email',
    ],
    cta: 'Commencer gratuitement',
    highlighted: false,
  },
  {
    name: 'Professionnel',
    price: '49 000',
    description: 'Idéal pour les petites équipes',
    features: [
      'Projets illimités',
      'Jusqu\'à 20 membres',
      'Gantt avancé avec dépendances',
      '10 Go de stockage',
      'IA de génération de projets',
      'Assistant vocal',
      'Évaluations automatiques',
      'Support prioritaire',
    ],
    cta: 'Essai gratuit 14 jours',
    highlighted: true,
  },
  {
    name: 'Entreprise',
    price: '149 000',
    description: 'Pour les organisations avancées',
    features: [
      'Tout illimité',
      'Membres illimités',
      'Toutes les fonctionnalités IA',
      'Stockage illimité',
      'API complète',
      'SSO / SAML',
      'Support dédié 24/7',
      'Formation personnalisée',
      'Intégration Mobile Money',
    ],
    cta: 'Contacter l\'équipe',
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Tarifs MadaProject
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Choisissez le plan adapté à vos besoins. Tous nos plans incluent un essai gratuit de 14 jours.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Gratuit</h3>
            <p className="text-gray-600 mb-6">Pour les petites équipes</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">0 Ar</span>
              <span className="text-gray-600">/mois</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                3 projets
              </li>
              <li className="flex items-center text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                5 utilisateurs
              </li>
              <li className="flex items-center text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                Diagramme de Gantt
              </li>
              <li className="flex items-center text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                Notifications par email
              </li>
            </ul>
            <Link
              href="/signup"
              className="block w-full text-center py-4 px-4 border-2 border-gray-300 rounded-2xl text-gray-700 font-semibold hover:border-green-500 hover:text-green-600 transition-all"
            >
              Commencer gratuitement
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-3xl shadow-2xl relative transform hover:-translate-y-2 transition-all">
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl rounded-tr-2xl">
              POPULAIRE
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Professionnel</h3>
            <p className="text-green-100 mb-6">Pour les PME en croissance</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">50 000 Ar</span>
              <span className="text-green-100">/mois</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-white">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-white" />
                </div>
                Projets illimités
              </li>
              <li className="flex items-center text-white">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-white" />
                </div>
                25 utilisateurs
              </li>
              <li className="flex items-center text-white">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-white" />
                </div>
                IA Intégrée
              </li>
              <li className="flex items-center text-white">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-white" />
                </div>
                Assistant Vocal
              </li>
              <li className="flex items-center text-white">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-white" />
                </div>
                Évaluations automatiques
              </li>
              <li className="flex items-center text-white">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-white" />
                </div>
                Support prioritaire
              </li>
            </ul>
            <Link
              href="/signup"
              className="block w-full text-center py-4 px-4 bg-white text-green-700 rounded-2xl font-semibold hover:bg-green-50 transition-all shadow-lg"
            >
              Commencer l'essai gratuit
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Entreprise</h3>
            <p className="text-gray-600 mb-6">Pour les grandes organisations</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">Sur devis</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                Tout du plan Pro
              </li>
              <li className="flex items-center text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                Utilisateurs illimités
              </li>
              <li className="flex items-center text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                API personnalisée
              </li>
              <li className="flex items-center text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                Intégration sur mesure
              </li>
              <li className="flex items-center text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                Support dédié 24/7
              </li>
              <li className="flex items-center text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                Formation sur site
              </li>
            </ul>
            <Link
              href="/contact"
              className="block w-full text-center py-4 px-4 border-2 border-gray-300 rounded-2xl text-gray-700 font-semibold hover:border-green-500 hover:text-green-600 transition-all"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Questions Fréquentes
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <HelpCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Puis-je changer de plan à tout moment?
                </h3>
                <p className="text-gray-600">
                  Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. Les changements prennent effet immédiatement.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <HelpCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Quels modes de paiement acceptez-vous?
                </h3>
                <p className="text-gray-600">
                  Nous acceptons les cartes de crédit (Visa, Mastercard), les virements bancaires, et les paiements Mobile Money (MVola, Airtel Money, Orange Money).
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <HelpCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Y a-t-il un engagement?
                </h3>
                <p className="text-gray-600">
                  Non, tous nos plans sont sans engagement. Vous pouvez annuler à tout moment sans frais.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <HelpCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Puis-je essayer avant d'acheter?
                </h3>
                <p className="text-gray-600">
                  Oui, tous nos plans incluent un essai gratuit de 14 jours. Aucune carte de crédit requise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Prêt à commencer?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Essayez MadaProject gratuitement pendant 14 jours. Aucune carte de crédit requise.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
          >
            Commencer gratuitement
          </Link>
        </div>
      </div>
    </div>
  )
}