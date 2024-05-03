import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server : {
		port: process.env.VITE_PORT || 8082,
	}
});
