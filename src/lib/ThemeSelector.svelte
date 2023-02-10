<script lang="ts">
    const themes: string[] = [
        "light",
		"dark",
		"cupcake",
		"bumblebee",
		"emerald",
		"corporate",
		"synthwave",
		"retro",
		"cyberpunk",
		"valentine",
		"halloween",
		"garden",
		"forest",
		"aqua",
		"lofi",
		"pastel",
		"fantasy",
		"wireframe",
		"black",
		"luxury",
		"dracula",
		"cmyk",
		"autumn",
		"business",
		"acid",
		"lemonade",
		"night",
		"coffee",
		"winter"
    ];

    let theme: string = 'dark';
    let hasWindow: boolean = false;

    $: if (hasWindow && window.document) document.querySelector('html').dataset.theme = theme;

</script>
<svelte:window bind:online={hasWindow}/>
<select bind:value={theme} class="select max-w-xs hover:bg-neutral-focus uppercase">
    <option disabled selected>Theme</option>
    {#each themes as t}
        <option>{t}</option>
    {/each}
</select>
