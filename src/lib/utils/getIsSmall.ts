import { browser } from '$app/env';

export function getIsSmall() {
	if (!browser) return false;
	const breakpoint = 960;
	return window.innerWidth <= breakpoint;
}
