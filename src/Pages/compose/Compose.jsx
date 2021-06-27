import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import Frequency from './Frequency';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles(() => ({
  container: {
    marginLeft: '260px',
    marginTop: '80px',
  },
  image: {
    width: '60%',
    padding: '10px',
  },
  size: {
    height: '50px',
    width: '80px',
  },
}));

const Compose = (props) => {
  const classes = useStyles();
  const initialValue = {
    to: '',
    cc: '',
    subject: '',
    body: '',
    scheduleDate: new Date(),
    frequency: 30,
  };
  const [mail, setMail] = useState(initialValue);

  const handleChangeMail = (event) => {
    const { name, value } = event.target;
    setMail({
      ...mail,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...mail,
    };

    axios
      .post('http://localhost:8082/api/mails', data)
      .then((res) => {
        setMail({
          ...initialValue,
        });
        props.history.push('/');
      })
      .catch((err) => {
        console.log('Error in Compose!');
      });
  };

  return (
    <>
      <div className={classes.container}>
        <Link to="/">
          <KeyboardBackspaceIcon />
        </Link>
        <Grid container spacing={3} justify="center">
          <Grid item xs={8}>
            <form noValidate onSubmit={onSubmit}>
              <Grid container justify="center">
                <TextField
                  id="To"
                  label="To *"
                  variant="outlined"
                  fullWidth
                  style={{ margin: 8 }}
                  helperText="Enter Email to send"
                  name="to"
                  onChange={handleChangeMail}
                />
                <TextField
                  id="CC"
                  label="CC *"
                  variant="outlined"
                  fullWidth
                  style={{ margin: 8 }}
                  helperText="CC Emails"
                  name="cc"
                  onChange={handleChangeMail}
                />
                <TextField
                  id="Subject"
                  label="Subject *"
                  variant="outlined"
                  fullWidth
                  style={{ margin: 8 }}
                  helperText="Enter the Subject"
                  name="subject"
                  onChange={handleChangeMail}
                />
                <TextField
                  id="Body"
                  label="Mail Body *"
                  variant="outlined"
                  multiline
                  fullWidth
                  rows={5}
                  style={{ margin: 8 }}
                  name="body"
                  onChange={handleChangeMail}
                />
                <Grid container justify="space-between">
                  <Grid container>
                    <Grid item>
                      <InputLabel htmlFor="age-native-simple">
                        frequency
                      </InputLabel>
                      <Select
                        native
                        value={mail.frequency}
                        onChange={handleChangeMail}
                        inputProps={{
                          name: 'frequency',
                          id: 'age-native-simple',
                        }}
                      >
                        <option value={0}>Thirty Seconds</option>
                        <option value={1}>Weekly</option>
                        <option value={2}>Monthly</option>
                        <option value={3}>Yearly</option>
                      </Select>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    style={{ margin: 8 }}
                    onClick={() => console.log(mail)}
                  >
                    Set/Send
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Compose;
