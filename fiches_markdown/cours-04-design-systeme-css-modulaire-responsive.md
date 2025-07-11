# Cours 010 : Design et Système CSS Modulaire Responsive

## Introduction

Le design de votre thème WordPress est crucial pour l'expérience utilisateur. Ce cours vous enseigne à créer un système CSS modulaire, maintenir une cohérence visuelle et assurer une parfaite adaptation sur tous les appareils.

## Objectifs d'apprentissage

- Créer une architecture CSS modulaire et scalable
- Maîtriser le responsive design avec CSS Grid et Flexbox
- Développer un système de design cohérent
- Optimiser les performances CSS
- Intégrer les meilleures pratiques d'accessibilité

## 1. Architecture CSS modulaire

### 1.1 Structure des fichiers CSS

```
assets/css/
├── style.css                    # Fichier principal (requis par WordPress)
├── components/
│   ├── _reset.css              # Reset CSS
│   ├── _variables.css          # Variables CSS custom properties
│   ├── _typography.css         # Typographie
│   ├── _buttons.css            # Styles des boutons
│   ├── _forms.css              # Styles des formulaires
│   ├── _navigation.css         # Navigation
│   ├── _header.css             # En-tête
│   ├── _footer.css             # Pied de page
│   ├── _sidebar.css            # Sidebar
│   └── _content.css            # Zone de contenu
├── layouts/
│   ├── _grid.css               # Système de grille
│   ├── _containers.css         # Conteneurs
│   └── _utilities.css          # Classes utilitaires
├── pages/
│   ├── _home.css               # Page d'accueil
│   ├── _single.css             # Article unique
│   ├── _archive.css            # Pages d'archives
│   └── _404.css                # Page 404
└── responsive/
    ├── _mobile.css             # Mobile
    ├── _tablet.css             # Tablette
    └── _desktop.css            # Desktop
```

### 1.2 Fichier style.css principal

```css
/*!
Theme Name: Mon Thème Personnalisé
Description: Un thème WordPress moderne et responsive créé avec Local WP et VS Code
Author: Votre Nom
Version: 1.0.0
Text Domain: mon-theme-personnalise
*/

/* ==========================================================================
   SOMMAIRE
   ========================================================================== */

/*
1. Variables CSS
2. Reset et base
3. Typographie
4. Composants
   4.1 Boutons
   4.2 Formulaires
   4.3 Navigation
5. Layout
   5.1 Grid système
   5.2 Header
   5.3 Main content
   5.4 Sidebar
   5.5 Footer
6. Pages spécifiques
7. Responsive design
8. Utilitaires
*/

/* ==========================================================================
   1. VARIABLES CSS
   ========================================================================== */

:root {
  /* Couleurs principales */
  --color-primary: #007cba;
  --color-primary-dark: #005a87;
  --color-primary-light: #4da6d9;
  
  /* Couleurs secondaires */
  --color-secondary: #333333;
  --color-secondary-light: #666666;
  --color-secondary-lighter: #999999;
  
  /* Couleurs système */
  --color-success: #28a745;
  --color-warning: #ffc107;
  --color-error: #dc3545;
  --color-info: #17a2b8;
  
  /* Couleurs d'arrière-plan */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8f9fa;
  --color-bg-dark: #343a40;
  
  /* Couleurs de texte */
  --color-text-primary: #333333;
  --color-text-secondary: #666666;
  --color-text-light: #999999;
  --color-text-white: #ffffff;
  
  /* Typographie */
  --font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-secondary: Georgia, 'Times New Roman', serif;
  --font-family-mono: 'Fira Code', Monaco, 'Cascadia Code', monospace;
  
  /* Tailles de police */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
  
  /* Espacement */
  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 1.5rem;    /* 24px */
  --space-xl: 2rem;      /* 32px */
  --space-2xl: 3rem;     /* 48px */
  --space-3xl: 4rem;     /* 64px */
  
  /* Bordures */
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.375rem;
  --border-radius-lg: 0.5rem;
  --border-radius-xl: 1rem;
  --border-width: 1px;
  
  /* Ombres */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Breakpoints */
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-xxl: 1400px;
  
  /* Transitions */
  --transition-fast: 0.15s ease-in-out;
  --transition-normal: 0.3s ease-in-out;
  --transition-slow: 0.6s ease-in-out;
}
```

### 1.3 Reset CSS moderne

```css
/* ==========================================================================
   2. RESET ET BASE
   ========================================================================== */

/* Reset CSS moderne inspiré de Normalize.css */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
  line-height: 1.6;
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Suppression des marges par défaut */
h1, h2, h3, h4, h5, h6,
p, blockquote, pre,
dl, dd, ol, ul,
figure, hr,
fieldset, legend {
  margin: 0;
}

/* Suppression du padding par défaut */
ol, ul {
  padding: 0;
}

/* Suppression des styles de liste */
ol, ul {
  list-style: none;
}

/* Images responsives par défaut */
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
  height: auto;
}

/* Amélioration de la typographie des éléments de formulaire */
input,
button,
textarea,
select {
  font: inherit;
}

/* Amélioration de l'affichage des liens */
a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover,
a:focus {
  color: var(--color-primary-dark);
  text-decoration: underline;
}

/* Focus visible pour l'accessibilité */
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

## 2. Système de typographie

### 2.1 Hiérarchie typographique

```css
/* ==========================================================================
   3. TYPOGRAPHIE
   ========================================================================== */

/* Hiérarchie des titres */
h1, .h1 {
  font-size: var(--font-size-5xl);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--space-lg);
  color: var(--color-text-primary);
}

h2, .h2 {
  font-size: var(--font-size-4xl);
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: var(--space-md);
  color: var(--color-text-primary);
}

h3, .h3 {
  font-size: var(--font-size-3xl);
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: var(--space-md);
  color: var(--color-text-primary);
}

h4, .h4 {
  font-size: var(--font-size-2xl);
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: var(--space-sm);
  color: var(--color-text-primary);
}

h5, .h5 {
  font-size: var(--font-size-xl);
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: var(--space-sm);
  color: var(--color-text-primary);
}

h6, .h6 {
  font-size: var(--font-size-lg);
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: var(--space-sm);
  color: var(--color-text-primary);
}

/* Styles de paragraphe */
p {
  margin-bottom: var(--space-md);
  color: var(--color-text-primary);
}

.lead {
  font-size: var(--font-size-lg);
  font-weight: 300;
  color: var(--color-text-secondary);
}

.small {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

/* Éléments inline */
strong, b {
  font-weight: 600;
}

em, i {
  font-style: italic;
}

code {
  font-family: var(--font-family-mono);
  font-size: 0.875em;
  background-color: var(--color-bg-secondary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  color: var(--color-primary-dark);
}

/* Blocs de citation */
blockquote {
  font-size: var(--font-size-lg);
  font-style: italic;
  margin: var(--space-xl) 0;
  padding: var(--space-lg);
  border-left: 4px solid var(--color-primary);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-secondary);
}

blockquote cite {
  display: block;
  font-size: var(--font-size-sm);
  font-style: normal;
  margin-top: var(--space-sm);
  color: var(--color-text-light);
}

blockquote cite::before {
  content: "— ";
}
```

### 2.2 Classes utilitaires typographiques

```css
/* Classes utilitaires de texte */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }
.text-justify { text-align: justify; }

.text-uppercase { text-transform: uppercase; }
.text-lowercase { text-transform: lowercase; }
.text-capitalize { text-transform: capitalize; }

.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-text-secondary); }
.text-success { color: var(--color-success); }
.text-warning { color: var(--color-warning); }
.text-error { color: var(--color-error); }
.text-white { color: var(--color-text-white); }

.font-weight-light { font-weight: 300; }
.font-weight-normal { font-weight: 400; }
.font-weight-medium { font-weight: 500; }
.font-weight-semibold { font-weight: 600; }
.font-weight-bold { font-weight: 700; }

.line-height-tight { line-height: 1.2; }
.line-height-normal { line-height: 1.6; }
.line-height-loose { line-height: 2; }
```

## 3. Système de composants

### 3.1 Boutons

```css
/* ==========================================================================
   4.1 BOUTONS
   ========================================================================== */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-sm) var(--space-lg);
  font-size: var(--font-size-base);
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  border: var(--border-width) solid transparent;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  user-select: none;
  white-space: nowrap;
}

.btn:focus {
  outline: 0;
  box-shadow: 0 0 0 3px rgba(0, 124, 186, 0.25);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Variantes de boutons */
.btn-primary {
  color: var(--color-text-white);
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.btn-primary:hover,
.btn-primary:focus {
  color: var(--color-text-white);
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  text-decoration: none;
}

.btn-secondary {
  color: var(--color-text-primary);
  background-color: var(--color-bg-secondary);
  border-color: var(--color-secondary-lighter);
}

.btn-secondary:hover,
.btn-secondary:focus {
  color: var(--color-text-primary);
  background-color: var(--color-secondary-lighter);
  border-color: var(--color-secondary);
  text-decoration: none;
}

.btn-outline-primary {
  color: var(--color-primary);
  background-color: transparent;
  border-color: var(--color-primary);
}

.btn-outline-primary:hover,
.btn-outline-primary:focus {
  color: var(--color-text-white);
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  text-decoration: none;
}

/* Tailles de boutons */
.btn-sm {
  padding: var(--space-xs) var(--space-md);
  font-size: var(--font-size-sm);
}

.btn-lg {
  padding: var(--space-md) var(--space-xl);
  font-size: var(--font-size-lg);
}

.btn-block {
  display: block;
  width: 100%;
}

/* Groupe de boutons */
.btn-group {
  display: inline-flex;
  vertical-align: middle;
}

.btn-group .btn {
  border-radius: 0;
  margin-left: -1px;
}

.btn-group .btn:first-child {
  border-top-left-radius: var(--border-radius-md);
  border-bottom-left-radius: var(--border-radius-md);
}

.btn-group .btn:last-child {
  border-top-right-radius: var(--border-radius-md);
  border-bottom-right-radius: var(--border-radius-md);
}
```

### 3.2 Formulaires

```css
/* ==========================================================================
   4.2 FORMULAIRES
   ========================================================================== */

.form-group {
  margin-bottom: var(--space-lg);
}

.form-label {
  display: block;
  margin-bottom: var(--space-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}

.form-control {
  display: block;
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-base);
  line-height: 1.5;
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
  border: var(--border-width) solid var(--color-secondary-lighter);
  border-radius: var(--border-radius-md);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-control:focus {
  outline: 0;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 124, 186, 0.25);
}

.form-control::placeholder {
  color: var(--color-text-light);
  opacity: 1;
}

.form-control:disabled {
  background-color: var(--color-bg-secondary);
  opacity: 1;
}

/* Textarea */
textarea.form-control {
  resize: vertical;
  min-height: 120px;
}

/* Select */
.form-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 6 7 7 7-7'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right var(--space-md) center;
  background-size: 16px 12px;
  padding-right: var(--space-3xl);
}

/* Checkbox et Radio */
.form-check {
  display: block;
  margin-bottom: var(--space-sm);
  padding-left: var(--space-xl);
  position: relative;
}

.form-check-input {
  position: absolute;
  left: 0;
  top: 0.25rem;
  width: 1rem;
  height: 1rem;
  margin: 0;
  cursor: pointer;
}

.form-check-label {
  cursor: pointer;
  margin-bottom: 0;
}

/* Messages de validation */
.form-text {
  margin-top: var(--space-xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.is-valid .form-control {
  border-color: var(--color-success);
}

.is-invalid .form-control {
  border-color: var(--color-error);
}

.valid-feedback {
  display: block;
  width: 100%;
  margin-top: var(--space-xs);
  font-size: var(--font-size-sm);
  color: var(--color-success);
}

.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: var(--space-xs);
  font-size: var(--font-size-sm);
  color: var(--color-error);
}
```

### 3.3 Navigation

```css
/* ==========================================================================
   4.3 NAVIGATION
   ========================================================================== */

.navbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-lg) 0;
  background-color: var(--color-bg-primary);
  border-bottom: var(--border-width) solid var(--color-bg-secondary);
}

.navbar-brand {
  display: flex;
  align-items: center;
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  text-decoration: none;
}

.navbar-brand:hover,
.navbar-brand:focus {
  color: var(--color-primary);
  text-decoration: none;
}

.navbar-nav {
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: block;
  padding: var(--space-sm) var(--space-md);
  color: var(--color-text-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.nav-link:hover,
.nav-link:focus {
  color: var(--color-primary);
  text-decoration: none;
}

.nav-link.active {
  color: var(--color-primary);
  font-weight: 500;
}

/* Menu déroulant */
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 200px;
  padding: var(--space-sm) 0;
  margin: 0;
  background-color: var(--color-bg-primary);
  border: var(--border-width) solid var(--color-bg-secondary);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all var(--transition-fast);
}

.dropdown:hover .dropdown-menu,
.dropdown.show .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  color: var(--color-text-primary);
  text-decoration: none;
  transition: background-color var(--transition-fast);
}

.dropdown-item:hover,
.dropdown-item:focus {
  background-color: var(--color-bg-secondary);
  color: var(--color-primary);
  text-decoration: none;
}

/* Menu mobile */
.navbar-toggler {
  display: none;
  padding: var(--space-xs);
  background: none;
  border: var(--border-width) solid var(--color-secondary-lighter);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
}

.navbar-toggler-icon {
  display: block;
  width: 24px;
  height: 18px;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2833, 37, 41, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
```

## 4. Système de grille responsive

### 4.1 Container et grid

```css
/* ==========================================================================
   5.1 GRID SYSTÈME
   ========================================================================== */

.container {
  width: 100%;
  padding-right: var(--space-md);
  padding-left: var(--space-md);
  margin-right: auto;
  margin-left: auto;
}

.container-fluid {
  width: 100%;
  padding-right: var(--space-md);
  padding-left: var(--space-md);
  margin-right: auto;
  margin-left: auto;
}

/* Breakpoints containers */
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

@media (min-width: 1400px) {
  .container {
    max-width: 1320px;
  }
}

/* Système de grille CSS Grid */
.grid {
  display: grid;
  gap: var(--space-lg);
}

.grid-1 { grid-template-columns: 1fr; }
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }
.grid-auto { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }

/* Système flexbox pour layouts plus complexes */
.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.flex-column {
  flex-direction: column;
}

.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }

.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }
.items-stretch { align-items: stretch; }

.flex-1 { flex: 1; }
.flex-auto { flex: auto; }
.flex-none { flex: none; }
```

## 5. Responsive design avancé

### 5.1 Media queries et approche mobile-first

```css
/* ==========================================================================
   7. RESPONSIVE DESIGN
   ========================================================================== */

/* Mobile-first: styles de base pour mobile */

/* Navigation mobile */
@media (max-width: 767.98px) {
  .navbar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .navbar-toggler {
    display: block;
    align-self: flex-end;
    margin-bottom: var(--space-md);
  }
  
  .navbar-nav {
    flex-direction: column;
    width: 100%;
    display: none;
  }
  
  .navbar-nav.show {
    display: flex;
  }
  
  .nav-link {
    padding: var(--space-md);
    border-bottom: var(--border-width) solid var(--color-bg-secondary);
  }
  
  .dropdown-menu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
    border: none;
    background-color: var(--color-bg-secondary);
  }
  
  /* Grille responsive */
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }
  
  /* Typographie mobile */
  h1, .h1 { font-size: var(--font-size-3xl); }
  h2, .h2 { font-size: var(--font-size-2xl); }
  h3, .h3 { font-size: var(--font-size-xl); }
  
  /* Espacement mobile */
  .container {
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  }
}

/* Tablette */
@media (min-width: 768px) {
  .grid-2-md { grid-template-columns: repeat(2, 1fr); }
  .grid-3-md { grid-template-columns: repeat(3, 1fr); }
  
  .flex-md-row { flex-direction: row; }
  .flex-md-column { flex-direction: column; }
  
  /* Navigation tablette */
  .navbar-nav {
    flex-direction: row;
  }
  
  .dropdown-menu {
    position: absolute;
  }
}

/* Desktop */
@media (min-width: 992px) {
  .grid-3-lg { grid-template-columns: repeat(3, 1fr); }
  .grid-4-lg { grid-template-columns: repeat(4, 1fr); }
  
  /* Hover effects pour desktop uniquement */
  .btn:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
  
  .card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
}

/* Large desktop */
@media (min-width: 1200px) {
  .grid-4-xl { grid-template-columns: repeat(4, 1fr); }
  .grid-6-xl { grid-template-columns: repeat(6, 1fr); }
}
```

### 5.2 Classes utilitaires responsive

```css
/* Classes utilitaires responsive */
@media (max-width: 767.98px) {
  .d-sm-none { display: none !important; }
  .d-sm-block { display: block !important; }
  .d-sm-flex { display: flex !important; }
  
  .text-sm-center { text-align: center !important; }
  .text-sm-left { text-align: left !important; }
  
  .mb-sm-0 { margin-bottom: 0 !important; }
  .mb-sm-1 { margin-bottom: var(--space-xs) !important; }
  .mb-sm-2 { margin-bottom: var(--space-sm) !important; }
  .mb-sm-3 { margin-bottom: var(--space-md) !important; }
  .mb-sm-4 { margin-bottom: var(--space-lg) !important; }
  .mb-sm-5 { margin-bottom: var(--space-xl) !important; }
}

@media (min-width: 768px) {
  .d-md-none { display: none !important; }
  .d-md-block { display: block !important; }
  .d-md-flex { display: flex !important; }
  
  .text-md-center { text-align: center !important; }
  .text-md-left { text-align: left !important; }
}

@media (min-width: 992px) {
  .d-lg-none { display: none !important; }
  .d-lg-block { display: block !important; }
  .d-lg-flex { display: flex !important; }
}
```

## 6. Optimisation et performance

### 6.1 CSS critique et chargement optimisé

```php
// Dans functions.php - Chargement CSS optimisé
function mon_theme_enqueue_styles() {
    // CSS critique inline pour le above-the-fold
    $critical_css = get_template_directory() . '/assets/css/critical.css';
    if (file_exists($critical_css)) {
        echo '<style>';
        echo file_get_contents($critical_css);
        echo '</style>';
    }
    
    // CSS non-critique en defer
    wp_enqueue_style(
        'mon-theme-style',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get('Version'),
        'all'
    );
    
    // Preload des polices importantes
    echo '<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">';
}
```

### 6.2 Variables CSS pour la personnalisation

```css
/* Variables dynamiques via Customizer */
:root {
  --color-primary: <?php echo get_theme_mod('primary_color', '#007cba'); ?>;
  --color-secondary: <?php echo get_theme_mod('secondary_color', '#333333'); ?>;
  --font-family-primary: <?php echo get_theme_mod('primary_font', 'Inter, sans-serif'); ?>;
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: #1a1a1a;
    --color-bg-secondary: #2d2d2d;
    --color-text-primary: #ffffff;
    --color-text-secondary: #cccccc;
    --color-text-light: #999999;
  }
}

/* Respecter les préférences de mouvement */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Exercices pratiques

### Exercice 1 : Système CSS modulaire
1. Créer la structure de fichiers CSS proposée
2. Implémenter le système de variables CSS
3. Créer des composants réutilisables

### Exercice 2 : Responsive design
1. Développer une grille responsive avec CSS Grid
2. Adapter la navigation pour mobile
3. Tester sur différents appareils

### Exercice 3 : Composants interactifs
1. Créer des boutons avec animations
2. Développer un système de formulaires complet
3. Implémenter des cartes avec effets hover

### Exercice 4 : Performance CSS
1. Optimiser le chargement des styles
2. Implémenter le CSS critique
3. Tester les performances avec Lighthouse

## Points clés à retenir

- Une architecture CSS modulaire facilite la maintenance
- Les variables CSS permettent une personnalisation facile
- L'approche mobile-first assure une bonne expérience utilisateur
- Les composants réutilisables accélèrent le développement
- L'optimisation des performances CSS est cruciale
- L'accessibilité doit être intégrée dès le design

## Prochaine étape

Dans le **Cours 5**, nous nous concentrerons sur l'intégration WordPress avancée avec les custom post types, les custom fields et l'utilisation d'ACF pour créer des expériences de contenu riches et flexibles.
