import { client } from '$lib/contentfulClient';

export async function get() {
	// get all blogs from Contentful
	let entries;
	try {
		entries = await client.getEntries({
			content_type: 'page',
			include: 5,
			order: 'fields.order'
		});
	} catch (e) {
		console.log(e);
		return {
			status: 404
		};
	}

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
