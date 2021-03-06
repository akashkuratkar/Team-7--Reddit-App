/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
import React, { Component } from 'react';
import Talk from 'talkjs';
import axios from 'axios';
import constants from '../../constants/constants';

class Messaging extends Component {
  constructor(props) {
    super(props);

    this.inbox = undefined;
  }

  componentDidMount() {
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios
      .get(`${constants.baseUrl}/users/getUserById?id=${localStorage.getItem('userId')}`)
      .then((response) => {
        const currentUser = response.data.data[0];
        // eslint-disable-next-line no-underscore-dangle
        currentUser.id = currentUser._id;
        Talk.ready
          .then(() => {
            const me = new Talk.User(currentUser);
            if (!window.talkSession) {
              window.talkSession = new Talk.Session({
                appId: 'tdR0ruWV',
                me,
              });
            }
            this.inbox = window.talkSession.createInbox();
            this.inbox.mount(this.container);
          })
          .catch((e) => console.error(e));
      })
      .catch((error) => {
        // eslint-disable-next-line no-alert
        alert(error);
      });
  }

  render() {
    return (
      <>
        <div
          style={{ height: '500px' }}
          className="inbox-container"
          // eslint-disable-next-line no-return-assign
          ref={(c) => (this.container = c)}
        >
          Loading...
        </div>
      </>
    );
  }
}

export default Messaging;
