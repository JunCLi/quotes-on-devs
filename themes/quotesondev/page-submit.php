<?php
/**
 * Template Name: Submit a Quote
 * The template for displaying all pages.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<?php while ( have_posts() ) : the_post(); ?>

				<?php get_template_part( 'template-parts/content', 'page' ); ?>

			<?php endwhile; // End of the loop. ?>

			<form id="submit-new-quote" action="<?php get_template_directory_uri() . 'wp-json/wp/v2/posts' ?>"method="post">
				<div>
					<label for="name">Author of Quote</label>
					<input type="text" id="name" name="title" value="hi">
				</div>
				<div>
					<label for="name">Quote</label>
					<textarea id="quote" name="content">why</textarea>
				</div>
				<div>
					<label for="name">Where did you find this quote? (e.g. book name)</label>
					<input type="text" id="find-quote" name="_qod_quote_source" value="bye">
				</div>
				<div>
					<label for="name">Provide url of quote source, if available.</label>
					<input type="text" id="url-source" name="_qod_quote_source_url" value="cry">
				</div>
				<button type="submit" id="submit-quote">Submit Quote</button>
			</form>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
