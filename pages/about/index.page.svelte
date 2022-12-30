<script lang="ts">
    import Layout from '../../layouts/default.svelte'
    import confetti from 'https://esm.sh/canvas-confetti@1.6.0';

    function fireConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
</script>

<Layout>
    <h1>
        Gaming
    </h1>

    <a href="/">go back</a>
</Layout>

<button on:click={fireConfetti}>
    Fire confetti
</button>