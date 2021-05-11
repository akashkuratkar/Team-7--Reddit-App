/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
/* eslint no-underscore-dangle: 0 */

import React from 'react';
import Row from 'react-bootstrap/Row';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import constants from '../../constants/constants';
import ConvertDate from '../../constants/CommonService';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [], expanded: false, panel: '' };
  }

  componentDidMount = async () => {
    await this.getComments();
  };

  handleExpandClick = (e) => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded, panel: e });
  };

  handleUpVote = async (id) => {
    const userId = localStorage.getItem('user');
    if (id.upvote.includes(userId) || id.downvote.includes(userId)) {
      return;
    }
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    const data = { id, user: userId };
    await axios
      .post(`${constants.baseUrl}/comment/upvote`, data)
      .then((response, error) => {
        if (error) {
          console.log(response.msg);
        } else {
          // this.setState({ updatetree: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDownVote = async (id) => {
    const userId = localStorage.getItem('user');
    if (id.upvote.includes(userId) || id.downvote.includes(userId)) {
      return;
    }
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    const data = { id, user: userId };
    await axios
      .post(`${constants.baseUrl}/comment/downvote`, data)
      .then((response, error) => {
        if (error) {
          console.log(response.msg);
        } else {
          // this.setState({ updatetree: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getComments = async () => {
    axios.defaults.withCredentials = true;
    // const { postId } = this.props;
    const postid = '608b85264a4f682dc608e37f';
    await axios
      .get(`${constants.baseUrl}/comment/?id=${postid}`)
      .then((response, error) => {
        if (!error) {
          this.setState({
            comments: response.data.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ errormessage: error.response.data.msg });
      });
  };

  render() {
    const { comments, expanded, panel } = this.state;
    // const { postId } = this.props;
    return (
      <>
        {comments.length > 0 &&
          comments.map((c) => (
            <Card className="border">
              <CardHeader
                avatar={<Avatar aria-label="recipe">R</Avatar>}
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={c.author_id}
                subheader={ConvertDate(c.createdAt)}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {c.comment}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton>
                  <div className="upvote">
                    <ArrowDropUpIcon fontSize="large" onClick={() => this.handleUpVote(c)} />
                  </div>
                </IconButton>
                <Typography style={{ textAlign: 'center' }}>0</Typography>
                <IconButton>
                  <div className="downvote">
                    <ArrowDropDownIcon fontSize="large" onClick={() => this.handleDownVote(c)} />
                  </div>
                </IconButton>
                <IconButton
                  onClick={() => this.handleExpandClick(c._id)}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <Typography>Reply</Typography>
                </IconButton>
              </CardActions>
              <Collapse in={expanded && panel === c._id} timeout="auto" unmountOnExit>
                <CardContent>
                  <Row>
                    {' '}
                    <List>
                      {c.sub_comment !== undefined &&
                        c.sub_comment.length > 0 &&
                        c.sub_comment.map((s) => (
                          <ListItem className="border">
                            <ListItemAvatar>
                              <Avatar>
                                <ImageIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={s.author_id} secondary={s.createdAt} />
                          </ListItem>
                        ))}
                    </List>
                  </Row>
                  <Row>
                    <TextareaAutosize
                      rowsMin={1}
                      placeholder="Reply"
                      size="medium"
                      defaultValue=""
                      style={{ 'max-width': '100vh' }}
                      onChange={this.handleCommentText}
                    />
                    <Button
                      size="medium"
                      className="btn-primary"
                      type="button"
                      style={{
                        'background-color': '#da907e',
                        color: '#ffffff',
                        'border-radius': '9999px',
                        height: '30px',
                      }}
                      onClick={this.handleAddComment}
                      default
                    >
                      Reply
                    </Button>
                  </Row>
                </CardContent>
              </Collapse>
            </Card>
          ))}
      </>
    );
  }
}

Comment.propTypes = {
  // postId: PropTypes.string.isRequired,
};

export default Comment;
