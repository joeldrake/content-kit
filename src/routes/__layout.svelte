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
	import '$lib/styles/app.css';
	import MenuButton from '$lib/components/MenuButton.svelte';
	import Navigation from '$lib/components/Navigation.svelte';

	import { pages, navOpen } from '$lib/store';
	export let startpage: App.Entry;

	// console.log('layout mounted', startpage);
	$pages = startpage;
</script>

<div class="site-wrapper" class:navOpen={$navOpen}>
	<MenuButton />
	<Navigation />
	<main>
		<slot />
	</main>
</div>

<style>
	.site-wrapper {
		display: flex;
		flex-direction: row;
	}
	@media (max-width: 960px) {
		.site-wrapper {
			display: block;
		}
	}
</style>
