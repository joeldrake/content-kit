<script lang="ts">
	import { pages } from '$lib/store';
	export const prerender = true;
</script>

{#if $pages}
	<ul class="top">
		<li>
			<a href={`/`}>{$pages.fields.title}</a>
		</li>

		{#if $pages.fields.subpages}
			{#each $pages.fields.subpages as page}
				<li>
					<a href={`/${page.fields.slug}`}>{page.fields.title}</a>

					{#if page.fields.subpages}
						<ul>
							{#each page.fields.subpages as subpage}
								<li>
									<a href={`/${page.fields.slug}/${subpage.fields.slug}`}>{subpage.fields.title}</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		{/if}
	</ul>
{/if}

<style>
	ul {
		list-style: none;
		margin: 0;
		padding-inline-start: 2rem;
	}

	.top {
		padding: 0;
	}
</style>
