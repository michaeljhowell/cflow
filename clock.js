var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#paper'),
    width: 600,
    height: 600,
    model: graph,
    gridSize: 1
});

var nTime = new joint.shapes.basic.Rect({
    position: { x: 100, y: 30 },
    size: { width: 75, height: 75 },
    attrs: { rect: { fill: 'blue' },
        text: {text:'Time'},
        '.label': { text: 'Time', fill: 'white' },
        '.outPorts circle': {fill: 'green'}
    }
});

var nToggle = nTime.clone();
nToggle.attr({
    rect: {fill: 'white'},
    text: {text:'Toggle'}
});

//nTime.on('change', function(){alert('Parent Changed')});

var nHourHand = nTime.clone();
nHourHand.attr({
    rect: {fill: 'green'},
    text: {text:'Hours'}
});
var nMinuteHand = nTime.clone();
nMinuteHand.attr({
    rect: {fill: '#ABABAB'},
    text: {text:'Minutes'}
});
var nClockFace = nTime.clone();
nClockFace.attr({
    rect: {fill: 'white'},
    text: {text:'Clock Face'}
});
var nOutput = nTime.clone();
nOutput.attr({
    rect: {fill: 'white'},
    text: {text:'Output'}
});

nTime.position(300,30);
nToggle.position(50,30);
nHourHand.position(200, 250);
nMinuteHand.position(100,250);
nClockFace.position(50,400);
nOutput.position(150, 500);

var link = new joint.dia.Link({
    source: { id: nTime.id },
    target: { id: nToggle.id }
});
link.set('smooth', true)
var link2 = new joint.dia.Link({
    source: { id: nTime.id },
    target: { id: nHourHand.id }
});
link2.set('smooth', true)
graph.addCells([nTime, nToggle, nHourHand, nMinuteHand,
    nClockFace, nOutput,
    link, link2]);


var m1 = new joint.shapes.devs.Model({
    position: { x: 50, y: 50 },
    size: { width: 90, height: 90 },
    inPorts: ['in1','in2'],
    outPorts: ['out'],
    attrs: {
        '.label': { text: 'Model', 'ref-x': .4, 'ref-y': .2 },
        rect: { fill: '#2ECC71' },
        '.inPorts circle': { fill: '#16A085' },
        '.outPorts circle': { fill: '#E74C3C' }
    }
});
graph.addCell(m1);