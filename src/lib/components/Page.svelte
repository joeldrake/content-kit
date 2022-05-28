<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import { BLOCKS } from '@contentful/rich-text-types';
	import { documentToHtmlString, type Options } from '@contentful/rich-text-html-renderer';
	import { digestMessage } from '$lib/utils/digestMessage';
	export let page: App.Entry | undefined;
	let isLoggedin = false;
	const s = '6dfcb9fd1eb5';

	console.log(page);
	onMount(() => {
		if (browser && page?.fields?.slug === 'medlemssidor') {
			checkLoggedIn();
		}
	});

	let memberPages = false;
	$: if (page?.fields?.slug === 'medlemssidor') {
		memberPages = true;
		checkLoggedIn();
	}

	async function checkLoggedIn() {
		if (!browser) return;
		const t = localStorage.getItem('t') as string;

		// temp solution in wait for https://github.com/sveltejs/kit/pull/4653
		if (checkValid(t)) {
			isLoggedin = true;
		}
	}

	async function handleLoginSubmit(e) {
		const form = e.target;
		const digest = await digestMessage(s + form?.password?.value);
		if (checkValid(digest)) {
			isLoggedin = true;
			localStorage.setItem('t', digest);
		}
	}

	function checkValid(t: string) {
		return t === 'def14144f52c5bfb9db7b6f06f9fe413c4839447f9684a73f5dd8a93062efeca';
	}

	const options = {
		renderNode: {
			[BLOCKS.EMBEDDED_ASSET]: (node) => {
				const { file, description } = node.data.target.fields;
				if (file.contentType.includes('image')) {
					const { width, height } = file.details.image;
					return `<img src="${file.url}" alt="${description}" width="${width}" height="${width}" loading="lazy" />`;
				}
			}
		}
	} as Partial<Options>;
</script>

<article>
	{#if page}
		<h1>{@html page.fields.title}</h1>

		{#if memberPages && !isLoggedin}
			<p>Ange lösenord för att komma åt medlemssidor</p>
			<form method="post" on:submit|preventDefault={handleLoginSubmit}>
				<label>
					Lösenord<br />
					<input type="password" name="password" />
				</label>
				<button type="submit">Logga in</button>
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

	@media (max-width: 960px) {
		article {
			padding: var(--padding-small);
			padding-top: 64px;
		}
	}
</style>
