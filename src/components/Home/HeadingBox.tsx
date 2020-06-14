import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Link } from "@material-ui/core";
import { StyleProps } from "./Home.jss";

interface BoxProps extends StyleProps {
  imgSrc: string,
  imgTitle: string,
  heading: string,
  url: string,
  description: string
}

export const HeadingBox: React.FC<BoxProps> = ({ classes, imgSrc, imgTitle, heading, url, description }) => (
  <Card className={classes.box}>
    <CardActionArea component={Link} href={url} className={classes.boxActionArea}>
      <CardMedia
        image={imgSrc}
        title={imgTitle}
        className={classes.boxMedia}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {heading}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);
