<script lang="ts">
	import { pages } from '$lib/store';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
</script>

<h1>{$pages.fields.title}</h1>

{#if $pages?.fields?.image}
	<img
		src={$pages.fields.image.fields.file.url}
		width={$pages.fields.image.fields.file.details.image.width}
		height={$pages?.fields.image.fields.file.details.image.height}
		alt={$pages?.fields.image.fields.description}
	/>
{/if}
{#if $pages?.fields?.content}
	<div>{@html documentToHtmlString($pages.fields.content)}</div>
{/if}
