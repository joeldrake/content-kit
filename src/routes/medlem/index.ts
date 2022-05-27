/** @type {import('./__types/items').RequestHandler} */
export async function post({ request }) {
	let password;

	if (process.env.VERCEL === '1') {
		password = process.env.BRF_TRASTEN_PASSWORD;
	} else {
		password = import.meta.env.VITE_BRF_TRASTEN_PASSWORD;
	}

	const data = await request.text();
	const requestPassword = data.split('=')[1];

	const status = requestPassword === password;

	return {
		status: 200,
		body: {
			status
		}
	};
}
