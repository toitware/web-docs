import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import * as React from "react";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  lightbox: {
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
  },
  opened: {
    opacity: 1,
    pointerEvents: "all",
  },
  image: {
    cursor: "zoom-in",
  },
  zoomedImage: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));
type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

/**
 * Displays the image and adds the functionality that the image can be clicked
 * so that a full screen version appears in a lightbox.
 */
export function ZoomableImage(props: ImageProps): JSX.Element {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <img className={classes.image} onClick={() => setIsOpen(!isOpen)} {...props} />
      <div onClick={() => setIsOpen(false)} className={clsx([classes.lightbox, isOpen && classes.opened])}>
        <img className={classes.zoomedImage} {...props} />
      </div>
    </>
  );
}

export default ZoomableImage;
