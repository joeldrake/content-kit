<script context="module">
	export async function load({ params }) {
		return {
			props: {
				page: params.page,
				subpage: params.subpage
			}
		};
	}
</script>

<script lang="ts">
	import { pages } from '$lib/store';
	export let page: string;
	export let subpage: string;
	console.log('subpage', $pages);
</script>

page: {page}
subpage: {subpage}
