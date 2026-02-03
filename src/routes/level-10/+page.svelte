<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { goto } from '$app/navigation';
	import { loseCookieAndGoTo, infoTitle, infoText, showInfoSlide } from '$lib/scripts/game';

	let timeLeft = 5;
	let buttonText = 'Annehmen';
	let blink = true;
	let missedChance = false;
	let interval: ReturnType<typeof setInterval>;

	$: if (!$showInfoSlide) {
		startCountdown(5);
	}

	function startCountdown(seconds: number) {
		clearInterval(interval);
		missedChance = false;
		timeLeft = seconds;
		buttonText = 'Annehmen';

		interval = setInterval(() => {
			timeLeft--;

			if (timeLeft <= 0) {
				clearInterval(interval);
				missedChance = true;
				buttonText = 'Ich brauche mehr Zeit';
			}
		}, 1000);
	}

	startCountdown(5);

	function acceptClicked() {
		if (buttonText === 'Annehmen') {
			infoTitle.set('TODO: Level Info Title');
			infoText.set('TODO: Level Info Text');
			loseCookieAndGoTo('/level-10');
		} else {
			startCountdown(5);
		}
	}
</script>

<Header />

<div class="popup center_popup">
	<h3 style="line-height: 1.3em;">Beeil dich!</h3>
	<p>
		Du hast nur noch wenig Zeit um die Cookies zu akzeptieren, sonst hast du deine Chance verpasst!
	</p>

	<p style="margin-top: 1.5rem;">
		{#if missedChance}
			Die Zeit ist abgelaufen!
		{:else}
			Nur noch {timeLeft} Sekunden
		{/if}
	</p>

	<button
		class:blink={blink && buttonText === 'Annehmen'}
		on:click={acceptClicked}
		style="margin-top: 0.75rem;"
	>
		{buttonText}
	</button>

	<button
		style="margin-top: 0.75rem;"
		on:click={() => {
			goto('/level-11');
		}}
	>
		Ablehnen
	</button>
</div>

<style>
	.blink {
		background-color: red;
		color: white;
		animation: blink-animation 0.75s steps(2, start) infinite alternate;
	}

	@keyframes blink-animation {
		0%,
		49.999% {
			background-color: yellow;
			color: black;
		}
		50%,
		100% {
			background-color: red;
			color: white;
		}
	}
	button:hover {
		background-color: black !important;
		color: white !important;
	}
</style>
