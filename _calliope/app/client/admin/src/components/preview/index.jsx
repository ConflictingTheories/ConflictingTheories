/*                                                 *\
** ----------------------------------------------- **
**             Calliope - Site Generator   	       **
** ----------------------------------------------- **
**  Copyright (c) 2020-2021 - Kyle Derby MacInnis  **
**                                                 **
**    Any unauthorized distribution or transfer    **
**       of this work is strictly prohibited.      **
**                                                 **
**               All Rights Reserved.              **
** ----------------------------------------------- **
\*                                                 */

import React, { Component } from "react";
import { collect, store } from "react-recollect";

import ReactMarkdownWithHtml from "react-markdown/with-html";

import ReactMarkdown from "react-markdown";
import htmlParser from 'react-markdown/plugins/html-parser';

import math from "remark-math";
import a11yEmoji from "@fec/remark-a11y-emoji";
import html from "remark-html";
import slug from "remark-slug";
import emoji from "remark-emoji";
import headings from "remark-autolink-headings";
import shortcodes from "remark-shortcodes";

import { renderers } from "../../theme/jsx";

const parseHtml = htmlParser({
  isValidNode: node => node.type !== 'script',
  processingInstructions: [/* ... */]
})
class MarkdownPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
      src: props?.src || "",
      content: null,
    };
  }

  async componentDidMount() {
    //Fetch Source and Render Content
    if (this.state.src && this.state.src !== "") {
      const fileResponse = await fetch("/content/" + this.state.src);
      if (fileResponse.ok) {
        let content = await fileResponse.text();
        this.setState({ content });
      }
    }
  }

  componentWillUnmount() {}

  componentDidCatch(error, errorInfo) {
    console.error(error);
    this.setState({ error: error, errorInfo: errorInfo })
  }

  render() {
    const { content } = this.state;
    let res = null;
    try {
      res = (
        <React.Fragment className="calliope-preview">
          <hr />
          <ReactMarkdownWithHtml
          astPlugins={[parseHtml]}
          escapeHtml={false}
          parserOptions={{gfm:true}}
          plugins={[
              [
                shortcodes,
                { startBlock: "[[", endBlock: "]]", inlineMode: true },
              ],
              emoji,
              a11yEmoji,
              math,
              slug,
              headings,
              html,
            ]}
            children={content || ""}
            renderers={renderers}
            allowDangerousHtml
          />
          <hr />
        </React.Fragment>
      );
    } catch (e) {
      console.error(e);
    }
    return res;
  }
}

export default collect(MarkdownPreview);
