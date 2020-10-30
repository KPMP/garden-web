import os, sys, time
from flask import Flask, redirect, send_file
import pyRserve

def get_newest_dir(top_dir):
    return max([os.path.join(top_dir,d) for d in os.listdir(top_dir)], key=os.path.getmtime)

app = Flask(__name__)
rconn = pyRserve.connect(host='rserve', port=6311)
connection_dir = get_newest_dir("/r-output")
rconn.eval('source(file = "../../etc/load_data.R")')

@app.route('/add_five/<number>', methods=['GET'])
def add_five(number):
    return str(rconn.eval(str(number) + ' + 5'))

@app.route('/test_plot_jpg', methods=['GET'])
def test_plot_jpg():
    file_name = "barplot.jpeg";
    rconn.eval('jpeg(file="'+file_name+'")')
    rconn.eval('x <- c(24, 13, 7, 5, 3, 2)')
    rconn.eval('barplot(x)')
    rconn.eval('dev.off()')
    file_path = connection_dir + '/' + file_name
    return 'File saved here: <a target="_blank" href="http://localhost' + file_path + '">file_path</a>'
    
@app.route('/test_plot_pdf', methods=['GET'])
def test_plot_pdf():
    file_name = "barplot.pdf";
    rconn.eval("pdf(file="'+file_name+'", width=11, height=8.5)")
    rconn.eval('x <- c(24, 13, 7, 5, 3, 2)')
    rconn.eval('barplot(x)')
    rconn.eval('dev.off()')
    file_path = connection_dir + '/' + file_name
    return 'File saved here: <a target="_blank" href="http://localhost' + file_path + '">file_path</a>'
    
@app.route('/umap', methods=['GET'])
def umap():
    file_name = "umap.png"
    rconn.eval('library(ggplot2)')
    rconn.eval('library(Seurat)')
    rconn.eval('DimPlot(s_obj, reduction = "umap", label=TRUE, label.size=6, combine=FALSE)')
    rconn.eval('ggsave(file = "'+file_name+'")')
    file_path = connection_dir + '/' + file_name
    return 'File saved here: <a target="_blank" href="http://localhost' + file_path + '">file_path</a>'
    
@app.route('/umap_gene/<gene>', methods=['GET'])
def umap_gene(gene):
    file_name = "umap.png"
    rconn.eval('library(ggplot2)')
    rconn.eval('library(Seurat)')
    rconn.eval('FeaturePlot(s_obj, reduction = "umap", features = c(toupper("'+ gene +'")), combine=FALSE)')
    rconn.eval('ggsave(file = "'+file_name+'")')
    file_path = connection_dir + '/' + file_name
    return 'File saved here: <a target="_blank" href="http://localhost' + file_path + '">file_path</a>'
    
    
    
    


