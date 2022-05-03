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
	import Navigation from '$lib/components/Navigation.svelte';

	import { pages, navOpen } from '$lib/store';
	export let startpage: App.Entry;
	// console.log('layout mounted', startpage);
	pages.set(startpage);

	function handleMenuButtonClick() {
		navOpen.set(!$navOpen);
	}
</script>

{$navOpen}
<div class="site-wrapper" class:navOpen={$navOpen}>
	<nav>
		<Navigation />
	</nav>
	<main>
		<button on:click={handleMenuButtonClick}>Menu</button>
		<slot />
	</main>
</div>

<style global>
	@import 'https://unpkg.com/open-props';
	@import '$lib/styles/css-reset.css';

	:root {
		--color-accent: blue;
		--color-background: #fff;
		--color-text: #222;
		--color-subtle: rgba(255, 255, 255, 0.5);
		--color-very-subtle: rgba(255, 255, 255, 0.1);
		--color-most-subtle: rgba(255, 255, 255, 0.05);
	}

	body {
		accent-color: var(--color-accent);
		background-color: var(--color-background);
		color: var(--color-text);

		font-weight: var(--font-weight-3);
		font-family: var(--font-sans);
	}

	h1,
	h2,
	h3 {
		font-family: var(--font-serif);
	}

	h1 {
		font-size: 3rem;
	}

	h2 {
		font-size: 2rem;
	}

	h3 {
		font-size: 1rem;
	}

	a {
		color: var(--color-accent);
		text-decoration: none;
		font-weight: var(--font-weight-4);
	}
	a:hover {
		text-decoration: underline;
	}

	.site-wrapper {
		display: grid;
		grid-template-columns: 20rem 1fr;
		transition: transform 0.2s;
	}

	nav {
		position: sticky;
		top: 0;
		height: 100vh;
		overflow: auto;
		background-color: var(--color-background);
		box-shadow: var(--shadow-4);
		padding: 2rem;
	}

	@media (max-width: 60rem) {
		.site-wrapper {
			transform: translateX(-20rem);
		}
		.site-wrapper.navOpen {
			transform: translateX(0);
		}

		main {
			margin-right: -20rem;
		}
	}
</style>
