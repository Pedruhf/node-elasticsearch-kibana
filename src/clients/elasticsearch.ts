import elasticsearch from "elasticsearch";

export const getElasticSearchClientSetup = () => {
  return () => new elasticsearch.Client({
    host: "localhost:9200",
    log: "trace"
  });
};

export const getElasticSearchClient = getElasticSearchClientSetup();
