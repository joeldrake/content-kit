import { client } from '$lib/contentfulClient';

export async function get() {
	// get all blogs from Contentful
	const entries = await client.getEntries({
		content_type: 'page',
		include: 5,
		order: 'fields.order'
	});

	console.log('fetch');

	if (entries) {
		return {
			status: 200,
			body: {
				entries: entries.items
			}
		};
	}

	return {
		status: 404
	};
}
