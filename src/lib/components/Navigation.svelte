<script lang="ts">
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import { pages, navOpen, isSmall } from '$lib/store';
	import { afterNavigate } from '$app/navigation';

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

	function navScrollTop() {
		const target = document.querySelector('.navigation-scroll');
		if (!target) return;
		target.scrollTop = 0;
	}
</script>

<svelte:body on:click={handleClick} />

{#if !$isSmall || ($isSmall && $navOpen)}
	<nav class="navigation" class:navOpen={$navOpen} bind:this={navigation}>
		<div class="navigation-logo-wrapper">
			<a href="/" alt="start" on:click={navScrollTop}>
				<img src="/images/logo.jpg" class="navigation-logo" alt="Brf trasten 7 & 8" />
			</a>
		</div>
		{#if $pages}
			<div class="navigation-scroll">
				<ul class="top">
					<li>
						<a href={`/`} class:active={$page.url.pathname === `/`} on:click={handleNavItemClick}
							>Start</a
						>
					</li>

					{#if $pages.fields.subpages}
						{#each $pages.fields.subpages as toppage}
							{@const pageurl = `/${toppage.fields.slug}`}
							<li>
								<a
									href={pageurl}
									class:active={$page.url.pathname === pageurl}
									on:click={handleNavItemClick}>{@html toppage.fields.title}</a
								>

								{#if toppage.fields.subpages}
									<ul>
										{#each toppage.fields.subpages as subpage}
											{@const subpageurl = `/${toppage.fields.slug}/${subpage.fields.slug}`}
											<li>
												<a
													href={subpageurl}
													class:active={$page.url.pathname === subpageurl}
													on:click={handleNavItemClick}>{@html subpage.fields.title}</a
												>
											</li>
										{/each}
									</ul>
								{/if}
							</li>
						{/each}
					{/if}
				</ul>
			</div>
		{/if}
	</nav>
{/if}

<style>
	nav {
		--nav-line-width: 1px;
		--nav-desktop-header-height: 94px;
		position: fixed;
		top: 0;
		height: 100vh;

		background-color: var(--color-background);
		box-shadow: var(--shadow-4);
		padding: var(--padding-small);
		padding-right: 0;
		width: 90vw;
		max-width: 300px;

		box-shadow: var(--shadow);
		border-right: 1px solid var(--color-border);
	}

	.navigation-scroll {
		overflow: auto;
		height: calc(100vh - (var(--nav-desktop-header-height) + var(--padding-small)));
		padding-right: var(--padding-small);
		padding-bottom: 80px;
	}
	ul {
		list-style: none;
		margin: 0;
		padding-inline-start: var(--padding-small);
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
		border-left: var(--nav-line-width) solid var(--color-border);
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
		border-left: var(--nav-line-width) solid var(--color-border);
		border-bottom: var(--nav-line-width) solid var(--color-border);
		border-bottom-left-radius: 8px;
	}

	.top {
		padding: 0;
	}

	.navigation-logo-wrapper {
		height: var(--nav-desktop-header-height);
		padding-right: var(--padding-small);
		padding-bottom: var(--padding-small);
	}

	.navigation-logo {
		width: 100%;
	}

	a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: var(--grey-7);
		height: 40px;
		line-height: 1;
		border-bottom: var(--nav-line-width) solid var(--color-border);
	}

	/* .navigation-chevron {
		display: none;
		margin-right: 0.25rem;
		color: var(--color-border);
		height: 18px;
	}

	a.active .navigation-chevron {
		display: inline-block;
	} */
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
			padding: var(--padding-big) var(--padding-small);
			padding-right: 0;
			animation: slideIn var(--animation-time);
		}

		.navigation-scroll {
			height: calc(100vh - var(--padding-big));
			padding-right: var(--padding-small);
		}

		.navigation-logo-wrapper {
			height: 0;
			padding: 0;
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

			top {
				transform: translateX(0%);
			}
		}
	}
</style>
