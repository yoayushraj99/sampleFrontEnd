import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Mail from '../../components/Mails/mail.component';
class ScheduleMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mails: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/mails')
      .then((res) => {
        this.setState({
          mails: res.data,
        });
      })
      .catch((err) => {
        console.log('Error from ShowmailsList');
      });
  }

  render() {
    const mails = this.state.mails;
    console.log('Printmails: ' + mails);
    const latestMail = mails[mails.length - 1];

    return <Mail {...latestMail} />;
  }
}

export default ScheduleMail;
