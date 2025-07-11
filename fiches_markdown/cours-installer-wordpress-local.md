# Cours 003 : Installer WordPress avec Local WP

> Cours basé sur les ressources officielles de [learn.wordpress.org](https://learn.wordpress.org/) et la documentation de [Local by WP Engine](https://localwp.com/help-docs/)

## Objectifs d'apprentissage

À la fin de ce cours, vous serez capable de :
- Comprendre les avantages du développement local
- Installer et configurer Local sur votre système
- Créer votre premier site WordPress local
- Naviguer dans l'interface de Local
- Gérer plusieurs sites WordPress en local
- Comprendre les environnements de développement
- Résoudre les problèmes courants d'installation
- Préparer votre environnement pour le développement WordPress

---

## Introduction

**Pourquoi développer WordPress en local ?**

Le développement local consiste à installer WordPress directement sur votre ordinateur, plutôt que sur un serveur web distant. Cette approche offre de nombreux avantages pour l'apprentissage et le développement.

### Avantages du développement local :
- **Rapidité** : Pas de latence réseau, chargement instantané
- **Liberté totale** : Expérimentez sans risque de casser un site en ligne
- **Travail hors ligne** : Développez même sans connexion Internet
- **Coût zéro** : Pas d'hébergement à payer pendant l'apprentissage
- **Environnement contrôlé** : Versions PHP/MySQL spécifiques
- **Tests sécurisés** : Testez plugins et thèmes avant mise en production

### Qu'est-ce que Local ?

**Local** (anciennement Local by Flywheel) est un outil de développement WordPress créé par WP Engine. Il simplifie la création d'environnements WordPress locaux avec une interface graphique intuitive.

**Caractéristiques principales :**
- Interface utilisateur moderne et conviviale
- Création de sites WordPress en quelques clics
- Gestion d'environnements multiples (PHP, MySQL, serveur web)
- Outils intégrés : SSL, partage en ligne, debugging
- Compatible Windows, macOS et Linux
- Gratuit pour usage personnel

---

## Prérequis et Configuration Système

### Configuration minimale requise

**Matériel minimum :**
- **RAM** : 4 GB minimum (8 GB recommandés)
- **Espace disque** : 1.5 GB pour Local + 500 MB par site WordPress
- **Processeur** : Compatible 64-bit

**Systèmes d'exploitation supportés :**

#### Windows
- **Windows 10** (64-bit) ou **Windows 11**
- **Important** : Windows 7, 8, et 8.1 ne sont plus supportés depuis Local v8.0
- **Important** : Les versions 32-bit ne sont plus supportées depuis Local v8.3

#### macOS
- **macOS Monterey (12)** ou version ultérieure
- Les versions antérieures peuvent utiliser Local v9.0.5 avec fonctionnalités limitées

#### Linux
- **Ubuntu** ou distributions basées sur **Debian**
- **Pop_OS** officiellement testé
- Autres distributions peuvent fonctionner mais non garanties

### Vérifier votre système

**Sur Windows :**
1. Clic droit sur "Ce PC" > Propriétés
2. Vérifiez la version de Windows et l'architecture (64-bit)
3. Vérifiez la RAM disponible

**Sur macOS :**
1. Menu Apple > À propos de ce Mac
2. Vérifiez la version macOS
3. Vérifiez la mémoire disponible

**Sur Linux :**
```bash
lsb_release -a  # Version distribution
uname -m        # Architecture
free -h         # Mémoire disponible
```

---

## Téléchargement et Installation de Local

### Étape 1 : Téléchargement

**Source officielle :**
- Rendez-vous sur [localwp.com/releases/](https://localwp.com/releases/)
- Téléchargez la version correspondant à votre système d'exploitation
- **Important** : Utilisez toujours la source officielle pour éviter les logiciels malveillants

**Versions disponibles :**
- **Windows** : Fichier `.exe` (environ 200 MB)
- **macOS** : Fichier `.dmg` (environ 250 MB)
- **Linux** : Fichier `.deb` (environ 180 MB)

### Étape 2 : Installation sur Windows

**Processus d'installation :**

1. **Lancement de l'installateur**
   - Double-cliquez sur le fichier `.exe` téléchargé
   - Windows peut afficher un avertissement de sécurité - cliquez "Exécuter quand même"

2. **Assistant d'installation**
   - Acceptez les conditions d'utilisation
   - Choisissez le répertoire d'installation (par défaut : `C:\Users\[Utilisateur]\AppData\Local\Programs\Local`)
   - Cliquez "Installer"

3. **Permissions Windows Defender**
   - **Très important** : Local nécessite plusieurs autorisations réseau
   - Plusieurs pop-ups Windows Defender apparaîtront
   - **Cliquez "Autoriser l'accès"** pour chaque pop-up
   - Ces autorisations permettent la communication entre les composants Local

**Composants autorisés :**
- Local.exe (application principale)
- nginx.exe (serveur web)
- mysql.exe (base de données)
- php.exe (moteur PHP)

4. **Configuration post-installation**
   - Local se lance automatiquement après installation
   - Création du dossier de travail par défaut : `C:\Users\[Utilisateur]\Local Sites`

**Résolution des problèmes Windows :**

Si vous manquez les pop-ups de Windows Defender :
1. Ouvrez "Paramètres Windows" > "Mise à jour et sécurité"
2. Sélectionnez "Sécurité Windows" > "Pare-feu et protection réseau"
3. Cliquez "Autoriser une application via le pare-feu"
4. Ajoutez manuellement les composants Local si nécessaire

### Étape 3 : Installation sur macOS

**Processus d'installation :**

1. **Montage du fichier DMG**
   - Double-cliquez sur le fichier `.dmg` téléchargé
   - Une fenêtre s'ouvre avec l'icône Local

2. **Installation de l'application**
   - Glissez l'icône Local vers le dossier "Applications"
   - Attendez la fin de la copie

3. **Premier lancement**
   - Ouvrez "Applications" et double-cliquez sur Local
   - macOS peut afficher un avertissement "Développeur non identifié"
   - Si nécessaire : Clic droit > "Ouvrir" pour forcer l'ouverture

4. **Permissions système**
   - Local peut demander des permissions pour :
     - Accès aux fichiers
     - Utilisation du réseau
     - Certificats SSL
   - Accordez toutes les permissions demandées

### Étape 4 : Installation sur Linux (Ubuntu/Debian)

**Méthode 1 : Interface graphique**
1. Double-cliquez sur le fichier `.deb`
2. Le gestionnaire de paquets s'ouvre automatiquement
3. Cliquez "Installer" et entrez votre mot de passe administrateur

**Méthode 2 : Ligne de commande**
```bash
# Navigation vers le dossier de téléchargement
cd ~/Téléchargements

# Installation avec apt
sudo apt install ./local-[version]-linux.deb

# Ou avec dpkg
sudo dpkg -i local-[version]-linux.deb
sudo apt install -f  # Résoudre les dépendances si nécessaire
```

**Lancement de Local :**
```bash
# Depuis le terminal
local

# Ou depuis le menu Applications
```

### Configuration réseau pour entreprises

**URLs à autoriser dans les pare-feux d'entreprise :**

Si vous travaillez dans un environnement d'entreprise, demandez à votre service IT d'autoriser ces URLs :

- `https://hub.localwp.com` - Connexion compte Local
- `https://api.wpengineapi.com/` - Fonctionnalités WP Engine
- `https://app.getflywheel.com` - Fonctionnalités Flywheel
- `https://cdn.localwp.com/` - Téléchargement des services
- `getflywheel.github.io` - Mises à jour des composants

---

## Premier lancement et configuration initiale

### Interface de bienvenue

**Premier démarrage :**
1. Local s'ouvre avec un écran de bienvenue
2. Vous pouvez créer un compte Local (optionnel mais recommandé)
3. L'interface principale affiche "No sites yet" si c'est votre première utilisation

**Avantages d'un compte Local :**
- Synchronisation entre appareils
- Fonctionnalités cloud (sauvegardes, partage)
- Support technique
- Accès aux add-ons premium

### Configuration des préférences

**Accès aux préférences :**
- **Windows/Linux** : Menu "Local" > "Preferences"
- **macOS** : Menu "Local" > "Preferences" ou Cmd+,

**Onglet "General" :**
- **Sites path** : Emplacement des sites WordPress (par défaut : `~/Local Sites`)
- **Run Local as a background app** : Local continue de fonctionner en arrière-plan
- **Automatically check for updates** : Mises à jour automatiques

**Onglet "Advanced" :**
- **Router Mode** : Méthode de routage réseau
  - **Localhost** (recommandé) : Sites accessibles via localhost:port
  - **Site Domains** : Sites accessibles via domaines personnalisés
- **Machine cleanup on exit** : Nettoyage automatique à la fermeture

**Recommandations initiales :**
- Laissez les paramètres par défaut pour commencer
- Activez les mises à jour automatiques
- Choisissez Router Mode "Localhost" pour éviter les conflits DNS

---

## Créer votre premier site WordPress

### Étape 1 : Initiation de la création

**Démarrage :**
1. Cliquez sur le bouton "+" ou "Create a new site"
2. L'assistant de création s'ouvre avec plusieurs options

**Options de création :**
- **Create a new site** : Site WordPress vierge
- **Import an existing site** : Importer depuis un site existant
- **Clone an existing site** : Dupliquer un site Local existant

### Étape 2 : Configuration du site

**Informations de base :**

1. **Site name** (Nom du site)
   - Exemple : "Mon Premier Site WordPress"
   - Ce nom apparaîtra dans la liste des sites Local
   - Peut contenir espaces et caractères spéciaux

2. **Local domain** (Domaine local)
   - Auto-généré basé sur le nom du site
   - Exemple : `monpremiersitewordpress.local`
   - Format recommandé : `nomdusite.local`
   - Évitez les caractères spéciaux et espaces

3. **Advanced options** (Options avancées - optionnel)
   - **Site path** : Emplacement des fichiers sur votre disque
   - **Multisite** : Activer WordPress Multisite (avancé)

**Conseils de nommage :**
- Utilisez des noms descriptifs : "site-entreprise", "blog-personnel"
- Évitez les noms génériques : "test", "site1"
- Cohérence : adoptez une convention de nommage

### Étape 3 : Choix de l'environnement

**Environnement "Preferred" (Recommandé pour débutants) :**
- **PHP** : Version la plus récente stable
- **Web Server** : nginx (rapide et moderne)
- **Database** : MySQL 8.0

**Environnement "Custom" (Utilisateurs avancés) :**
Permet de choisir spécifiquement :
- **PHP** : 7.4, 8.0, 8.1, 8.2, 8.3
- **Web Server** : nginx ou Apache
- **Database** : MySQL 5.7, 8.0, ou MariaDB

**Recommandations :**
- **Débutants** : Utilisez "Preferred"
- **Développeurs** : Choisissez les versions correspondant à votre serveur de production
- **Apprentissage** : PHP 8.1+ recommandé pour les dernières fonctionnalités

### Étape 4 : Configuration WordPress

**Informations d'administration :**

1. **Username** (Nom d'utilisateur admin)
   - Évitez "admin" pour des raisons de sécurité
   - Suggestions : votre prénom, "administrateur"
   - Minimum 4 caractères

2. **Password** (Mot de passe)
   - Local génère un mot de passe sécurisé
   - Vous pouvez en créer un personnalisé
   - **Recommandé** : Gardez le mot de passe généré pour la sécurité

3. **Email**
   - Votre adresse email pour les notifications WordPress
   - Important pour récupération de mot de passe

**Options avancées :**
- **WordPress Multisite** : Réseau de sites (avancé)
- **WordPress version** : Généralement la dernière version stable

### Étape 5 : Installation automatique

**Processus d'installation :**
1. Local télécharge WordPress automatiquement
2. Configuration de la base de données MySQL
3. Installation des services (PHP, nginx/Apache)
4. Configuration SSL automatique
5. Installation de WordPress avec vos paramètres

**Durée d'installation :**
- Premier site : 3-5 minutes (téléchargement des services)
- Sites suivants : 1-2 minutes (services déjà installés)

**Indicateurs de progression :**
- Téléchargement de WordPress
- Extraction des fichiers
- Configuration de la base de données
- Démarrage des services
- Finalisation de l'installation

---

## Interface et gestion des sites

### Vue d'ensemble de l'interface Local

**Panneau latéral gauche :**
- Liste de tous vos sites WordPress
- Statut de chaque site (démarré/arrêté)
- Indicateur de performance
- Boutons d'action rapide

**Panneau principal :**
- Informations détaillées du site sélectionné
- Outils et utilitaires
- Statistiques et monitoring

### Onglet "Overview" (Vue d'ensemble)

**Informations principales :**
- **Site Domain** : URL d'accès au site
- **Site Path** : Emplacement des fichiers sur votre disque
- **Status** : Statut des services (démarré/arrêté)

**Actions rapides :**
- **View Site** : Ouvrir le site dans le navigateur
- **WP Admin** : Accéder au tableau de bord WordPress
- **Open site shell** : Terminal dans le répertoire du site

**Environnement technique :**
- **PHP version** : Version PHP active
- **Web server** : nginx ou Apache
- **Database** : Version MySQL/MariaDB

**URLs importantes :**
- **Site URL** : `https://monsite.local` (frontend)
- **Admin URL** : `https://monsite.local/wp-admin` (backend)
- **Database URL** : Accès à phpMyAdmin ou Adminer

### Onglet "Environment" (Environnement)

**Services actifs :**
- **Web server** : nginx/Apache avec port
- **Database** : MySQL/MariaDB avec port  
- **PHP** : Version et configuration

**Actions environnement :**
- **Start/Stop** : Démarrer/arrêter tous les services
- **Restart** : Redémarrer les services
- **Change PHP version** : Modifier la version PHP

**Configuration avancée :**
- **Site-specific configurations** : php.ini personnalisé
- **Environment variables** : Variables d'environnement
- **Hostname management** : Gestion des domaines locaux

### Onglet "Database" (Base de données)

**Informations de connexion :**
- **Database Name** : Nom de la base de données
- **Username** : Utilisateur de la base
- **Password** : Mot de passe de la base
- **Host** : Généralement localhost
- **Port** : Port MySQL (souvent 3306)

**Outils intégrés :**
- **Adminer** : Interface web de gestion de base de données
- **Sequel Pro** (macOS) : Application de gestion de base
- **TablePlus** : Outil tiers de gestion

**Actions base de données :**
- **Open Adminer** : Interface web pour gérer la base
- **Connect with external tool** : Paramètres pour outils externes

### Onglet "SSL" (Certificats)

**Certificat SSL automatique :**
- Local génère automatiquement un certificat SSL
- Sites accessibles en HTTPS par défaut
- Certificat auto-signé (normal en local)

**Statut SSL :**
- **Trusted** : Certificat reconnu par le navigateur
- **Not trusted** : Avertissement navigateur (normal en local)

**Actions SSL :**
- **Trust SSL certificate** : Ajouter à la liste des certificats fiables
- **Regenerate certificate** : Recréer le certificat

### Onglet "Utilities" (Utilitaires)

**Outils de développement :**
- **WP-CLI** : Interface en ligne de commande WordPress
- **Log viewer** : Visualiser les logs d'erreur
- **File manager** : Gestionnaire de fichiers intégré

**Import/Export :**
- **Export site** : Créer une sauvegarde complète
- **Import site** : Restaurer depuis une sauvegarde

**Outils de debugging :**
- **Error logs** : Logs PHP et WordPress
- **Query logs** : Logs des requêtes base de données
- **Mail catcher** : Intercepter les emails sortants

---

## Gestion avancée avec Local

### Démarrage et arrêt des sites

**Démarrage automatique :**
- Sites restent démarrés après création
- Consomment des ressources système
- Accessible via navigateur immédiatement

**Arrêt manuel :**
1. Sélectionnez le site dans la liste
2. Clic sur "Stop site" ou bouton rouge
3. Les services s'arrêtent (PHP, MySQL, serveur web)

**Gestion des ressources :**
- **Un site actif** : ~200-300 MB RAM
- **Multiples sites** : Multiplication des ressources
- **Recommandation** : Arrêtez les sites non utilisés

### Environnements multiples

**Avantages des environnements différents :**
- **Test de compatibilité** : Différentes versions PHP
- **Simulation production** : Même environnement que serveur live
- **Développement** : Environnements par projet

**Configuration d'environnements :**
1. Créez un nouveau site avec environnement "Custom"
2. Choisissez les versions spécifiques requises
3. Documentez vos choix pour référence future

**Cas d'usage courants :**
- **PHP 7.4** : Sites legacy ou plugins anciens
- **PHP 8.1+** : Développement moderne
- **Apache vs nginx** : Test de compatibilité serveur

### Blueprints (Modèles de sites)

**Qu'est-ce qu'un Blueprint ?**
Un Blueprint est un modèle pré-configuré qui permet de créer rapidement des sites avec :
- Thème spécifique installé
- Plugins pré-installés et configurés
- Contenu de démonstration
- Configuration WordPress personnalisée

**Utilisation des Blueprints :**
1. Menu "+" > "Create from Blueprint"
2. Sélectionnez un blueprint existant
3. Personnalisez le nom et domaine
4. Installation automatique avec tous les composants

**Blueprints populaires :**
- **WooCommerce** : Boutique e-commerce complète
- **Blog** : Blog professionnel avec thème et plugins
- **Portfolio** : Site portfolio avec galeries
- **Business** : Site vitrine d'entreprise

### Fonctionnalités collaboratives

**Live Links :**
- Partage temporaire de votre site local
- Accessible via URL publique
- Idéal pour tests clients ou feedback
- Sécurisé et temporaire

**Activation Live Links :**
1. Onglet "Overview" du site
2. Clic sur "Enable Live Link"
3. URL publique générée automatiquement
4. Partage de l'URL avec collaborateurs

**Cloud Backups :**
- Sauvegarde automatique dans le cloud
- Synchronisation entre appareils
- Restauration sur autre machine
- Nécessite compte Local

---

## Accéder à votre site WordPress

### Frontend (Site public)

**Accès direct :**
1. Dans Local, sélectionnez votre site
2. Clic sur "View Site" ou "Open site"
3. Le navigateur s'ouvre automatiquement

**URL manuelle :**
- Format : `https://[nom-du-site].local`
- Exemple : `https://monpremiersitewordpress.local`
- Toujours en HTTPS avec Local

**Première visite :**
- WordPress affiche la page d'accueil par défaut
- Thème Twenty Twenty-Four (ou dernier thème par défaut)
- Article de bienvenue "Hello World!"
- Page "Sample Page"

### Backend (Administration WordPress)

**Accès au tableau de bord :**
1. Dans Local, clic sur "WP Admin"
2. Connexion automatique avec vos identifiants
3. Interface d'administration WordPress

**Connexion manuelle :**
- URL : `https://[nom-du-site].local/wp-admin`
- Utilisez les identifiants créés lors de l'installation
- Cochez "Se souvenir de moi" pour éviter reconnexions fréquentes

**Interface d'administration :**
- **Tableau de bord** : Vue d'ensemble et statistiques
- **Articles** : Gestion des articles de blog
- **Pages** : Gestion des pages statiques
- **Médias** : Bibliothèque d'images et fichiers
- **Commentaires** : Modération des commentaires
- **Apparence** : Thèmes et personnalisation
- **Extensions** : Plugins WordPress
- **Utilisateurs** : Gestion des comptes utilisateur
- **Outils** : Import/export et maintenance
- **Réglages** : Configuration générale

### Navigation entre sites multiples

**Gestion de plusieurs sites :**
- Chaque site a son URL unique
- Basculement rapide via Local
- Services indépendants par site

**Organisation recommandée :**
- Nommage cohérent des sites
- Documentation des projets
- Groupement par client ou type de projet

---

## Dossiers et fichiers WordPress

### Structure des fichiers

**Emplacement par défaut :**
- **Windows** : `C:\Users\[Utilisateur]\Local Sites\[nom-du-site]\app\public`
- **macOS** : `/Users/[Utilisateur]/Local Sites/[nom-du-site]/app/public`
- **Linux** : `/home/[utilisateur]/Local Sites/[nom-du-site]/app/public`

**Structure complète du site :**
```
nom-du-site/
├── app/
│   ├── public/          # Fichiers WordPress accessibles par le web
│   │   ├── wp-admin/    # Interface d'administration
│   │   ├── wp-content/  # Contenu personnalisé
│   │   │   ├── themes/  # Thèmes
│   │   │   ├── plugins/ # Extensions
│   │   │   └── uploads/ # Médias uploadés
│   │   ├── wp-includes/ # Core WordPress
│   │   ├── index.php    # Point d'entrée
│   │   └── wp-config.php # Configuration
│   └── sql/             # Dumps de base de données
├── conf/                # Configuration services Local
│   ├── nginx/           # Configuration nginx
│   ├── mysql/           # Configuration MySQL
│   └── php/             # Configuration PHP
└── logs/                # Fichiers de logs
    ├── nginx/
    ├── mysql/
    └── php/
```

### Dossiers WordPress importants

**wp-content/ (Le plus important) :**
- **Votre contenu personnalisé** exclusivement
- **Sauvegardez toujours** ce dossier
- **Portable** entre installations

**wp-content/themes/ :**
- Tous les thèmes WordPress
- Thème actif et thèmes installés
- Personnalisations CSS et PHP

**wp-content/plugins/ :**
- Toutes les extensions WordPress
- Plugins actifs et inactifs
- Configurations spécifiques

**wp-content/uploads/ :**
- Images, vidéos, documents uploadés
- Organisé par année/mois automatiquement
- Peut devenir volumineux

### Accès aux fichiers

**Via Local :**
1. Clic droit sur le site > "Reveal in Finder/Explorer"
2. Navigation directe vers le dossier du site
3. Édition avec votre éditeur de code préféré

**Via terminal :**
1. Onglet "Utilities" > "Open site shell"
2. Terminal s'ouvre dans le répertoire WordPress
3. Commandes WP-CLI disponibles directement

**Éditeurs recommandés :**
- **VS Code** : Gratuit, extensions WordPress disponibles
- **PhpStorm** : IDE professionnel avec support WordPress
- **Sublime Text** : Léger et rapide
- **Atom** : Open source, nombreux plugins

---

## Résolution des problèmes courants

### Problèmes d'installation

**"L'installation a échoué" :**
1. Vérifiez l'espace disque disponible (minimum 2 GB)
2. Temporairement désactivez l'antivirus
3. Exécutez Local en tant qu'administrateur
4. Téléchargez à nouveau depuis le site officiel

**"Les services ne démarrent pas" :**
1. Vérifiez que les ports ne sont pas utilisés :
   - Port 80 (HTTP) et 443 (HTTPS)
   - Port 3306 (MySQL)
2. Arrêtez autres serveurs locaux (XAMPP, WAMP, MAMP)
3. Redémarrez votre ordinateur
4. Changez de Router Mode dans les préférences

**Erreurs de certificat SSL :**
1. Navigateur affiche "Non sécurisé" - normal en local
2. Cliquez "Avancé" > "Continuer vers le site"
3. Ou installez le certificat comme fiable
4. Chrome : `chrome://flags/#allow-insecure-localhost`

### Problèmes de performance

**Local est lent :**
1. **Arrêtez les sites non utilisés** - économise RAM
2. **Augmentez la RAM allouée** si possible
3. **Excluez les dossiers Local** de l'antivirus
4. **Fermez les applications lourdes** pendant le développement

**Site WordPress lent :**
1. Vérifiez les plugins installés - désactivez ceux non nécessaires
2. Utilisez un thème léger pour le développement
3. Évitez trop d'images non optimisées
4. Activez le cache si disponible

**Base de données lente :**
1. Réduisez les révisions d'articles
2. Nettoyez la base de données régulièrement
3. Évitez trop de plugins de logging

### Problèmes d'accès

**"Site non accessible" :**
1. Vérifiez que le site est démarré dans Local
2. Contrôlez l'URL : `https://nomdusite.local`
3. Videz le cache du navigateur
4. Essayez en navigation privée
5. Redémarrez les services Local

**"Page blanche" (WSOD) :**
1. Activez le debugging WordPress :
   ```php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   ```
2. Consultez les logs dans Utilities
3. Désactivez tous les plugins
4. Changez pour thème par défaut
5. Augmentez memory_limit PHP

**Problèmes de connexion admin :**
1. Vérifiez identifiants dans Local > Database
2. Réinitialisez via "Utilities" > "Reset admin password"
3. Accédez directement : `/wp-admin/`
4. Vérifiez tables utilisateurs en base

### Problèmes spécifiques Windows

**Erreur "Port déjà utilisé" :**
1. Ouvrez Invite de commandes en admin :
   ```cmd
   netstat -ano | findstr :80
   netstat -ano | findstr :443
   ```
2. Identifiez le processus utilisant le port
3. Arrêtez le service conflictuel
4. Relancez Local

**Windows Defender bloque Local :**
1. Ajoutez Local aux exclusions Windows Defender
2. Chemin à exclure : `C:\Users\[User]\AppData\Local\Programs\Local`
3. Autorisez tous les composants dans le pare-feu

### Problèmes spécifiques macOS

**"Application non signée" :**
1. Clic droit sur Local > "Ouvrir"
2. Confirmez l'ouverture malgré l'avertissement
3. Ou dans Préférences Système > Sécurité : "Ouvrir quand même"

**Permissions de fichiers :**
```bash
# Réparer les permissions si nécessaire
sudo chown -R $(whoami) ~/Local\ Sites/
chmod -R 755 ~/Local\ Sites/
```

---

## Bonnes pratiques et recommandations

### Organisation des projets

**Convention de nommage :**
- **Sites clients** : `client-nomduprojet` (ex: `dupont-site-vitrine`)
- **Projets personnels** : `perso-nomduprojet` (ex: `perso-blog`)
- **Tests** : `test-nomdelafonctionnalite` (ex: `test-woocommerce`)
- **Formation** : `formation-sujet` (ex: `formation-gutenberg`)

**Structure de dossiers :**
```
Local Sites/
├── clients/
│   ├── client1-projet1/
│   ├── client1-projet2/
│   └── client2-site/
├── personnel/
│   ├── blog-perso/
│   └── portfolio/
├── formation/
│   ├── cours-wordpress/
│   └── test-plugins/
└── templates/
    ├── template-blog/
    └── template-ecommerce/
```

### Sauvegardes et versioning

**Sauvegardes régulières :**
1. **Export automatique** via Local (Utilities > Export)
2. **Sauvegarde manuelle** du dossier wp-content
3. **Export base de données** via Adminer
4. **Cloud Backup** si compte Local Premium

**Versioning avec Git :**
```bash
# Dans le dossier du site
cd ~/Local\ Sites/mon-site/app/public
git init
echo "wp-config.php" >> .gitignore
echo "wp-content/uploads/" >> .gitignore
git add .
git commit -m "Initial WordPress installation"
```

**Fréquence recommandée :**
- **Développement actif** : Backup quotidien
- **Sites de test** : Backup avant modifications importantes
- **Sites clients** : Backup avant chaque déploiement

### Optimisation des ressources

**Gestion de la mémoire :**
- **N'exécutez que les sites nécessaires**
- **Fermez Local quand non utilisé**
- **Surveillez la RAM disponible**
- **Redémarrez Local périodiquement**

**Nettoyage régulier :**
- **Supprimez les sites obsolètes**
- **Videz les logs volumineux**
- **Nettoyez les bases de données de test**
- **Supprimez les médias de test volumineux**

### Sécurité en développement local

**Mots de passe forts :**
- Utilisez les mots de passe générés par Local
- Ne réutilisez jamais les mots de passe de production
- Documentez les accès de manière sécurisée

**Isolation des environnements :**
- **Jamais de données réelles** en développement local
- **Anonymisez les données** si import nécessaire
- **Séparez nettement** développement et production

**Mises à jour :**
- **Local** : Activez les mises à jour automatiques
- **WordPress** : Testez sur site local avant production
- **Plugins** : Testez compatibilité avant mise à jour

---

## Prochaines étapes après installation

### Familiarisation avec WordPress

**Premier contact :**
1. **Explorez l'interface** d'administration
2. **Créez votre premier article** avec l'éditeur Gutenberg
3. **Ajoutez une page** "À propos"
4. **Téléchargez quelques images** dans la médiathèque
5. **Testez différents thèmes** disponibles

**Configuration de base :**
1. **Réglages généraux** : Titre du site, tagline, langue
2. **Réglages de lecture** : Page d'accueil statique ou articles
3. **Réglages des permaliens** : Structure des URLs
4. **Utilisateurs** : Création de comptes supplémentaires

### Installation d'extensions essentielles

**Plugins recommandés pour débuter :**
- **Classic Editor** : Si vous préférez l'ancien éditeur
- **Akismet** : Protection anti-spam
- **Jetpack** : Suite d'outils tout-en-un
- **Yoast SEO** : Optimisation pour moteurs de recherche
- **UpdraftPlus** : Sauvegardes automatiques

**Installation des plugins :**
1. Administration > Extensions > Ajouter
2. Recherchez par nom
3. Installez et activez
4. Configurez selon vos besoins

### Exploration des thèmes

**Thèmes par défaut à tester :**
- **Twenty Twenty-Four** : Thème moderne avec Full Site Editing
- **Twenty Twenty-Three** : Thème minimaliste
- **Astra** : Thème populaire et rapide
- **GeneratePress** : Thème optimisé pour la performance

**Installation de thèmes :**
1. Apparence > Thèmes > Ajouter
2. Parcourez la bibliothèque officielle
3. Prévisualisez avant installation
4. Activez le thème choisi

### Apprentissage de l'éditeur Gutenberg

**Concepts fondamentaux :**
- **Blocs** : Éléments de contenu (texte, image, vidéo)
- **Patterns** : Ensembles de blocs pré-configurés
- **Template Parts** : Parties de template réutilisables
- **Global Styles** : Styles appliqués à tout le site

**Exercices pratiques :**
1. **Créez une page d'accueil** avec différents blocs
2. **Testez les blocs avancés** : colonnes, galeries, boutons
3. **Personnalisez les couleurs** et polices
4. **Créez un menu** de navigation

### Préparer le déploiement

**Différences local vs production :**
- **URLs** : Changent lors du déploiement
- **Base de données** : Mise à jour des URLs nécessaire
- **Fichiers** : Upload via FTP/SFTP
- **Configuration** : wp-config.php différent

**Outils de déploiement :**
- **All-in-One WP Migration** : Plugin de migration simplifié
- **Duplicator** : Création de paquets de déploiement
- **WP-CLI** : Commandes en ligne pour migration
- **Git** : Versioning et déploiement automatisé

**Checklist pré-déploiement :**
- [ ] Site testé et fonctionnel en local
- [ ] Plugins et thèmes à jour
- [ ] Contenu finalisé
- [ ] Images optimisées
- [ ] Sauvegarde complète effectuée
- [ ] Hébergement web choisi et configuré

---

## Quiz de validation

### Questions techniques

1. **Quels sont les avantages principaux du développement WordPress en local ?**

2. **Quelle est la configuration système minimale pour installer Local ?**

3. **Expliquez la différence entre les environnements "Preferred" et "Custom" dans Local.**

4. **Où sont stockés les fichiers WordPress de vos sites Local par défaut ?**

5. **Comment résoudre une erreur "Port déjà utilisé" sous Windows ?**

### Questions pratiques

6. **Décrivez le processus complet de création d'un nouveau site WordPress avec Local.**

7. **Comment accéder aux logs d'erreur d'un site WordPress dans Local ?**

8. **Quelles sont les étapes pour partager temporairement votre site local avec un client ?**

### Résolution de problèmes

9. **Votre site affiche une page blanche. Quelles sont les étapes de diagnostic à suivre ?**

10. **Local consomme trop de ressources sur votre machine. Quelles optimisations pouvez-vous appliquer ?**

---

## Exercices pratiques

### Exercice 1 : Installation complète

**Objectif :** Installer Local et créer votre premier site

**Instructions :**
1. Téléchargez et installez Local
2. Créez un site nommé "formation-wordpress"
3. Configurez un compte administrateur sécurisé
4. Accédez au site et à l'administration
5. Documentez les URLs d'accès

**Livrables :**
- Screenshot de l'interface Local avec votre site
- Capture de la page d'accueil WordPress
- Note des identifiants d'accès

### Exercice 2 : Configuration d'environnement

**Objectif :** Maîtriser les environnements de développement

**Instructions :**
1. Créez deux sites identiques :
   - Site A : Environnement "Preferred"
   - Site B : Environnement "Custom" avec PHP 8.1
2. Comparez les performances et fonctionnalités
3. Testez l'accès aux bases de données respectives

**Analyse :**
- Différences observées entre les environnements
- Cas d'usage pour chaque configuration
- Recommandations d'utilisation

### Exercice 3 : Gestion de projet complexe

**Objectif :** Organiser un workflow de développement

**Scenario :** Vous développez un site vitrine pour un client

**Instructions :**
1. Créez un site "client-sitevitrine"
2. Installez 3 plugins de votre choix
3. Changez le thème par défaut
4. Créez 3 pages : Accueil, Services, Contact
5. Effectuez une sauvegarde complète
6. Documentez votre configuration

**Livrables :**
- Structure du site créé
- Liste des plugins et leur utilité
- Justification du choix de thème
- Procédure de sauvegarde suivie

---

## Ressources complémentaires

### Documentation officielle

**Local :**
- [Help Docs Local](https://localwp.com/help-docs/) - Documentation complète
- [Community Forum](https://localwp.com/community/) - Support communautaire
- [Release Notes](https://localwp.com/releases/) - Nouveautés et mises à jour

**WordPress :**
- [learn.wordpress.org](https://learn.wordpress.org/) - Formation officielle
- [WordPress Codex](https://wordpress.org/documentation/) - Documentation développeur
- [Support Forums](https://wordpress.org/support/) - Aide communautaire

### Outils complémentaires

**Éditeurs de code :**
- **VS Code** + extension "WordPress Snippets"
- **PhpStorm** + plugin "WordPress Integration"  
- **Sublime Text** + package "WordPress"

**Gestion de base de données :**
- **Adminer** (intégré à Local)
- **phpMyAdmin** - Interface web classique
- **TablePlus** (macOS/Windows) - Client natif moderne
- **MySQL Workbench** - Outil officiel MySQL

**Debugging et développement :**
- **Query Monitor** - Plugin de debugging WordPress
- **Debug Bar** - Barre de debug dans l'admin
- **WP-CLI** - Interface en ligne de commande WordPress

### Formation continue

**Cours suivants recommandés :**
1. **"Comprendre l'interface WordPress"** - Navigation et familiarisation
2. **"Créer du contenu avec Gutenberg"** - Maîtrise de l'éditeur de blocs
3. **"Personnaliser WordPress avec les thèmes"** - Apparence et design
4. **"Étendre WordPress avec les plugins"** - Fonctionnalités additionnelles

**Communauté francophone :**
- **WordCamp France** - Événements annuels
- **Meetups WordPress** - Rencontres locales mensuelles
- **WPFR.net** - Communauté française WordPress
- **Slack WordPress Francophone** - Chat en temps réel

---

## Conclusion

### Récapitulatif des compétences acquises

**Installation et configuration :**
- Installation de Local sur votre système d'exploitation
- Configuration initiale et préférences
- Création de sites WordPress locaux
- Gestion des environnements de développement

**Utilisation quotidienne :**
- Navigation dans l'interface Local
- Démarrage et arrêt des sites
- Accès aux fichiers et bases de données
- Résolution des problèmes courants

**Bonnes pratiques :**
- Organisation des projets de développement
- Sauvegardes et versioning
- Optimisation des ressources
- Préparation au déploiement

### Bénéfices du développement local

**Pour l'apprentissage :**
- **Environnement sûr** pour expérimenter
- **Pas de coûts** d'hébergement pendant la formation
- **Performance optimale** pour les tests
- **Liberté totale** de modification

**Pour le développement professionnel :**
- **Workflow professionnel** établi
- **Tests sécurisés** avant déploiement
- **Productivité accrue** avec outils intégrés
- **Standardisation** des environnements

### Prochaines étapes recommandées

**Immédiat (cette semaine) :**
1. **Pratiquez** la création de plusieurs sites
2. **Explorez** tous les onglets de l'interface Local
3. **Testez** différents environnements (PHP, serveurs)
4. [**Familiarisez-vous** avec WordPress de base](cours-familiarisation-wordpress.md)

**Court terme (ce mois) :**
1. **Apprenez Gutenberg** en profondeur
2. **Installez et testez** 10 plugins populaires
3. **Explorez** 5 thèmes différents
4. **Créez** un site vitrine complet

**Long terme (3 mois) :**
1. **Maîtrisez** le déploiement vers hébergement live
2. **Apprenez WP-CLI** pour automatisation
3. **Développez** votre premier thème enfant
4. **Contribuez** à la communauté WordPress

### Message final

**Local est votre porte d'entrée vers la maîtrise de WordPress.** Avec un environnement de développement local professionnel, vous disposez maintenant des outils nécessaires pour apprendre, expérimenter et créer sans limites.

**L'apprentissage de WordPress est un voyage continu.** Chaque site créé, chaque problème résolu, chaque nouvelle fonctionnalité testée vous rapproche de l'expertise. Local vous offre le terrain de jeu parfait pour cette progression.

**Bienvenue dans l'écosystème WordPress !** Vous rejoignez une communauté mondiale de millions de développeurs, designers et créateurs qui utilisent WordPress pour construire le web de demain.

---

*Ce cours constitue le fondement technique indispensable pour tout apprentissage WordPress. Maîtriser Local vous permettra de suivre efficacement tous les cours suivants de votre parcours de formation.*

**Sources :**
- [Local by WP Engine Documentation](https://localwp.com/help-docs/)
- [Learn WordPress - Beginner Course](https://learn.wordpress.org/course/beginner-wordpress-user/)
- [WordPress.org Developer Resources](https://developer.wordpress.org/)

**Créé le :** Juillet 2025  
**Niveau :** Débutant  
**Durée estimée :** 120-150 minutes + exercices pratiques  
**Prérequis :** Utilisation de base d'un ordinateur
