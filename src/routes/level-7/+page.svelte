<!-- src/routes/level-7/+page.svelte -->
<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { loseCookieAndGoTo, infoTitle, infoText } from '$lib/scripts/game';

	// total number of boxes
	const number_of_boxes = 40;
	let specialIndex: number;

	function setPatternInfo() {
		infoTitle.set('Knifflige Opt-Outs');
		infoText.set(
			'Ich habe dir das Ablehnen extra schwer gemacht. Wenn du wirklich ablehnen möchtest, musst du ganz genau hinschauen!'
		);
	}

	function handleClick(i: number) {
		if (i === specialIndex) {
			goto('/level-8');
		} else {
			setPatternInfo();
			loseCookieAndGoTo('/level-7');
		}
	}

	onMount(() => {
		// pick a random index once on the client
		specialIndex = Math.floor(Math.random() * number_of_boxes);
	});
</script>

<Header />
<div class="popup center_popup">
	<h3>Bist du überhaupt ein Mensch?</h3>
	<p>
		Bitte klicke auf das Feld, dessen Farbe sich von den restlichen unterscheidet, um der
		Datensammlung nicht zuzustimmen.
	</p>
	<div
		class="mx-auto mt-6 mb-2 grid w-11/12 grid-cols-4 justify-items-center gap-y-0.5 sm:w-4/5 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:w-[70%] 2xl:grid-cols-10"
	>
		{#each Array(number_of_boxes) as _, i}
			<!-- to make the blue box more visible, change the first hex code to #0776a6 or even #066893 for very visible -->
			<button
				class="box h-5 w-4 border-4 border-white hover:border-yellow-300"
				style="background-color: {i === specialIndex ? '#0782b6' : '#0b97cb'}"
				on:click={() => handleClick(i)}
				aria-label={i === specialIndex ? 'richtige Box' : 'falsche Box'}
			></button>
		{/each}
	</div>
</div>
