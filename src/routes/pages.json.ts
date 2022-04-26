/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from '$lib/contentfulClient';

export async function get() {
	// get all blogs from Contentful
	let entries;
	try {
		// todo: get only startpage
		entries = await client.getEntries({
			content_type: 'page',
			'fields.slug': '/',
			include: 5
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
				entries
			}
		};
	}

	return {
		status: 404
	};
}
