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
	let findSubpage: App.Entry | undefined;
	let findPage: App.Entry | undefined;
	$: findPage = $pages?.fields.subpages?.find((p) => p.fields.slug === params.page);
	$: if (findPage) {
		findSubpage = findPage.fields.subpages?.find((p) => p.fields.slug === params.subpage);
	}
</script>

page: {params.page}
subpage: {params.subpage}

{#if findSubpage}
	<Page page={findSubpage} />
{/if}
