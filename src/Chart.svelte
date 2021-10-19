<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    export let characters = [],
        scale = 5,
        goodDisplay = 'Good',
        evilDisplay = 'Evil',
        chaoticDisplay = 'Chaotic',
        lawfulDisplay = 'Lawful',
        neutralDisplay = 'Neutral';

    let containerElement, svg, x, y;

    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 610 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom,
        padding = 1,
        axisLabelPadding = 15,
        paddedDomain = [-(scale + padding), scale + padding],
        circleRadius = 10,
        tickSize = 0,
        colorTransparent = 'transparent',
        tooltipShowOpacity = 0.8,
        tooltipHideOpacity = 0,
        transitionShowDuration = 100,
        transitionHideDuration = 200;

    const tooltip = d3.select('body').append('div').attr('class', 'tooltip');

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

        const axisLabels = svg.append('g');
        axisLabels
            .append('text')
            .attr('x', (width + axisLabelPadding) / 2)
            .attr('y', axisLabelPadding)
            .text(goodDisplay);
        axisLabels
            .append('text')
            .attr('x', (width + axisLabelPadding) / 2 - 42)
            .attr('y', height)
            .text(evilDisplay);
        axisLabels
            .append('text')
            .attr('x', width - 48)
            .attr('y', height / 2 + axisLabelPadding + 6)
            .text(lawfulDisplay);
        axisLabels
            .append('text')
            .attr('x', 0)
            .attr('y', (height - axisLabelPadding) / 2)
            .text(chaoticDisplay);
        axisLabels
            .append('text')
            .attr('x', (width + axisLabelPadding) / 2)
            .attr('y', (height - axisLabelPadding) / 2)
            .text(neutralDisplay);

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
                .attr('cx', character => x(character.ethics))
                .attr('cy', character => y(character.morality))
                .attr('r', circleRadius)
                .style('stroke', character => character.color)
                .style('fill', colorTransparent)
                .on('mouseover', function (event, character) {
                    d3.select(this)
                        .transition()
                        .duration(transitionShowDuration)
                        .style('fill', character.color);

                    // makes tooltip appear
                    tooltip
                        .transition()
                        .duration(transitionShowDuration)
                        .style('opacity', tooltipShowOpacity);
                    tooltip
                        .html(character.name + '<br />' + character.alignment)
                        .style('left', event.pageX + 10 + 'px')
                        .style('top', event.pageY + 15 + 'px')
                        .style('background', character.color);
                })
                .on('mouseout', function (event, character) {
                    d3.select(this)
                        .transition()
                        .duration(transitionHideDuration)
                        .style('fill', colorTransparent);

                    // makes tooltip disappear
                    tooltip
                        .transition()
                        .duration(transitionHideDuration)
                        .style('opacity', tooltipHideOpacity);
                });
        }
    };

    onMount(createChart);
    $: characters, updateChart();
</script>

<div bind:this={containerElement} class="container has-text-centered" />
