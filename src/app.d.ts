/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	import type { Entry } from 'contentful';
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}

	interface Entry extends Entry<any> {
		fields: {
			slug: string;
			title: string;
			content: any;
			image?: {
				fields: {
					description: string;
					title: string;
					file: {
						fileName: string;
						url: string;
						contentType: string;
						details: {
							size: number;
							image: {
								height: number;
								width: number;
							};
						};
					};
				};
			};
			subpages?: App.Entry[];
		};
		metadata: Entry.Metadata;
		sys: Entry.Sys;
	}
}
