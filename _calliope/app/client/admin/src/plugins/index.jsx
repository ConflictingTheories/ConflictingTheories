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
import React from "react";
// Plugins
import ipfsStream from "calliope-ipfs-stream";
import MermaidDiagram from "calliope-mermaid";
import BlockWorld from "calliope-blockworld";
import Pixos from "calliope-pixos";

// TODO - Add Theme Injection Somehow (Or Wrapper)

export default function plugins(props) {
  console.log(props);
  switch (props.identifier) {
    // IPFS Video Streams (HLS)
    case "ipfsStream":
      console.log(ipfsStream);
      let { ipfsHash, audioOnly } = props.attributes;
      if (audioOnly) {
        return <ipfsStream.Audio ipfsHash={ipfsHash} />;
      } else {
        return <ipfsStream.Video ipfsHash={ipfsHash} />;
      }
    // Mermaid Diagrams
    case "mermaid":
      console.log(MermaidDiagram);
      let { diagram } = props.attributes;
      if (diagram) {
        return <MermaidDiagram diagram={diagram} />;
      } else {
        return <></>;
      }
    // Blockworld Diagrams
    case "blockworld":
      console.log(BlockWorld);
      let { networkString } = props.attributes;
      if (networkString) {
        return <BlockWorld networkString={networkString} />;
      } else {
        return <></>;
      }
    // Matrix effect
    case "matrix":
      return (
          <div className="matrix">
            <div className="letter l00 t200">
              <div></div>
            </div>
            <div className="letter l10 t500">
              <div></div>
            </div>
            <div className="letter l20 t180">
              <div></div>
            </div>
            <div className="letter l30 t700">
              <div></div>
            </div>
            <div className="letter l40 t800">
              <div></div>
            </div>
            <div className="letter l50 t900">
              <div></div>
            </div>
            <div className="letter l60 t300">
              <div></div>
            </div>
            <div className="letter l70 t400"></div>
            <div className="letter l80 t320"></div>
            <div className="letter l90 t190"></div>
            <div className="letter l100 t520"></div>
            <div className="letter l05 t380 big">
              <div></div>
            </div>
            <div className="letter l15 t400 big">
              <div></div>
            </div>
            <div className="letter l25 t600 big">
              <div></div>
            </div>
            <div className="letter l35 t650 big"></div>
            <div className="letter l45 t290 big"></div>
            <div className="letter l55 t530 big">
              <div></div>
            </div>
            <div className="letter l65 t420 big"></div>
            <div className="letter l75 t900 big"></div>
            <div className="letter l85 t200 big">
              <div></div>
            </div>
            <div className="letter l95 t180 big"></div>
            <div className="letter l00 t200 d2"></div>
            <div className="letter l10 t500 d2"></div>
            <div className="letter l20 t180 d2">
              <div></div>
            </div>
            <div className="letter l30 t700 d2"></div>
            <div className="letter l40 t800 d2"></div>
            <div className="letter l50 t900 d2">
              <div></div>
            </div>
            <div className="letter l60 t300 d2"></div>
            <div className="letter l70 t400 d2">
              <div></div>
            </div>
            <div className="letter l80 t320 d2"></div>
            <div className="letter l90 t190 d2"></div>
            <div className="letter l100 t520 d2"></div>
            <div className="letter l05 t380 big d2"></div>
            <div className="letter l15 t400 big d2"></div>
            <div className="letter l25 t600 big d2"></div>
            <div className="letter l35 t650 big d2">
              <div></div>
            </div>
            <div className="letter l45 t290 big d2"></div>
            <div className="letter l55 t530 big d2"></div>
            <div className="letter l65 t420 big d2">
              <div></div>
            </div>
            <div className="letter l75 t900 big d2"></div>
            <div className="letter l85 t200 big d2"></div>
            <div className="letter l95 t180 big d2"></div>
            <div className="letter l100 t520 d2">
              <div></div>
            </div>
            <div className="letter l05 t380 big d2"></div>
            <div className="letter l15 t400 big d2">
              <div></div>
            </div>
            <div className="letter l25 t600 big d2"></div>
            <div className="letter l35 t650 big d2"></div>
            <div className="letter l45 t290 big d2"></div>
            <div className="letter l55 t530 big d2">
              <div></div>
            </div>
            <div className="letter l65 t420 big d2"></div>
            <div className="letter l75 t900 big d2">
              <div></div>
            </div>
            <div className="letter l85 t200 big d2"></div>
            <div className="letter l95 t180 big d2"></div>
          </div>
      );
    // Pixos
    case "pixos":
      let PixosPlugin = Pixos["calliope-pixos"].default;
      return (
        <PixosPlugin
          style={{ contain: "paint", height: "480px", width: "640px", margin: "auto", alignContent: "space-between" }}
        />
      );
    default:
      return <>{JSON.stringify(props)}</>;
  }
}
