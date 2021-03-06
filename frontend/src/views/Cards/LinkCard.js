/* eslint-disable */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Button from '@material-ui/core/Button';
import Row from 'react-bootstrap/Row';
import { ListGroup, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Card from '@material-ui/core/Card';
import constants from '../../constants/constants';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class LinkCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      URL: '',
      community: 'Choose a Community',
      communityList: [],
      redirect:false,
    };
  }

  componentDidMount() {
    this.getCommunityList();
  }

  handleSelect = (evtKey) => {
    this.setState({
      community: evtKey,
    });
  };

  onChangeCommunity = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeURL = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onChangeTitle = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getCommunityList = async () => {
    const communities = [];
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    const data = await axios.get(`${constants.baseUrl}/community/communities`);
    if (data.data.data) {
      data.data.data.map((d) => communities.push(d.community_name));
      this.setState({ communityList: communities });
    }
  };

  addPostLink = async () => {
    const data = {
      title: this.state.title,
      URL: this.state.URL,
      community: this.state.community,
      UserID: localStorage.getItem("userId")
    };
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios.post(`${constants.baseUrl}/post/link/`, data)
    .then(res=>{
      if(res.data.msg==="POST_ADDED"){
        this.setState({
          redirect: true,
        });
      }
    })
  };
  render() {
    const communitylist = new Set();
    communitylist.add(
      <Dropdown.Item as="button" value="test5">
        test5
      </Dropdown.Item>
    );
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <>
        <div>
          <Card>
            <Row>
              <Col md={12}>
                <CardContent>
                  <Col md={12}>
                    <Row>
                      <Col
                        className="p-0"
                        md={3.5}
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <DropdownButton
                          name="community"
                          variant="light"
                          menuAlign="right"
                          title={this.state.community}
                          id="dropdown-menu-align-right"
                          onChange={this.onChangeCommunity}
                          value={this.state.community}
                          onSelect={this.handleSelect}
                        >
                          {this.state.communityList.map((p) => (
                            <Dropdown.Item eventKey={p}>{p}</Dropdown.Item>
                          ))}
                        </DropdownButton>
                      </Col>
                    </Row>
                    <Row>&nbsp;</Row>
                    <Row>
                      {' '}
                      <TextField
                        name="title"
                        id="outlined-size-small"
                        placeholder="Title"
                        variant="outlined"
                        size="small"
                        fullWidth="true"
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                        // onClick={this.createPost}
                      />
                    </Row>
                    <br/>
                    <Row>&nbsp;</Row>
                    <Row>
                      <TextareaAutosize
                        id="component-error-text"
                        name="URL"
                        rowsMin={3}
                        placeholder="URL"
                        size="large"
                        defaultValue=""
                        error
                        pattern="((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)"
                        value={this.state.URL}
                        onChange={this.onChangeURL}
                        style={{ width: '100%' }}
                      />
                    </Row>
                    <br/>
                    <br/>
                    <Row>&nbsp;</Row>
                    <Row>
                      <Col md={10}>
                        {' '}
                        <Chip icon={<AddIcon />} label="OC" deleteIcon={<AddIcon />} />
                        &nbsp;&nbsp;
                        <Chip icon={<AddIcon />} label="SPOILER" deleteIcon={<AddIcon />} />
                        &nbsp;&nbsp;
                        <Chip icon={<AddIcon />} label="NSFW" deleteIcon={<AddIcon />} />
                        &nbsp;&nbsp;
                        <Chip icon={<LocalOfferIcon fontsize="small" />} label="FLAIR" />
                      </Col>
                      <Col mg={1}>
                        <Button
                          data-testid="Signup"
                          size="small"
                          className="btn-primary"
                          type="button"
                          onClick={this.handleLoginModal}
                          default
                          style={{
                            'background-color': '#ffffff',
                            'border-color': '#0579d3',
                            'border-radius': '9999px',
                          }}
                        >
                          Cancel
                        </Button>

                        <Button
                          data-testid="Signup"
                          size="small"
                          className="btn-primary"
                          type="button"
                          style={{
                            'background-color': '#0579d3',
                            color: '#ffffff',
                            'border-radius': '9999px',
                          }}
                          onClick={this.addPostLink}
                          default
                        >
                          Post
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </CardContent>
              </Col>
            </Row>
          </Card>
        </div>
      </>
    );
  }
}

export default LinkCard;
