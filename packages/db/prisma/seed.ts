import { PrismaClient, Role, Language, ProjectStatus, Priority, TaskStatus, Grade } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10)

  // Create super admin
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@madaproject.mg' },
    update: {},
    create: {
      email: 'admin@madaproject.mg',
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: Role.SUPER_ADMIN,
      language: Language.FRENCH,
      phone: '+261 34 00 000 001',
      emailVerified: true,
    },
  })
  console.log('✅ Created super admin:', superAdmin.email)

  // Create demo company
  const company = await prisma.company.upsert({
    where: { slug: 'demo-company' },
    update: {},
    create: {
      name: 'Demo Company Madagascar',
      slug: 'demo-company',
      industry: 'Technology',
      size: 'SMALL',
      address: 'Lot IV C 45 Bis Ambodivona',
      city: 'Antananarivo',
      region: 'Analamanga',
      country: 'Madagascar',
      phone: '+261 34 00 000 002',
      email: 'contact@democompany.mg',
      website: 'https://democompany.mg',
      currency: 'MGA',
      ownerId: superAdmin.id,
    },
  })
  console.log('✅ Created demo company:', company.name)

  // Create company member
  await prisma.companyMember.upsert({
    where: {
      companyId_userId: {
        companyId: company.id,
        userId: superAdmin.id,
      },
    },
    update: {},
    create: {
      companyId: company.id,
      userId: superAdmin.id,
      role: 'OWNER',
      position: 'Administrator',
    },
  })

  // Create demo users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john.doe@democompany.mg' },
      update: {},
      create: {
        email: 'john.doe@democompany.mg',
        password: hashedPassword,
        firstName: 'John',
        lastName: 'Doe',
        role: Role.MANAGER,
        language: Language.FRENCH,
        phone: '+261 34 00 000 003',
        emailVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'soa.razafy@democompany.mg' },
      update: {},
      create: {
        email: 'soa.razafy@democompany.mg',
        password: hashedPassword,
        firstName: 'Soa',
        lastName: 'Razafy',
        role: Role.USER,
        language: Language.MALAGASY,
        phone: '+261 34 00 000 004',
        emailVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'koto.rakoto@democompany.mg' },
      update: {},
      create: {
        email: 'koto.rakoto@democompany.mg',
        password: hashedPassword,
        firstName: 'Koto',
        lastName: 'Rakoto',
        role: Role.USER,
        language: Language.MALAGASY,
        phone: '+261 34 00 000 005',
        emailVerified: true,
      },
    }),
  ])
  console.log('✅ Created demo users')

  // Add users to company
  for (const user of users) {
    await prisma.companyMember.upsert({
      where: {
        companyId_userId: {
          companyId: company.id,
          userId: user.id,
        },
      },
      update: {},
      create: {
        companyId: company.id,
        userId: user.id,
        role: 'MEMBER',
        department: user.role === Role.MANAGER ? 'Management' : 'Development',
        position: user.role === Role.MANAGER ? 'Project Manager' : 'Developer',
      },
    })
  }

  // Create demo project with AI generation flag
  const project = await prisma.project.create({
    data: {
      name: 'Site E-commerce MadaMarket',
      description: 'Développement d\'une plateforme e-commerce pour le marché malgache avec support multilingue (Français, Malgache, Anglais) et paiement mobile money.',
      code: 'PROJ-2024-001',
      companyId: company.id,
      status: ProjectStatus.ACTIVE,
      priority: Priority.HIGH,
      type: 'AGILE',
      budget: 15000000, // 15M MGA
      currency: 'MGA',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-04-30'),
      completionPercent: 35,
      healthScore: 78,
      riskLevel: 'MEDIUM',
      color: '#3B82F6',
      icon: 'shopping-cart',
      tags: JSON.stringify(['e-commerce', 'web', 'mobile-money']),
      aiGenerated: true,
      aiPrompt: 'Créer un projet e-commerce avec intégration mobile money pour Madagascar',
    },
  })
  console.log('✅ Created demo project:', project.name)

  // Create project phases
  const phases = await Promise.all([
    prisma.projectPhase.create({
      data: {
        projectId: project.id,
        name: 'Conception & Analyse',
        description: 'Analyse des besoins et conception de l\'architecture',
        order: 1,
        color: '#8B5CF6',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-02-15'),
        completionPercent: 100,
      },
    }),
    prisma.projectPhase.create({
      data: {
        projectId: project.id,
        name: 'Développement Frontend',
        description: 'Développement de l\'interface utilisateur',
        order: 2,
        color: '#3B82F6',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-15'),
        completionPercent: 60,
      },
    }),
    prisma.projectPhase.create({
      data: {
        projectId: project.id,
        name: 'Développement Backend',
        description: 'Développement API et base de données',
        order: 3,
        color: '#10B981',
        startDate: new Date('2024-02-15'),
        endDate: new Date('2024-03-30'),
        completionPercent: 40,
      },
    }),
    prisma.projectPhase.create({
      data: {
        projectId: project.id,
        name: 'Tests & Déploiement',
        description: 'Tests, validation et mise en production',
        order: 4,
        color: '#F59E0B',
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-04-30'),
        completionPercent: 0,
      },
    }),
  ])
  console.log('✅ Created project phases')

  // Create milestones
  const milestones = await Promise.all([
    prisma.milestone.create({
      data: {
        projectId: project.id,
        name: 'Validation Maquettes',
        description: 'Validation des maquettes UI/UX par le client',
        dueDate: new Date('2024-02-10'),
        status: 'COMPLETED',
        completionPercent: 100,
        color: '#10B981',
      },
    }),
    prisma.milestone.create({
      data: {
        projectId: project.id,
        name: 'Intégration Paiement Mobile Money',
        description: 'Intégration MVola, Airtel Money, Orange Money',
        dueDate: new Date('2024-03-01'),
        status: 'IN_PROGRESS',
        completionPercent: 50,
        color: '#F59E0B',
      },
    }),
    prisma.milestone.create({
      data: {
        projectId: project.id,
        name: 'Lancement Beta',
        description: 'Lancement de la version beta pour tests utilisateurs',
        dueDate: new Date('2024-04-15'),
        status: 'PENDING',
        completionPercent: 0,
        color: '#3B82F6',
      },
    }),
    prisma.milestone.create({
      data: {
        projectId: project.id,
        name: 'Livraison Finale',
        description: 'Livraison de la version finale au client',
        dueDate: new Date('2024-04-30'),
        status: 'PENDING',
        completionPercent: 0,
        color: '#8B5CF6',
      },
    }),
  ])
  console.log('✅ Created milestones')

  // Create tasks
  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        projectId: project.id,
        phaseId: phases[0].id,
        title: 'Analyse des besoins fonctionnels',
        description: 'Recueillir et analyser les besoins fonctionnels du client pour la plateforme e-commerce',
        status: TaskStatus.COMPLETED,
        priority: Priority.HIGH,
        type: 'MEETING',
        estimateHours: 16,
        actualHours: 14,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-20'),
        completedDate: new Date('2024-01-19'),
        completionPercent: 100,
        score: 92,
        grade: Grade.A,
        creatorId: users[0].id,
        order: 1,
      },
    }),
    prisma.task.create({
      data: {
        projectId: project.id,
        phaseId: phases[0].id,
        title: 'Conception architecture technique',
        description: 'Concevoir l\'architecture technique de la plateforme (frontend, backend, base de données)',
        status: TaskStatus.COMPLETED,
        priority: Priority.HIGH,
        type: 'FEATURE',
        estimateHours: 24,
        actualHours: 28,
        startDate: new Date('2024-01-20'),
        endDate: new Date('2024-02-05'),
        completedDate: new Date('2024-02-04'),
        completionPercent: 100,
        score: 85,
        grade: Grade.B,
        creatorId: users[0].id,
        order: 2,
      },
    }),
    prisma.task.create({
      data: {
        projectId: project.id,
        phaseId: phases[1].id,
        title: 'Développement interface catalogue produits',
        description: 'Créer l\'interface de consultation et filtrage des produits',
        status: TaskStatus.IN_PROGRESS,
        priority: Priority.HIGH,
        type: 'FEATURE',
        estimateHours: 40,
        actualHours: 25,
        startDate: new Date('2024-02-05'),
        endDate: new Date('2024-02-28'),
        completionPercent: 65,
        score: 78,
        grade: Grade.B_MINUS,
        creatorId: users[1].id,
        order: 3,
      },
    }),
    prisma.task.create({
      data: {
        projectId: project.id,
        phaseId: phases[1].id,
        title: 'Intégration panier et checkout',
        description: 'Développement du panier d\'achat et du processus de commande',
        status: TaskStatus.IN_PROGRESS,
        priority: Priority.CRITICAL,
        type: 'FEATURE',
        estimateHours: 32,
        actualHours: 18,
        startDate: new Date('2024-02-15'),
        endDate: new Date('2024-03-10'),
        completionPercent: 55,
        creatorId: users[1].id,
        order: 4,
      },
    }),
    prisma.task.create({
      data: {
        projectId: project.id,
        phaseId: phases[2].id,
        title: 'API gestion produits et catégories',
        description: 'Développement des endpoints API pour la gestion des produits et catégories',
        status: TaskStatus.IN_PROGRESS,
        priority: Priority.HIGH,
        type: 'FEATURE',
        estimateHours: 20,
        actualHours: 12,
        startDate: new Date('2024-02-20'),
        endDate: new Date('2024-03-05'),
        completionPercent: 60,
        score: 88,
        grade: Grade.A_MINUS,
        creatorId: users[2].id,
        order: 5,
      },
    }),
    prisma.task.create({
      data: {
        projectId: project.id,
        phaseId: phases[2].id,
        title: 'Intégration API Mobile Money',
        description: 'Intégration des APIs de paiement mobile money (MVola, Airtel Money, Orange Money)',
        status: TaskStatus.IN_PROGRESS,
        priority: Priority.CRITICAL,
        type: 'FEATURE',
        estimateHours: 36,
        actualHours: 20,
        startDate: new Date('2024-02-25'),
        endDate: new Date('2024-03-15'),
        completionPercent: 50,
        creatorId: users[2].id,
        order: 6,
      },
    }),
    prisma.task.create({
      data: {
        projectId: project.id,
        phaseId: phases[3].id,
        title: 'Tests utilisateurs beta',
        description: 'Organisation de sessions de tests avec des utilisateurs finaux',
        status: TaskStatus.TODO,
        priority: Priority.MEDIUM,
        type: 'TESTING',
        estimateHours: 16,
        startDate: new Date('2024-03-20'),
        endDate: new Date('2024-04-05'),
        completionPercent: 0,
        creatorId: users[0].id,
        order: 7,
      },
    }),
    prisma.task.create({
      data: {
        projectId: project.id,
        phaseId: phases[3].id,
        title: 'Déploiement production',
        description: 'Déploiement de la plateforme en environnement de production',
        status: TaskStatus.TODO,
        priority: Priority.HIGH,
        type: 'TASK',
        estimateHours: 8,
        startDate: new Date('2024-04-25'),
        endDate: new Date('2024-04-28'),
        completionPercent: 0,
        creatorId: users[0].id,
        order: 8,
      },
    }),
  ])
  console.log('✅ Created tasks')

  // Create task assignments
  await prisma.task.update({
    where: { id: tasks[2].id },
    data: { assignees: { connect: [{ id: users[1].id }] } },
  })
  await prisma.task.update({
    where: { id: tasks[3].id },
    data: { assignees: { connect: [{ id: users[1].id }, { id: users[2].id }] } },
  })
  await prisma.task.update({
    where: { id: tasks[4].id },
    data: { assignees: { connect: [{ id: users[2].id }] } },
  })
  await prisma.task.update({
    where: { id: tasks[5].id },
    data: { assignees: { connect: [{ id: users[2].id }] } },
  })

  // Create demo notes
  await prisma.note.create({
    data: {
      projectId: project.id,
      userId: users[0].id,
      title: 'Compte-rendu réunion de lancement',
      content: `# Réunion de lancement - Projet MadaMarket

## Date: 15 Janvier 2024
## Participants: Client, Chef de projet, Équipe de développement

## Points discutés:
1. **Objectifs du projet**
   - Créer une plateforme e-commerce moderne
   - Support multilingue (FR, MG, EN)
   - Intégration des paiements mobile money

2. **Contraintes techniques**
   - Hébergement local à Madagascar
   - Conformité aux réglementations locales
   - Support des connexions internet lentes

3. **Livrables attendus**
   - Site web responsive
   - Application mobile (phase 2)
   - Tableau de bord administrateur
   - Système de gestion des commandes

## Prochaines étapes:
- [ ] Finaliser les maquettes UI/UX
- [ ] Valider l'architecture technique
- [ ] Commencer le développement frontend`,
      type: 'MEETING',
      isPublic: true,
      tags: JSON.stringify(['réunion', 'lancement', 'compte-rendu']),
      color: '#FEF3C7',
    },
  })
  console.log('✅ Created demo notes')

  // Create evaluation
  await prisma.evaluation.create({
    data: {
      projectId: project.id,
      userId: users[0].id,
      type: 'MID_PROJECT',
      title: 'Évaluation à mi-parcours - MadaMarket',
      description: 'Évaluation des performances et de l\'avancement du projet à mi-parcours',
      criteria: JSON.stringify({
        quality: { weight: 0.3, maxScore: 100 },
        timeline: { weight: 0.25, maxScore: 100 },
        budget: { weight: 0.2, maxScore: 100 },
        communication: { weight: 0.15, maxScore: 100 },
        riskManagement: { weight: 0.1, maxScore: 100 },
      }),
      scores: JSON.stringify({
        quality: { score: 85, comments: 'Bonne qualité générale du code' },
        timeline: { score: 75, comments: 'Quelques retards mineurs' },
        budget: { score: 90, comments: 'Respect du budget' },
        communication: { score: 88, comments: 'Excellente communication avec le client' },
        riskManagement: { score: 70, comments: 'Quelques risques non anticipés' },
      }),
      overallScore: 81.6,
      grade: Grade.A_MINUS,
      status: 'COMPLETED',
      isMidProject: true,
      feedback: 'Projet bien géré dans l\'ensemble. Quelques points d\'attention sur la gestion des risques et le respect des délais.',
      recommendations: JSON.stringify([
        'Renforcer la veille technologique sur les APIs de paiement',
        'Mettre en place des revues de code plus régulières',
        'Améliorer la documentation technique',
      ]),
      nextSteps: JSON.stringify([
        'Finaliser l\'intégration des paiements mobile money',
        'Commencer les tests utilisateurs beta',
        'Préparer le plan de déploiement',
      ]),
      completedDate: new Date('2024-03-01'),
    },
  })
  console.log('✅ Created evaluation')

  // Create AI interaction examples
  await prisma.aiInteraction.create({
    data: {
      userId: users[0].id,
      type: 'PROJECT_GENERATION',
      input: 'Créer un projet e-commerce avec intégration mobile money pour Madagascar, budget 15M MGA, délai 3 mois',
      output: JSON.stringify({
        projectName: 'Site E-commerce MadaMarket',
        phases: 4,
        tasks: 8,
        milestones: 4,
        estimatedBudget: 15000000,
        estimatedDuration: 105,
      }),
      confidence: 0.92,
      tokensUsed: 1250,
      status: 'COMPLETED',
    },
  })
  console.log('✅ Created AI interaction examples')

  // Create project template
  await prisma.projectTemplate.create({
    data: {
      companyId: company.id,
      name: 'Template E-commerce Madagascar',
      description: 'Template de projet e-commerce optimisé pour le marché malgache',
      industry: 'E-commerce',
      type: 'AGILE',
      structure: JSON.stringify({
        phases: ['Conception', 'Développement', 'Tests', 'Déploiement'],
        defaultRoles: ['Chef de projet', 'Développeur Frontend', 'Développeur Backend', 'Testeur'],
      }),
      defaultTasks: JSON.stringify([
        { title: 'Analyse des besoins', estimateHours: 16, priority: 'HIGH' },
        { title: 'Conception UI/UX', estimateHours: 24, priority: 'HIGH' },
        { title: 'Développement frontend', estimateHours: 80, priority: 'HIGH' },
        { title: 'Développement backend', estimateHours: 60, priority: 'HIGH' },
        { title: 'Intégration paiements', estimateHours: 36, priority: 'CRITICAL' },
        { title: 'Tests utilisateurs', estimateHours: 16, priority: 'MEDIUM' },
      ]),
      gradingCriteria: JSON.stringify({
        quality: { weight: 0.3, maxScore: 100 },
        timeline: { weight: 0.25, maxScore: 100 },
        budget: { weight: 0.2, maxScore: 100 },
        communication: { weight: 0.15, maxScore: 100 },
        innovation: { weight: 0.1, maxScore: 100 },
      }),
      tags: JSON.stringify(['e-commerce', 'madagascar', 'mobile-money', 'template']),
      isPublic: false,
      createdBy: superAdmin.id,
    },
  })
  console.log('✅ Created project template')

  console.log('🎉 Database seeding completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`   - Users: ${await prisma.user.count()}`)
  console.log(`   - Companies: ${await prisma.company.count()}`)
  console.log(`   - Projects: ${await prisma.project.count()}`)
  console.log(`   - Tasks: ${await prisma.task.count()}`)
  console.log(`   - Milestones: ${await prisma.milestone.count()}`)
  console.log(`   - Notes: ${await prisma.note.count()}`)
  console.log(`   - Evaluations: ${await prisma.evaluation.count()}`)
  console.log(`   - Templates: ${await prisma.projectTemplate.count()}`)
}

main()
  .catch(e => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })