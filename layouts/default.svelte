<script lang="ts">
    import './pico.css'
</script>

<svelte:head>
    <title>My Deno Svelte App</title>
    <meta name="description" content="My Deno Svelte App" />
</svelte:head>

<body>
    <main class="container">
        <slot />
    </main>
</body>