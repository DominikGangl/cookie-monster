<script>
	import CookieBar from './CookieBar.svelte';
	import { page } from '$app/state';
</script>

<div class="flex flex-col justify-between px-5 pt-2 md:flex-row md:items-center">
	{#if page.url.pathname == '/level-10' || page.url.pathname == '/level-11'}
		<div>Level {page.url.pathname.slice(-2)}</div>
	{:else}
		<div>Level {page.url.pathname.slice(-1)}</div>
	{/if}
	<CookieBar />
</div>
