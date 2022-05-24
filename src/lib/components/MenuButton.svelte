<script lang="ts">
	import { pages, navOpen } from '$lib/store';

	function handleMenuButtonClick() {
		$navOpen = !$navOpen;
	}
</script>

<button class="menu-button" class:navOpen={$navOpen} on:click={handleMenuButtonClick}>
	{#if $navOpen}
		<img src="/images/close.svg" draggable="false" alt="" aria-hidden="true" />
	{:else}
		<img src="/images/menu.svg" draggable="false" alt="" aria-hidden="true" />
	{/if}
	<img src="/images/logo.jpg" draggable="false" class="menu-logo" alt="Brf trasten 7 & 8" />
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
			left: 30px;
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
