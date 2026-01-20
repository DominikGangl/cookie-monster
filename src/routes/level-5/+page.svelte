<script>
	import Header from '$lib/components/Header.svelte';
	import { loseCookieAndGoTo, infoTitle, infoText } from '$lib/scripts/game';
	import { goto } from '$app/navigation';

	function setPatternInfo() {
		infoTitle.set('TODO: Level 5 Info Title');
		infoText.set('TODO: Level 5 Info Text');
	}
</script>

<Header />
<div class="popup center_popup">
	<h3>Hey du, ich brauche deine Hilfe..!</h3>
	<p>
		Es würde mir total weiterhelfen, wenn du so korrekt sein könntest, der Verarbeitung und
		Speicherung deiner Daten zuzustimmen. Das würde mich sehr freuen !!<br /> <br /> Danke, dein Cookie-Monster
		:))
	</p>
	<button
		on:click={() => {
			setPatternInfo();
			loseCookieAndGoTo('/level-5');
		}}
	>
		Easy!</button
	>
	<button
		on:click={() => {
			goto('/level-6');
		}}
	>
		Nein, Ich helfe niemanden gerne.
	</button>
</div>
