import { GatsbySSR } from "gatsby";

// Import React so that you can use JSX in HeadComponents
import React from "react";

// Move Typography.js styles to the top of the head section so they're loaded first.
export const onPreRenderHTML: GatsbySSR["onPreRenderHTML"] = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents();
  headComponents.unshift(<meta name="segment-key" content="" key="segment-key" />);
  replaceHeadComponents(headComponents);
};
