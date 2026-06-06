<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { goto } from '$app/navigation';
	import { loseCookieAndGoTo, infoTitle, infoText } from '$lib/scripts/game';

	function setPatternInfo() {
		infoTitle.set('TODO: Level 9 Info Title');
		infoText.set('TODO: Level 9 Info Text');
	}
</script>

<Header />
<div class="popup center_popup">
	<h3 style="line-height: 1.3em;">Einfach klicken!</h3>
	<p>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		Um der Speicherung deiner Daten zu widersprechen, bitte klicke
		<span
			on:click={() => {
				goto('/level-10');
			}}
			style="cursor: pointer;">hier</span
		>
	</p>
	<button
		on:click={() => {
			setPatternInfo();
			loseCookieAndGoTo('/level-9');
		}}>Nicht widersprechen</button
	>
</div>
