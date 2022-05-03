import { writable } from 'svelte/store';

export const pages = writable({} as App.Entry);
export const navOpen = writable(false);
