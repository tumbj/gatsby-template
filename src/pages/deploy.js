import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"
import styled from "@emotion/styled"
import $ from 'jquery'
import Layout from "../components/layout"
import { Button } from "antd"

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 1.45rem 1.0875rem;
  text-align: center;
  height: 78vh;
`

const DeployPage = () => {
  useEffect(() => {
    window.jQuery = $;
    $.ajax({
      url: "https://iga-origins.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/sb53l8/b/2/e73395c53c3b10fde2303f4bf74ffbf6/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-US&collectorId=c02bbeb1",
      type: "get",
      cache: true,
      dataType: "script"
    });

    window.ATL_JQ_PAGE_PROPS =  {
    "triggerFunction": function(showCollectorDialog) {
      $("#myCustomTrigger").on('click', function(e) {
        e.preventDefault();
        showCollectorDialog();
      });
    }};

  }, [])

  return (
    <Layout >
      <Content>
        <h1>Deploy</h1>
        <Button type="primary" id="myCustomTrigger" size={'large'}>
          Deployment Request here!
        </Button>
      </Content>
    </Layout>
  )
}

export default DeployPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            rawDate: date
            path
          }
          fields {
            slug
            readingTime {
              text
            }
          }
          excerpt
        }
      }
    }
  }
`
