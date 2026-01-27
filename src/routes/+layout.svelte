<script lang="ts">
	//@ts-nocheck
	import './layout.css';
	import favicon from '$lib/assets/favicon.ico';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import InfoSlide from '$lib/components/InfoSlide.svelte';
	import { loadCookies, showInfoSlide, hydrated } from '$lib/scripts/game';

	let { children } = $props();

	onMount(() => {
		loadCookies();
		hydrated.set(true);
		const listener = (e) => {
			if (e.key === 'n' || e.key === 'N') {
				loseCookie();
				goto('/');
			}
		};

		window.addEventListener('keyup', listener);
		return () => window.removeEventListener('keyup', listener);
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#if $hydrated}
	{@render children()}
	{#if $showInfoSlide}
		<InfoSlide level={page.url.pathname.slice(-1)} />
	{/if}
{/if}
