# Cours 012 : Optimisation, Sécurité et Déploiement Production

## Introduction

Ce cours final vous enseigne à optimiser votre thème WordPress pour les performances, la sécurité et le SEO, puis à le préparer pour un déploiement en production. Vous apprendrez les meilleures pratiques pour un thème WordPress professionnel.

## Objectifs d'apprentissage

- Optimiser les performances du thème
- Implémenter les bonnes pratiques de sécurité
- Optimiser le SEO technique
- Préparer le thème pour la production
- Gérer le déploiement et la maintenance
- Documenter et packager le thème

## 1. Optimisation des performances

### 1.1 Optimisation du chargement des assets

```php
// Dans functions.php - Chargement optimisé des assets
function mon_theme_optimize_assets() {
    
    // Supprimer les styles/scripts inutiles
    function mon_theme_dequeue_unnecessary() {
        // Supprimer jQuery Migrate si pas nécessaire
        if (!is_admin()) {
            wp_deregister_script('jquery-migrate');
        }
        
        // Supprimer les emoji scripts/styles
        remove_action('wp_head', 'print_emoji_detection_script', 7);
        remove_action('wp_print_styles', 'print_emoji_styles');
        remove_action('admin_print_scripts', 'print_emoji_detection_script');
        remove_action('admin_print_styles', 'print_emoji_styles');
        
        // Supprimer les embeds inutiles
        wp_deregister_script('wp-embed');
        
        // Supprimer les générateurs de version
        remove_action('wp_head', 'wp_generator');
        remove_action('wp_head', 'wlwmanifest_link');
        remove_action('wp_head', 'rsd_link');
    }
    add_action('init', 'mon_theme_dequeue_unnecessary');
    
    // Chargement conditionnel des scripts
    function mon_theme_conditional_scripts() {
        // Script de commentaires uniquement sur les pages avec commentaires
        if (is_singular() && comments_open() && get_option('thread_comments')) {
            wp_enqueue_script('comment-reply');
        }
        
        // Scripts de contact uniquement sur la page contact
        if (is_page('contact') || is_page_template('page-contact.php')) {
            wp_enqueue_script('contact-form', get_template_directory_uri() . '/assets/js/contact.js', array('jquery'), '1.0.0', true);
        }
        
        // Scripts portfolio uniquement sur les pages portfolio
        if (is_post_type_archive('portfolio') || is_singular('portfolio')) {
            wp_enqueue_script('portfolio-filters', get_template_directory_uri() . '/assets/js/portfolio.js', array('jquery'), '1.0.0', true);
        }
    }
    add_action('wp_enqueue_scripts', 'mon_theme_conditional_scripts');
    
    // Préchargement des ressources critiques
    function mon_theme_preload_resources() {
        // Précharger les polices importantes
        echo '<link rel="preload" href="' . get_template_directory_uri() . '/assets/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin>';
        echo '<link rel="preload" href="' . get_template_directory_uri() . '/assets/fonts/inter-bold.woff2" as="font" type="font/woff2" crossorigin>';
        
        // Précharger les images critiques
        if (is_front_page()) {
            $hero_image = get_theme_mod('hero_background_image');
            if ($hero_image) {
                echo '<link rel="preload" href="' . esc_url($hero_image) . '" as="image">';
            }
        }
    }
    add_action('wp_head', 'mon_theme_preload_resources', 1);
}
add_action('after_setup_theme', 'mon_theme_optimize_assets');
```

### 1.2 Mise en cache et compression

```php
// Cache pour les requêtes coûteuses
function mon_theme_cached_portfolio() {
    $cache_key = 'featured_portfolio_' . get_current_blog_id();
    $portfolio = get_transient($cache_key);
    
    if (false === $portfolio) {
        $portfolio_query = new WP_Query(array(
            'post_type' => 'portfolio',
            'posts_per_page' => 6,
            'meta_query' => array(
                array(
                    'key' => 'projet_featured',
                    'value' => '1',
                    'compare' => '='
                )
            )
        ));
        
        $portfolio = array();
        if ($portfolio_query->have_posts()) {
            while ($portfolio_query->have_posts()) {
                $portfolio_query->the_post();
                $portfolio[] = array(
                    'ID' => get_the_ID(),
                    'title' => get_the_title(),
                    'permalink' => get_permalink(),
                    'thumbnail' => get_the_post_thumbnail_url(get_the_ID(), 'medium_large'),
                    'excerpt' => get_the_excerpt(),
                    'client' => get_field('projet_client')
                );
            }
        }
        wp_reset_postdata();
        
        // Cache pour 1 heure
        set_transient($cache_key, $portfolio, HOUR_IN_SECONDS);
    }
    
    return $portfolio;
}

// Vider le cache lors de la mise à jour
function mon_theme_clear_portfolio_cache($post_id) {
    if (get_post_type($post_id) === 'portfolio') {
        delete_transient('featured_portfolio_' . get_current_blog_id());
    }
}
add_action('save_post', 'mon_theme_clear_portfolio_cache');
add_action('delete_post', 'mon_theme_clear_portfolio_cache');

// Compression GZIP
function mon_theme_enable_gzip() {
    if (!is_admin() && !headers_sent()) {
        if (extension_loaded('zlib') && !ini_get('output_handler')) {
            if (ob_get_level() == 0) {
                ob_start('ob_gzhandler');
            }
        }
    }
}
add_action('init', 'mon_theme_enable_gzip', 1);
```

### 1.3 Optimisation des images

```php
// Lazy loading natif pour les images
function mon_theme_add_lazy_loading($content) {
    if (is_admin() || is_feed() || wp_is_json_request()) {
        return $content;
    }
    
    // Ajouter loading="lazy" aux images
    $content = preg_replace('/<img((?:[^>]++)*?)>/i', '<img loading="lazy"$1>', $content);
    
    return $content;
}
add_filter('the_content', 'mon_theme_add_lazy_loading');

// WebP support
function mon_theme_add_webp_support($mime_types) {
    $mime_types['webp'] = 'image/webp';
    return $mime_types;
}
add_filter('upload_mimes', 'mon_theme_add_webp_support');

// Génération d'images responsives
function mon_theme_responsive_images() {
    // Ajouter des tailles d'images pour différents écrans
    add_image_size('mobile-hero', 480, 320, true);
    add_image_size('tablet-hero', 768, 512, true);
    add_image_size('desktop-hero', 1200, 800, true);
    add_image_size('retina-thumbnail', 600, 400, true);
}
add_action('after_setup_theme', 'mon_theme_responsive_images');

// Attribut srcset automatique
function mon_theme_responsive_image_srcset($attr, $attachment, $size) {
    if ($size === 'hero-image') {
        $attr['sizes'] = '(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px';
    }
    return $attr;
}
add_filter('wp_get_attachment_image_attributes', 'mon_theme_responsive_image_srcset', 10, 3);
```

## 2. Sécurité WordPress

### 2.1 Protection contre les attaques courantes

```php
// Protection contre l'injection de code
function mon_theme_sanitize_inputs() {
    
    // Sanitisation des données POST
    function mon_theme_sanitize_post_data($data) {
        if (is_array($data)) {
            return array_map('mon_theme_sanitize_post_data', $data);
        }
        
        // Supprimer les scripts et balises dangereuses
        $data = wp_strip_all_tags($data);
        $data = sanitize_text_field($data);
        
        return $data;
    }
    
    // Appliquer la sanitisation aux données POST
    if (!empty($_POST)) {
        $_POST = mon_theme_sanitize_post_data($_POST);
    }
}
add_action('init', 'mon_theme_sanitize_inputs', 1);

// Protection CSRF avec nonces
function mon_theme_verify_nonce($action = 'mon_theme_action') {
    if (!wp_verify_nonce($_POST['_wpnonce'] ?? '', $action)) {
        wp_die('Erreur de sécurité : Token invalide.');
    }
}

// Masquer les informations sensibles
function mon_theme_hide_wp_version() {
    return '';
}
add_filter('the_generator', 'mon_theme_hide_wp_version');

// Désactiver l'édition de fichiers depuis l'admin
if (!defined('DISALLOW_FILE_EDIT')) {
    define('DISALLOW_FILE_EDIT', true);
}

// Protection contre les tentatives de login
function mon_theme_limit_login_attempts() {
    $attempts = get_option('mon_theme_login_attempts', array());
    $ip = $_SERVER['REMOTE_ADDR'];
    $current_time = current_time('timestamp');
    
    // Nettoyer les tentatives anciennes (> 1 heure)
    foreach ($attempts as $attempt_ip => $data) {
        if ($current_time - $data['time'] > 3600) {
            unset($attempts[$attempt_ip]);
        }
    }
    
    // Vérifier si l'IP est bloquée
    if (isset($attempts[$ip]) && $attempts[$ip]['count'] >= 5) {
        if ($current_time - $attempts[$ip]['time'] < 3600) {
            wp_die('Trop de tentatives de connexion. Réessayez dans 1 heure.');
        } else {
            unset($attempts[$ip]);
        }
    }
    
    update_option('mon_theme_login_attempts', $attempts);
}

function mon_theme_track_failed_login($username) {
    $attempts = get_option('mon_theme_login_attempts', array());
    $ip = $_SERVER['REMOTE_ADDR'];
    $current_time = current_time('timestamp');
    
    if (!isset($attempts[$ip])) {
        $attempts[$ip] = array('count' => 0, 'time' => $current_time);
    }
    
    $attempts[$ip]['count']++;
    $attempts[$ip]['time'] = $current_time;
    
    update_option('mon_theme_login_attempts', $attempts);
}

add_action('wp_login', 'mon_theme_limit_login_attempts');
add_action('wp_login_failed', 'mon_theme_track_failed_login');
```

### 2.2 Validation et sanitisation des données

```php
// Classe de validation centralisée
class Mon_Theme_Validator {
    
    public static function validate_email($email) {
        return is_email($email);
    }
    
    public static function validate_phone($phone) {
        $phone = preg_replace('/[^0-9+\-\s()]/', '', $phone);
        return preg_match('/^[\+]?[0-9\s\-\(\)]{8,}$/', $phone);
    }
    
    public static function validate_url($url) {
        return filter_var($url, FILTER_VALIDATE_URL) !== false;
    }
    
    public static function sanitize_textarea($text) {
        return wp_kses($text, array(
            'br' => array(),
            'p' => array(),
            'strong' => array(),
            'em' => array(),
            'a' => array('href' => array(), 'title' => array())
        ));
    }
    
    public static function validate_file_upload($file) {
        $allowed_types = array('jpg', 'jpeg', 'png', 'gif', 'webp');
        $file_type = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        
        // Vérifier le type de fichier
        if (!in_array($file_type, $allowed_types)) {
            return new WP_Error('invalid_file_type', 'Type de fichier non autorisé.');
        }
        
        // Vérifier la taille (max 5MB)
        if ($file['size'] > 5 * 1024 * 1024) {
            return new WP_Error('file_too_large', 'Fichier trop volumineux (max 5MB).');
        }
        
        // Vérifier le MIME type
        $allowed_mimes = array(
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp'
        );
        
        if (!in_array($file['type'], $allowed_mimes)) {
            return new WP_Error('invalid_mime_type', 'Type MIME non autorisé.');
        }
        
        return true;
    }
}

// Exemple d'utilisation dans un formulaire de contact
function mon_theme_process_contact_form() {
    if (!isset($_POST['contact_nonce']) || !wp_verify_nonce($_POST['contact_nonce'], 'contact_form')) {
        wp_die('Erreur de sécurité.');
    }
    
    $errors = array();
    
    // Validation des champs
    $name = sanitize_text_field($_POST['name'] ?? '');
    if (empty($name)) {
        $errors[] = 'Le nom est requis.';
    }
    
    $email = sanitize_email($_POST['email'] ?? '');
    if (!Mon_Theme_Validator::validate_email($email)) {
        $errors[] = 'Email invalide.';
    }
    
    $message = Mon_Theme_Validator::sanitize_textarea($_POST['message'] ?? '');
    if (empty($message)) {
        $errors[] = 'Le message est requis.';
    }
    
    // Si pas d'erreurs, traiter le formulaire
    if (empty($errors)) {
        // Envoi de l'email, enregistrement en base, etc.
        wp_redirect(add_query_arg('contact', 'success', wp_get_referer()));
        exit;
    } else {
        // Redirection avec erreurs
        wp_redirect(add_query_arg('contact_errors', urlencode(implode('|', $errors)), wp_get_referer()));
        exit;
    }
}
add_action('wp_ajax_contact_form', 'mon_theme_process_contact_form');
add_action('wp_ajax_nopriv_contact_form', 'mon_theme_process_contact_form');
```

## 3. Optimisation SEO technique

### 3.1 Métadonnées et balises structurées

```php
// Métadonnées SEO avancées
function mon_theme_seo_meta_tags() {
    if (is_singular()) {
        global $post;
        
        // Title optimisé
        $title = get_the_title();
        if (is_front_page()) {
            $title = get_bloginfo('name') . ' - ' . get_bloginfo('description');
        } elseif (is_singular('portfolio')) {
            $client = get_field('projet_client');
            if ($client) {
                $title .= ' - Projet pour ' . $client;
            }
        }
        
        // Description
        $description = '';
        if (has_excerpt()) {
            $description = wp_trim_words(get_the_excerpt(), 25);
        } else {
            $description = wp_trim_words(strip_shortcodes($post->post_content), 25);
        }
        
        // Image
        $image = '';
        if (has_post_thumbnail()) {
            $image = get_the_post_thumbnail_url(get_the_ID(), 'large');
        }
        
        // Open Graph
        echo '<meta property="og:title" content="' . esc_attr($title) . '">' . "\n";
        echo '<meta property="og:description" content="' . esc_attr($description) . '">' . "\n";
        echo '<meta property="og:type" content="article">' . "\n";
        echo '<meta property="og:url" content="' . esc_url(get_permalink()) . '">' . "\n";
        if ($image) {
            echo '<meta property="og:image" content="' . esc_url($image) . '">' . "\n";
        }
        
        // Twitter Cards
        echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
        echo '<meta name="twitter:title" content="' . esc_attr($title) . '">' . "\n";
        echo '<meta name="twitter:description" content="' . esc_attr($description) . '">' . "\n";
        if ($image) {
            echo '<meta name="twitter:image" content="' . esc_url($image) . '">' . "\n";
        }
        
        // Métadonnées additionnelles
        if (is_singular('portfolio')) {
            $technologies = get_field('projet_technologies');
            if ($technologies) {
                echo '<meta name="keywords" content="' . esc_attr(implode(', ', $technologies)) . '">' . "\n";
            }
        }
    }
}
add_action('wp_head', 'mon_theme_seo_meta_tags');

// Données structurées Schema.org
function mon_theme_structured_data() {
    if (is_singular('portfolio')) {
        global $post;
        
        $client = get_field('projet_client');
        $date = get_field('projet_date');
        $url = get_field('projet_url');
        $technologies = get_field('projet_technologies');
        
        $schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'CreativeWork',
            'name' => get_the_title(),
            'description' => get_the_excerpt(),
            'author' => array(
                '@type' => 'Organization',
                'name' => get_bloginfo('name')
            ),
            'dateCreated' => get_the_date('c'),
            'dateModified' => get_the_modified_date('c')
        );
        
        if ($url) {
            $schema['url'] = $url;
        }
        
        if ($client) {
            $schema['client'] = $client;
        }
        
        if ($date) {
            $schema['datePublished'] = date('c', strtotime($date));
        }
        
        if ($technologies) {
            $schema['keywords'] = implode(', ', $technologies);
        }
        
        if (has_post_thumbnail()) {
            $schema['image'] = get_the_post_thumbnail_url(get_the_ID(), 'large');
        }
        
        echo '<script type="application/ld+json">' . wp_json_encode($schema) . '</script>' . "\n";
    }
    
    // Données structurées pour l'organisation
    if (is_front_page()) {
        $contact_info = get_field('contact_info', 'option');
        $social_links = get_field('social_links', 'option');
        
        $organization = array(
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => get_bloginfo('name'),
            'description' => get_bloginfo('description'),
            'url' => home_url('/'),
            'logo' => array(
                '@type' => 'ImageObject',
                'url' => get_theme_mod('custom_logo') ? wp_get_attachment_url(get_theme_mod('custom_logo')) : ''
            )
        );
        
        if ($contact_info) {
            if (!empty($contact_info['contact_phone'])) {
                $organization['telephone'] = $contact_info['contact_phone'];
            }
            if (!empty($contact_info['contact_email'])) {
                $organization['email'] = $contact_info['contact_email'];
            }
            if (!empty($contact_info['contact_address'])) {
                $organization['address'] = $contact_info['contact_address'];
            }
        }
        
        if ($social_links) {
            $social_urls = array();
            foreach ($social_links as $link) {
                $social_urls[] = $link['social_url'];
            }
            $organization['sameAs'] = $social_urls;
        }
        
        echo '<script type="application/ld+json">' . wp_json_encode($organization) . '</script>' . "\n";
    }
}
add_action('wp_head', 'mon_theme_structured_data');
```

### 3.2 Optimisation des URLs et navigation

```php
// URLs propres pour les Custom Post Types
function mon_theme_custom_rewrite_rules() {
    // URL personnalisée pour portfolio avec catégorie
    add_rewrite_rule(
        '^portfolio/([^/]*)/([^/]*)/?',
        'index.php?portfolio_category=$matches[1]&portfolio=$matches[2]',
        'top'
    );
    
    // URL pour équipe par poste
    add_rewrite_rule(
        '^equipe/poste/([^/]*)/?',
        'index.php?poste=$matches[1]',
        'top'
    );
}
add_action('init', 'mon_theme_custom_rewrite_rules');

// Fil d'Ariane (Breadcrumbs)
function mon_theme_breadcrumbs() {
    if (is_front_page()) return;
    
    $breadcrumbs = array();
    $breadcrumbs[] = '<a href="' . home_url('/') . '">Accueil</a>';
    
    if (is_post_type_archive()) {
        $post_type_object = get_queried_object();
        $breadcrumbs[] = '<span>' . $post_type_object->labels->name . '</span>';
    } elseif (is_singular()) {
        $post_type = get_post_type();
        
        if ($post_type !== 'post' && $post_type !== 'page') {
            $post_type_object = get_post_type_object($post_type);
            $archive_link = get_post_type_archive_link($post_type);
            if ($archive_link) {
                $breadcrumbs[] = '<a href="' . $archive_link . '">' . $post_type_object->labels->name . '</a>';
            }
        }
        
        // Catégories pour portfolio
        if ($post_type === 'portfolio') {
            $terms = get_the_terms(get_the_ID(), 'portfolio_category');
            if ($terms && !is_wp_error($terms)) {
                $term = array_shift($terms);
                $breadcrumbs[] = '<a href="' . get_term_link($term) . '">' . $term->name . '</a>';
            }
        }
        
        $breadcrumbs[] = '<span>' . get_the_title() . '</span>';
    } elseif (is_tax()) {
        $term = get_queried_object();
        $post_type_object = get_post_type_object($term->object_type[0] ?? 'post');
        
        $archive_link = get_post_type_archive_link($term->object_type[0] ?? 'post');
        if ($archive_link) {
            $breadcrumbs[] = '<a href="' . $archive_link . '">' . $post_type_object->labels->name . '</a>';
        }
        
        $breadcrumbs[] = '<span>' . $term->name . '</span>';
    }
    
    if (!empty($breadcrumbs)) {
        echo '<nav class="breadcrumbs" aria-label="Fil d\'Ariane">';
        echo '<ol class="breadcrumbs-list">';
        foreach ($breadcrumbs as $index => $breadcrumb) {
            echo '<li class="breadcrumb-item">' . $breadcrumb;
            if ($index < count($breadcrumbs) - 1) {
                echo ' <span class="separator">→</span>';
            }
            echo '</li>';
        }
        echo '</ol>';
        echo '</nav>';
    }
}

// Sitemap XML automatique
function mon_theme_generate_sitemap() {
    $sitemap = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
    
    // Page d'accueil
    $sitemap .= '<url>';
    $sitemap .= '<loc>' . home_url('/') . '</loc>';
    $sitemap .= '<changefreq>daily</changefreq>';
    $sitemap .= '<priority>1.0</priority>';
    $sitemap .= '</url>' . "\n";
    
    // Pages
    $pages = get_pages();
    foreach ($pages as $page) {
        $sitemap .= '<url>';
        $sitemap .= '<loc>' . get_permalink($page->ID) . '</loc>';
        $sitemap .= '<lastmod>' . get_the_modified_date('c', $page->ID) . '</lastmod>';
        $sitemap .= '<changefreq>monthly</changefreq>';
        $sitemap .= '<priority>0.8</priority>';
        $sitemap .= '</url>' . "\n";
    }
    
    // Articles
    $posts = get_posts(array('numberposts' => -1));
    foreach ($posts as $post) {
        $sitemap .= '<url>';
        $sitemap .= '<loc>' . get_permalink($post->ID) . '</loc>';
        $sitemap .= '<lastmod>' . get_the_modified_date('c', $post->ID) . '</lastmod>';
        $sitemap .= '<changefreq>weekly</changefreq>';
        $sitemap .= '<priority>0.6</priority>';
        $sitemap .= '</url>' . "\n";
    }
    
    // Portfolio
    $portfolio = get_posts(array('post_type' => 'portfolio', 'numberposts' => -1));
    foreach ($portfolio as $project) {
        $sitemap .= '<url>';
        $sitemap .= '<loc>' . get_permalink($project->ID) . '</loc>';
        $sitemap .= '<lastmod>' . get_the_modified_date('c', $project->ID) . '</lastmod>';
        $sitemap .= '<changefreq>monthly</changefreq>';
        $sitemap .= '<priority>0.7</priority>';
        $sitemap .= '</url>' . "\n";
    }
    
    $sitemap .= '</urlset>';
    
    return $sitemap;
}

// Générer le sitemap via une URL dédiée
function mon_theme_sitemap_endpoint() {
    add_rewrite_rule('^sitemap\.xml$', 'index.php?sitemap=1', 'top');
}
add_action('init', 'mon_theme_sitemap_endpoint');

function mon_theme_sitemap_template() {
    if (get_query_var('sitemap')) {
        header('Content-Type: application/xml; charset=utf-8');
        echo mon_theme_generate_sitemap();
        exit;
    }
}
add_action('template_redirect', 'mon_theme_sitemap_template');
```

## 4. Préparation pour la production

### 4.1 Minification et concatenation

```php
// Système de minification des assets
class Mon_Theme_Assets_Optimizer {
    
    public static function init() {
        if (!WP_DEBUG && !is_admin()) {
            add_action('wp_enqueue_scripts', array(__CLASS__, 'optimize_assets'), 999);
        }
    }
    
    public static function optimize_assets() {
        global $wp_scripts, $wp_styles;
        
        // Concaténer et minifier les CSS
        $css_files = array();
        foreach ($wp_styles->queue as $handle) {
            $style = $wp_styles->registered[$handle];
            if (strpos($style->src, get_template_directory_uri()) !== false) {
                $css_files[] = str_replace(get_template_directory_uri(), get_template_directory(), $style->src);
                wp_dequeue_style($handle);
            }
        }
        
        if (!empty($css_files)) {
            $concatenated_css = self::concatenate_css($css_files);
            $minified_css = self::minify_css($concatenated_css);
            
            $css_hash = md5($minified_css);
            $css_file = get_template_directory() . '/assets/css/combined-' . $css_hash . '.css';
            
            if (!file_exists($css_file)) {
                file_put_contents($css_file, $minified_css);
            }
            
            wp_enqueue_style('mon-theme-combined', get_template_directory_uri() . '/assets/css/combined-' . $css_hash . '.css');
        }
        
        // Même logique pour JavaScript
        $js_files = array();
        foreach ($wp_scripts->queue as $handle) {
            if ($handle === 'jquery') continue; // Garder jQuery séparé
            
            $script = $wp_scripts->registered[$handle];
            if (strpos($script->src, get_template_directory_uri()) !== false) {
                $js_files[] = str_replace(get_template_directory_uri(), get_template_directory(), $script->src);
                wp_dequeue_script($handle);
            }
        }
        
        if (!empty($js_files)) {
            $concatenated_js = self::concatenate_js($js_files);
            $minified_js = self::minify_js($concatenated_js);
            
            $js_hash = md5($minified_js);
            $js_file = get_template_directory() . '/assets/js/combined-' . $js_hash . '.js';
            
            if (!file_exists($js_file)) {
                file_put_contents($js_file, $minified_js);
            }
            
            wp_enqueue_script('mon-theme-combined', get_template_directory_uri() . '/assets/js/combined-' . $js_hash . '.js', array('jquery'), null, true);
        }
    }
    
    private static function concatenate_css($files) {
        $content = '';
        foreach ($files as $file) {
            if (file_exists($file)) {
                $content .= file_get_contents($file) . "\n";
            }
        }
        return $content;
    }
    
    private static function minify_css($css) {
        // Supprimer les commentaires
        $css = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css);
        
        // Supprimer les espaces inutiles
        $css = preg_replace('/\s+/', ' ', $css);
        $css = preg_replace('/\s*{\s*/', '{', $css);
        $css = preg_replace('/;\s*}/', '}', $css);
        $css = preg_replace('/\s*;\s*/', ';', $css);
        $css = preg_replace('/}\s*/', '}', $css);
        
        return trim($css);
    }
    
    private static function concatenate_js($files) {
        $content = '';
        foreach ($files as $file) {
            if (file_exists($file)) {
                $content .= file_get_contents($file) . ";\n";
            }
        }
        return $content;
    }
    
    private static function minify_js($js) {
        // Minification JS basique
        $js = preg_replace('/\s+/', ' ', $js);
        $js = preg_replace('/\s*{\s*/', '{', $js);
        $js = preg_replace('/\s*}\s*/', '}', $js);
        $js = preg_replace('/\s*;\s*/', ';', $js);
        
        return trim($js);
    }
}

Mon_Theme_Assets_Optimizer::init();
```

### 4.2 Configuration de production

```php
// Fichier de configuration production
function mon_theme_production_config() {
    
    // Désactiver les fonctionnalités de debug en production
    if (!WP_DEBUG) {
        // Supprimer la barre d'admin pour les non-admins
        if (!current_user_can('administrator')) {
            show_admin_bar(false);
        }
        
        // Désactiver les mises à jour automatiques pour les non-admins
        add_filter('auto_update_plugin', '__return_false');
        add_filter('auto_update_theme', '__return_false');
        
        // Masquer les erreurs PHP
        ini_set('display_errors', 0);
        ini_set('log_errors', 1);
        
        // Optimisations de base de données
        add_action('wp_scheduled_delete', function() {
            // Nettoyer les révisions anciennes
            $wpdb->query("DELETE FROM {$wpdb->posts} WHERE post_type = 'revision' AND post_date < DATE_SUB(NOW(), INTERVAL 30 DAY)");
            
            // Nettoyer les commentaires spam
            $wpdb->query("DELETE FROM {$wpdb->comments} WHERE comment_approved = 'spam' AND comment_date < DATE_SUB(NOW(), INTERVAL 30 DAY)");
            
            // Optimiser les tables
            $wpdb->query("OPTIMIZE TABLE {$wpdb->posts}, {$wpdb->postmeta}, {$wpdb->comments}, {$wpdb->commentmeta}");
        });
    }
    
    // Headers de sécurité
    function mon_theme_security_headers() {
        if (!is_admin()) {
            header('X-Content-Type-Options: nosniff');
            header('X-Frame-Options: SAMEORIGIN');
            header('X-XSS-Protection: 1; mode=block');
            header('Referrer-Policy: strict-origin-when-cross-origin');
            
            if (is_ssl()) {
                header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
            }
        }
    }
    add_action('send_headers', 'mon_theme_security_headers');
    
    // Monitoring des erreurs
    function mon_theme_log_errors($message, $type = 'error') {
        $log_file = get_template_directory() . '/logs/theme-errors.log';
        $log_dir = dirname($log_file);
        
        if (!file_exists($log_dir)) {
            wp_mkdir_p($log_dir);
        }
        
        $timestamp = current_time('Y-m-d H:i:s');
        $log_entry = "[{$timestamp}] [{$type}] {$message}" . PHP_EOL;
        
        error_log($log_entry, 3, $log_file);
    }
    
    // Hook pour capturer les erreurs
    set_error_handler(function($severity, $message, $file, $line) {
        if (strpos($file, get_template_directory()) !== false) {
            mon_theme_log_errors("PHP Error in {$file}:{$line} - {$message}");
        }
    });
}
add_action('after_setup_theme', 'mon_theme_production_config');
```

## 5. Documentation et packaging

### 5.1 Documentation du thème

```php
// Créer un fichier README.md pour le thème
$readme_content = '
# Mon Thème Personnalisé

## Description
Un thème WordPress moderne et responsive développé avec Local WP et Visual Studio Code.

## Fonctionnalités
- Design responsive et mobile-first
- Custom Post Types (Portfolio, Équipe, Témoignages)
- Integration Advanced Custom Fields (ACF)
- Optimisations SEO et performances
- Système de sécurité renforcé
- Compatible Gutenberg

## Installation

### Prérequis
- WordPress 5.0+
- PHP 7.4+
- Plugin Advanced Custom Fields Pro (recommandé)

### Étapes
1. Télécharger le thème
2. Décompresser dans `/wp-content/themes/`
3. Activer dans l\'administration WordPress
4. Installer les plugins requis
5. Importer les paramètres (si disponible)

## Configuration

### Customizer
- Apparence > Personnaliser
- Configurer logo, couleurs, typographie
- Paramétrer les zones de widgets

### ACF
- Les champs sont automatiquement créés
- Page d\'options disponible dans le menu admin

### Menus
- Créer des menus pour les emplacements :
  - Menu principal
  - Menu pied de page
  - Liens sociaux

## Structure des fichiers

```
mon-theme-personnalise/
├── style.css                 # Styles principaux
├── index.php                 # Template principal
├── functions.php             # Fonctions du thème
├── header.php               # En-tête
├── footer.php               # Pied de page
├── sidebar.php              # Barre latérale
├── single.php               # Article individuel
├── page.php                 # Page statique
├── archive.php              # Archive
├── 404.php                  # Page d\'erreur
├── front-page.php           # Page d\'accueil
├── single-portfolio.php     # Projet portfolio
├── archive-portfolio.php    # Archive portfolio
├── archive-equipe.php       # Archive équipe
├── assets/
│   ├── css/                 # Feuilles de style
│   ├── js/                  # Scripts JavaScript
│   ├── images/              # Images du thème
│   └── fonts/               # Polices personnalisées
├── inc/                     # Fichiers d\'inclusion
├── acf-json/               # Champs ACF exportés
└── logs/                   # Logs d\'erreurs
```

## Personnalisation

### Couleurs
Les couleurs sont définies via des variables CSS dans `style.css` :
```css
:root {
  --color-primary: #007cba;
  --color-secondary: #333333;
}
```

### Typographie
Polices configurables via le Customizer ou variables CSS.

### Custom Post Types
- Portfolio : Projets et réalisations
- Équipe : Membres de l\'équipe
- Témoignages : Avis clients

## Support
- Documentation : [URL de documentation]
- Support : [Email de support]
- Version : 1.0.0

## Changelog

### Version 1.0.0
- Version initiale
- Custom Post Types implémentés
- Integration ACF
- Design responsive
- Optimisations SEO et performances

## Crédits
- Développé par [Votre nom]
- Utilise Advanced Custom Fields
- Icons par Font Awesome
- Images de démonstration par Unsplash

## Licence
GPL v2 or later
';

file_put_contents(get_template_directory() . '/README.md', $readme_content);
```

### 5.2 Préparation du package de distribution

```php
// Script de packaging pour distribution
function mon_theme_create_distribution_package() {
    $theme_dir = get_template_directory();
    $theme_name = get_template();
    
    // Fichiers à exclure du package
    $exclude_files = array(
        'node_modules',
        '.git',
        '.gitignore',
        'logs',
        'assets/scss', // Si vous utilisez SCSS
        'gulpfile.js',
        'webpack.config.js',
        'package.json',
        'composer.json',
        '.DS_Store',
        'Thumbs.db'
    );
    
    // Créer un ZIP du thème nettoyé
    $zip = new ZipArchive();
    $zip_filename = $theme_name . '-distribution.zip';
    
    if ($zip->open($zip_filename, ZipArchive::CREATE) === TRUE) {
        
        // Parcourir tous les fichiers du thème
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($theme_dir),
            RecursiveIteratorIterator::LEAVES_ONLY
        );
        
        foreach ($iterator as $file) {
            if (!$file->isDir()) {
                $file_path = $file->getRealPath();
                $relative_path = substr($file_path, strlen($theme_dir) + 1);
                
                // Vérifier si le fichier doit être exclu
                $should_exclude = false;
                foreach ($exclude_files as $exclude) {
                    if (strpos($relative_path, $exclude) === 0) {
                        $should_exclude = true;
                        break;
                    }
                }
                
                if (!$should_exclude) {
                    $zip->addFile($file_path, $theme_name . '/' . $relative_path);
                }
            }
        }
        
        $zip->close();
        
        return $zip_filename;
    }
    
    return false;
}

// Créer une page d'administration pour le packaging
function mon_theme_admin_page_packaging() {
    add_theme_page(
        'Package Distribution',
        'Distribution',
        'manage_options',
        'theme-distribution',
        function() {
            if (isset($_POST['create_package'])) {
                $package = mon_theme_create_distribution_package();
                if ($package) {
                    echo '<div class="notice notice-success"><p>Package créé : ' . $package . '</p></div>';
                } else {
                    echo '<div class="notice notice-error"><p>Erreur lors de la création du package.</p></div>';
                }
            }
            ?>
            <div class="wrap">
                <h1>Package de Distribution</h1>
                <p>Créer un package zip du thème prêt pour la distribution.</p>
                <form method="post">
                    <?php wp_nonce_field('create_package'); ?>
                    <p>
                        <input type="submit" name="create_package" class="button-primary" value="Créer le Package">
                    </p>
                </form>
                
                <h2>Checklist avant distribution</h2>
                <ul>
                    <li>✓ Tests sur différents navigateurs</li>
                    <li>✓ Tests responsive</li>
                    <li>✓ Validation W3C</li>
                    <li>✓ Tests de performance</li>
                    <li>✓ Documentation complète</li>
                    <li>✓ Captures d'écran</li>
                    <li>✓ Fichiers de démonstration</li>
                </ul>
            </div>
            <?php
        }
    );
}
add_action('admin_menu', 'mon_theme_admin_page_packaging');
```

## Exercices pratiques

### Exercice 1 : Optimisation des performances
1. Installer et configurer un plugin de cache
2. Optimiser les images du thème
3. Mesurer les performances avec Google PageSpeed Insights
4. Implémenter le lazy loading

### Exercice 2 : Sécurité
1. Auditer la sécurité du thème
2. Implémenter les headers de sécurité
3. Tester la résistance aux attaques courantes
4. Configurer la limitation des tentatives de connexion

### Exercice 3 : SEO
1. Installer un plugin SEO
2. Optimiser les métadonnées
3. Créer un sitemap XML
4. Tester les données structurées

### Exercice 4 : Déploiement
1. Préparer un environnement de staging
2. Tester le déploiement
3. Configurer les sauvegardes automatiques
4. Mettre en place un monitoring

## Points clés à retenir

- Les performances impactent directement l'expérience utilisateur et le SEO
- La sécurité doit être une priorité dès le développement
- Le SEO technique est crucial pour la visibilité
- La documentation facilite la maintenance et l'utilisation
- Les tests sont essentiels avant la mise en production
- Le monitoring permet de détecter les problèmes rapidement

## Conclusion de la série

Félicitations ! Vous avez maintenant toutes les connaissances pour créer des thèmes WordPress professionnels avec :

1. **Environnement de développement optimisé** (Local WP + VS Code)
2. **Maîtrise des concepts fondamentaux** WordPress
3. **Expertise du fichier functions.php** et des fonctionnalités avancées
4. **Système CSS modulaire et responsive** professionnel
5. **Intégration WordPress avancée** avec Custom Post Types et ACF
6. **Optimisation production** complète (performances, sécurité, SEO)

Votre thème est maintenant prêt pour la production ! 🚀
