<script lang="ts">
    import 'bulma/css/bulma.css';
    import '@fortawesome/fontawesome-free/css/all.css';
    import Navbar from './Navbar.svelte';
    import Chart from './Chart.svelte';
    import Table from './Table.svelte';
    import Footer from './Footer.svelte';

    export let name: string;
</script>

<main>
    <Navbar />
    <div class="columns is-mobile is-centered">
        <div class="column is-half">
            <Chart />
        </div>
        <div class="column is-half">
            <Table />
        </div>
    </div>
    <Footer />
</main>

<style>
    main {
        padding: 1em;
        margin: 0 auto;
    }
</style>
