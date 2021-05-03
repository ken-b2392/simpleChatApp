import React, {useState, useEffect} from 'react';
import './Forchatbox.css';
import firebase from 'firebase';
import { db } from '../../fbdb';
import { useAuth } from '../../context/AuthProvider';
import moment from 'moment';

import { makeStyles, withStyles  } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
    maxHeight: '70vh',
    overflow: 'auto',
  },
  list: {
    marginBottom: theme.spacing(0),
    maxHeight: '30vh',
    overflow: 'auto',
  },
}));

const CurrentUserListItemText = withStyles({
  root: {
    textAlign: "right",
    paddingRight: 15,
    wordWrap: 'break-word',
  },
})(ListItemText);

const OtherUserListItemText = withStyles({
  root: {
    textAlign: "left",
    paddingLeft: 15,
    wordWrap: 'break-word',
  },
})(ListItemText);


const Forchatbox = () => {

  const classes = useStyles();
  const {currentUser} = useAuth();
  const [chat, setChat] = useState("");
  const [chats, setChats] = useState({});

  useEffect(() => {
    let isMounted = true;

    db.collection('chatsCollection').orderBy('chatTimeStamp', 'asc').onSnapshot(snapshot =>{
        if(isMounted){
          setChats(snapshot.docs.map(doc => ({
            id: doc.id, 
            avatarData: doc.data().avatarPerson,
            chatData: doc.data().chat, 
            currentUserData: doc.data().currentUser,
            chatTimeStampData: doc.data().chatTimeStamp
          })))
        }
    })
    return () => {
      isMounted = false;
    }
  }, [])

  const forSendChat = () => {
          db.collection('chatsCollection').add({
          chat: chat,
          currentUser: currentUser.email,
          chatTimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
          avatarPerson: '/static/images/avatar/1.jpg'
      })
  };

  const handleSubmitChat = (e) => {
    e.preventDefault();
    forSendChat();
    setChat("");
  };

return(
    <div className="chatbox-wrapper">
      <form autoComplete="off">
        <Paper square className={classes.paper} >
          <List className={classes.list}>
              {
                Object.keys(chats).map(id =>(
                  <React.Fragment key={id}>
                    {
                      currentUser.email !== chats[id].currentUserData 
                      ?
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar alt="Profile Picture" src={chats[id].avatarData} />
                        </ListItemAvatar>
                        <OtherUserListItemText 
                          primary={chats[id].chatData} 
                          secondary={chats[id].currentUserData + ' ' + 
                          moment((chats[id].chatTimeStampData.toDate())).calendar()} />
                      </ListItem>  
                      :
                      <ListItem button>
                      {
                        chats[id].chatTimeStampData !== null 
                        ?
                          <CurrentUserListItemText 
                            primary={chats[id].chatData} 
                            secondary={chats[id].currentUserData + ' ' + 
                            moment((chats[id].chatTimeStampData.toDate())).calendar()} />
                        :
                          null
                      }
                      <ListItemAvatar>
                          <Avatar alt="Profile Picture" src={chats[id].avatarData} />
                        </ListItemAvatar>
                        <Button 
                          color='secondary'
                          onClick={() => {db.collection('chatsCollection').doc(chats[id].id).delete()}}
                          >
                          <DeleteForeverIcon color='secondary' />
                        </Button>
                      </ListItem>
                     }
                  </React.Fragment>
                ))
              }
          </List>
        </Paper>
          <div className="input-container">
            <TextField 
              id="outlined-basic" 
              label="Type here" 
              variant="outlined" 
              className="inputChat" 
              multiline={true}
              value={chat}  
              onChange={(event)=>setChat(event.target.value)}
              required
            />
            <div className="send-container">
              <Button color='primary'>              
                <SendOutlinedIcon color='primary' onClick={handleSubmitChat}/>
              </Button>
            </div>
          </div>
      </form>
    </div>
   )
}

export default Forchatbox