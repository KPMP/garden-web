import React from "react";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, Results, SearchBox, Facet } from "@elastic/react-search-ui";
import { Layout, MultiCheckboxFacet } from "@elastic/react-search-ui-views";
import { Container, Row, Col } from 'reactstrap';

import "@elastic/react-search-ui-views/lib/styles/styles.css";

const connector = new AppSearchAPIConnector({
  searchKey: "",
  engineName: "knowledge-environment",
  endpointBase: "http://100.24.249.214:3002/",
  cacheResponses: false
});

export default function App() {
  return (
      <SearchProvider
          config={{
            apiConnector: connector,
            searchQuery: {
              facets: {
                imagetype: { type: "value"},
                datatype: { type: "value" },
                configtype: { type: "value", size: 30 },
              }
            },
              alwaysSearchOnInitialLoad: true
          }}
      >
        <div className="App">
          <Layout
              header={<SearchBox autocompleteSuggestions={true}/>}
              sideContent={
                  <div>
                      <Facet field="imagetype" label="Image Type" view={MultiCheckboxFacet} />
                      <Facet field="datatype" label="Data Type" view={MultiCheckboxFacet} />
                      <Facet field="configtype" label="Config Type" view={MultiCheckboxFacet} />
                  </div>}
              bodyContent={
                  <Results titleField="filename" />
                }
          />
        </div>
      </SearchProvider>
  );
}