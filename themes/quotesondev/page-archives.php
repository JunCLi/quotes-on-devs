<?php
/**
 * The template for displaying all pages.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<?php while ( have_posts() ) : the_post(); ?>

				<?php get_template_part( 'template-parts/content', 'page' ); ?>

			<?php endwhile; wp_reset_postdata(); // End of the loop. ?>

			<section class="quote-authors">
				<h2>Quote Authors</h2>
				<ul>
					<?php
					$quoteAuthorsArgs = array(
						'post_type' => 'post',
						'posts_per_page' => -1
					);

					$quoteAuthors = new WP_Query($quoteAuthorsArgs);

					if ($quoteAuthors->have_posts()) : 
						while ($quoteAuthors->have_posts()) : $quoteAuthors->the_post(); ?>
							<li><a href="<?php echo get_permalink() ?>"><?php the_title() ?></a></li>
						<?php endwhile; wp_reset_postdata();
					endif;	

					

					
					?>
				</ul>
			</section> 

			<section class="quote-categories">
				<h2>Categories</h2>
				<ul>
					<?php
					$categories = get_categories();
					foreach ($categories as $category) : ?>
						<li><a href="<?php echo get_category_link($category->term_id) ?>"><?php echo $category->name ?></a></li>
					<?php endforeach; wp_reset_postdata(); ?>
					
				</ul>
			</section> 

			<section class="quote-tags">
				<h2>Tags</h2>
				<ul>
					<?php 
					$tags = get_tags();
					foreach ($tags as $tag) : ?>
						<li><a href="<?php echo get_tag_link($tag->term_id) ?>"><?php echo $tag->name ?></a></li>
					<?php endforeach; wp_reset_postdata(); ?>
				</ul>
			</section> 

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
