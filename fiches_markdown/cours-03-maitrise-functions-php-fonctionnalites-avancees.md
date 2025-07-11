# Cours 009 : Maîtrise du fichier functions.php et Fonctionnalités Avancées

## Introduction

Le fichier `functions.php` est le cerveau de votre thème WordPress. Il permet d'ajouter des fonctionnalités, de modifier le comportement de WordPress et d'intégrer votre thème parfaitement avec le système. Ce cours vous enseigne toutes les techniques essentielles.

## Objectifs d'apprentissage

- Maîtriser la structure et les bonnes pratiques du fichier functions.php
- Configurer les supports de thème essentiels
- Gérer les styles et scripts de manière optimale
- Créer et personnaliser les menus de navigation
- Intégrer les zones de widgets
- Personnaliser l'administration WordPress

## 1. Structure et bonnes pratiques du functions.php

### 1.1 Structure de base

```php
<?php
/**
 * Fonctions du thème Mon Thème Personnalisé
 * 
 * @package MonThemePersonnalise
 * @version 1.0.0
 */

// Sécurité : empêcher l'accès direct au fichier
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Configuration principale du thème
 */
function mon_theme_setup() {
    // Configuration du thème ici
}
add_action('after_setup_theme', 'mon_theme_setup');

/**
 * Chargement des styles et scripts
 */
function mon_theme_enqueue_scripts() {
    // Chargement des assets ici
}
add_action('wp_enqueue_scripts', 'mon_theme_enqueue_scripts');

// Autres fonctions...
```

### 1.2 Bonnes pratiques essentielles

```php
// 1. Préfixer toutes les fonctions pour éviter les conflits
function mon_theme_fonction() {} // ✅ Bon
function ma_fonction() {}        // ❌ Risque de conflit

// 2. Utiliser des hooks appropriés
add_action('after_setup_theme', 'mon_theme_setup'); // ✅ Pour la config du thème
add_action('wp_enqueue_scripts', 'mon_theme_scripts'); // ✅ Pour les assets

// 3. Vérifier l'existence des fonctions
if (!function_exists('mon_theme_setup')) {
    function mon_theme_setup() {
        // Code ici
    }
}

// 4. Organiser le code avec des commentaires clairs
/**
 * Configuration du support des images à la une
 * 
 * @since 1.0.0
 */
function mon_theme_setup_thumbnails() {
    add_theme_support('post-thumbnails');
    
    // Tailles personnalisées
    add_image_size('hero-image', 1200, 600, true);
    add_image_size('card-image', 400, 300, true);
}
```

## 2. Configuration des supports de thème

### 2.1 Supports essentiels

```php
function mon_theme_setup() {
    // Support de la traduction
    load_theme_textdomain('mon-theme-personnalise', get_template_directory() . '/languages');
    
    // Support du titre automatique dans <head>
    add_theme_support('title-tag');
    
    // Support des images à la une
    add_theme_support('post-thumbnails');
    
    // Support des formats d'articles personnalisés
    add_theme_support('post-formats', array(
        'video',
        'audio',
        'gallery',
        'quote',
        'link'
    ));
    
    // Support des balises HTML5 sémantiques
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script'
    ));
    
    // Support du logo personnalisé
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
        'header-text' => array('site-title', 'site-description')
    ));
    
    // Support de l'arrière-plan personnalisé
    add_theme_support('custom-background', array(
        'default-color' => 'ffffff',
        'default-image' => ''
    ));
    
    // Support des liens de flux RSS automatiques
    add_theme_support('automatic-feed-links');
    
    // Support de l'éditeur de blocs Gutenberg
    add_theme_support('wp-block-styles');
    add_theme_support('responsive-embeds');
    add_theme_support('align-wide');
    
    // Couleurs personnalisées pour l'éditeur
    add_theme_support('editor-color-palette', array(
        array(
            'name'  => 'Bleu principal',
            'slug'  => 'bleu-principal',
            'color' => '#007cba',
        ),
        array(
            'name'  => 'Gris foncé',
            'slug'  => 'gris-fonce',
            'color' => '#333333',
        ),
        array(
            'name'  => 'Blanc',
            'slug'  => 'blanc',
            'color' => '#ffffff',
        ),
    ));
}
add_action('after_setup_theme', 'mon_theme_setup');
```

### 2.2 Tailles d'images personnalisées

```php
function mon_theme_setup_images() {
    // Tailles personnalisées
    add_image_size('hero-banner', 1920, 800, true);      // Image hero avec crop
    add_image_size('card-thumbnail', 300, 200, true);     // Vignette carte
    add_image_size('sidebar-image', 300, 0, false);       // Largeur fixe, hauteur auto
    add_image_size('gallery-thumb', 150, 150, true);      // Galerie carrée
}
add_action('after_setup_theme', 'mon_theme_setup_images');

// Rendre les tailles disponibles dans l'admin
function mon_theme_custom_image_sizes($sizes) {
    return array_merge($sizes, array(
        'hero-banner' => 'Image Hero (1920x800)',
        'card-thumbnail' => 'Vignette Carte (300x200)',
        'gallery-thumb' => 'Galerie (150x150)'
    ));
}
add_filter('image_size_names_choose', 'mon_theme_custom_image_sizes');
```

## 3. Gestion optimale des styles et scripts

### 3.1 Chargement des assets

```php
function mon_theme_enqueue_scripts() {
    // Version du thème pour le cache busting
    $theme_version = wp_get_theme()->get('Version');
    
    // Styles
    wp_enqueue_style(
        'mon-theme-style',
        get_stylesheet_uri(),
        array(),
        $theme_version
    );
    
    // Styles personnalisés
    wp_enqueue_style(
        'mon-theme-custom',
        get_template_directory_uri() . '/assets/css/custom.css',
        array('mon-theme-style'),
        $theme_version
    );
    
    // Google Fonts
    wp_enqueue_style(
        'mon-theme-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap',
        array(),
        null
    );
    
    // JavaScript principal
    wp_enqueue_script(
        'mon-theme-script',
        get_template_directory_uri() . '/assets/js/main.js',
        array('jquery'),
        $theme_version,
        true // Dans le footer
    );
    
    // Scripts conditionnels
    if (is_singular()) {
        wp_enqueue_script('comment-reply');
    }
    
    // Variables PHP vers JavaScript
    wp_localize_script('mon-theme-script', 'monThemeAjax', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('mon_theme_nonce'),
        'homeUrl' => home_url('/')
    ));
}
add_action('wp_enqueue_scripts', 'mon_theme_enqueue_scripts');
```

### 3.2 Optimisation des performances

```php
// Charger jQuery depuis le CDN en production
function mon_theme_optimize_jquery() {
    if (!is_admin() && !is_customize_preview()) {
        wp_deregister_script('jquery');
        wp_register_script(
            'jquery',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
            array(),
            '3.6.0',
            true
        );
        wp_enqueue_script('jquery');
    }
}
add_action('wp_enqueue_scripts', 'mon_theme_optimize_jquery', 1);

// Supprimer les styles et scripts inutiles
function mon_theme_cleanup_head() {
    // Supprimer les styles d'emoji
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    
    // Supprimer les liens RSD et Windows Live Writer
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
    
    // Supprimer les liens de version WordPress
    remove_action('wp_head', 'wp_generator');
}
add_action('init', 'mon_theme_cleanup_head');
```

## 4. Système de menus avancé

### 4.1 Enregistrement des zones de menus

```php
function mon_theme_register_nav_menus() {
    register_nav_menus(array(
        'primary'   => 'Menu principal',
        'secondary' => 'Menu secondaire',
        'footer'    => 'Menu pied de page',
        'social'    => 'Liens sociaux'
    ));
}
add_action('after_setup_theme', 'mon_theme_register_nav_menus');
```

### 4.2 Walker personnalisé pour les menus

```php
class Mon_Theme_Nav_Walker extends Walker_Nav_Menu {
    
    // Début d'un élément de menu
    public function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $indent = ($depth) ? str_repeat("\t", $depth) : '';
        
        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;
        
        // Ajouter des classes personnalisées
        if (in_array('current-menu-item', $classes)) {
            $classes[] = 'active';
        }
        
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
        $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';
        
        $id = apply_filters('nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args);
        $id = $id ? ' id="' . esc_attr($id) . '"' : '';
        
        $output .= $indent . '<li' . $id . $class_names .'>';
        
        $attributes = !empty($item->attr_title) ? ' title="' . esc_attr($item->attr_title) .'"' : '';
        $attributes .= !empty($item->target) ? ' target="' . esc_attr($item->target) .'"' : '';
        $attributes .= !empty($item->xfn) ? ' rel="' . esc_attr($item->xfn) .'"' : '';
        $attributes .= !empty($item->url) ? ' href="' . esc_attr($item->url) .'"' : '';
        
        $item_output = '';
        if (isset($args->before ?? '')) {
            $item_output .= $args->before ?? '';
        }
        $item_output .= '<a' . $attributes . '>';
        $item_output .= ($args->link_before ?? '') . apply_filters('the_title', $item->title, $item->ID) . ($args->link_after ?? '');
        $item_output .= '</a>';
        if (isset($args->after ?? '')) {
            $item_output .= $args->after ?? '';
        }
        
        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }
    
    // Fin d'un élément de menu
    public function end_el(&$output, $item, $depth = 0, $args = null) {
        $output .= "</li>\n";
    }
}
```

### 4.3 Affichage des menus dans les templates

```php
// Dans header.php
<nav class="main-navigation" role="navigation">
    <?php
    wp_nav_menu(array(
        'theme_location' => 'primary',
        'menu_id'        => 'primary-menu',
        'menu_class'     => 'nav-menu',
        'container'      => false,
        'walker'         => new Mon_Theme_Nav_Walker(),
        'fallback_cb'    => 'mon_theme_menu_fallback'
    ));
    ?>
</nav>

<?php
// Fonction de fallback si aucun menu n'est assigné
function mon_theme_menu_fallback() {
    echo '<ul class="nav-menu">';
    echo '<li><a href="' . home_url('/') . '">Accueil</a></li>';
    wp_list_pages(array(
        'title_li' => '',
        'echo'     => 1
    ));
    echo '</ul>';
}
?>
```

## 5. Système de widgets et sidebars

### 5.1 Enregistrement des zones de widgets

```php
function mon_theme_widgets_init() {
    // Sidebar principale
    register_sidebar(array(
        'name'          => 'Sidebar Principale',
        'id'            => 'sidebar-1',
        'description'   => 'Zone de widgets de la sidebar principale',
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
    
    // Footer widgets
    for ($i = 1; $i <= 4; $i++) {
        register_sidebar(array(
            'name'          => sprintf('Footer %d', $i),
            'id'            => sprintf('footer-%d', $i),
            'description'   => sprintf('Zone de widgets du footer %d', $i),
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget'  => '</div>',
            'before_title'  => '<h4 class="widget-title">',
            'after_title'   => '</h4>',
        ));
    }
    
    // Widget de page d'accueil
    register_sidebar(array(
        'name'          => 'Zone Héro Accueil',
        'id'            => 'hero-home',
        'description'   => 'Zone pour le contenu héro de la page d\'accueil',
        'before_widget' => '<div id="%1$s" class="hero-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h2 class="hero-title">',
        'after_title'   => '</h2>',
    ));
}
add_action('widgets_init', 'mon_theme_widgets_init');
```

### 5.2 Widget personnalisé

```php
class Mon_Theme_Recent_Posts_Widget extends WP_Widget {
    
    public function __construct() {
        parent::__construct(
            'mon_theme_recent_posts',
            'Articles Récents Personnalisés',
            array('description' => 'Affiche les articles récents avec image à la une')
        );
    }
    
    public function widget($args, $instance) {
        $title = apply_filters('widget_title', $instance['title'] ?? '');
        $number = $instance['number'] ?? 5;
        
        echo $args['before_widget'];
        
        if (!empty($title)) {
            echo $args['before_title'] . $title . $args['after_title'];
        }
        
        $recent_posts = get_posts(array(
            'numberposts' => $number,
            'post_status' => 'publish'
        ));
        
        if ($recent_posts) {
            echo '<ul class="recent-posts-widget">';
            foreach ($recent_posts as $post) {
                setup_postdata($post);
                echo '<li>';
                if (has_post_thumbnail($post->ID)) {
                    echo '<div class="post-thumbnail">';
                    echo get_the_post_thumbnail($post->ID, 'thumbnail');
                    echo '</div>';
                }
                echo '<div class="post-content">';
                echo '<h4><a href="' . get_permalink($post->ID) . '">' . get_the_title($post->ID) . '</a></h4>';
                echo '<time>' . get_the_date('', $post->ID) . '</time>';
                echo '</div>';
                echo '</li>';
            }
            echo '</ul>';
            wp_reset_postdata();
        }
        
        echo $args['after_widget'];
    }
    
    public function form($instance) {
        $title = $instance['title'] ?? '';
        $number = $instance['number'] ?? 5;
        ?>
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>">Titre :</label>
            <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" 
                   name="<?php echo $this->get_field_name('title'); ?>" type="text" 
                   value="<?php echo esc_attr($title); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('number'); ?>">Nombre d'articles :</label>
            <input class="tiny-text" id="<?php echo $this->get_field_id('number'); ?>" 
                   name="<?php echo $this->get_field_name('number'); ?>" type="number" 
                   step="1" min="1" value="<?php echo esc_attr($number); ?>" size="3">
        </p>
        <?php
    }
    
    public function update($new_instance, $old_instance) {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? sanitize_text_field($new_instance['title']) : '';
        $instance['number'] = (!empty($new_instance['number'])) ? absint($new_instance['number']) : 5;
        return $instance;
    }
}

// Enregistrer le widget
function mon_theme_register_widgets() {
    register_widget('Mon_Theme_Recent_Posts_Widget');
}
add_action('widgets_init', 'mon_theme_register_widgets');
```

## 6. Personnalisation de l'administration

### 6.1 Page d'options du thème

```php
// Ajouter une page d'options dans l'admin
function mon_theme_add_admin_page() {
    add_theme_page(
        'Options du Thème',
        'Options Thème',
        'manage_options',
        'mon-theme-options',
        'mon_theme_admin_page'
    );
}
add_action('admin_menu', 'mon_theme_add_admin_page');

function mon_theme_admin_page() {
    ?>
    <div class="wrap">
        <h1>Options du Thème</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('mon_theme_options');
            do_settings_sections('mon_theme_options');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}

// Enregistrer les options
function mon_theme_admin_init() {
    register_setting('mon_theme_options', 'mon_theme_options', 'mon_theme_validate_options');
    
    add_settings_section(
        'mon_theme_main',
        'Paramètres Principaux',
        'mon_theme_section_text',
        'mon_theme_options'
    );
    
    add_settings_field(
        'footer_text',
        'Texte du Footer',
        'mon_theme_footer_text_field',
        'mon_theme_options',
        'mon_theme_main'
    );
}
add_action('admin_init', 'mon_theme_admin_init');

function mon_theme_section_text() {
    echo '<p>Configurez les options de votre thème.</p>';
}

function mon_theme_footer_text_field() {
    $options = get_option('mon_theme_options');
    $value = $options['footer_text'] ?? '';
    echo '<input type="text" name="mon_theme_options[footer_text]" value="' . esc_attr($value) . '" class="regular-text" />';
}

function mon_theme_validate_options($input) {
    $output = array();
    $output['footer_text'] = sanitize_text_field($input['footer_text']);
    return $output;
}
```

### 6.2 Customizer (Personnalisateur)

```php
function mon_theme_customize_register($wp_customize) {
    // Section personnalisée
    $wp_customize->add_section('mon_theme_colors', array(
        'title'    => 'Couleurs du Thème',
        'priority' => 30,
    ));
    
    // Couleur principale
    $wp_customize->add_setting('primary_color', array(
        'default'           => '#007cba',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'postMessage'
    ));
    
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'primary_color', array(
        'label'    => 'Couleur Principale',
        'section'  => 'mon_theme_colors',
        'settings' => 'primary_color',
    )));
    
    // Couleur secondaire
    $wp_customize->add_setting('secondary_color', array(
        'default'           => '#333333',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'postMessage'
    ));
    
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'secondary_color', array(
        'label'    => 'Couleur Secondaire',
        'section'  => 'mon_theme_colors',
        'settings' => 'secondary_color',
    )));
}
add_action('customize_register', 'mon_theme_customize_register');

// Appliquer les couleurs personnalisées
function mon_theme_customizer_css() {
    $primary_color = get_theme_mod('primary_color', '#007cba');
    $secondary_color = get_theme_mod('secondary_color', '#333333');
    ?>
    <style type="text/css">
        :root {
            --primary-color: <?php echo esc_html($primary_color); ?>;
            --secondary-color: <?php echo esc_html($secondary_color); ?>;
        }
        .site-header {
            background-color: var(--primary-color);
        }
        .main-navigation a {
            color: var(--secondary-color);
        }
    </style>
    <?php
}
add_action('wp_head', 'mon_theme_customizer_css');
```

## Exercices pratiques

### Exercice 1 : Configuration de base
1. Créer un `functions.php` complet avec tous les supports essentiels
2. Ajouter des tailles d'images personnalisées
3. Tester les différents supports dans l'administration

### Exercice 2 : Système de menus
1. Enregistrer plusieurs zones de menus
2. Créer des menus dans l'administration
3. Les afficher dans les templates avec des styles personnalisés

### Exercice 3 : Widgets personnalisés
1. Créer des zones de widgets pour header, sidebar et footer
2. Développer un widget personnalisé
3. Tester l'affichage dans différentes zones

### Exercice 4 : Customizer
1. Ajouter des options de couleurs dans le Customizer
2. Implémenter la prévisualisation en temps réel
3. Appliquer les changements sur le site

## Points clés à retenir

- Le `functions.php` est le centre de contrôle du thème
- Toujours préfixer les fonctions pour éviter les conflits
- Utiliser les hooks appropriés pour chaque type de fonctionnalité
- Les supports de thème activent des fonctionnalités WordPress
- Le système de menus est flexible et personnalisable
- Les widgets ajoutent de la modularité au contenu
- Le Customizer permet une personnalisation en temps réel

## Prochaine étape

Dans le **Cours 4**, nous nous concentrerons sur le design et la création d'un système CSS modulaire et responsive pour donner vie à notre thème avec un design professionnel et adaptatif.
