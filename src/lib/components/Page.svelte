<script lang="ts">
	import { browser } from '$app/env';
	import { BLOCKS } from '@contentful/rich-text-types';
	import { documentToHtmlString, type Options } from '@contentful/rich-text-html-renderer';
	import { digestMessage, checkValid } from '$lib/utils/digestMessage';
	import { debounce } from '$lib/utils/debounce';
	export let page: App.Entry | undefined;
	let isLoggedin = false;
	let isDebouncing = false;
	let loginError = false;
	const s = '6dfcb9fd1eb5';

	let memberPages = false;
	$: if (page?.fields?.slug === 'medlemssidor') {
		memberPages = true;
		loginError = false;
		checkLoggedIn();
	} else if (memberPages) {
		memberPages = false;
		loginError = false;
	}

	async function checkLoggedIn() {
		if (!browser) return;
		const t = localStorage.getItem('t') as string;

		// temp solution in wait for https://github.com/sveltejs/kit/pull/4653
		if (checkValid(t)) {
			isLoggedin = true;
		}
	}

	function handleLoginSubmit(e: any) {
		loginError = false;
		isDebouncing = true;
		debouncedLoginSubmit(e);
	}

	const debouncedLoginSubmit = debounce(async (e: any) => {
		isDebouncing = false;
		scrollToTop();
		const form = e.target;
		const digest = await digestMessage(s + form?.password?.value.toLowerCase());
		if (checkValid(digest)) {
			isLoggedin = true;
			localStorage.setItem('t', digest);
		} else {
			if (form?.password?.value) form.password.value = '';
			loginError = true;
		}
	});

	function handleLogout() {
		isLoggedin = false;
		localStorage.setItem('t', '');
		scrollToTop();
	}

	function scrollToTop() {
		if (!browser) return;
		window.scrollTo({
			top: 0,
			left: 0
		});
	}

	const options = {
		renderNode: {
			[BLOCKS.EMBEDDED_ASSET]: (node) => {
				const { file, description } = node.data.target.fields;
				if (file.contentType.includes('image')) {
					const { width, height } = file.details.image;
					return `<img src="${file.url}" alt="${
						description || ''
					}" width="${width}" height="${width}" loading="lazy" />`;
				}
			}
		}
	} as Partial<Options>;
</script>

<article>
	{#if page}
		<div class="height-controller">
			<h1>{@html page.fields.title}</h1>

			{#if memberPages && !isLoggedin}
				<p>Ange lösenord för att komma åt medlemssidor</p>
				<form method="post" on:submit|preventDefault={handleLoginSubmit}>
					<label>
						Lösenord<br />
						<input type="text" name="password" disabled={isDebouncing} />
					</label>
					<button type="submit" disabled={isDebouncing}>Logga in</button>
					{#if loginError}
						<div class="error">Fel lösenord, försök igen</div>
					{/if}
				</form>
			{/if}

			{#if !memberPages || (memberPages && isLoggedin)}
				{#if page.fields.image}
					<img
						src={page.fields.image.fields.file.url}
						width={page.fields.image.fields.file.details.image.width}
						height={page.fields.image.fields.file.details.image.height}
						alt={page.fields.image.fields.description}
					/>
				{/if}
				{#if page.fields.content}
					<div class="page-content">
						{@html documentToHtmlString(page.fields.content, options).replace(/\n/g, `<br />`)}
					</div>
				{/if}
			{/if}
		</div>

		{#if memberPages && isLoggedin}
			<p class="logout-info">Du är inloggad.</p>
			<button class="logout-button" on:click={handleLogout}>Logga ut</button>
		{/if}
	{/if}
</article>

<style>
	article {
		max-width: 960px;
		padding: var(--padding) var(--padding-small);
	}

	:global(.page-content hr) {
		border: 0;
		border-bottom: 1px solid var(--color-border);
	}

	.error {
		color: red;
	}

	.logout-info {
		font-style: italic;
		margin-top: var(--padding-small);
	}

	.height-controller {
		min-height: calc(100vh - var(--padding) - var(--padding) - 96px);
	}

	@media (max-width: 960px) {
		article {
			padding: var(--padding-small);
			padding-top: 64px;
		}
		.height-controller {
			min-height: calc(100vh - var(--padding) - var(--padding) - 128px);
		}
	}
</style>
