<script lang="ts">
	import { showInfoSlide, infoTitle, infoText } from '$lib/scripts/game';
	export let level: string;
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center">
	<div class="absolute inset-0 bg-black/80"></div>
	<div
		class="text-l relative z-10 w-11/12 rounded bg-[rgb(82,82,82)] px-2 pt-2 pb-6 shadow-xl md:w-4/5 xl:w-3/4 2xl:p-8 2xl:pt-4"
	>
		<p class="pb-2 text-[rgb(123,123,123)] 2xl:pb-4">Die Tricks des Cookie-Monsters</p>
		<h1>#{level} {$infoTitle}</h1>
		<p class="pb-4 text-[rgb(255,255,255)]">
			{$infoText}
		</p>
		<button class="justify-center" on:click={() => showInfoSlide.set(false)}>
			Erneut versuchen
		</button>
	</div>
</div>

<style>
	p {
		font-size: clamp(0.4rem, 2.5vw, 1rem);
	}
	h1 {
		font-size: clamp(0.75rem, 3vw, 1.4rem);
		line-height: 1.75;
	}
	button {
		background-color: rgb(136, 213, 28);
		margin-top: 0;
	}
	button:hover {
		background-color: rgb(120, 180, 36);
		color: black;
		border-color: white;
	}
</style>
