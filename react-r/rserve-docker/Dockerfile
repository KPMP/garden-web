FROM rocker/r-ver:3.6.1

RUN apt-get update && apt-get install -y \
    sudo \
    gdebi-core \
    pandoc \
    pandoc-citeproc \
    libcurl4-gnutls-dev \
    libcairo2-dev \
    libxt-dev \
    xtail \
    wget \
	libssl-dev

RUN R -e "install.packages('Rserve',,'http://www.rforge.net/')"
RUN R -e "install.packages('plotly')"
RUN R -e "install.packages('httr')"
RUN R -e "install.packages('Seurat')"
RUN R -e "install.packages('ggplot2')"
RUN R -e "install.packages('svglite')"


ENV RSERVE_HOME /opt/rserve

RUN useradd rserve \
	&& mkdir ${RSERVE_HOME} \
	&& usermod -d ${RSERVE_HOME} rserve


COPY etc ${RSERVE_HOME}/etc

RUN chown -R rserve:rserve ${RSERVE_HOME}

COPY run_rserve.sh ${RSERVE_HOME}/bin/

RUN chmod 755 ${RSERVE_HOME}/bin/run_rserve.sh

USER rserve

RUN mkdir ${RSERVE_HOME}/work

EXPOSE 6311

#HEALTHCHECK --interval=2s --timeout=3s \
# CMD sleep 1 | \
# 		telnet localhost 6311 | \
#		grep -q Rsrv0103QAP1 || exit 1

CMD ["/opt/rserve/bin/run_rserve.sh"]
