import { writable } from 'svelte/store';

export const goAppState = writable({
    lExpertMode        : true,
    lEditMode          : false,
    cMainMenuActiveItem: ''
});