# Cours 007 : Préparation de l'Environnement de Développement pour Thèmes WordPress

## Introduction

Ce premier cours vous guide dans la mise en place d'un environnement de développement professionnel pour créer des thèmes WordPress personnalisés. Nous utiliserons Local WP et Visual Studio Code pour un workflow optimisé.

## Objectifs d'apprentissage

- Configurer Local WP pour le développement de thèmes
- Optimiser Visual Studio Code pour WordPress
- Comprendre la structure d'un site WordPress local
- Préparer les outils de développement essentiels

## 1. Configuration de Local WP

### 1.1 Vérification de l'installation existante

Puisque vous avez déjà créé "Mon Site WordPress" avec Local WP, vérifions la configuration :

1. **Ouvrir Local WP**
2. **Localiser votre site "Mon Site WordPress"**
3. **Vérifier les informations** :
   - URL locale (ex: http://mon-site-wordpress.local)
   - Version de PHP (recommandé : 8.1 ou supérieur)
   - Version de WordPress (recommandé : dernière version)

### 1.2 Optimisation de la configuration pour le développement

1. **Clic droit sur votre site** dans Local WP
2. **Sélectionner "Open site shell"** pour accéder au terminal
3. **Activer le mode debug** en modifiant wp-config.php :

```php
// Ajouter ces lignes dans wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
define('SCRIPT_DEBUG', true);
```

### 1.3 Structure des dossiers WordPress

Familiarisez-vous avec l'arborescence de votre site local :

```
mon-site-wordpress/
├── app/
│   └── public/              # Racine WordPress
│       ├── wp-content/
│       │   ├── themes/      # Dossier des thèmes (notre zone de travail)
│       │   ├── plugins/
│       │   └── uploads/
│       ├── wp-admin/
│       ├── wp-includes/
│       └── wp-config.php
└── logs/
    └── php/
        └── error.log        # Logs d'erreurs pour debugging
```

## 2. Configuration de Visual Studio Code

### 2.1 Extensions essentielles pour WordPress

Installez ces extensions dans VS Code :

1. **PHP Intelephense** (bmewburn.vscode-intelephense-client)
   - Autocomplétion et analyse PHP avancée
   
2. **WordPress Snippets** (wordpresstoolbox.wordpress-toolbox)
   - Snippets pour fonctions WordPress courantes
   
3. **Bracket Pair Colorizer** (coenraads.bracket-pair-colorizer)
   - Aide visuelle pour les brackets
   
4. **Auto Rename Tag** (formulahendry.auto-rename-tag)
   - Renommage automatique des balises HTML
   
5. **Live Server** (ritwickdey.liveserver)
   - Prévisualisation en temps réel des modifications CSS
   
6. **GitLens** (eamodio.gitlens)
   - Gestion avancée de Git
   
7. **Path Intellisense** (christian-kohler.path-intellisense)
   - Autocomplétion des chemins de fichiers

### 2.2 Configuration de l'espace de travail

1. **Ouvrir le dossier themes dans VS Code** :
   - Fichier > Ouvrir le dossier
   - Naviguer vers : `mon-site-wordpress/app/public/wp-content/themes/`

2. **Créer un fichier de configuration** `.vscode/settings.json` :

```json
{
    "editor.tabSize": 4,
    "editor.insertSpaces": true,
    "files.associations": {
        "*.php": "php"
    },
    "emmet.includeLanguages": {
        "php": "html"
    },
    "php.suggest.basic": false,
    "intelephense.files.associations": [
        "*.php",
        "*.phtml"
    ],
    "intelephense.environment.includePaths": [
        "/path/to/wordpress/"
    ]
}
```

### 2.3 Configuration du debugging PHP

1. **Installer l'extension PHP Debug** (xdebug.php-debug)

2. **Configurer le fichier launch.json** :

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Listen for Xdebug",
            "type": "php",
            "request": "launch",
            "port": 9003,
            "pathMappings": {
                "/app/public": "${workspaceFolder}/../../../"
            }
        }
    ]
}
```

## 3. Outils de développement complémentaires

### 3.1 Git pour le contrôle de version

1. **Initialiser un repository Git** dans le dossier themes :
```bash
cd /path/to/themes
git init
```

2. **Créer un .gitignore** approprié :
```
# WordPress
wp-config.php
wp-content/uploads/
*.log

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Dependencies
node_modules/
vendor/
```

### 3.2 Navigateur et outils de développement

1. **Installer les extensions navigateur** :
   - **Web Developer** (Chrome/Firefox)
   - **WordPress Admin Bar Control** (Chrome)
   - **Query Monitor** (extension WordPress)

2. **Configurer les DevTools** :
   - Activer l'inspection d'éléments
   - Configurer les breakpoints CSS
   - Utiliser la vue responsive

### 3.3 Documentation et références

Marquez ces ressources dans vos favoris :

1. **Documentation officielle** :
   - https://developer.wordpress.org/themes/
   - https://codex.wordpress.org/

2. **Références de fonctions** :
   - https://developer.wordpress.org/reference/
   - https://hookr.io/ (hooks et filtres)

3. **Validation et tests** :
   - https://validator.w3.org/ (HTML)
   - https://jigsaw.w3.org/css-validator/ (CSS)

## 4. Préparation du premier thème

### 4.1 Structure de base d'un thème WordPress

Créez cette structure dans le dossier themes :

```
mon-theme-personnalise/
├── style.css           # Feuille de style principale (obligatoire)
├── index.php          # Template principal (obligatoire)
├── functions.php      # Fonctions du thème
├── header.php         # En-tête du site
├── footer.php         # Pied de page
├── sidebar.php        # Barre latérale
├── single.php         # Template pour articles individuels
├── page.php           # Template pour pages statiques
├── archive.php        # Template pour archives
├── 404.php           # Page d'erreur 404
├── screenshot.png     # Capture d'écran du thème (1200x900px)
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── inc/              # Fichiers d'inclusion personnalisés
    └── customizer.php
```

### 4.2 Fichier style.css de base

Créez le fichier `style.css` avec les métadonnées requises :

```css
/*
Theme Name: Mon Thème Personnalisé
Description: Un thème WordPress personnalisé créé pour l'apprentissage
Author: Votre Nom
Version: 1.0.0
License: GPL v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: mon-theme-personnalise
*/

/* Reset CSS de base */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
}

/* Styles de base pour le développement */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}
```

## 5. Tests et validation

### 5.1 Vérification de l'environnement

1. **Tester l'accès au site** : http://mon-site-wordpress.local
2. **Vérifier l'administration** : /wp-admin
3. **Contrôler les logs d'erreurs** dans Local WP
4. **Tester la synchronisation** VS Code <-> Local WP

### 5.2 Checklist de validation

- [ ] Local WP fonctionne correctement
- [ ] Site accessible en local
- [ ] VS Code configuré avec extensions
- [ ] Debugging activé
- [ ] Git initialisé
- [ ] Structure de thème créée
- [ ] Documentation accessible

## Exercices pratiques

### Exercice 1 : Configuration de base
1. Créer un dossier `mon-premier-theme` dans wp-content/themes/
2. Ajouter un fichier style.css avec les métadonnées correctes
3. Créer un index.php minimal
4. Activer le thème dans l'administration WordPress

### Exercice 2 : Test de l'environnement
1. Modifier le style.css et observer les changements
2. Créer une erreur PHP volontaire et vérifier les logs
3. Utiliser l'inspecteur du navigateur pour examiner le HTML généré

## Ressources pour aller plus loin

1. **Documentation Local WP** : https://localwp.com/help-docs/
2. **VS Code Tips** : https://code.visualstudio.com/docs/languages/php
3. **WordPress Coding Standards** : https://developer.wordpress.org/coding-standards/

## Prochaine étape

Dans le **Cours 2**, nous aborderons les concepts fondamentaux des thèmes WordPress, la hiérarchie des templates et la création des premiers fichiers template.

---

**Points clés à retenir** :
- Un environnement bien configuré est essentiel pour un développement efficace
- Les outils de debugging vous feront gagner énormément de temps
- La structure de dossiers WordPress suit des conventions précises
- VS Code avec les bonnes extensions améliore considérablement la productivité
