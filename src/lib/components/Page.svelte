<script lang="ts">
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

	export let page: App.Entry;
</script>

<h1>{page.fields.title}</h1>

{#if page.fields.image}
	<img
		src={page.fields.image.fields.file.url}
		width={page.fields.image.fields.file.details.image.width}
		height={page.fields.image.fields.file.details.image.height}
		alt={page.fields.image.fields.description}
	/>
{/if}
{#if page.fields.content}
	<div>{@html documentToHtmlString(page.fields.content).replace(/\n/g, `<br />`)}</div>
{/if}
