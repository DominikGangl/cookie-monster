<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { loadCookies, infoTitle, infoText, loseCookieAndGoTo } from '$lib/scripts/game';
	import Header from '$lib/components/Header.svelte';

	function setPatternInfo() {
		infoTitle.set('TODO: Level 4 Info Title');
		infoText.set('TODO: Level 4 Info Text');
	}

	function stepBack() {
		setPatternInfo();
		loseCookieAndGoTo('/level-3');
	}

	function continueForward() {
		goto('/level-5');
	}

	onMount(loadCookies);
</script>

<Header />
<div class="popup center_popup">
	<h3 style="line-height: 1.3em;">Bist du dir 100% sicher !?</h3>
	<p>Bist du dir absolut sicher, dass du im vorigen Level die richtige Auswahl getroffen hast?</p>
	<p>
		Wenn du deine Auswahl jetzt nicht anpasst, kann diese Entscheidung nicht mehr zurückgenommen
		werden...
	</p>

	<button on:click={stepBack}> Schritt zurück </button>

	<button on:click={continueForward}> Fortfahren </button>
</div>
