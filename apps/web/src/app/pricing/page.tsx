'use client'

import Link from 'next/link'

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
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Des tarifs adaptés à vos besoins
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Choisissez le plan qui correspond à votre équipe.
              Tous les plans incluent une garantie satisfait ou remboursé de 30 jours.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-blue-600 to-green-500 text-white shadow-2xl scale-105'
                  : 'bg-white border border-gray-200 shadow-md'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 -mt-4 mr-4 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold">
                  Populaire
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={plan.highlighted ? 'text-blue-100' : 'text-gray-600'}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price === '0' ? 'Gratuit' : `${plan.price} Ar`}
                </span>
                {plan.price !== '0' && (
                  <span className={plan.highlighted ? 'text-blue-100' : 'text-gray-600'}>
                    /mois
                  </span>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg
                      className={`w-5 h-5 mr-3 flex-shrink-0 ${
                        plan.highlighted ? 'text-green-300' : 'text-green-500'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={plan.highlighted ? 'text-white' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.highlighted ? '/signup' : '/contact'}
                className={`block w-full py-3 px-6 text-center rounded-lg font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-gradient-to-r from-blue-600 to-green-500 text-white hover:opacity-90'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Questions fréquentes
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Puis-je changer de plan à tout moment?
              </h3>
              <p className="text-gray-600">
                Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment.
                La différence de prix sera ajustée au prorata.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Comment fonctionne l'essai gratuit?
              </h3>
              <p className="text-gray-600">
                L'essai gratuit de 14 jours vous donne accès à toutes les fonctionnalités
                du plan Professionnel. Aucune carte de crédit n'est requise.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Acceptez-vous les paiements en Ariary?
              </h3>
              <p className="text-gray-600">
                Oui, tous nos prix sont affichés en Ariary Malgasy (MGA).
                Nous acceptons également les paiements par MVola, Airtel Money et Orange Money.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Y a-t-il un engagement?
              </h3>
              <p className="text-gray-600">
                Non, vous pouvez annuler votre abonnement à tout moment.
                Votre compte restera accessible jusqu'à la fin de la période payée.
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="mt-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Besoin d'une solution sur mesure?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contactez notre équipe pour discuter de vos besoins spécifiques
            et obtenir une offre personnalisée.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            Contacter l'équipe commerciale
          </Link>
        </div>
      </div>
    </div>
  )
}