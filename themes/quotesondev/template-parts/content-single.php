<?php
/**
 * Template part for displaying single posts.
 *
 * @package QOD_Starter_Theme
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">
		<?php the_excerpt(); ?>
	</div><!-- .entry-content -->

	<header class="entry-header">
		<h2 class="entry-title">
			<a href="<?php get_permalink() ?>" rel="bookmark"><?php the_title() ?></a>
			<?php $quoteSources = get_post_custom()['_qod_quote_source'];
		foreach ($quoteSources as $quoteSource) : ?>
			<span class="quote-source"><?php echo $quoteSource ?></span>
		<?php endforeach ?>
	</h2>
	</header><!-- .entry-header -->
</article><!-- #post-## -->