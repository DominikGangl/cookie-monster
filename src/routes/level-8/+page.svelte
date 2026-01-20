<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { goto } from '$app/navigation';
	import { loseCookieAndGoTo, infoTitle, infoText } from '$lib/scripts/game';

	function setPatternInfo() {
		infoTitle.set('TODO: Level 8 Info Title');
		infoText.set('TODO: Level 8 Info Text');
	}
</script>

<Header />
<div class="popup center_popup">
	<h3 style="line-height: 1.3em;">Ich glaube, es gab ein Missverständnis!</h3>
	<p>
		Möchtest du der Nicht-Speicherung und Nicht-Verarbeitung deiner Nutzer-Daten nicht
		widersprechen?
	</p>
	<button
		on:click={() => {
			goto('/level-9');
		}}
	>
		Ja</button
	>
	<button
		on:click={() => {
			setPatternInfo();
			loseCookieAndGoTo('/level-8');
		}}
	>
		Nein</button
	>
</div>
