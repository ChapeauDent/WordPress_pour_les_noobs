# Cours 004 : Familiarisation avec WordPress

> Cours basé sur les ressources officielles de [learn.wordpress.org](https://learn.wordpress.org/) et votre site local "Mon Site WordPress"

## Objectifs d'apprentissage

À la fin de ce cours, vous serez capable de :
- Naviguer efficacement dans l'interface d'administration WordPress
- Comprendre et utiliser le tableau de bord WordPress
- Différencier les articles (posts) des pages
- Gérer la médiathèque WordPress
- Créer et organiser du contenu avec l'éditeur de blocs
- Configurer les réglages de base de votre site
- Utiliser les fonctionnalités essentielles pour débuter
- Organiser votre workflow de création de contenu

---

## Introduction

**Bienvenue dans l'univers WordPress !**

Maintenant que vous avez installé WordPress sur votre environnement local avec le site "Mon Site WordPress", il est temps de vous familiariser avec l'interface. Cette étape est cruciale car elle détermine votre efficacité future dans la création et la gestion de votre site web.

**WordPress offre deux interfaces principales :**
- **Frontend** : Ce que vos visiteurs voient (votre site public)
- **Backend** : L'interface d'administration où vous gérez votre site

Ce cours se concentre sur le backend - votre centre de contrôle WordPress.

---

## Accéder à votre site WordPress

### Connexion à l'administration

**Depuis Local :**
1. Ouvrez Local sur votre ordinateur
2. Sélectionnez votre site "Mon Site WordPress"
3. Cliquez sur "WP Admin" - connexion automatique

**Connexion manuelle :**
- URL d'administration : `https://monsitewordpress.local/wp-admin`
- Utilisez les identifiants créés lors de l'installation
- Cochez "Se souvenir de moi" pour éviter les reconnexions

**Première connexion :**
WordPress vous accueille avec le tableau de bord - votre centre de contrôle principal.

### Visiter le frontend

**Depuis l'administration :**
- Cliquez sur le nom de votre site en haut à gauche
- Ou utilisez l'icône "maison" dans la barre d'administration

**Accès direct :**
- URL frontend : `https://monsitewordpress.local`
- Découvrez l'apparence publique de votre site

**Ce que vous verrez :**
- Page d'accueil avec le thème par défaut
- Article "Bonjour tout le monde !" (Hello World)
- Page d'exemple "Page d'exemple"
- Interface visiteur de base

---

## Interface d'administration : Vue d'ensemble

![Interface d'administration WordPress](assets/Interface_administration_mon-site-wordpress_local.jpeg)

### La barre d'administration (Admin Bar)

**Éléments principaux de gauche à droite :**

**Icône WordPress + Nom du site :**
- Clic sur l'icône : Retour au tableau de bord
- Clic sur le nom : Visite du frontend
- Survol : Menu rapide (Tableau de bord, Thèmes, Widgets)

**Notifications :**
- **Icône commentaires** : Nouveaux commentaires en attente
- **Icône mise à jour** : Mises à jour disponibles (core, plugins, thèmes)
- Chiffres indiquent le nombre d'éléments

**Menu "Nouveau" (+) :**
- **Article** : Créer un nouvel article de blog
- **Page** : Créer une nouvelle page statique
- **Média** : Uploader des fichiers
- **Utilisateur** : Ajouter un utilisateur (selon permissions)

**Profil utilisateur (à droite) :**
- Votre nom d'utilisateur et avatar
- **Modifier mon profil** : Paramètres personnels
- **Se déconnecter** : Sortie sécurisée

### Options d'écran et aide

**Options d'écran (en haut à droite) :**
- Contrôle les éléments visibles sur chaque page
- Cochez/décochez pour afficher/masquer des sections
- Personnalisez votre interface selon vos besoins

**Aide (à côté d'Options d'écran) :**
- Documentation contextuelle
- Informations sur la page active
- Liens vers ressources WordPress

---

## Le tableau de bord WordPress

### Vue d'ensemble du tableau de bord

**Le tableau de bord est votre page d'accueil administrative.** Il présente un aperçu de l'activité de votre site via des widgets informatifs.

### Widgets du tableau de bord

**Widget "Brouillon rapide" :**
- Zone de saisie rapide pour nouvelles idées
- Sauvegarde automatique comme brouillon
- Accessible depuis Articles > Brouillons
- Idéal pour noter des idées à développer plus tard

**Widget "D'un coup d'œil" :**
- **Nombre d'articles** publiés sur votre site
- **Nombre de pages** créées
- **Nombre de commentaires** total
- **Thème actuel** utilisé
- **Version WordPress** installée

**Widget "Activité" :**
- **Articles récents** : Vos dernières publications
- **Commentaires récents** : Derniers commentaires soumis
- Actions rapides : Approuver, répondre, modifier

**Widget "Événements et actualités WordPress" :**
- **Événements locaux** : WordCamps et Meetups près de chez vous
- **Actualités WordPress** : Dernières nouvelles de la communauté
- **Mises à jour** : Informations sur les nouvelles versions

### Personnalisation du tableau de bord

**Réorganiser les widgets :**
1. Cliquez et maintenez sur la barre de titre d'un widget
2. Glissez-déposez à l'emplacement souhaité
3. Relâchez pour fixer la nouvelle position

**Afficher/Masquer des widgets :**
1. Cliquez "Options d'écran" en haut à droite
2. Cochez/décochez les widgets désirés
3. Personnalisez selon vos besoins quotidiens

**Configuration recommandée pour débuter :**
- Gardez "D'un coup d'œil" pour les statistiques
- Conservez "Activité" pour suivre les interactions
- "Brouillon rapide" pour les idées spontanées
- Masquez les autres widgets pour simplifier

---

## Navigation : Le menu latéral

### Organisation du menu principal

**Le menu latéral gauche est votre navigation principale.** Il est organisé logiquement :

**Section contenu (haut) :**
- Tableau de bord
- Articles
- Médias
- Pages
- Commentaires

**Section fonctionnalités (bas) :**
- Apparence
- Extensions
- Utilisateurs
- Outils
- Réglages

### Menu réductible

**Mode réduit :**
- Cliquez sur "Réduire le menu" en bas du menu
- Affichage des icônes seulement
- Survol révèle les sous-menus
- Économise l'espace d'écran

**Mode étendu :**
- Affichage complet des libellés
- Sous-menus visibles directement
- Plus intuitif pour les débutants

---

## Gestion des articles (Posts)

### Qu'est-ce qu'un article WordPress ?

**Les articles sont du contenu dynamique :**
- Contenu daté et chronologique
- Affiché en ordre antéchronologique (plus récent en premier)
- Possède des catégories et des étiquettes
- Idéal pour : blogs, actualités, recettes, critiques

**Différence avec les pages :**
- **Articles** : Contenu temporel et catégorisé
- **Pages** : Contenu statique et intemporel

### Interface de gestion des articles
![Interface de gestion des articles WordPress](assets/Interface_gestion_des_articles_mon-site-wordpress_local.jpeg)
**Page "Tous les articles" :**

**Vue en liste :**
- **Titre** : Nom de l'article (cliquez pour modifier)
- **Auteur** : Qui a créé l'article
- **Catégories** : Classification du contenu
- **Étiquettes** : Mots-clés spécifiques
- **Date** : Publication ou dernière modification

**Actions disponibles :**
- **Modifier** : Édition complète de l'article
- **Modification rapide** : Édition des métadonnées sans ouvrir l'éditeur
- **Corbeille** : Suppression (récupérable 30 jours)
- **Aperçu** : Visualisation avant publication

**Actions en lot :**
1. Cochez plusieurs articles
2. Sélectionnez une action dans le menu déroulant
3. Cliquez "Appliquer"
4. Exemple : Supprimer plusieurs articles d'un coup

**Filtres et recherche :**
- **Filtrer par catégorie** : Voir seulement une catégorie
- **Filtrer par date** : Articles d'un mois/année spécifique
- **Filtrer par auteur** : Articles d'un utilisateur
- **Recherche** : Recherche dans titres et contenu

### Créer votre premier article

**Exercice pratique : Article de bienvenue**

1. **Accès à la création :**
   - Articles > Ajouter un article
   - Ou clic sur "Nouveau > Article" dans la barre d'administration

2. **Titre de l'article :**
   - Cliquez dans "Saisissez le titre ici"
   - Tapez : "Bienvenue sur Mon Site WordPress"

3. **Contenu de l'article :**
   ```
   Bonjour et bienvenue sur mon nouveau site WordPress !
   
   Ce site a été créé avec Local pour apprendre WordPress. 
   Je vais y partager mes découvertes et expériences.
   
   Restez connectés pour plus de contenu !
   ```

4. **Catégorie :**
   - Panneau droit > Catégories
   - Créez une catégorie "Actualités"
   - Sélectionnez-la pour cet article

5. **Étiquettes :**
   - Panneau droit > Étiquettes
   - Ajoutez : "bienvenue", "premier article", "apprentissage"

6. **Publication :**
   - Cliquez "Publier" en haut à droite
   - Votre premier article est en ligne !

### Catégories et étiquettes

**Catégories :**
- **Fonction** : Table des matières de votre site
- **Structure** : Hiérarchiques (catégories parentes/enfants)
- **Utilisation** : Grands thèmes de contenu
- **Exemples** : Actualités, Tutoriels, Critiques

**Étiquettes :**
- **Fonction** : Mots-clés descriptifs
- **Structure** : Non-hiérarchiques
- **Utilisation** : Détails spécifiques du contenu
- **Exemples** : WordPress, débutant, local, installation

**Gestion des catégories :**
1. Articles > Catégories
2. Créez des catégories logiques pour votre contenu
3. Organisez en hiérarchie si nécessaire
4. Ajoutez descriptions pour le SEO

**Exercice : Créer des catégories**
- "Tutoriels WordPress" (parente)
  - "Installation" (enfant)
  - "Personnalisation" (enfant)
- "Actualités du site"
- "Réflexions personnelles"

---

## Gestion des pages
![Interface de gestion des pages WordPress](assets/Interface_gestion_des_pages_mon-site-wordpress_local.jpeg)
### Qu'est-ce qu'une page WordPress ?

**Les pages sont du contenu statique :**
- Contenu intemporel et permanent
- Pas de catégories ni d'étiquettes
- Structure hiérarchique possible (pages parentes/enfants)
- Idéal pour : À propos, Contact, Services, Mentions légales

### Créer des pages essentielles

**Page "À propos" :**

1. **Création :**
   - Pages > Ajouter une page
   - Titre : "À propos"

2. **Contenu suggéré :**
   ```
   Qui suis-je ?
   
   Bonjour ! Je suis [Votre nom], passionné(e) par le web et WordPress.
   
   Ce site est mon terrain d'apprentissage où je documente ma découverte 
   de WordPress et du développement web.
   
   Mon objectif est de maîtriser WordPress pour créer des sites web 
   professionnels et fonctionnels.
   
   N'hésitez pas à me contacter si vous souhaitez échanger !
   ```

3. **Publication :**
   - Cliquez "Publier"
   - La page apparaît automatiquement dans le menu

**Page "Contact" :**

1. **Création :**
   - Pages > Ajouter une page
   - Titre : "Contact"

2. **Contenu de base :**
   ```
   Contactez-moi
   
   Vous souhaitez me contacter ? Voici comment procéder :
   
   Email : votre.email@exemple.com
   
   Réseaux sociaux :
   - Twitter : @votrecompte
   - LinkedIn : Votre profil
   
   Je réponds généralement sous 24h.
   ```

### Hiérarchie des pages

**Créer une structure :**
- Page parente : "Services"
- Pages enfants : "Développement Web", "Formation WordPress"

**Configuration :**
1. Créez la page parente "Services"
2. Créez "Développement Web"
3. Dans les attributs de page > Page parente > Sélectionnez "Services"
4. Répétez pour les autres sous-pages

**Avantages de la hiérarchie :**
- URLs organisées : `/services/developpement-web/`
- Navigation logique
- Structure SEO optimisée

---

## La médiathèque WordPress

### Qu'est-ce que la médiathèque ?

**La médiathèque centralise tous vos fichiers :**
- **Images** : JPEG, PNG, GIF, WebP
- **Documents** : PDF, Word, Excel, PowerPoint
- **Audio** : MP3, WAV, OGG
- **Vidéo** : MP4, AVI, MOV (attention à la taille)

### Interface de la médiathèque
![Interface de la médiathèque WordPress](assets/Interface_mediatheque_mon-site-wordpress_local.jpeg)
**Vue grille (par défaut) :**
- Miniatures des médias en grille
- Aperçu visuel rapide
- Idéal pour parcourir les images

**Vue liste :**
- Informations détaillées tabulaires
- Nom de fichier, type, taille, date
- Idéal pour la gestion administrative

**Filtres disponibles :**
- **Type de média** : Images, audio, vidéo, documents
- **Date d'upload** : Par mois et année
- **Éléments non attachés** : Médias non utilisés

### Ajouter des médias

**Upload depuis l'ordinateur :**

1. **Méthode 1 - Bouton classique :**
   - Médias > Ajouter
   - Cliquez "Sélectionner les fichiers"
   - Choisissez vos fichiers
   - Cliquez "Ouvrir"

2. **Méthode 2 - Glisser-déposer :**
   - Médias > Ajouter
   - Glissez vos fichiers depuis l'explorateur
   - Déposez dans la zone prévue
   - Upload automatique

**Exercice pratique :**
1. Téléchargez 3 images depuis Unsplash.com
2. Uploadez-les dans votre médiathèque
3. Organisez-les avec des descriptions

### Optimisation des médias

**Avant l'upload :**
- **Taille** : Redimensionnez selon l'usage final
- **Poids** : Compressez avec TinyPNG ou Squoosh.app
- **Nom de fichier** : Utilisez des noms descriptifs
- **Format** : JPEG pour photos, PNG pour graphiques

**Dans WordPress :**

**Attributs essentiels :**
- **Texte alternatif (ALT)** : Description pour accessibilité et SEO
- **Titre** : Titre affiché au survol
- **Légende** : Texte affiché sous l'image
- **Description** : Information détaillée

**Exemple d'optimisation :**
```
Nom de fichier : wordpress-logo-bleu-2024.png
ALT : Logo WordPress officiel en bleu
Titre : Logo WordPress
Légende : Le logo WordPress dans sa version bleue officielle
Description : Logo officiel de WordPress utilisé pour l'identité visuelle
```

### Édition d'images

**Outils d'édition intégrés :**
1. Cliquez sur une image dans la médiathèque
2. Sélectionnez "Modifier l'image"
3. Outils disponibles :
   - **Recadrer** : Sélectionnez une zone et recadrez
   - **Rotation** : 90° gauche/droite
   - **Retournement** : Horizontal/vertical
   - **Redimensionnement** : Nouvelles dimensions

**Bonnes pratiques :**
- Gardez toujours l'original
- Utilisez "Restaurer l'image originale" si besoin
- Testez différentes tailles pour l'usage final

---

## L'éditeur de blocs Gutenberg

### Introduction à Gutenberg

**Gutenberg révolutionne la création de contenu WordPress :**
- Interface moderne par blocs
- Création visuelle intuitive
- Flexibilité de mise en page
- Prévisualisation en temps réel

### Concepts fondamentaux

**Le système de blocs :**
- **Chaque élément = un bloc** : Texte, image, bouton, etc.
- **Blocs empilables** : Construisez votre contenu bloc par bloc
- **Blocs configurables** : Chaque bloc a ses propres options

**Types de blocs principaux :**
- **Texte** : Paragraphe, titre, liste, citation
- **Média** : Image, galerie, audio, vidéo
- **Design** : Bouton, séparateur, espacement
- **Widgets** : Menu, calendrier, archives
- **Intégrations** : YouTube, Twitter, Instagram

### Interface de l'éditeur

**Zone principale :**
- **Titre** : En haut, zone de saisie du titre
- **Contenu** : Zone de création avec blocs
- **Bouton (+)** : Ajouter de nouveaux blocs

**Barre d'outils supérieure :**
- **Enregistrer** : Sauvegarde brouillon
- **Aperçu** : Visualisation frontend
- **Publier** : Mise en ligne
- **Options** : Menu à trois points (plus d'actions)

**Panneau latéral :**
- **Réglages du document** : Métadonnées (catégories, étiquettes)
- **Réglages du bloc** : Configuration du bloc sélectionné

### Créer du contenu avec des blocs

**Exercice : Article riche avec différents blocs**

1. **Nouveau titre d'article :**
   "Guide complet de découverte de WordPress"

2. **Introduction (bloc Paragraphe) :**
   ```
   WordPress est le CMS le plus populaire au monde. Dans ce guide, 
   nous allons explorer ses fonctionnalités principales et apprendre 
   à créer du contenu attrayant.
   ```

3. **Ajout d'un titre secondaire (bloc Titre) :**
   - Tapez "/" et "titre" pour trouver le bloc
   - Ou cliquez "+" > Titre
   - Sélectionnez niveau H2
   - Tapez : "Pourquoi choisir WordPress ?"

4. **Liste à puces (bloc Liste) :**
   ```
   • Facilité d'utilisation
   • Grande communauté
   • Milliers de thèmes et plugins
   • SEO-friendly
   • Open source et gratuit
   ```

5. **Citation (bloc Citation) :**
   ```
   "WordPress démocratise la publication web et rend possible 
   pour chacun de créer un site web professionnel."
   - Matt Mullenweg, co-fondateur de WordPress
   ```

6. **Image (bloc Image) :**
   - Ajoutez une image depuis votre médiathèque
   - Configurez le texte ALT
   - Ajoutez une légende

### Navigation entre les blocs

**Sélection des blocs :**
- **Clic simple** : Sélectionne et permet la saisie
- **Clic sur le bord** : Sélectionne tout le bloc
- **Flèches directionnelles** : Navigation entre blocs

**Barre d'outils des blocs :**
- **Déplacer** : Flèches haut/bas pour réorganiser
- **Type de bloc** : Transformer en autre type
- **Alignement** : Gauche, centre, droite, pleine largeur
- **Options** : Menu spécifique au bloc

**Raccourcis utiles :**
- **Ctrl+Z** : Annuler
- **Ctrl+Y** : Rétablir
- **/** : Insertion rapide de bloc
- **Enter** : Nouveau paragraphe
- **Shift+Enter** : Saut de ligne

---

## Commentaires et modération

### Système de commentaires WordPress

**Les commentaires enrichissent l'interaction :**
- Feedback des visiteurs
- Engagement communautaire
- Contenu généré par les utilisateurs
- Amélioration SEO (contenu frais)

### Interface de gestion

**Page "Commentaires" :**
- **En attente** : Commentaires non modérés
- **Approuvés** : Commentaires visibles publiquement
- **Spam** : Commentaires indésirables
- **Corbeille** : Commentaires supprimés

**Informations par commentaire :**
- **Auteur** : Nom et email du commentateur
- **Contenu** : Texte du commentaire
- **Article associé** : Où le commentaire a été posté
- **Date et heure** : Moment de soumission

### Actions de modération

**Actions au survol :**
- **Approuver** : Rendre visible publiquement
- **Non approuvé** : Masquer sans supprimer
- **Répondre** : Réponse directe depuis l'admin
- **Modification rapide** : Éditer le contenu
- **Modifier** : Édition complète
- **Spam** : Marquer comme indésirable
- **Corbeille** : Supprimer (récupérable)

**Modération en lot :**
1. Cochez plusieurs commentaires
2. Sélectionnez une action
3. Appliquez à tous simultanément

### Configuration des commentaires

**Réglages > Discussion :**
- **Autoriser les commentaires** : Sur nouveaux articles
- **Modération manuelle** : Avant publication
- **Notification email** : Recevoir alertes
- **Anti-spam** : Mots interdits, liens maximum

**Recommandations pour débuter :**
- Activez la modération manuelle
- Demandez nom et email
- Limitez les liens par commentaire
- Installez un plugin anti-spam (Akismet)

---

## Gestion des utilisateurs

### Rôles utilisateur WordPress

**Hiérarchie des rôles :**

**Abonné :**
- Lecture seule
- Gestion de son profil
- Commentaires

**Contributeur :**
- Rédaction d'articles
- Pas de publication directe
- Gestion de ses propres articles

**Auteur :**
- Publication d'articles
- Gestion de ses médias
- Suppression de ses articles

**Éditeur :**
- Gestion de tous les articles
- Modération des commentaires
- Gestion des catégories

**Administrateur :**
- Contrôle total du site
- Gestion des utilisateurs
- Installation plugins/thèmes
- Configuration du site

### Ajouter des utilisateurs

**Processus d'ajout :**
1. Utilisateurs > Ajouter
2. **Informations obligatoires :**
   - Identifiant
   - Email
   - Mot de passe
   - Rôle

3. **Informations optionnelles :**
   - Prénom et nom
   - Site web
   - Description biographique

**Bonnes pratiques :**
- Identifiants uniques et sécurisés
- Mots de passe forts obligatoires
- Attribution du rôle minimum nécessaire
- Validation des adresses email

### Gestion des profils

**Mon profil :**
- Informations personnelles
- Préférences d'affichage
- Couleurs d'administration
- Raccourcis clavier
- Changement de mot de passe

**Profil public :**
- Photo de profil (Gravatar)
- Informations biographiques
- Liens réseaux sociaux
- Page auteur automatique

---

## Réglages de base

### Réglages généraux

**Informations du site :**
- **Titre du site** : Apparaît dans l'onglet navigateur
- **Slogan** : Description courte du site
- **URL WordPress** : Adresse de votre installation
- **URL du site** : Adresse publique
- **Email d'administration** : Contact principal

**Configuration régionale :**
- **Langue** : Interface et contenu
- **Fuseau horaire** : Pour les dates de publication
- **Format de date** : Affichage des dates
- **Format d'heure** : Affichage des heures

### Réglages de lecture

**Page d'accueil :**
- **Derniers articles** : Blog classique
- **Page statique** : Site vitrine avec page d'accueil fixe

**Visibilité moteurs de recherche :**
- Option pour décourager l'indexation
- Utile pendant le développement
- À désactiver en production

**Nombre d'articles :**
- Articles par page de blog
- Articles dans les flux RSS

### Réglages d'écriture

**Format par défaut :**
- Catégorie par défaut
- Format d'article par défaut
- Services de mise à jour

**Services à distance :**
- Ping des moteurs de recherche
- Services de mise à jour
- APIs externes

### Réglages des permaliens

**Structure des URLs :**
- **Simple** : `?p=123` (non recommandé)
- **Date et titre** : `/2024/07/11/titre-article/`
- **Mois et titre** : `/2024/07/titre-article/`
- **Numérique** : `/archives/123`
- **Nom de l'article** : `/titre-article/` (recommandé)
- **Structure personnalisée** : Votre format

**Recommandation :**
Utilisez "Nom de l'article" pour :
- URLs lisibles et SEO-friendly
- Facilité de mémorisation
- Meilleure expérience utilisateur

---

## Exercices pratiques guidés

### Exercice 1 : Création de contenu complet

**Objectif :** Créer un article riche avec tous les éléments

**Instructions :**
1. **Créez un nouvel article :**
   - Titre : "Mon premier site WordPress avec Local"

2. **Structure de l'article :**
   ```
   Introduction (paragraphe)
   
   ## Installation de Local (titre H2)
   
   Liste des étapes :
   • Téléchargement de Local
   • Installation sur mon système
   • Création du premier site
   
   > Citation : "Local simplifie le développement WordPress local"
   
   Image : Capture d'écran de votre site
   
   ## Découverte de l'interface (titre H2)
   
   Paragraphe de conclusion
   ```

3. **Métadonnées :**
   - Catégorie : "Apprentissage WordPress"
   - Étiquettes : "local", "développement", "débutant"
   - Image mise en avant

4. **Publication :**
   - Prévisualisez avant publication
   - Publiez l'article
   - Vérifiez le rendu frontend

### Exercice 2 : Organisation de la médiathèque

**Objectif :** Organiser et optimiser vos médias

**Instructions :**
1. **Upload de médias variés :**
   - 5 images depuis Unsplash
   - 1 document PDF
   - 1 fichier audio (si disponible)

2. **Optimisation :**
   - Ajoutez ALT text à toutes les images
   - Rédigez des descriptions détaillées
   - Utilisez des noms de fichiers descriptifs

3. **Organisation :**
   - Testez les filtres par type
   - Recherchez un média par nom
   - Supprimez un média non utilisé

### Exercice 3 : Configuration du site

**Objectif :** Personnaliser les réglages de base

**Instructions :**
1. **Réglages généraux :**
   - Titre : "Mon Site WordPress d'Apprentissage"
   - Slogan : "Découverte et maîtrise de WordPress"
   - Email : Votre email réel

2. **Réglages de lecture :**
   - Page d'accueil : Derniers articles
   - Articles par page : 5
   - Flux RSS : 10 articles

3. **Permaliens :**
   - Structure : Nom de l'article
   - Testez les URLs générées

### Exercice 4 : Gestion des commentaires

**Objectif :** Configurer et modérer les commentaires

**Instructions :**
1. **Configuration :**
   - Réglages > Discussion
   - Activez modération manuelle
   - Exigez nom et email

2. **Test pratique :**
   - Visitez votre article publié
   - Postez un commentaire test
   - Modérez depuis l'administration

---

## Personnalisation de l'interface

### Personnaliser votre expérience

**Couleurs d'administration :**
1. Utilisateurs > Votre profil
2. Schéma de couleurs admin
3. Choisissez selon vos préférences
4. Sauvegardez les modifications

**Options d'écran personnalisées :**
- Masquez les widgets non utilisés du tableau de bord
- Configurez les colonnes dans les listes
- Adaptez selon votre workflow

**Barre d'outils :**
- Affichez/masquez la barre lors de la visite du site
- Personnalisez les raccourcis fréquents

### Raccourcis et efficacité

**Raccourcis clavier essentiels :**
- **Ctrl+S** : Enregistrer (brouillon)
- **Ctrl+P** : Prévisualiser
- **Alt+Shift+N** : Nouvel article/page
- **Alt+Shift+C** : Nouveaux commentaires
- **Alt+Shift+M** : Nouveaux médias

**Navigation rapide :**
- Utilisez la recherche globale
- Bookmarkez les pages fréquentes
- Organisez vos favoris par tâches

---

## Bonnes pratiques pour débuter

### Workflow de création de contenu

**Préparation :**
1. **Planifiez votre contenu** avant de commencer
2. **Préparez vos médias** (optimisés et nommés)
3. **Définissez catégories et étiquettes** à l'avance

**Création :**
1. **Rédigez d'abord le titre** pour fixer l'objectif
2. **Structurez avec des titres** (H2, H3)
3. **Ajoutez les médias** au fur et à mesure
4. **Relisez et corrigez** avant publication

**Publication :**
1. **Prévisualisez** sur différents appareils
2. **Vérifiez les métadonnées** (catégories, étiquettes)
3. **Configurez l'image mise en avant**
4. **Publiez ou planifiez** selon votre stratégie

### Organisation du contenu

**Structure logique :**
- **Catégories principales** : 3-7 maximum
- **Sous-catégories** si nécessaire
- **Étiquettes descriptives** : 5-10 par article maximum
- **Cohérence** dans la nomenclature

**Gestion des médias :**
- **Noms de fichiers** descriptifs avant upload
- **Tailles optimisées** selon l'usage
- **ALT text** systématique pour l'accessibilité
- **Nettoyage régulier** des médias non utilisés

### Sécurité de base

**Bonnes pratiques immédiates :**
- **Mots de passe forts** pour tous les comptes
- **Limitation des tentatives** de connexion
- **Mise à jour régulière** de WordPress
- **Sauvegarde** avant modifications importantes

**Rôles et permissions :**
- **Principe du moindre privilège** : Rôle minimum nécessaire
- **Révision régulière** des utilisateurs
- **Suppression des comptes** inactifs

---

## Résolution des problèmes courants

### Problèmes d'interface

**L'éditeur ne charge pas :**
1. Vérifiez la connexion Internet
2. Désactivez les extensions de navigateur
3. Videz le cache du navigateur
4. Essayez un autre navigateur

**Widgets manquants au tableau de bord :**
1. Cliquez "Options d'écran"
2. Cochez les widgets désirés
3. Actualisez la page

**Menu latéral cassé :**
1. Désactivez tous les plugins
2. Réactivez un par un pour identifier le conflit
3. Contactez le support du plugin problématique

### Problèmes de contenu

**Impossible de publier :**
1. Vérifiez vos permissions utilisateur
2. Testez avec un article simple
3. Désactivez temporairement les plugins
4. Vérifiez l'espace disque disponible

**Images ne s'affichent pas :**
1. Vérifiez les permissions du dossier uploads
2. Testez avec une image plus petite
3. Vérifiez le format de fichier supporté
4. Contrôlez l'espace disque

**Formatage perdu :**
1. Utilisez l'éditeur de blocs plutôt que l'éditeur classique
2. Évitez de copier-coller depuis Word
3. Utilisez la fonction "Coller sans formatage"

---

## Quiz de validation

### Questions de compréhension

1. **Quelle est la différence principale entre un article et une page dans WordPress ?**

2. **Citez 3 éléments de la barre d'administration WordPress et leur fonction.**

3. **Qu'est-ce que le texte ALT d'une image et pourquoi est-il important ?**

4. **Expliquez la différence entre catégories et étiquettes.**

5. **Quels sont les 5 rôles utilisateur WordPress et leurs permissions principales ?**

### Questions pratiques

6. **Comment personnalisez-vous l'affichage du tableau de bord WordPress ?**

7. **Décrivez le processus pour créer un article avec image mise en avant.**

8. **Comment modérez-vous un commentaire en attente d'approbation ?**

9. **Quelle structure de permaliens recommandez-vous et pourquoi ?**

10. **Comment organisez-vous efficacement votre médiathèque ?**

### Scénarios pratiques

11. **Un client veut une page "Services" avec 3 sous-pages. Comment procédez-vous ?**

12. **Vous devez créer 10 articles de blog. Quelle stratégie d'organisation adoptez-vous ?**

13. **Comment configurez-vous WordPress pour un blog personnel vs un site vitrine ?**

---

## Prochaines étapes

### Maîtrise approfondie

**Compétences à développer :**
1. **Éditeur de blocs avancé** : Patterns, blocs réutilisables
2. **Personnalisation de thèmes** : Customizer et Site Editor
3. **Extensions essentielles** : SEO, sécurité, performance
4. **Optimisation** : SEO, vitesse, accessibilité

### Projets recommandés

**Projet 1 : Blog personnel**
- 10 articles organisés en catégories
- Pages essentielles (À propos, Contact)
- Médiathèque organisée
- Commentaires modérés

**Projet 2 : Site vitrine**
- Page d'accueil statique
- Pages de services hiérarchiques
- Portfolio avec galeries
- Formulaire de contact

### Formation continue

**Ressources d'approfondissement :**
- [Learn WordPress - Intermediate User](https://learn.wordpress.org/course/intermediate-wordpress-user/)
- Documentation officielle WordPress
- Communauté WordPress francophone
- WordCamps et Meetups locaux

**Compétences suivantes :**
1. **Thèmes et personnalisation**
2. **Plugins et extensions**
3. **SEO et optimisation**
4. **Sécurité et maintenance**

---

## Conclusion

### Récapitulatif des compétences acquises

**Navigation et interface :**
- Maîtrise du tableau de bord WordPress
- Navigation efficace dans l'administration
- Personnalisation de l'interface selon vos besoins

**Création de contenu :**
- Différenciation articles/pages
- Utilisation de l'éditeur de blocs Gutenberg
- Organisation avec catégories et étiquettes
- Gestion complète de la médiathèque

**Administration de base :**
- Configuration des réglages essentiels
- Gestion des utilisateurs et permissions
- Modération des commentaires
- Bonnes pratiques de sécurité

### Votre progression WordPress

**Vous maîtrisez maintenant :**
- L'interface complète de WordPress
- La création de contenu riche et organisé
- Les concepts fondamentaux du CMS
- Les bonnes pratiques pour débuter

**Prochains défis :**
- Personnalisation visuelle avec les thèmes
- Extension des fonctionnalités avec les plugins
- Optimisation pour les moteurs de recherche
- Préparation au déploiement en ligne

### Message de félicitations

**Bravo !** Vous venez de franchir une étape cruciale dans votre apprentissage WordPress. La familiarisation avec l'interface est la base de tout développement réussi avec ce CMS.

**Votre site "Mon Site WordPress" est maintenant votre terrain d'expérimentation.** N'hésitez pas à créer, tester, modifier et recommencer. C'est en pratiquant que vous développerez votre aisance.

**La communauté WordPress vous accueille !** Vous faites maintenant partie des millions d'utilisateurs qui utilisent quotidiennement cette interface pour créer du contenu et gérer leurs sites web.

---

*Ce cours constitue la base indispensable pour tous les apprentissages WordPress suivants. Prenez le temps de pratiquer chaque fonctionnalité avant de passer aux cours suivants de votre parcours.*

**Sources principales :**
- [Learn WordPress - Getting Started with Dashboard](https://learn.wordpress.org/lesson/getting-started-with-the-wordpress-dashboard/)
- [Learn WordPress - Posts vs Pages](https://learn.wordpress.org/lesson/understanding-the-difference-between-wordpress-posts-and-pages/)
- [Learn WordPress - Media Library](https://learn.wordpress.org/lesson/using-the-media-library-2/)
- [WordPress.org Documentation](https://wordpress.org/documentation/)

**Créé le :** Juillet 2025  
**Niveau :** Débutant  
**Durée estimée :** 180-240 minutes + exercices pratiques  
**Site de démonstration :** Mon Site WordPress (Local)
