import contentful from 'contentful';

let space, accessToken;

if (process.env.VERCEL === '1') {
	space = process.env.CONTENTFUL_SPACE_ID;
	accessToken = process.env.CONTENTFUL_DELIVERY_API_TOKEN;
} else {
	space = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
	accessToken = import.meta.env.VITE_CONTENTFUL_DELIVERY_API_TOKEN;
}

export const client = contentful.createClient({
	space,
	accessToken
});
