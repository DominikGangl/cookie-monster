<script lang="ts">
	import { cookies } from '$lib/scripts/game';

	function randomRotation() {
		return Math.floor(Math.random() * 4) * 90;
	}

	$: console.log('$cookies is →', $cookies);
</script>

<div class="flex flex-row items-center">
	<div class="mr-2">Cookies</div>
	{#each Array($cookies) as _}
		<img
			class="h-7 object-contain p-1 md:h-10"
			src="/images/cookie.png"
			alt="cookie"
			style="transform: rotate({randomRotation()}deg);"
		/>
	{/each}
</div>
