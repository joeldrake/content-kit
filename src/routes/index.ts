import { client } from '$lib/contentfulClient';

export async function get() {
	// get all blogs from Contentful
	const pages = await client.getEntries();

	if (pages) {
		const startpage = pages.items.filter((item) => item?.sys?.contentType?.sys?.id === 'startpage');
		return {
			status: 200,
			body: {
				page: startpage[0]
			}
		};
	}

	return {
		status: 404
	};
}
