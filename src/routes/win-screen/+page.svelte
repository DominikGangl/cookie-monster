<script>
	import { getGameTime, recordTime, msToTime, cookies } from '$lib/scripts/game';

	let gameTime = getGameTime();
	let recordTimed = msToTime($recordTime);

	function randomRotation() {
		return Math.floor(Math.random() * 4) * 90;
	}
</script>

<div class="min-h-screen w-screen bg-[#0000FF] pt-10">
	<div class="popup" style="box-shadow: 18px 20px 0px 1px #04189c; margin-bottom: 1.5rem">
		<div>
			<h1>Du hast gewonnen!</h1>
			<div class="mt-8">Dauer: {gameTime} Minuten</div>
			<div class="my-4 text-[#ae0c0c]">LNDW Record: {recordTimed} Minuten</div>
			<div class="mx-8 my-0 text-white">
				Du hast das Cookie-Monster bezwungen! Es ist nicht an deine Daten gekommen und du hast sogar
				noch Cookies übrig! Hol' sie dir als süße Belohnung ab!
			</div>
			<div class="mx-auto mt-4 flex flex-row justify-center">
				{#each Array($cookies) as _}
					<img
						class="h-10 object-contain p-1"
						src="/images/cookie.png"
						alt="cookie"
						style="transform: rotate({randomRotation()}deg);"
					/>
				{/each}
			</div>
		</div>
	</div>
	<div style="text-align:center;">
		<button
			class="mb-4"
			style="background-color: black;color: gainsboro;"
			on:click={() => {
				location.href = '/';
			}}
		>
			Neues Spiel starten
		</button>
	</div>
</div>
