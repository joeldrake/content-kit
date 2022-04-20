<script context="module">
	export async function load({ params }) {
		return {
			props: {
				page: params.page
			}
		};
	}
</script>

<script lang="ts">
	import { pages } from '$lib/store';
	export let page: string;
	const findPage = $pages.find((p) => p.fields.slug === page);
	console.log('page', page);
</script>

page: {page}
