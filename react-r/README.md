# R Service Spike

Put the .rds data files in rserve-docker/data. Load them when the Flask service starts by putting them in variables in rserve-docker/etc/load_data.R.
The app.py file defines the endpoints and sends the commmands to Rserve. 

# Starting
```
docker-compose up
```

# Endpoints
http://localhost:5000/umap_gene/[gene_symbol]
http://localhost:5000/umap
http://localhost:5000add_five/[number]
http://localhost:5000/test_plot_jpg
http://localhost:5000/test_plot_pdf


