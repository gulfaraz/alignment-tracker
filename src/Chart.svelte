<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    let el;

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const jitter = () => {
        return Math.max(0.1, Math.random() / 2);
    };

    onMount(() => {
        // set the dimensions and margins of the graph
        var margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 610 - margin.left - margin.right,
            height = 550 - margin.top - margin.bottom,
            scale = 5,
            domain = [-scale, scale],
            paddedDomain = [-scale - 1, scale + 1],
            dataSize = 30,
            circleRadius = 10,
            tickSize = 0,
            strokeColor = '#69b3a2',
            fillColor = 'transparent';

        // append the svg object to the body of the page
        var svg = d3
            .select(el)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr(
                'transform',
                'translate(' + margin.left + ',' + margin.top + ')'
            );

        var data = d3
            .range(dataSize)
            .map(_ => [getRandomInt(...domain), getRandomInt(...domain)]);

        console.log(data);

        // Add X axis
        var x = d3.scaleLinear().domain(paddedDomain).range([0, width]);
        svg.append('g')
            .attr('transform', 'translate(0,' + height / 2 + ')')
            .call(d3.axisBottom(x).tickSize(tickSize).tickFormat(''));

        // Add Y axis
        var y = d3.scaleLinear().domain(paddedDomain).range([height, 0]);
        svg.append('g')
            .attr('transform', 'translate(' + width / 2 + ',0)')
            .call(d3.axisLeft(y).tickSize(tickSize).tickFormat(''));

        // Add dots
        svg.append('g')
            .selectAll('dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => x(d[0] + jitter()))
            .attr('cy', d => y(d[1] + jitter()))
            .attr('r', circleRadius)
            .style('stroke', strokeColor)
            .style('fill', fillColor);
    });
</script>

<div bind:this={el} class="container has-text-centered" />
