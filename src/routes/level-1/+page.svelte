<script lang="ts">
	import { goto } from '$app/navigation';
	import { loseCookieAndGoTo } from '$lib/scripts/game';
	import Header from '$lib/components/Header.svelte';
	import { infoTitle, infoText } from '$lib/scripts/game';

	function setPatternInfo() {
		infoTitle.set('Cookies');
		infoText.set(
			'Um dir das bestmögliche Spielerlebnis zu gewährleisten, wird eine Einwilligung, deine Daten zu speichern und zu verarbeiten, nicht benötigt. Damit ich deine Daten dennoch nutzen kann, benötige ich hierfür deine Zustimmung.'
		);
	}
</script>

<Header />
<div class="popup center_popup">
	<h3>Dieses Spiel verwendet Cookies!</h3>
	<p>
		Um dir das bestmögliche Spielerlebnis zu gewährleisten, wird eine Einwilligung, deine Daten zu
		speichern und zu verarbeiten, nicht benötigt. Damit ich deine Daten dennoch nutzen kann,
		benötige ich hierfür deine Zustimmung.
	</p>
	<button
		on:click={() => {
			setPatternInfo();
			loseCookieAndGoTo('/level-1');
		}}
	>
		Zustimmen und Fortfahren
	</button>
	<button on:click={() => goto('/level-2')}> Ablehnen </button>
</div>
