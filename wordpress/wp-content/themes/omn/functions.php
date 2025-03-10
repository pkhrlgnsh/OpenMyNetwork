<?php
/*
Plugin Name: Article Custom Post Type
*/
function create_articles_cpt() {
    register_post_type('article', [
        'labels' => [
            'name' => __('Articles'),
            'singular_name' => __('Article')
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'article',
        'graphql_plural_name' => 'articles',
        'supports' => ['title', 'editor', 'thumbnail']
    ]);
}
add_action('init', 'create_articles_cpt');
