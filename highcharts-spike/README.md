This is a spike to test out some visualization options

On on the front page (/) there's an example of the EBI tSNE widget based on Highcharts (https://github.com/ebi-gene-expression-group/scxa-tsne-widget). In /semiotic there's a test of the Semiotic violin plot (https://semiotic.nteract.io/guides/ordinal-summaries).

The TSnePlotView component relies on the EBI API, so we'd most likely want to use the code, if any, from the
ClusterTSnePlot and GeneExpressionTSnePlot for our own visualizations
https://github.com/ebi-gene-expression-group/scxa-experiment-page-tsne-plot-view/tree/master/src
