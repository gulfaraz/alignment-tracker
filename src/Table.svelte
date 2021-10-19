<script>
    import { createEventDispatcher } from 'svelte';
    import { Button, Icon, Input } from 'svelma';

    export let characters = [],
        maxCharacters = 30;

    const dispatch = createEventDispatcher();
    const addCharacter = () => dispatch('addCharacter');
    const deleteCharacter = index => dispatch('deleteCharacter', { index });
    const decreaseEthics = index => dispatch('decreaseEthics', { index });
    const increaseEthics = index => dispatch('increaseEthics', { index });
    const decreaseMorality = index => dispatch('decreaseMorality', { index });
    const increaseMorality = index => dispatch('increaseMorality', { index });
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
            {#each characters as character, index}
                <tr>
                    <td>
                        <Input
                            bind:value={character.name}
                            type="text"
                            placeholder="Name"
                        />
                    </td>
                    <td class="has-text-centered">{character.alignment}</td>
                    <td class="has-text-centered">
                        <div
                            class="buttons has-addons is-justify-content-center"
                        >
                            <Button
                                class="is-warning is-halfwidth"
                                on:click={() => decreaseEthics(index)}
                            >
                                Chaotic
                            </Button>
                            <Button
                                class="is-info is-halfwidth"
                                on:click={() => increaseEthics(index)}
                            >
                                Lawful
                            </Button>
                        </div>
                        <div
                            class="buttons has-addons is-justify-content-center"
                        >
                            <Button
                                class="is-warning is-halfwidth"
                                on:click={() => decreaseMorality(index)}
                            >
                                Evil
                            </Button>
                            <Button
                                class="is-info is-halfwidth"
                                on:click={() => increaseMorality(index)}
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
            {#if characters.length < maxCharacters}
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
