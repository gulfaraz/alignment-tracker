<script>
    import { onMount } from 'svelte';
    import { Button, Icon, Input } from 'svelma';

    let loading = false;
    let users = [];
    const count = 3;
    const maxCharacters = 30;
    const axisEthics = 'ethics';
    const axisMorality = 'morality';
    const increaseStep = +1;
    const decreaseStep = -1;

    async function update() {
        loading = true;

        users = [];
        users = (
            await (
                await fetch(`https://randomuser.me/api/?results=${count}`)
            ).json()
        ).results;

        loading = false;
    }

    const getRandomAlignment = () => {
        var r = Math.floor(Math.random() * 4);

        switch (r) {
            case 0:
                return 'Chaotic Evil';
            case 1:
                return 'Chaotic Neutral';
            case 2:
                return 'Chaotic Good';
            case 3:
                return 'Lawful Good';
            case 4:
                return 'Lawful Neutral';
            case 5:
                return 'Lawful Evil';
            case 6:
                return 'Neutral Good';
            case 7:
                return 'Neutral Evil';
            case 8:
                return 'True Neutral';
        }
    };

    const addCharacter = async () => {
        console.log('before addCharacter', users);
        loading = true;
        users.push(
            (await (await fetch(`https://randomuser.me/api/?results=1`)).json())
                .results[0]
        );
        users = users;
        loading = false;
        console.log('after addCharacter', users);
    };

    const deleteCharacter = index => {
        users.splice(index, 1);
        users = users;
    };

    const changeAlignment = (index, axis, direction) => {
        // users[index][axis] = users[index][axis] + direction;
        // users[index].name.first = users[index].name.first + axis[0] + direction;
        users = users;
    };

    onMount(() => update());
</script>

<div class="table-container">
    <table class="table is-fullwidth is-scrollable">
        <thead>
            <tr>
                <th>Name</th>
                <th>Alignment</th>
                <th>Action</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {#each users as user, index}
                <tr>
                    <td>
                        <Input
                            bind:value={user.name.first}
                            type="text"
                            placeholder="Name"
                        />
                    </td>
                    <td class="has-text-centered">{getRandomAlignment()}</td>
                    <td class="has-text-centered">
                        <div
                            class="buttons has-addons is-justify-content-center"
                        >
                            <Button
                                class="is-warning is-halfwidth"
                                on:click={() =>
                                    changeAlignment(
                                        index,
                                        axisEthics,
                                        decreaseStep
                                    )}
                            >
                                Chaotic
                            </Button>
                            <Button
                                class="is-info is-halfwidth"
                                on:click={() =>
                                    changeAlignment(
                                        index,
                                        axisEthics,
                                        increaseStep
                                    )}
                            >
                                Lawful
                            </Button>
                        </div>
                        <div
                            class="buttons has-addons is-justify-content-center"
                        >
                            <Button
                                class="is-warning is-halfwidth"
                                on:click={() =>
                                    changeAlignment(
                                        index,
                                        axisMorality,
                                        decreaseStep
                                    )}
                            >
                                Evil
                            </Button>
                            <Button
                                class="is-info is-halfwidth"
                                on:click={() =>
                                    changeAlignment(
                                        index,
                                        axisMorality,
                                        increaseStep
                                    )}
                            >
                                Good
                            </Button>
                        </div>
                    </td>
                    <td>
                        <Button
                            class="is-danger"
                            on:click={() => deleteCharacter(index)}
                        >
                            <Icon icon="trash" />
                        </Button>
                    </td>
                </tr>
            {/each}
            {#if users.length < maxCharacters}
                <tr>
                    <td colspan="4">
                        <Button
                            class="is-info is-light is-fullwidth"
                            on:click={addCharacter}
                        >
                            <Icon icon="plus" />
                            <span>Add Character</span>
                        </Button>
                    </td>
                </tr>
            {/if}
        </tbody>
    </table>
</div>

<style>
    .table-container {
        overflow: auto;
        height: 550px;
    }
    .table-container thead th {
        position: sticky;
        top: 0;
        z-index: 1;
        background: white;
    }

    th,
    td {
        vertical-align: middle;
    }

    .buttons:not(:last-child) {
        margin-bottom: 0;
    }
</style>
