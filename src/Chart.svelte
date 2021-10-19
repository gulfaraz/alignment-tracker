<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    export let characters = [],
        scale = 5;

    let containerElement, svg, x, y;

    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 610 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom,
        padding = 1,
        paddedDomain = [-(scale + padding), scale + padding],
        circleRadius = 10,
        tickSize = 0,
        strokeColor = '#69b3a2',
        fillColor = 'transparent';

    const createChart = () => {
        // append the svg object to the body of the page
        svg = d3
            .select(containerElement)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr(
                'transform',
                'translate(' + margin.left + ',' + margin.top + ')'
            );

        // Add X axis
        x = d3.scaleLinear().domain(paddedDomain).range([0, width]);
        svg.append('g')
            .attr('transform', 'translate(0,' + height / 2 + ')')
            .call(d3.axisBottom(x).tickSize(tickSize).tickFormat(''));

        // Add Y axis
        y = d3.scaleLinear().domain(paddedDomain).range([height, 0]);
        svg.append('g')
            .attr('transform', 'translate(' + width / 2 + ',0)')
            .call(d3.axisLeft(y).tickSize(tickSize).tickFormat(''));

        updateChart();
    };

    const updateChart = () => {
        if (svg) {
            // Remove existing dots
            svg.selectAll('circle').remove();

            // Add dots
            svg.append('g')
                .selectAll('dot')
                .data(characters)
                .enter()
                .append('circle')
                .attr('cx', d => x(d.ethics))
                .attr('cy', d => y(d.morality))
                .attr('r', circleRadius)
                .style('stroke', strokeColor)
                .style('fill', fillColor);
        }
    };

    onMount(createChart);
    $: characters, updateChart();
</script>

<div bind:this={containerElement} class="container has-text-centered" />
