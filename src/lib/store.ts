import type { Entry } from 'contentful';
import { writable } from 'svelte/store';

export const pages = writable([] as Entry<any>[]);
