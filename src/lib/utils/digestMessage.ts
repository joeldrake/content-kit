export async function digestMessage(message: string) {
	const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
	const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
	return hashHex;
}

export function checkValid(t: string) {
	const a = 'def14144f52c5bfb9db7b6f06f9fe413';
	const b = 'c4839447f9684a73f5dd8a93062efeca';
	return t === a + b;
}
