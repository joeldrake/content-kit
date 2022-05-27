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
	import { browser } from '$app/env';
	import '$lib/styles/app.css';
	import MenuButton from '$lib/components/MenuButton.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { pages, navOpen, isSmall } from '$lib/store';

	import { getIsSmall } from '$lib/utils/getIsSmall';

	export let startpage: App.Entry;

	$pages = startpage;

	function handleResize() {
		const current = getIsSmall();
		if (current !== $isSmall) $isSmall = current;
	}

	$: if (browser) {
		if ($isSmall && $navOpen) {
			document.body.classList.add('noscroll');
		} else {
			document.body.classList.remove('noscroll');
		}
	}
</script>

<svelte:window on:resize|passive={handleResize} />

<div class="site-wrapper" class:navOpen={$navOpen}>
	<MenuButton />
	<Navigation />
	<main>
		<slot />
	</main>
	<div class="footer-wrapper">
		<Footer />
	</div>
</div>

<style>
	main {
		min-height: 100vh;
	}
	main,
	.footer-wrapper {
		padding-left: 300px;
	}

	.footer-wrapper {
		background-color: var(--color-background-secondary);
	}

	@media (max-width: 960px) {
		main,
		.footer-wrapper {
			padding-left: 0;
		}
	}
</style>
