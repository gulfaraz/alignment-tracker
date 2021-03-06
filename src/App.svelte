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
        scaleThreshold = Math.floor(scale / 2),
        colors = [
            '#2f4f4f',
            '#556b2f',
            '#8b4513',
            '#a52a2a',
            '#191970',
            '#708090',
            '#808000',
            '#483d8b',
            '#008000',
            '#663399',
            '#008080',
            '#b8860b',
            '#4682b4',
            '#000080',
            '#d2691e',
            '#800080',
            '#b03060',
            '#9932cc',
            '#ff4500',
            '#c71585',
            '#0000cd',
            '#4169e1',
            '#dc143c',
            '#9370db',
            '#0000ff',
            '#a020f0',
            '#ff6347',
            '#ff00ff',
            '#1e90ff',
            '#ff1493',
            '#264653',
            '#2a9d8f',
            '#e76f51',
        ],
        localStorageKey = 'characters';

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

    const getDefaultCharacters = () => [
        {
            name: 'Mordenkainen',
            alignment: getAlignment(-4, 1),
            ethics: -4,
            morality: 1,
            color: colors[0],
        },
        {
            name: 'Tenser',
            alignment: getAlignment(4, 4),
            ethics: 4,
            morality: 4,
            color: colors[4],
        },
        {
            name: 'Sprigg',
            alignment: getAlignment(-5, -3),
            ethics: -5,
            morality: -3,
            color: colors[17],
        },
    ];

    let characters =
        JSON.parse(localStorage.getItem(localStorageKey)) ||
        getDefaultCharacters();

    const jitter = () => {
        return Math.max(jitterMinimum, Math.random() * jitterFactor);
    };

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

    const getColor = () => {
        const unusedColors = colors.filter(
            color =>
                characters.findIndex(character => character.color == color) < 0
        );
        return unusedColors[Math.floor(Math.random() * unusedColors.length)];
    };

    const addCharacter = () => {
        const ethics = getRandomInt(-scale, scale) + jitter(),
            morality = getRandomInt(-scale, scale) + jitter();

        characters.push({
            name: makeid(idLength),
            alignment: getAlignment(ethics, morality),
            ethics,
            morality,
            color: getColor(),
        });

        characters = characters;
        localStorage.setItem(localStorageKey, JSON.stringify(characters));
    };

    const deleteCharacter = (event: CustomEvent) => {
        const index = event.detail.index;

        characters.splice(index, 1);
        characters = characters;
        localStorage.setItem(localStorageKey, JSON.stringify(characters));
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
        localStorage.setItem(localStorageKey, JSON.stringify(characters));
    };
</script>

<main>
    <Navbar />
    <div class="columns is-desktop is-centered">
        <div class="column is-three-fifths-desktop">
            <Chart
                {characters}
                {scale}
                {goodDisplay}
                {evilDisplay}
                {chaoticDisplay}
                {lawfulDisplay}
                {neutralDisplay}
            />
        </div>
        <div class="column">
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
    .column {
        overflow: auto;
    }
</style>
