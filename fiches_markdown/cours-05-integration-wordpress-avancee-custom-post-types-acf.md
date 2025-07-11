# Cours 011 : Intégration WordPress Avancée - Custom Post Types et ACF

## Introduction

Ce cours vous enseigne à exploiter pleinement la puissance de WordPress en créant des types de contenu personnalisés (Custom Post Types), des champs personnalisés et en utilisant Advanced Custom Fields (ACF) pour créer des expériences de contenu riches et flexibles.

## Objectifs d'apprentissage

- Maîtriser la création de Custom Post Types
- Gérer les taxonomies personnalisées
- Intégrer Advanced Custom Fields (ACF)
- Créer des templates pour contenu personnalisé
- Développer des requêtes WP_Query avancées
- Optimiser l'administration WordPress

## 1. Custom Post Types (Types de contenu personnalisés)

### 1.1 Concepts et utilisation

Les Custom Post Types permettent de créer des types de contenu au-delà des articles et pages standard :

**Exemples d'utilisation :**
- Portfolio de projets
- Équipe et témoignages
- Produits (sans WooCommerce)
- Événements
- FAQ
- Services

### 1.2 Création de Custom Post Types

```php
// Dans functions.php
function mon_theme_register_post_types() {
    
    // Custom Post Type : Portfolio
    register_post_type('portfolio', array(
        'labels' => array(
            'name'                  => 'Portfolio',
            'singular_name'         => 'Projet',
            'menu_name'             => 'Portfolio',
            'name_admin_bar'        => 'Projet',
            'archives'              => 'Archives Portfolio',
            'attributes'            => 'Attributs du Projet',
            'parent_item_colon'     => 'Projet Parent:',
            'all_items'             => 'Tous les Projets',
            'add_new_item'          => 'Ajouter un Nouveau Projet',
            'add_new'               => 'Ajouter',
            'new_item'              => 'Nouveau Projet',
            'edit_item'             => 'Modifier le Projet',
            'update_item'           => 'Mettre à Jour',
            'view_item'             => 'Voir le Projet',
            'view_items'            => 'Voir les Projets',
            'search_items'          => 'Rechercher des Projets',
            'not_found'             => 'Aucun projet trouvé',
            'not_found_in_trash'    => 'Aucun projet dans la corbeille',
            'featured_image'        => 'Image du Projet',
            'set_featured_image'    => 'Définir l\'image du projet',
            'remove_featured_image' => 'Supprimer l\'image',
            'use_featured_image'    => 'Utiliser comme image du projet',
            'insert_into_item'      => 'Insérer dans le projet',
            'uploaded_to_this_item' => 'Téléchargé vers ce projet',
            'items_list'            => 'Liste des projets',
            'items_list_navigation' => 'Navigation de la liste',
            'filter_items_list'     => 'Filtrer la liste',
        ),
        'public'                => true,
        'publicly_queryable'    => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'query_var'             => true,
        'rewrite'               => array('slug' => 'portfolio'),
        'capability_type'       => 'post',
        'has_archive'           => true,
        'hierarchical'          => false,
        'menu_position'         => 20,
        'menu_icon'             => 'dashicons-portfolio',
        'supports'              => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'show_in_rest'          => true, // Support Gutenberg
        'rest_base'             => 'portfolio',
        'rest_controller_class' => 'WP_REST_Posts_Controller',
    ));
    
    // Custom Post Type : Équipe
    register_post_type('equipe', array(
        'labels' => array(
            'name'                  => 'Équipe',
            'singular_name'         => 'Membre',
            'menu_name'             => 'Équipe',
            'add_new_item'          => 'Ajouter un Membre',
            'edit_item'             => 'Modifier le Membre',
            'view_item'             => 'Voir le Membre',
            'all_items'             => 'Tous les Membres',
            'search_items'          => 'Rechercher des Membres',
            'not_found'             => 'Aucun membre trouvé',
        ),
        'public'                => true,
        'has_archive'           => true,
        'rewrite'               => array('slug' => 'equipe'),
        'menu_icon'             => 'dashicons-groups',
        'supports'              => array('title', 'editor', 'thumbnail'),
        'show_in_rest'          => true,
    ));
    
    // Custom Post Type : Témoignages
    register_post_type('testimonial', array(
        'labels' => array(
            'name'                  => 'Témoignages',
            'singular_name'         => 'Témoignage',
            'menu_name'             => 'Témoignages',
            'add_new_item'          => 'Ajouter un Témoignage',
            'edit_item'             => 'Modifier le Témoignage',
        ),
        'public'                => true,
        'has_archive'           => false,
        'publicly_queryable'    => false,
        'show_ui'               => true,
        'menu_icon'             => 'dashicons-format-quote',
        'supports'              => array('title', 'editor', 'thumbnail'),
        'show_in_rest'          => true,
    ));
}
add_action('init', 'mon_theme_register_post_types');
```

### 1.3 Flush des règles de réécriture

```php
// Activation du thème - flush rewrite rules
function mon_theme_activation() {
    mon_theme_register_post_types();
    flush_rewrite_rules();
}
add_action('after_switch_theme', 'mon_theme_activation');

// Désactivation du thème
function mon_theme_deactivation() {
    flush_rewrite_rules();
}
add_action('switch_theme', 'mon_theme_deactivation');
```

## 2. Taxonomies personnalisées

### 2.1 Création de taxonomies

```php
function mon_theme_register_taxonomies() {
    
    // Taxonomie : Catégories de Portfolio
    register_taxonomy('portfolio_category', 'portfolio', array(
        'labels' => array(
            'name'              => 'Catégories Portfolio',
            'singular_name'     => 'Catégorie Portfolio',
            'search_items'      => 'Rechercher des Catégories',
            'all_items'         => 'Toutes les Catégories',
            'parent_item'       => 'Catégorie Parente',
            'parent_item_colon' => 'Catégorie Parente:',
            'edit_item'         => 'Modifier la Catégorie',
            'update_item'       => 'Mettre à Jour',
            'add_new_item'      => 'Ajouter une Catégorie',
            'new_item_name'     => 'Nom de la Nouvelle Catégorie',
            'menu_name'         => 'Catégories',
        ),
        'hierarchical'      => true, // Comme les catégories
        'public'            => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'portfolio-categorie'),
        'show_in_rest'      => true,
    ));
    
    // Taxonomie : Tags de Portfolio
    register_taxonomy('portfolio_tag', 'portfolio', array(
        'labels' => array(
            'name'                       => 'Tags Portfolio',
            'singular_name'              => 'Tag Portfolio',
            'search_items'               => 'Rechercher des Tags',
            'popular_items'              => 'Tags Populaires',
            'all_items'                  => 'Tous les Tags',
            'edit_item'                  => 'Modifier le Tag',
            'add_new_item'               => 'Ajouter un Tag',
        ),
        'hierarchical'      => false, // Comme les étiquettes
        'public'            => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'portfolio-tag'),
        'show_in_rest'      => true,
    ));
    
    // Taxonomie : Postes/Départements pour l'équipe
    register_taxonomy('poste', 'equipe', array(
        'labels' => array(
            'name'          => 'Postes',
            'singular_name' => 'Poste',
            'menu_name'     => 'Postes',
        ),
        'hierarchical'      => true,
        'public'            => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'rewrite'           => array('slug' => 'poste'),
        'show_in_rest'      => true,
    ));
}
add_action('init', 'mon_theme_register_taxonomies');
```

## 3. Advanced Custom Fields (ACF)

### 3.1 Installation et configuration d'ACF

```php
// Installation via Composer (recommandé)
// composer require advanced-custom-fields/advanced-custom-fields-pro

// Ou téléchargement du plugin gratuit depuis WordPress.org

// Configuration ACF dans functions.php
function mon_theme_acf_settings() {
    // Masquer ACF du menu admin en production
    if (!WP_DEBUG) {
        add_filter('acf/settings/show_admin', '__return_false');
    }
    
    // Définir le chemin pour les champs enregistrés en PHP
    add_filter('acf/settings/save_json', function($path) {
        return get_template_directory() . '/acf-json';
    });
    
    add_filter('acf/settings/load_json', function($paths) {
        $paths[] = get_template_directory() . '/acf-json';
        return $paths;
    });
}
add_action('acf/init', 'mon_theme_acf_settings');
```

### 3.2 Création de groupes de champs ACF

```php
// Groupe de champs pour Portfolio
function mon_theme_acf_portfolio_fields() {
    acf_add_local_field_group(array(
        'key' => 'group_portfolio',
        'title' => 'Détails du Projet',
        'fields' => array(
            array(
                'key' => 'field_projet_client',
                'label' => 'Client',
                'name' => 'projet_client',
                'type' => 'text',
                'required' => 1,
            ),
            array(
                'key' => 'field_projet_date',
                'label' => 'Date du Projet',
                'name' => 'projet_date',
                'type' => 'date_picker',
                'display_format' => 'd/m/Y',
                'return_format' => 'Y-m-d',
            ),
            array(
                'key' => 'field_projet_url',
                'label' => 'URL du Projet',
                'name' => 'projet_url',
                'type' => 'url',
            ),
            array(
                'key' => 'field_projet_technologies',
                'label' => 'Technologies Utilisées',
                'name' => 'projet_technologies',
                'type' => 'checkbox',
                'choices' => array(
                    'html' => 'HTML',
                    'css' => 'CSS',
                    'javascript' => 'JavaScript',
                    'php' => 'PHP',
                    'wordpress' => 'WordPress',
                    'react' => 'React',
                    'vue' => 'Vue.js',
                ),
                'layout' => 'horizontal',
            ),
            array(
                'key' => 'field_projet_galerie',
                'label' => 'Galerie d\'Images',
                'name' => 'projet_galerie',
                'type' => 'gallery',
                'min' => 1,
                'max' => 10,
                'preview_size' => 'medium',
                'library' => 'all',
            ),
            array(
                'key' => 'field_projet_featured',
                'label' => 'Projet Mis en Avant',
                'name' => 'projet_featured',
                'type' => 'true_false',
                'message' => 'Afficher ce projet en première page',
                'default_value' => 0,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'portfolio',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
    ));
}

// Groupe de champs pour Équipe
function mon_theme_acf_equipe_fields() {
    acf_add_local_field_group(array(
        'key' => 'group_equipe',
        'title' => 'Informations du Membre',
        'fields' => array(
            array(
                'key' => 'field_membre_poste',
                'label' => 'Poste/Fonction',
                'name' => 'membre_poste',
                'type' => 'text',
                'required' => 1,
            ),
            array(
                'key' => 'field_membre_bio',
                'label' => 'Biographie Courte',
                'name' => 'membre_bio',
                'type' => 'textarea',
                'rows' => 4,
            ),
            array(
                'key' => 'field_membre_competences',
                'label' => 'Compétences',
                'name' => 'membre_competences',
                'type' => 'repeater',
                'min' => 1,
                'max' => 10,
                'layout' => 'table',
                'button_label' => 'Ajouter une Compétence',
                'sub_fields' => array(
                    array(
                        'key' => 'field_competence_nom',
                        'label' => 'Nom',
                        'name' => 'competence_nom',
                        'type' => 'text',
                        'required' => 1,
                    ),
                    array(
                        'key' => 'field_competence_niveau',
                        'label' => 'Niveau',
                        'name' => 'competence_niveau',
                        'type' => 'range',
                        'min' => 1,
                        'max' => 100,
                        'step' => 5,
                        'default_value' => 50,
                        'append' => '%',
                    ),
                ),
            ),
            array(
                'key' => 'field_membre_social',
                'label' => 'Réseaux Sociaux',
                'name' => 'membre_social',
                'type' => 'group',
                'sub_fields' => array(
                    array(
                        'key' => 'field_social_linkedin',
                        'label' => 'LinkedIn',
                        'name' => 'social_linkedin',
                        'type' => 'url',
                    ),
                    array(
                        'key' => 'field_social_twitter',
                        'label' => 'Twitter',
                        'name' => 'social_twitter',
                        'type' => 'url',
                    ),
                    array(
                        'key' => 'field_social_github',
                        'label' => 'GitHub',
                        'name' => 'social_github',
                        'type' => 'url',
                    ),
                ),
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'equipe',
                ),
            ),
        ),
    ));
}

// Initialiser les champs ACF
add_action('acf/init', 'mon_theme_acf_portfolio_fields');
add_action('acf/init', 'mon_theme_acf_equipe_fields');
```

### 3.3 Champs ACF pour les options de thème

```php
// Page d'options globales
function mon_theme_acf_options_page() {
    if (function_exists('acf_add_options_page')) {
        acf_add_options_page(array(
            'page_title' => 'Options du Thème',
            'menu_title' => 'Options Thème',
            'menu_slug'  => 'theme-options',
            'capability' => 'edit_posts',
            'icon_url'   => 'dashicons-admin-customizer',
        ));
        
        acf_add_options_sub_page(array(
            'page_title'  => 'En-tête et Navigation',
            'menu_title'  => 'En-tête',
            'parent_slug' => 'theme-options',
        ));
        
        acf_add_options_sub_page(array(
            'page_title'  => 'Pied de Page',
            'menu_title'  => 'Footer',
            'parent_slug' => 'theme-options',
        ));
    }
}
add_action('acf/init', 'mon_theme_acf_options_page');

// Champs pour les options
function mon_theme_acf_options_fields() {
    acf_add_local_field_group(array(
        'key' => 'group_theme_options',
        'title' => 'Options Générales',
        'fields' => array(
            array(
                'key' => 'field_contact_info',
                'label' => 'Informations de Contact',
                'name' => 'contact_info',
                'type' => 'group',
                'sub_fields' => array(
                    array(
                        'key' => 'field_contact_phone',
                        'label' => 'Téléphone',
                        'name' => 'contact_phone',
                        'type' => 'text',
                    ),
                    array(
                        'key' => 'field_contact_email',
                        'label' => 'Email',
                        'name' => 'contact_email',
                        'type' => 'email',
                    ),
                    array(
                        'key' => 'field_contact_address',
                        'label' => 'Adresse',
                        'name' => 'contact_address',
                        'type' => 'textarea',
                        'rows' => 3,
                    ),
                ),
            ),
            array(
                'key' => 'field_social_links',
                'label' => 'Liens Sociaux',
                'name' => 'social_links',
                'type' => 'repeater',
                'button_label' => 'Ajouter un Réseau Social',
                'sub_fields' => array(
                    array(
                        'key' => 'field_social_platform',
                        'label' => 'Plateforme',
                        'name' => 'social_platform',
                        'type' => 'select',
                        'choices' => array(
                            'facebook' => 'Facebook',
                            'twitter' => 'Twitter',
                            'linkedin' => 'LinkedIn',
                            'instagram' => 'Instagram',
                            'youtube' => 'YouTube',
                        ),
                    ),
                    array(
                        'key' => 'field_social_url',
                        'label' => 'URL',
                        'name' => 'social_url',
                        'type' => 'url',
                        'required' => 1,
                    ),
                ),
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'options_page',
                    'operator' => '==',
                    'value' => 'theme-options',
                ),
            ),
        ),
    ));
}
add_action('acf/init', 'mon_theme_acf_options_fields');
```

## 4. Templates pour Custom Post Types

### 4.1 Template pour archive portfolio (archive-portfolio.php)

```php
<?php get_header(); ?>

<main class="main-content">
    <div class="container">
        <header class="page-header">
            <h1 class="page-title">
                <?php post_type_archive_title(); ?>
            </h1>
            <?php
            $portfolio_description = get_the_archive_description();
            if ($portfolio_description) :
            ?>
                <div class="archive-description">
                    <?php echo wp_kses_post($portfolio_description); ?>
                </div>
            <?php endif; ?>
        </header>

        <?php
        // Filtres par taxonomie
        $categories = get_terms(array(
            'taxonomy' => 'portfolio_category',
            'hide_empty' => true,
        ));
        
        if (!empty($categories) && !is_wp_error($categories)) :
        ?>
        <div class="portfolio-filters">
            <button class="filter-btn active" data-filter="*">Tous</button>
            <?php foreach ($categories as $category) : ?>
                <button class="filter-btn" data-filter=".<?php echo esc_attr($category->slug); ?>">
                    <?php echo esc_html($category->name); ?>
                </button>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>

        <?php if (have_posts()) : ?>
        <div class="portfolio-grid grid grid-auto">
            <?php while (have_posts()) : the_post(); ?>
                <?php
                $categories = get_the_terms(get_the_ID(), 'portfolio_category');
                $category_classes = '';
                if ($categories && !is_wp_error($categories)) {
                    $category_slugs = wp_list_pluck($categories, 'slug');
                    $category_classes = implode(' ', $category_slugs);
                }
                ?>
                <article class="portfolio-item <?php echo esc_attr($category_classes); ?>">
                    <div class="portfolio-card">
                        <?php if (has_post_thumbnail()) : ?>
                        <div class="portfolio-image">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_post_thumbnail('card-thumbnail', array('alt' => get_the_title())); ?>
                            </a>
                            <div class="portfolio-overlay">
                                <a href="<?php the_permalink(); ?>" class="btn btn-primary">
                                    Voir le Projet
                                </a>
                            </div>
                        </div>
                        <?php endif; ?>
                        
                        <div class="portfolio-content">
                            <h3 class="portfolio-title">
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_title(); ?>
                                </a>
                            </h3>
                            
                            <?php
                            $client = get_field('projet_client');
                            if ($client) :
                            ?>
                            <p class="portfolio-client">
                                <strong>Client :</strong> <?php echo esc_html($client); ?>
                            </p>
                            <?php endif; ?>
                            
                            <div class="portfolio-excerpt">
                                <?php the_excerpt(); ?>
                            </div>
                            
                            <?php
                            $technologies = get_field('projet_technologies');
                            if ($technologies) :
                            ?>
                            <div class="portfolio-technologies">
                                <?php foreach ($technologies as $tech) : ?>
                                    <span class="tech-tag"><?php echo esc_html($tech); ?></span>
                                <?php endforeach; ?>
                            </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>

        <?php
        // Pagination
        the_posts_pagination(array(
            'mid_size' => 2,
            'prev_text' => '← Précédent',
            'next_text' => 'Suivant →',
        ));
        ?>

        <?php else : ?>
        <div class="no-posts">
            <h2>Aucun projet trouvé</h2>
            <p>Il n'y a actuellement aucun projet dans le portfolio.</p>
        </div>
        <?php endif; ?>
    </div>
</main>

<?php get_footer(); ?>
```

### 4.2 Template pour single portfolio (single-portfolio.php)

```php
<?php get_header(); ?>

<main class="main-content">
    <?php while (have_posts()) : the_post(); ?>
    <article class="portfolio-single">
        <header class="portfolio-header">
            <div class="container">
                <div class="portfolio-meta">
                    <a href="<?php echo get_post_type_archive_link('portfolio'); ?>" class="back-link">
                        ← Retour au Portfolio
                    </a>
                    
                    <?php
                    $categories = get_the_terms(get_the_ID(), 'portfolio_category');
                    if ($categories && !is_wp_error($categories)) :
                    ?>
                    <div class="portfolio-categories">
                        <?php foreach ($categories as $category) : ?>
                            <a href="<?php echo get_term_link($category); ?>" class="category-link">
                                <?php echo esc_html($category->name); ?>
                            </a>
                        <?php endforeach; ?>
                    </div>
                    <?php endif; ?>
                </div>
                
                <h1 class="portfolio-title"><?php the_title(); ?></h1>
                
                <div class="portfolio-details">
                    <?php
                    $client = get_field('projet_client');
                    $date = get_field('projet_date');
                    $url = get_field('projet_url');
                    ?>
                    
                    <?php if ($client) : ?>
                    <div class="detail-item">
                        <strong>Client :</strong> <?php echo esc_html($client); ?>
                    </div>
                    <?php endif; ?>
                    
                    <?php if ($date) : ?>
                    <div class="detail-item">
                        <strong>Date :</strong> 
                        <?php echo date_i18n('F Y', strtotime($date)); ?>
                    </div>
                    <?php endif; ?>
                    
                    <?php if ($url) : ?>
                    <div class="detail-item">
                        <a href="<?php echo esc_url($url); ?>" class="btn btn-primary" target="_blank" rel="noopener">
                            Voir le Site Web
                        </a>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
        </header>

        <?php
        $galerie = get_field('projet_galerie');
        if ($galerie) :
        ?>
        <section class="portfolio-gallery">
            <div class="container">
                <div class="gallery-grid">
                    <?php foreach ($galerie as $image) : ?>
                    <div class="gallery-item">
                        <a href="<?php echo esc_url($image['url']); ?>" data-lightbox="portfolio">
                            <img src="<?php echo esc_url($image['sizes']['medium_large']); ?>" 
                                 alt="<?php echo esc_attr($image['alt']); ?>">
                        </a>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>
        <?php endif; ?>

        <section class="portfolio-content">
            <div class="container">
                <div class="content-wrapper">
                    <?php the_content(); ?>
                    
                    <?php
                    $technologies = get_field('projet_technologies');
                    if ($technologies) :
                    ?>
                    <div class="technologies-section">
                        <h3>Technologies Utilisées</h3>
                        <div class="technologies-list">
                            <?php foreach ($technologies as $tech) : ?>
                                <span class="tech-badge"><?php echo esc_html($tech); ?></span>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
        </section>

        <section class="portfolio-navigation">
            <div class="container">
                <div class="nav-links">
                    <?php
                    $prev_post = get_previous_post();
                    $next_post = get_next_post();
                    ?>
                    
                    <?php if ($prev_post) : ?>
                    <div class="nav-previous">
                        <a href="<?php echo get_permalink($prev_post); ?>">
                            <span class="nav-label">← Projet Précédent</span>
                            <span class="nav-title"><?php echo get_the_title($prev_post); ?></span>
                        </a>
                    </div>
                    <?php endif; ?>
                    
                    <?php if ($next_post) : ?>
                    <div class="nav-next">
                        <a href="<?php echo get_permalink($next_post); ?>">
                            <span class="nav-label">Projet Suivant →</span>
                            <span class="nav-title"><?php echo get_the_title($next_post); ?></span>
                        </a>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
        </section>
    </article>
    <?php endwhile; ?>
</main>

<?php get_footer(); ?>
```

### 4.3 Template pour équipe (archive-equipe.php)

```php
<?php get_header(); ?>

<main class="main-content">
    <div class="container">
        <header class="page-header">
            <h1 class="page-title">Notre Équipe</h1>
            <p class="page-description">
                Découvrez les talents qui composent notre équipe.
            </p>
        </header>

        <?php if (have_posts()) : ?>
        <div class="team-grid grid grid-auto">
            <?php while (have_posts()) : the_post(); ?>
            <div class="team-member">
                <div class="member-card">
                    <?php if (has_post_thumbnail()) : ?>
                    <div class="member-photo">
                        <?php the_post_thumbnail('medium', array('alt' => get_the_title())); ?>
                    </div>
                    <?php endif; ?>
                    
                    <div class="member-info">
                        <h3 class="member-name"><?php the_title(); ?></h3>
                        
                        <?php
                        $poste = get_field('membre_poste');
                        if ($poste) :
                        ?>
                        <p class="member-position"><?php echo esc_html($poste); ?></p>
                        <?php endif; ?>
                        
                        <?php
                        $bio = get_field('membre_bio');
                        if ($bio) :
                        ?>
                        <div class="member-bio">
                            <?php echo wp_kses_post($bio); ?>
                        </div>
                        <?php endif; ?>
                        
                        <?php
                        $competences = get_field('membre_competences');
                        if ($competences) :
                        ?>
                        <div class="member-skills">
                            <h4>Compétences</h4>
                            <?php foreach ($competences as $competence) : ?>
                            <div class="skill-item">
                                <span class="skill-name"><?php echo esc_html($competence['competence_nom']); ?></span>
                                <div class="skill-bar">
                                    <div class="skill-progress" style="width: <?php echo esc_attr($competence['competence_niveau']); ?>%"></div>
                                </div>
                                <span class="skill-percentage"><?php echo esc_html($competence['competence_niveau']); ?>%</span>
                            </div>
                            <?php endforeach; ?>
                        </div>
                        <?php endif; ?>
                        
                        <?php
                        $social = get_field('membre_social');
                        if ($social) :
                        ?>
                        <div class="member-social">
                            <?php if ($social['social_linkedin']) : ?>
                                <a href="<?php echo esc_url($social['social_linkedin']); ?>" target="_blank" rel="noopener">
                                    <i class="fab fa-linkedin"></i>
                                </a>
                            <?php endif; ?>
                            
                            <?php if ($social['social_twitter']) : ?>
                                <a href="<?php echo esc_url($social['social_twitter']); ?>" target="_blank" rel="noopener">
                                    <i class="fab fa-twitter"></i>
                                </a>
                            <?php endif; ?>
                            
                            <?php if ($social['social_github']) : ?>
                                <a href="<?php echo esc_url($social['social_github']); ?>" target="_blank" rel="noopener">
                                    <i class="fab fa-github"></i>
                                </a>
                            <?php endif; ?>
                        </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
            <?php endwhile; ?>
        </div>
        <?php endif; ?>
    </div>
</main>

<?php get_footer(); ?>
```

## 5. Requêtes WP_Query avancées

### 5.1 Affichage du portfolio sur la page d'accueil

```php
// Dans front-page.php ou home.php
function afficher_portfolio_featured() {
    $portfolio_query = new WP_Query(array(
        'post_type' => 'portfolio',
        'posts_per_page' => 6,
        'meta_query' => array(
            array(
                'key' => 'projet_featured',
                'value' => '1',
                'compare' => '='
            )
        ),
        'orderby' => 'date',
        'order' => 'DESC'
    ));
    
    if ($portfolio_query->have_posts()) :
    ?>
    <section class="featured-portfolio">
        <div class="container">
            <h2 class="section-title">Projets Mis en Avant</h2>
            <div class="portfolio-showcase grid grid-3">
                <?php while ($portfolio_query->have_posts()) : $portfolio_query->the_post(); ?>
                <div class="portfolio-showcase-item">
                    <?php if (has_post_thumbnail()) : ?>
                    <div class="showcase-image">
                        <a href="<?php the_permalink(); ?>">
                            <?php the_post_thumbnail('medium_large'); ?>
                        </a>
                    </div>
                    <?php endif; ?>
                    
                    <div class="showcase-content">
                        <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                        
                        <?php
                        $client = get_field('projet_client');
                        if ($client) :
                        ?>
                        <p class="client">Client : <?php echo esc_html($client); ?></p>
                        <?php endif; ?>
                        
                        <?php the_excerpt(); ?>
                        
                        <a href="<?php the_permalink(); ?>" class="btn btn-outline-primary">
                            Voir le Projet
                        </a>
                    </div>
                </div>
                <?php endwhile; ?>
            </div>
            
            <div class="text-center">
                <a href="<?php echo get_post_type_archive_link('portfolio'); ?>" class="btn btn-primary">
                    Voir Tout le Portfolio
                </a>
            </div>
        </div>
    </section>
    <?php
    endif;
    
    wp_reset_postdata();
}
```

### 5.2 Widget équipe pour sidebar

```php
class Mon_Theme_Team_Widget extends WP_Widget {
    
    public function __construct() {
        parent::__construct(
            'mon_theme_team',
            'Équipe - Membres Aléatoires',
            array('description' => 'Affiche des membres de l\'équipe de manière aléatoire')
        );
    }
    
    public function widget($args, $instance) {
        $title = apply_filters('widget_title', $instance['title'] ?? '');
        $number = $instance['number'] ?? 3;
        
        echo $args['before_widget'];
        
        if (!empty($title)) {
            echo $args['before_title'] . $title . $args['after_title'];
        }
        
        $team_query = new WP_Query(array(
            'post_type' => 'equipe',
            'posts_per_page' => $number,
            'orderby' => 'rand'
        ));
        
        if ($team_query->have_posts()) :
        ?>
        <div class="widget-team">
            <?php while ($team_query->have_posts()) : $team_query->the_post(); ?>
            <div class="widget-team-member">
                <?php if (has_post_thumbnail()) : ?>
                <div class="member-avatar">
                    <?php the_post_thumbnail('thumbnail'); ?>
                </div>
                <?php endif; ?>
                
                <div class="member-details">
                    <h4><?php the_title(); ?></h4>
                    <?php
                    $poste = get_field('membre_poste');
                    if ($poste) :
                    ?>
                    <p class="member-role"><?php echo esc_html($poste); ?></p>
                    <?php endif; ?>
                </div>
            </div>
            <?php endwhile; ?>
        </div>
        <?php
        endif;
        
        wp_reset_postdata();
        echo $args['after_widget'];
    }
    
    public function form($instance) {
        $title = $instance['title'] ?? '';
        $number = $instance['number'] ?? 3;
        ?>
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>">Titre :</label>
            <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" 
                   name="<?php echo $this->get_field_name('title'); ?>" type="text" 
                   value="<?php echo esc_attr($title); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('number'); ?>">Nombre de membres :</label>
            <input class="tiny-text" id="<?php echo $this->get_field_id('number'); ?>" 
                   name="<?php echo $this->get_field_name('number'); ?>" type="number" 
                   step="1" min="1" max="10" value="<?php echo esc_attr($number); ?>" size="3">
        </p>
        <?php
    }
    
    public function update($new_instance, $old_instance) {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? sanitize_text_field($new_instance['title']) : '';
        $instance['number'] = (!empty($new_instance['number'])) ? absint($new_instance['number']) : 3;
        return $instance;
    }
}

// Enregistrer le widget
function mon_theme_register_team_widget() {
    register_widget('Mon_Theme_Team_Widget');
}
add_action('widgets_init', 'mon_theme_register_team_widget');
```

## Exercices pratiques

### Exercice 1 : Custom Post Type simple
1. Créer un Custom Post Type "Services"
2. Ajouter une taxonomie "Catégories de Services"
3. Créer les templates d'archive et single
4. Tester l'affichage et la navigation

### Exercice 2 : ACF avancé
1. Installer et configurer ACF
2. Créer des champs pour le CPT Services
3. Ajouter une page d'options globales
4. Utiliser les champs dans les templates

### Exercice 3 : Requêtes personnalisées
1. Afficher les services sur la page d'accueil
2. Créer un shortcode pour les témoignages
3. Développer un widget portfolio
4. Optimiser les requêtes avec caching

### Exercice 4 : Administration
1. Personnaliser les colonnes d'administration
2. Ajouter des filtres dans l'admin
3. Créer des métaboxes personnalisées
4. Optimiser l'expérience utilisateur admin

## Points clés à retenir

- Les Custom Post Types étendent les possibilités de contenu
- ACF simplifie la création de champs personnalisés
- Les taxonomies organisent et catégorisent le contenu
- Les templates spécialisés offrent un contrôle total de l'affichage
- WP_Query permet des requêtes de contenu sophistiquées
- L'optimisation de l'administration améliore l'expérience utilisateur

## Prochaine étape

Dans le **Cours 6**, nous aborderons l'optimisation des performances, la sécurité, le SEO et la préparation du thème pour la production et le déploiement.
