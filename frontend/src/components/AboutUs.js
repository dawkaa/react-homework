import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Button,
  Grid,
  TextField,
  Typography,
  Divider,
} from '@material-ui/core';

function AboutUs(props) {
  const [clipboardValue, setClipboardValue] = useState('(413) 732-3899');
  const [clipboardCopied, setClipboardCopied] = useState(false);
  const { title } = props;

  function onChange({ target: { value } }) {
    setClipboardValue(value);
  }

  function onCopy() {
    setClipboardCopied(true);
  }

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Grid container direction="column" spacing={1}>
        <Grid container direction="row" spacing={3} alignItems="center">
          <Grid item>
            <TextField fullWidth onChange={onChange} value={clipboardValue} />
          </Grid>
          <Grid item>
            <CopyToClipboard onCopy={onCopy} text={clipboardValue}>
              <Button variant="contained" color="primary">Copy to phone</Button>
            </CopyToClipboard>
          </Grid>
          <Grid item>
            <section className="section">
              {clipboardCopied ? <span style={{ color: 'red' }}>Copied.</span> : null}
            </section>
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={1} alignItems="center">
          <Grid item xs={12} md={12}>
            <TextField
              id="outlined-full-width"
              label="Paste"
              placeholder="Here check paste"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AboutUs;
