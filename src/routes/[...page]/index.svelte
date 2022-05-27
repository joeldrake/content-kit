<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params }) {
		const [page, subpage] = params.page.split('/');
		return {
			props: {
				page,
				subpage
			}
		};
	}
</script>

<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import { pages } from '$lib/store';
	export let page: string | undefined;
	export let subpage: string | undefined;
	let findSubpage: App.Entry | undefined;
	let findPage: App.Entry | undefined;
	$: findPage = $pages?.fields.subpages?.find((p) => p.fields.slug === page);

	$: if (findPage && subpage) {
		findSubpage = findPage.fields.subpages?.find((p) => p.fields.slug === subpage);
	} else {
		findSubpage = undefined;
	}
</script>

{#if findSubpage || findPage}
	<Page page={findSubpage || findPage} />
{/if}
