import { styled } from "@mui/material";
import * as React from "react";
import { useState } from "react";

const Lightbox = styled("div")({
  opacity: 0,
  pointerEvents: "none",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.7)",
  zIndex: 10000,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.75rem",
  cursor: "zoom-out",
  transition: "opacity 0.2s ease-in-out",
});

const ZoomedImage = styled("img")({
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

/**
 * Displays the image and adds the functionality that the image can be clicked
 * so that a full screen version appears in a lightbox.
 */
export function ZoomableImage(props: ImageProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <img style={{ cursor: "zoom-in" }} onClick={() => setIsOpen(!isOpen)} {...props} />
      <Lightbox
        onClick={() => setIsOpen(false)}
        sx={{
          ...(isOpen && {
            opacity: 1,
            pointerEvents: "all",
          }),
        }}
      >
        <ZoomedImage {...props} />
      </Lightbox>
    </>
  );
}

export default ZoomableImage;
