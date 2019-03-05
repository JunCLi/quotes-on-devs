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
		<?php foreach (get_post_custom() as $customProp => $propValue) : ?>
			<?php 
			// print_r($apple);
				if ($customProp === '_qod_quote_source') {
					$quoteSource = $propValue[0];
				}

				if ($customProp === '_qod_quote_source_url') {
					$quoteSourceUrl = $propValue[0];
				}
			?>
		<?php endforeach; ?>

		<h2 class="entry-title">
			<a href="<?php get_permalink() ?>" rel="bookmark"><?php the_title() ?></a><span class="quote-source"><a href="<?php echo $quoteSourceUrl ?>"><?php echo $quoteSource ?></a></span>
	</h2>
	</header><!-- .entry-header -->

</article><!-- #post-## -->