<script lang="ts">
    import Layout from '../layouts/default.svelte'
    let counter: number = 0;
    let name: string = 'test';
</script>

<Layout>
    <article>
        <h1>
            This title is styled

            <span>with postcss</span>
        </h1>

        <p>The rest of the website uses pico.css</p>
        <p>Try updating pages/index.page.ts and see the HMR go brr</p>

        <a href="/about" class="contrast">Navigate to about page via CSR</a>

        <p>look below for some interactive examples</p>

        <button on:click={() => counter++}>
            Clicked {counter} times
        </button>

        <label for="name">
            Name:
            <input bind:value={name} id="name" type="text" name="name" placeholder="Type your name here!" required />
        </label>
        <p>Hello, {name}!</p>
    </article>
</Layout>

<style lang="postcss">
    h1 {
        color: red;

        span {
            color: lightblue;
        }
    }
</style>
