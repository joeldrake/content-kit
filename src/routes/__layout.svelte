<script context="module">
	export async function load({ fetch }) {
		const data = await fetch('/pages.json');
		const result = await data.json();
		return {
			props: {
				entries: result.entries
			}
		};
	}
</script>

<script lang="ts">
	import { pages } from '$lib/store';
	import type { Entry } from 'contentful';
	export let entries: Entry<any>[];
	console.log('layout mounted');
	pages.set(entries);
</script>

<main>
	<nav>
		{#if entries}
			<ul>
				<li>
					<a href={`/`}>Start</a>
				</li>

				{#each entries as page}
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
			</ul>
		{/if}
	</nav>
	<slot />
</main>
