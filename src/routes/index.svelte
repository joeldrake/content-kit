<script lang="ts">
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
	import type { Entry } from 'contentful';

	export let page: Entry<unknown>;
	const fields = page?.fields as any;
	const title = fields?.title as any;
	const image = fields?.image as any;
	const content = fields?.content as any;
</script>

<h1>{title}</h1>
<img
	src={image.fields.file.url}
	width={image.fields.file.details.image.width}
	height={image.fields.file.details.image.height}
	alt={image.fields.description}
/>
<div>{@html documentToHtmlString(content)}</div>

<pre>{JSON.stringify(page, null, 2)}</pre>
