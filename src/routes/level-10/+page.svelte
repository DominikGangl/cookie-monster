<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { goto } from '$app/navigation';

	let escaping_button_element: HTMLButtonElement | null = null;

	let timeout = 170;
	function escaping_button(button: HTMLButtonElement | null) {
		if (!button) return;

		setTimeout(() => {
			button.style.position = 'fixed';

			const x = Math.floor(Math.random() * 75);
			const y = Math.floor(Math.random() * 75);

			button.style.top = `${x}%`;
			button.style.left = `${y}%`;
		}, timeout);

		timeout += 20;
	}
</script>

<Header />

<div class="popup center_popup">
	<h3>Okay, ich gebe auf...</h3>
	<p>Klicke einfach auf den Button und deine Daten bleiben bei dir!</p>
	<!-- svelte-ignore a11y_mouse_events_have_key_events -->
	<button
		bind:this={escaping_button_element}
		on:mouseover={() => escaping_button(escaping_button_element)}
		on:click={() => {
			goto('/win-screen');
		}}
	>
		Abschließen</button
	>
</div>
