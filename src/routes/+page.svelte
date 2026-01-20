<script lang="ts">
	import { goto } from '$app/navigation';
	import { resetCookies, startTimer, storeCookies } from '$lib/scripts/game';

	function startGame() {
		resetCookies();
		startTimer();
		storeCookies(3);
		goto('/level-1');
	}
</script>

<img src="/images/title_screen.png" class="center" style="padding-top: 1.5em" alt="titleScreen" />
<div class="popup first-page-popup">
	<div>
		Das Cookie-Monster hat es auf deine Daten abgesehen. Schaffst du es, alle Tricks zu
		durchschauen? Überleg' genau, wohin du klickst und verteidige Deine Daten!
	</div>
	<button type="button" on:click={startGame}> &gt;&gt; Spiel starten &lt;&lt; </button>
</div>
