const margin = {
    top: 250,
    bottom: -150,
    left: 200,
    right: -200
}

const height = 1000;
const width = 800;
const svg = d3.select('body').append('svg');
svg.attr('viewBox', `0 0 ${width} ${height}`);

d3.csv("/new_data_sample(1).csv", d => {
    return {
        date: new Date(d.Date),
        EstCost: new Number(d.EstimatedCost),
        ActCost: new Number(d.ActualCost),
        SoldPrice: new Number(d.SoldPrice),
        Margin: new Number(d.MarginOfProfit),
    }


}, (function (data) {
    const date_min_max = d3.extent(data, d => d.date)
    const min = d3.min(data, d => d.Margin)
    const max = d3.max(data, d => d.SoldPrice)



    const min_max = [min, max];

    // Scale Time and Date
    const xScale = d3.scaleTime()
        .domain(date_min_max)
        .range([margin.left, 1500 - margin.right])

    // Scale y-values
    const yScale = d3.scaleLinear()
        .domain(min_max)
        .range([800 - margin.bottom, margin.top - 200]);

    // Adding Axis Generator for X and Y
    const xAxis = d3.axisBottom().scale(xScale);
    const yAxis = d3.axisLeft().scale(yScale);

    // Append X Axis
    svg.append('g').attr('class', 'axis')
        .attr('transform', `translate(0,${height - margin.bottom - 200})`)
        .call(xAxis.tickFormat(d3.timeFormat("%b")))
        .selectAll("text")
        .attr("dy", "20px")


    svg.append('g').attr('class', 'axis')
        .attr('transform', `translate(${margin.left - 0},00)`)
        .call(yAxis)

    // Line for Sold Price ----------------------------
    // Line Generator
    const LineGenSold = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.SoldPrice))
    // Use the line Gen
    // Line mark
    const lineMarkSold = svg.append('g').attr('class', 'SoldPrice')
    lineMarkSold
        .selectAll('lines')
        .data([data])
        .enter()
        .append("path")
        .attr('d', d => LineGenSold(d))



    // Line for Estimated Cost ----------------------------
    // Line Generator
    const LineGenEstCost = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.EstCost))

    // Use the line Gen
    // Line mark
    const lineMarkEstCost = svg.append('g').attr('class', 'EstCost')
    lineMarkEstCost
        .selectAll('lines')
        .data([data])
        .enter()
        .append("path")
        .attr('d', d => LineGenEstCost(d))


    // Line for Actual Cost ----------------------------
    // Line Generator
    const LineGenActCost = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.ActCost))

    // Use the line Gen
    // Line mark
    const lineMarkActCost = svg.append('g').attr('class', 'ActCost')
    lineMarkActCost
        .selectAll('lines')
        .data([data])
        .enter()
        .append("path")
        .attr('d', d => LineGenActCost(d))


    // Line for Margin ----------------------------
    // Line Generator
    const LineGenMargin = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.Margin))

    // Use the line Gen
    // Line mark
    const lineMarkMargin = svg.append('g').attr('class', 'Margin')
    lineMarkMargin
        .selectAll('lines')
        .data([data])
        .enter()
        .append("path")
        .attr('d', d => LineGenMargin(d))

    

}))



