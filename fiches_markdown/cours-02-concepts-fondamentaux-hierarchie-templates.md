# Cours 008 : Concepts Fondamentaux et Hiérarchie des Templates WordPress

## Introduction

Ce cours vous enseigne les concepts essentiels pour comprendre le fonctionnement interne des thèmes WordPress. Vous apprendrez la hiérarchie des templates, le système de hooks et la différence entre Block Themes et Classic Themes.

## Objectifs d'apprentissage

- Comprendre la hiérarchie des templates WordPress
- Maîtriser le système de hooks et filtres
- Différencier Block Themes et Classic Themes
- Créer vos premiers templates fonctionnels
- Comprendre le flux de données WordPress

## 1. Types de thèmes WordPress

### 1.1 Block Themes (Moderne - WordPress 5.9+)

**Caractéristiques** :
- Basés sur le système de blocs Gutenberg
- Utilisent le fichier `theme.json` pour la configuration
- Templates en HTML avec blocs
- Édition visuelle complète via le Site Editor
- Idéal pour les utilisateurs non-techniques

**Structure de base** :
```
mon-block-theme/
├── style.css
├── index.html          # Template principal en HTML
├── theme.json          # Configuration globale
├── templates/
│   ├── index.html
│   ├── single.html
│   └── page.html
├── parts/
│   ├── header.html
│   └── footer.html
└── patterns/           # Motifs de blocs réutilisables
```

### 1.2 Classic Themes (Traditionnel)

**Caractéristiques** :
- Basés sur PHP, HTML, CSS et JavaScript
- Contrôle total sur le code
- Utilisation des hooks et filtres WordPress
- Compatible avec toutes les versions WordPress
- Préféré par les développeurs expérimentés

**Structure de base** :
```
mon-classic-theme/
├── style.css
├── index.php           # Template principal en PHP
├── functions.php       # Fonctions du thème
├── header.php
├── footer.php
├── single.php
├── page.php
└── assets/
    ├── css/
    ├── js/
    └── images/
```

**Note** : Pour ce cours, nous nous concentrerons sur les **Classic Themes** car ils offrent plus de flexibilité pour l'apprentissage.

## 2. Hiérarchie des templates WordPress

### 2.1 Principe de fonctionnement

WordPress utilise un système de hiérarchie pour déterminer quel template utiliser pour afficher une page. Il cherche les fichiers dans cet ordre de priorité :

```
Type de page → Template spécifique → Template générique → index.php
```

### 2.2 Hiérarchie complète

#### Page d'accueil
```
front-page.php → home.php → index.php
```

#### Article individuel
```
single-{post-type}-{slug}.php 
→ single-{post-type}.php 
→ single.php 
→ singular.php 
→ index.php
```

#### Page statique
```
page-{slug}.php 
→ page-{id}.php 
→ page-{template}.php 
→ page.php 
→ singular.php 
→ index.php
```

#### Archive de catégorie
```
category-{slug}.php 
→ category-{id}.php 
→ category.php 
→ archive.php 
→ index.php
```

#### Archive d'étiquettes
```
tag-{slug}.php 
→ tag-{id}.php 
→ tag.php 
→ archive.php 
→ index.php
```

#### Résultats de recherche
```
search.php → index.php
```

#### Page 404
```
404.php → index.php
```

### 2.3 Fonction wp_get_theme_template_hierarchy()

Pour déboguer quel template est utilisé, ajoutez cette fonction dans `functions.php` :

```php
function debug_template_hierarchy() {
    if (current_user_can('administrator')) {
        global $template;
        echo '<div style="background: #333; color: #fff; padding: 10px; position: fixed; top: 0; right: 0; z-index: 9999;">';
        echo 'Template utilisé : ' . basename($template);
        echo '</div>';
    }
}
add_action('wp_footer', 'debug_template_hierarchy');
```

## 3. Anatomie d'un template WordPress

### 3.1 Structure de base d'un template

Chaque template PHP suit cette structure :

```php
<?php
/**
 * Template Name: Nom du Template (optionnel)
 * Description: Description du template
 */

// Sécurité : empêcher l'accès direct
if (!defined('ABSPATH')) {
    exit;
}

get_header(); ?>

<main id="main" class="site-main">
    <?php
    // Boucle WordPress principale
    if (have_posts()) :
        while (have_posts()) :
            the_post();
            // Affichage du contenu
        endwhile;
    else :
        // Contenu si aucun article trouvé
    endif;
    ?>
</main>

<?php
get_sidebar();
get_footer();
?>
```

### 3.2 La Boucle WordPress (The Loop)

La boucle est le cœur de WordPress. Elle récupère et affiche les articles :

```php
<?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <header class="entry-header">
                <h1 class="entry-title">
                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                </h1>
                <div class="entry-meta">
                    Publié le <?php the_date(); ?> par <?php the_author(); ?>
                </div>
            </header>
            
            <div class="entry-content">
                <?php the_content(); ?>
            </div>
            
            <footer class="entry-footer">
                Catégories : <?php the_category(', '); ?>
                Étiquettes : <?php the_tags('', ', '); ?>
            </footer>
        </article>
    <?php endwhile; ?>
    
    <!-- Navigation pagination -->
    <div class="navigation">
        <?php posts_nav_link(); ?>
    </div>
    
<?php else : ?>
    <p>Aucun article trouvé.</p>
<?php endif; ?>
```

## 4. Système de hooks et filtres

### 4.1 Concepts de base

WordPress utilise un système d'événements appelé "hooks" :

- **Actions** : Exécutent du code à des moments précis
- **Filtres** : Modifient des données avant affichage

### 4.2 Actions principales

```php
// Dans functions.php

// Charger les styles et scripts
function mon_theme_enqueue_scripts() {
    wp_enqueue_style('mon-theme-style', get_stylesheet_uri());
    wp_enqueue_script('mon-theme-script', get_template_directory_uri() . '/assets/js/script.js');
}
add_action('wp_enqueue_scripts', 'mon_theme_enqueue_scripts');

// Ajouter le support des fonctionnalités
function mon_theme_setup() {
    // Support des images à la une
    add_theme_support('post-thumbnails');
    
    // Support des menus
    add_theme_support('menus');
    
    // Support du titre dynamique
    add_theme_support('title-tag');
    
    // Support des formats d'articles
    add_theme_support('post-formats', array('gallery', 'video', 'audio'));
}
add_action('after_setup_theme', 'mon_theme_setup');

// Enregistrer les zones de menus
function mon_theme_register_menus() {
    register_nav_menus(array(
        'primary' => 'Menu principal',
        'footer' => 'Menu pied de page'
    ));
}
add_action('init', 'mon_theme_register_menus');
```

### 4.3 Filtres utiles

```php
// Modifier l'extrait automatique
function mon_theme_custom_excerpt_length($length) {
    return 30; // 30 mots au lieu de 55
}
add_filter('excerpt_length', 'mon_theme_custom_excerpt_length');

// Modifier le texte "Lire la suite"
function mon_theme_excerpt_more($more) {
    return '... <a href="' . get_permalink() . '">Lire la suite</a>';
}
add_filter('excerpt_more', 'mon_theme_excerpt_more');

// Ajouter des classes CSS personnalisées au body
function mon_theme_body_classes($classes) {
    if (is_home()) {
        $classes[] = 'page-accueil';
    }
    return $classes;
}
add_filter('body_class', 'mon_theme_body_classes');
```

## 5. Création des templates essentiels

### 5.1 header.php

```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <header id="masthead" class="site-header">
        <div class="container">
            <div class="site-branding">
                <?php if (has_custom_logo()) : ?>
                    <?php the_custom_logo(); ?>
                <?php else : ?>
                    <h1 class="site-title">
                        <a href="<?php echo esc_url(home_url('/')); ?>">
                            <?php bloginfo('name'); ?>
                        </a>
                    </h1>
                    <p class="site-description"><?php bloginfo('description'); ?></p>
                <?php endif; ?>
            </div>
            
            <nav id="site-navigation" class="main-navigation">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_id' => 'primary-menu',
                    'menu_class' => 'nav-menu',
                    'fallback_cb' => false
                ));
                ?>
            </nav>
        </div>
    </header>
    
    <div id="content" class="site-content">
```

### 5.2 footer.php

```php
    </div><!-- #content -->
    
    <footer id="colophon" class="site-footer">
        <div class="container">
            <div class="footer-widgets">
                <?php if (is_active_sidebar('footer-1')) : ?>
                    <div class="footer-widget">
                        <?php dynamic_sidebar('footer-1'); ?>
                    </div>
                <?php endif; ?>
                
                <?php if (is_active_sidebar('footer-2')) : ?>
                    <div class="footer-widget">
                        <?php dynamic_sidebar('footer-2'); ?>
                    </div>
                <?php endif; ?>
            </div>
            
            <div class="site-info">
                <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. Tous droits réservés.</p>
            </div>
            
            <?php
            wp_nav_menu(array(
                'theme_location' => 'footer',
                'menu_class' => 'footer-menu',
                'depth' => 1,
                'fallback_cb' => false
            ));
            ?>
        </div>
    </footer>
</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>
```

### 5.3 index.php

```php
<?php
get_header(); ?>

<main id="main" class="site-main">
    <div class="container">
        <?php if (have_posts()) : ?>
            <header class="page-header">
                <h1 class="page-title">
                    <?php
                    if (is_home() && !is_front_page()) :
                        single_post_title();
                    elseif (is_home() && is_front_page()) :
                        echo 'Derniers articles';
                    else :
                        echo 'Archives';
                    endif;
                    ?>
                </h1>
            </header>
            
            <div class="posts-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('post-card'); ?>>
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="post-thumbnail">
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_post_thumbnail('medium'); ?>
                                </a>
                            </div>
                        <?php endif; ?>
                        
                        <div class="post-content">
                            <header class="entry-header">
                                <h2 class="entry-title">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h2>
                                <div class="entry-meta">
                                    <time datetime="<?php echo get_the_date('c'); ?>">
                                        <?php echo get_the_date(); ?>
                                    </time>
                                    <span class="author">par <?php the_author(); ?></span>
                                </div>
                            </header>
                            
                            <div class="entry-summary">
                                <?php the_excerpt(); ?>
                            </div>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
            
            <div class="pagination">
                <?php
                the_posts_pagination(array(
                    'prev_text' => 'Précédent',
                    'next_text' => 'Suivant'
                ));
                ?>
            </div>
            
        <?php else : ?>
            <div class="no-posts">
                <h1>Aucun contenu trouvé</h1>
                <p>Il semble qu'il n'y ait rien ici. Voulez-vous essayer un lien ci-dessous ou une recherche ?</p>
                <?php get_search_form(); ?>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php get_footer(); ?>
```

## 6. Fonctions essentielles WordPress

### 6.1 Fonctions d'affichage du contenu

```php
// Titre de l'article/page
the_title();                    // Affiche le titre
get_the_title();               // Retourne le titre

// Contenu
the_content();                 // Affiche le contenu complet
the_excerpt();                 // Affiche l'extrait
get_the_content();            // Retourne le contenu

// Métadonnées
the_author();                 // Nom de l'auteur
the_date();                   // Date de publication
the_category();               // Catégories
the_tags();                   // Étiquettes

// Images
the_post_thumbnail();         // Image à la une
has_post_thumbnail();         // Vérifie s'il y a une image à la une
```

### 6.2 Fonctions de navigation

```php
// Permaliens
the_permalink();              // URL de l'article
get_permalink();              // Retourne l'URL

// Navigation
posts_nav_link();             // Navigation simple
the_posts_pagination();       // Pagination avancée
wp_nav_menu();               // Affichage des menus
```

### 6.3 Fonctions conditionnelles

```php
// Type de page
is_home();                    // Page d'accueil du blog
is_front_page();             // Page d'accueil du site
is_single();                 // Article individuel
is_page();                   // Page statique
is_archive();                // Page d'archive
is_search();                 // Page de résultats de recherche
is_404();                    // Page d'erreur 404

// Contenu
have_posts();                // Y a-t-il des articles ?
has_post_thumbnail();        // Y a-t-il une image à la une ?
is_active_sidebar();         // Y a-t-il des widgets dans la sidebar ?
```

## Exercices pratiques

### Exercice 1 : Créer la structure de base
1. Créer les fichiers `header.php`, `footer.php` et `index.php`
2. Implémenter la structure HTML5 sémantique
3. Ajouter les hooks WordPress essentiels (`wp_head()`, `wp_footer()`)

### Exercice 2 : Tester la hiérarchie des templates
1. Créer différents types de contenu (articles, pages)
2. Créer des templates spécifiques (`single.php`, `page.php`)
3. Observer quel template est utilisé avec la fonction de debug

### Exercice 3 : Personnaliser la boucle
1. Modifier l'affichage des articles sur la page d'accueil
2. Ajouter des informations métadonnées personnalisées
3. Styliser les différents éléments avec CSS

## Points clés à retenir

- La hiérarchie des templates suit un ordre strict de priorité
- La boucle WordPress est le mécanisme central d'affichage du contenu
- Les hooks permettent de personnaliser WordPress sans modifier le core
- `functions.php` est le fichier central pour les fonctionnalités du thème
- Les fonctions conditionnelles permettent d'adapter l'affichage selon le contexte

## Prochaine étape

Dans le **Cours 3**, nous approfondirons le fichier `functions.php` et apprendrons à ajouter des fonctionnalités avancées à notre thème comme les menus, les widgets et les options de personnalisation.
