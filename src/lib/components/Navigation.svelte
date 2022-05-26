<script lang="ts">
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import { pages, navOpen } from '$lib/store';
	import { afterNavigate } from '$app/navigation';
	import ChevronRight from '$lib/icons/ChevronRight.svelte';
	export const prerender = true;

	let navigation: HTMLElement | null;

	afterNavigate(() => {
		$navOpen = false;
	});

	function handleClick(e: MouseEvent) {
		const path = e.composedPath();
		const settingsButton = document.querySelector('.menu-button');

		const isInside = path.some(
			(node: EventTarget) => node === navigation || node === settingsButton
		);
		if (!isInside) $navOpen = false;
	}

	function handleNavItemClick(e: Event) {
		if (!browser) return;
		const target = e.target as HTMLAnchorElement;
		if (target.href === window.location.href) $navOpen = false;
	}
</script>

<svelte:body on:click={handleClick} />

<nav class="navigation" class:navOpen={$navOpen} bind:this={navigation}>
	<img src="/images/logo.jpg" class="navigation-logo" alt="Brf trasten 7 & 8" />
	{#if $pages}
		<ul class="top">
			<li>
				<a href={`/`} class:active={$page.url.pathname === `/`} on:click={handleNavItemClick}
					>Start<span class="navigation-chevron"><ChevronRight /></span></a
				>
			</li>

			{#if $pages.fields.subpages}
				{#each $pages.fields.subpages as toppage}
					{@const pageurl = `/${toppage.fields.slug}`}
					<li>
						<a
							href={pageurl}
							class:active={$page.url.pathname === pageurl}
							on:click={handleNavItemClick}
							>{@html toppage.fields.title}<span class="navigation-chevron"><ChevronRight /></span
							></a
						>

						{#if toppage.fields.subpages}
							<ul>
								{#each toppage.fields.subpages as subpage}
									{@const subpageurl = `/${toppage.fields.slug}/${subpage.fields.slug}`}
									<li>
										<a
											href={subpageurl}
											class:active={$page.url.pathname === subpageurl}
											on:click={handleNavItemClick}
											>{@html subpage.fields.title}<span class="navigation-chevron"
												><ChevronRight /></span
											></a
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

<style>
	nav {
		--nav-line-color: var(--grey-3);
		--nav-line-width: 1px;
		position: fixed;
		top: 0;
		height: 100vh;
		overflow: auto;
		background-color: var(--color-background);
		box-shadow: var(--shadow-4);
		padding: 32px;
		width: 90vw;
		max-width: 300px;

		box-shadow: var(--shadow);
		border-right: 1px solid var(--nav-line-color);
	}
	ul {
		list-style: none;
		margin: 0;
		padding-inline-start: 32px;
	}

	li {
		position: relative;
	}
	li li::before {
		content: '';
		position: absolute;
		top: 0;
		left: -16px;
		height: 100%;
		border-left: var(--nav-line-width) solid var(--nav-line-color);
	}

	li li:last-child::before {
		border: 0;
	}

	li li::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		left: -16px;
		height: calc(50% + 1px);
		width: 10px;
		border-left: var(--nav-line-width) solid var(--nav-line-color);
		border-bottom: var(--nav-line-width) solid var(--nav-line-color);
		border-bottom-left-radius: 8px;
	}

	.top {
		padding: 0;
	}

	.navigation-logo {
		width: 100%;
		margin-bottom: 32px;
	}

	a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: var(--grey-7);
		height: 40px;
		border-bottom: var(--nav-line-width) solid var(--nav-line-color);
	}

	.navigation-chevron {
		display: none;
		margin-right: 0.25rem;
		color: var(--nav-line-color);
		height: 18px;
	}

	a.active .navigation-chevron {
		display: inline-block;
	}
	a.active {
		color: var(--grey-9);
		font-weight: 600;
	}

	li li a {
		border: 0;
	}

	@media (max-width: 960px) {
		nav {
			position: fixed;
			display: none;
			padding: 4rem 20px;
			animation: slideIn var(--animation-time);
		}

		.navigation-logo {
			display: none;
		}

		nav.navOpen {
			display: block;
		}

		@keyframes slideIn {
			from {
				transform: translateX(-100%);
			}
		}
	}
</style>
