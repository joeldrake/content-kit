<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch }) {
		const data = await fetch('/pages.json');
		const result = await data.json();
		return {
			props: {
				startpage: result.entries.items[0]
			}
		};
	}
</script>

<script lang="ts">
	import { pages } from '$lib/store';

	export let startpage: App.Entry;
	console.log('layout mounted', startpage);
	pages.set(startpage);
</script>

<main>
	<nav>
		{#if startpage}
			<ul>
				<li>
					<a href={`/`}>{startpage.fields.title}</a>
				</li>

				{#if startpage.fields.subpages}
					{#each startpage.fields.subpages as page}
						<li>
							<a href={`/${page.fields.slug}`}>{page.fields.title}</a>

							{#if page.fields.subpages}
								<ul>
									{#each page.fields.subpages as subpage}
										<li>
											<a href={`/${page.fields.slug}/${subpage.fields.slug}`}
												>{subpage.fields.title}</a
											>
										</li>
									{/each}
								</ul>
							{/if}
						</li>
					{/each}
				{/if}
			</ul>
		{/if}
	</nav>
	<slot />
</main>
