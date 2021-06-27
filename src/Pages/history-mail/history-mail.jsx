import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Mail from '../../components/Mails/mail.component';
class ShowmailsList extends Component {
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
    let mailsList;

    if (!mails) {
      mailsList = 'there is no mails record!';
    } else {
      mailsList = mails.map((mails, k) => <Mail key={k} {...mails} />);
    }

    return <div>{mailsList}</div>;
  }
}

export default ShowmailsList;
