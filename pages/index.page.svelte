<script lang="ts">
    import Layout from '../layouts/default.svelte'
    let counter: number = 0;
    let name: string = 'test';
</script>

<Layout>
    <h1>
        Welcome to hell

        <span>test</span>
    </h1>
    <h2>Try updating pages/index.page.ts and see the HMR go brr</h2>
    <a href="/about" class="contrast">Navigate to about page via CSR</a>

    <p>look below for some interactive examples</p>

    <button on:click={() => counter++}>
        Clicked {counter} times
    </button>

    <input bind:value={name} />
    <p>Hello, {name}!</p>
</Layout>

<style lang="postcss">
    h1 {
        color: red;

        span {
            color: blue;
        }
    }
</style>
