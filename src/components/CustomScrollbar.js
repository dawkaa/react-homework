import React from 'react';
import {
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';

function CustomScrollbar(props) {
  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {props.title}
      </Typography>
      <Divider />
      <Grid direction="column">
        <Scrollbars
          style={{ height: 200 }}
        >
          <p>
            Try React
            React has been designed from the start for gradual adoption,
            and you can use as little or as much React as you need.
            Whether you want to get a taste of React,
            add some interactivity to a simple HTML page,
            or start a complex React-powered app,
            the links in this section will help you get started.
          </p>
          <p>
            Online Playgrounds
            If you’re interested in playing around with React,
            you can use an online code playground.
            Try a Hello World template on CodePen, CodeSandbox, or Glitch.

            If you prefer to use your own text editor,
            you can also download this HTML file, edit it,
            and open it from the local filesystem in your browser.
            It does a slow runtime code transformation,
            so we’d only recommend using this for simple demos.
          </p>
          <p>
            Add React to a Website
            You can add React to an HTML page in one minute.
            You can then either gradually expand its presence,
            or keep it contained to a few dynamic widgets.

            Create a New React App
            When starting a React project,
            a simple HTML page with script tags might still be the best option.
            It only takes a minute to set up!
          </p>
        </Scrollbars>
      </Grid>
    </Grid>
  );
}

export default CustomScrollbar;
