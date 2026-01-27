<script>
	import Header from '$lib/components/Header.svelte';
	import { loseCookieAndGoTo, infoTitle, infoText } from '$lib/scripts/game';
	import { goto } from '$app/navigation';

	function setPatternInfo() {
		infoTitle.set('Sichtbar, aber versteckt');
		infoText.set('Ich habe die richtige Option sichtbar, aber gut versteckt platziert.');
	}
</script>

<Header />
<div class="popup center_popup">
	<h3>Okay, nächster Versuch!</h3>
	<p>
		Mittels deiner Daten kann ich dir (unter anderem) die bestmögliche Spielerfahrung generieren.
		Bitte stimme zu, dass ich zu diesem Zweck deine Daten sammeln darf.
	</p>
	<button
		on:click={() => {
			setPatternInfo();
			loseCookieAndGoTo('/level-6');
		}}
	>
		Weiter</button
	>
</div>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_missing_attribute -->
<a
	style="color: #383535;bottom: 10%;left: 30%;position: fixed;"
	on:click={() => {
		goto('/level-7');
	}}
>
	Ablehnen und Fortfahren
</a>
