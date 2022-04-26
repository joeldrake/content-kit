<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params }) {
		return {
			props: {
				params
			}
		};
	}
</script>

<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import { pages } from '$lib/store';
	export let params: any;
	let findPage: App.Entry | undefined;
	$: findPage = $pages?.fields.subpages?.find((p) => p.fields.slug === params.page);
</script>

page: {params.page}

{#if findPage}
	<Page page={findPage} />
{/if}
