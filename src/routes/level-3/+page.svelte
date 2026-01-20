<script lang="ts">
	import { goto } from '$app/navigation';
	import { loseCookieAndGoTo, infoTitle, infoText } from '$lib/scripts/game';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';

	function setPatternInfo() {
		infoTitle.set('TODO: Level 3 Info Title');
		infoText.set('TODO: Level 3 Info Text');
	}

	onMount(() => {
		sliders = Array(labels.length).fill(true);
		resetToggle = true;
	});

	// your five tracker labels
	const labels = [
		'Ortsdaten',
		'Social Media Logins',
		'Geräte-Informationen',
		'Browserverlauf',
		'IP-Adresse'
	];

	let sliders = Array(labels.length).fill(true);
	let resetToggle = true;

	function evaluateLevel3() {
		const anyChecked = sliders.some((v) => v);
		if (anyChecked) {
			setPatternInfo();
			loseCookieAndGoTo('/level-3');
		} else {
			goto('/level-4');
		}
	}

	function resetSliders() {
		sliders = sliders.map(() => true);
		resetToggle = true;
	}
</script>

<Header />

<div class="popup center_popup">
	<h3>Dieses Spiel verwendet Cookies!</h3>
	<p class="py-2">Bitte wähle alle Browser-Tracker ab, die du nicht teilen möchtest.</p>

	{#each labels as label, i}
		<div class="option_sliders text-left">
			<label class="switch">
				<input type="checkbox" bind:checked={sliders[i]} />
				<span class="slider"></span>
			</label>
			{label}
		</div>
	{/each}

	<div class="option_sliders text-left">
		<label class="switch">
			<input type="checkbox" bind:checked={resetToggle} on:change={resetSliders} />
			<span class="slider"></span>
		</label>
		Zurücksetzen
	</div>

	<button style="margin-top: 2em;" on:click={evaluateLevel3}> Fortfahren </button>
</div>
