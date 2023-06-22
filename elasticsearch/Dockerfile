FROM docker.elastic.co/elasticsearch/elasticsearch:7.9.2

RUN /usr/share/elasticsearch/bin/elasticsearch-plugin install analysis-nori
COPY --chown=elasticsearch userdict_ko.txt /usr/share/elasticsearch/config/userdict_ko.txt