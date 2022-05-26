<script lang="ts">
	import { pages, navOpen } from '$lib/store';
	import Close from '$lib/icons/Close.svelte';
	import Menu from '$lib/icons/Menu.svelte';

	function handleMenuButtonClick() {
		$navOpen = !$navOpen;
	}
</script>

<button
	class="menu-button"
	class:navOpen={$navOpen}
	on:click={handleMenuButtonClick}
	aria-label={$navOpen ? 'Stäng meny' : 'Öppna meny'}
>
	{#if $navOpen}
		<Close />
	{:else}
		<Menu />
	{/if}
	<img
		src="/images/brftrastentext.jpg"
		draggable="false"
		class="menu-logo"
		alt="Brf trasten 7 & 8"
	/>
</button>

<style>
	.menu-button {
		display: none;
	}

	@media (max-width: 960px) {
		.menu-button {
			position: absolute;
			display: block;
			z-index: 2;
			padding: 0;
			height: 40px;
			top: 12px;
			left: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 0;
			background-color: var(--color-background);
		}

		.navOpen.menu-button {
			position: fixed;
		}

		.menu-logo {
			width: 100%;
			max-width: 120px;
			margin-left: 10px;
		}
	}
</style>
