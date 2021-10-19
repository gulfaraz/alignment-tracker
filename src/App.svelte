<script lang="ts">
    import 'bulma/css/bulma.css';
    import '@fortawesome/fontawesome-free/css/all.css';
    import Navbar from './Navbar.svelte';
    import Chart from './Chart.svelte';
    import Table from './Table.svelte';
    import Footer from './Footer.svelte';

    const maxCharacters = 30,
        axisEthics = 'ethics',
        axisMorality = 'morality',
        trueNeutralDisplay = 'True Neutral',
        neutralDisplay = 'Neutral',
        chaoticDisplay = 'Chaotic',
        lawfulDisplay = 'Lawful',
        evilDisplay = 'Evil',
        goodDisplay = 'Good',
        increaseStep = +1,
        decreaseStep = -1,
        jitterMinimum = 0.1,
        jitterFactor = 0.5,
        scale = 5,
        idLength = 9,
        scaleThreshold = Math.floor((scale * 2) / 3);

    const jitter = () => {
        return Math.max(jitterMinimum, Math.random() * jitterFactor);
    };

    let characters = [];

    const makeid = length => {
        var result = '';
        var characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    };

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const addCharacter = () => {
        const ethics = getRandomInt(-scale, scale) + jitter(),
            morality = getRandomInt(-scale, scale) + jitter();

        characters.push({
            name: makeid(idLength),
            alignment: getAlignment(ethics, morality),
            ethics,
            morality,
        });

        characters = characters;
    };

    const deleteCharacter = (event: CustomEvent) => {
        const index = event.detail.index;

        characters.splice(index, 1);
        characters = characters;
    };

    const changeAlignment = (
        event: CustomEvent,
        axis: string,
        direction: number
    ) => {
        const index = event.detail.index;

        characters[index][axis] = Math.max(
            -(scale + jitterFactor),
            Math.min(scale + jitterFactor, characters[index][axis] + direction)
        );

        characters[index].alignment = getAlignment(
            characters[index].ethics,
            characters[index].morality
        );

        characters = characters;
    };

    const getAlignment = (ethics: number, morality: number) => {
        var alignment = trueNeutralDisplay;
        var ethicsValue = neutralDisplay;
        var moralityValue = neutralDisplay;
        if (ethics < -scaleThreshold) {
            ethicsValue = chaoticDisplay;
        } else if (ethics > scaleThreshold) {
            ethicsValue = lawfulDisplay;
        }
        if (morality < -scaleThreshold) {
            moralityValue = evilDisplay;
        } else if (morality > scaleThreshold) {
            moralityValue = goodDisplay;
        }
        if (ethicsValue != neutralDisplay || moralityValue != neutralDisplay) {
            alignment = `${ethicsValue} ${moralityValue}`;
        }
        return alignment;
    };
</script>

<main>
    <Navbar />
    <div class="columns is-mobile is-centered">
        <div class="column is-half">
            <Chart {characters} {scale} />
        </div>
        <div class="column is-half">
            <Table
                {characters}
                {maxCharacters}
                on:addCharacter={addCharacter}
                on:deleteCharacter={deleteCharacter}
                on:decreaseEthics={index =>
                    changeAlignment(index, axisEthics, decreaseStep)}
                on:increaseEthics={index =>
                    changeAlignment(index, axisEthics, increaseStep)}
                on:decreaseMorality={index =>
                    changeAlignment(index, axisMorality, decreaseStep)}
                on:increaseMorality={index =>
                    changeAlignment(index, axisMorality, increaseStep)}
            />
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
