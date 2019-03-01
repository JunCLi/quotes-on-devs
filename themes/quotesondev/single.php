<?php
/**
 * The template for displaying all single posts.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<?php while ( have_posts() ) : the_post(); ?>

				<?php get_template_part( 'template-parts/content', 'single' ); ?>

			<?php endwhile; // End of the loop. ?>

			<button type="button" id="another-quote">Show me another!</button>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
