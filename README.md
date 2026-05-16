# MadaProject - AI-Powered Project Management for Malagasy SMBs

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com)

**MadaProject** est une solution complète de gestion de projets conçue spécifiquement pour les PME à Madagascar. Elle intègre l'intelligence artificielle pour automatiser les tâches répétitives, générer des projets, assister les utilisateurs par commande vocale, et fournir des évaluations intelligentes.

## 🗄️ Supabase Configuration

This project uses **Supabase** for database, authentication, and storage. Follow these steps to configure:

1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Get your credentials** from Project Settings → API
3. **Configure environment variables** in `.env`:

```env
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_KEY="your-service-role-key"
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"
```

For detailed setup instructions, see [docs/SUPABASE_SETUP.md](./docs/SUPABASE_SETUP.md)

## 🚀 Fonctionnalités Principales

### 📊 Gestion de Projets
- **Diagramme de Gantt** interactif avec glisser-déposer
- **Suivi des tâches** avec statuts, priorités et dépendances
- **Phases et jalons** pour une meilleure organisation
- **Tableau de bord** avec indicateurs de performance

### 🤖 Intelligence Artificielle
- **Génération automatique de projets** à partir d'une description textuelle
- **Assistant vocal** bilingue (Français/Malgache)
- **Aide contextuelle** par point-and-click
- **Suggestions intelligentes** pour l'optimisation des plannings
- **Évaluations automatisées** des performances

### 📝 Prise de Notes
- Éditeur Markdown riche
- Notes liées aux projets
- Historique des versions
- Recherche full-text

### 🎯 Système de Notation
- **Notation des tâches** selon plusieurs critères
- **Évaluations de projet** (mi-parcours, finale)
- **Tableaux de bord** de performance
- **Recommandations** d'amélioration

### 🔔 Notifications Intelligentes
- Rappels de tâches
- Alertes de retard
- Suggestions de l'IA
- Notifications par email, SMS et push

### 🌍 Localisation Malgasy
- Support multilingue (Français, Malgache, Anglais)
- Devise: Ariary Malgasy (MGA)
- Intégration Mobile Money (MVola, Airtel Money, Orange Money)
- Adapté aux contraintes locales (faible débit internet)

## 🛠️ Stack Technique

### Frontend
- **Next.js 14** - Framework React avec SSR
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **React Query** - Gestion des données
- **Zustand** - State management
- **DnD Kit** - Drag and drop pour Gantt

### Backend
- **Hono** - Framework web léger et rapide
- **TypeScript** - Typage statique
- **Prisma** - ORM moderne
- **Supabase PostgreSQL** - Base de données cloud
- **JWT** - Authentification

### AI/ML
- **OpenAI GPT-4** - Traitement du langage naturel
- **Web Speech API** - Reconnaissance vocale
- **Custom ML models** - Prédiction de projets

### Infrastructure
- **Supabase** - Database, Auth, Storage
- **Vercel** - Frontend hosting (recommended)
- **Railway/Render** - Backend hosting (recommended)

## 📦 Installation

### Prérequis
- Node.js 18+
- npm ou pnpm
- Git
- Supabase account

### Installation locale

```bash
# Cloner le repository
git clone https://github.com/your-org/madaproject.git
cd madaproject

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos variables Supabase

# Initialiser la base de données
npm run db:migrate
npm run db:seed

# Lancer le développement
npm run dev
```

### Variables d'environnement

```env
# Supabase Configuration
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_KEY="your-service-role-key"
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"

# API
PORT=3001
JWT_SECRET="your-secret-key-change-in-production"

# OpenAI (pour les fonctionnalités AI)
OPENAI_API_KEY="your-openai-api-key"

# Frontend
NEXT_PUBLIC_API_URL="http://localhost:3001/api/v1"
```

## 🏗️ Architecture du Projet

```
madaproject/
├── apps/
│   ├── web/           # Application Next.js (frontend)
│   ├── api/           # API Hono (backend)
│   ├── worker/        # Worker pour tâches background
│   └── mobile/        # Application React Native (futur)
├── packages/
│   ├── db/            # Schéma Prisma et migrations
│   ├── shared/        # Code partagé (types, utils, supabase client)
│   └── sdk/           # SDK pour intégrations tierces
└── docs/              # Documentation
    └── SUPABASE_SETUP.md  # Detailed Supabase setup guide
```

## 📚 Documentation

- [Supabase Setup Guide](./docs/SUPABASE_SETUP.md) - **Start here!**
- [Architecture](./docs/ARCHITECTURE.md)
- [API Reference](./docs/API.md)
- [Contexte](./docs/CONTEXT.md)
- [Roadmap](./docs/ROADMAP.md)

## 🔧 Commandes Disponibles

```bash
# Développement
npm run dev              # Lancer toutes les apps en dev
npm run dev:web         # Frontend uniquement
npm run dev:api         # Backend uniquement

# Build
npm run build           # Build toutes les apps
npm run build:web       # Build frontend
npm run build:api       # Build backend

# Base de données
npm run db:migrate      # Appliquer les migrations
npm run db:seed         # Seeder la base
npm run db:studio       # Ouvrir Prisma Studio

# Qualité de code
npm run lint            # Vérifier le code
npm run format          # Formater le code
npm run test            # Exécuter les tests
```

## 👥 Équipe & Contribution

### Utilisateurs de test (après seed)
- **Admin**: admin@madaproject.mg / password123
- **Manager**: john.doe@democompany.mg / password123
- **User**: soa.razafy@democompany.mg / password123

### Contribuer
1. Forker le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables
3. Deploy

### Backend (Railway/Render)
1. Connect your GitHub repository
2. Set environment variables (especially Supabase credentials)
3. Deploy

### Database (Supabase)
- Already configured via environment variables
- Automatic backups and scaling handled by Supabase

See [docs/SUPABASE_SETUP.md](./docs/SUPABASE_SETUP.md) for detailed deployment instructions.

## 📄 Licence

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- À la communauté open source
- Aux PME malgaches qui ont inspiré ce projet
- À Supabase pour leur excellente infrastructure
- À tous les contributeurs

## 📞 Contact

- **Site web**: [madaproject.mg](https://madaproject.mg)
- **Email**: contact@madaproject.mg
- **Téléphone**: +261 34 00 000 00

---

**MadaProject** - *Mitanjona ny projetinao, manampy anao amin'ny fahombiazana* 🚀