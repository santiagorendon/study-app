import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Santiago from "./Santiago.png";
import Andres from "./Andres.png";
import Crystal from "./crystal.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
});

function Team() {
  const classes = useStyles();

  const santiagoCard = () => (
    <div style={{ margin: "1%" }}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="250"
            image={Santiago}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Santiago Rendon
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              I'm a Computer Science major and Math minor at NYU. I am
              experienced in web/mobile development and data science.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Link
            to={{ pathname: "https://github.com/santiagorendon" }}
            target="_blank"
          >
            <Button size="small" color="primary" to="/">
              <GitHubIcon />
            </Button>
          </Link>
          <Link
            to={{
              pathname:
                "https://www.linkedin.com/in/santiago-rendon-480550129/",
            }}
            target="_blank"
          >
            <Button size="small" color="primary">
              <LinkedInIcon />
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );

  const andresCard = () => (
    <div style={{ margin: "1%" }}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="250"
            image={Andres}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Andre Tavares
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              A hardworking and dedicated Web developer with coding skills,
              creative thinker always looking for a way to learn new things.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Link
            to={{ pathname: "https://github.com/TavaresDev" }}
            target="_blank"
          >
            <Button size="small" color="primary">
              <GitHubIcon />
            </Button>
          </Link>
          <Link
            to={{ pathname: "https://www.linkedin.com/in/andre--tavares/" }}
            target="_blank"
          >
            <Button size="small" color="primary">
              <LinkedInIcon />
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );

  const crystalCard = () => (
    <div style={{ margin: "1%" }}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="250"
            image={Crystal}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Crystal Villanueva
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Full Stack software engineer with a background in neuroscience and
              a love for language. Creative coder and supreme pet owner
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Link
            to={{ pathname: "https://github.com/noelanimanini" }}
            target="_blank"
          >
            <Button size="small" color="primary">
              <GitHubIcon />
            </Button>
          </Link>
          <Link
            to={{
              pathname:
                "https://www.linkedin.com/in/crystal-villanueva-151353145/",
            }}
            target="_blank"
          >
            <Button size="small" color="primary">
              <LinkedInIcon />
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {santiagoCard()}
      {andresCard()}
      {crystalCard()}
    </div>
  );
}

export default Team;
