import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SocketContext from '../../MyContext';
import Cookies from 'js-cookie';
import axios from 'axios';
import { 
  Avatar, 
  Box, 
  Card, 
  Typography,
  Skeleton,
  IconButton,
  Badge
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  MoreVert as MoreIcon,
  Person as PersonIcon,
  Group as GroupIcon
} from '@mui/icons-material';

const Chat = ({ setRoomId, setUserName }) => {
  const { socket } = useContext(SocketContext);
  const [chatName, setChatName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const Id = Cookies.get('userId');
        const response = await axios.get(`http://localhost:7000/room/${Id}`);
        setChatName(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const Id = Cookies.get('userId');

    const handleNewRoom = () => {
      axios.get(`http://localhost:7000/room/${Id}`).then((response) => {
        setChatName(response.data);
      });
    };

    socket.on('new-room-created', handleNewRoom);

    return () => {
      socket.off('new-room-created', handleNewRoom);
    };
  }, [socket]);

  const handleChatClick = (roomId, userName) => {
    setRoomId(roomId);
    setUserName(userName);
    setActiveChat(roomId);
  };

  // Animation variants
  const chatItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    }),
    hover: {
      scale: 1.02,
      boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography variant="h6" sx={{ 
        p: 2, 
        borderBottom: '1px solid rgba(0,0,0,0.12)',
        fontWeight: 'bold'
      }}>
        Your Conversations
      </Typography>
      
      <Box sx={{ 
        flex: 1, 
        overflowY: 'auto',
        p: 2,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: '3px',
        }
      }}>
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton 
              key={index} 
              variant="rectangular" 
              width="100%" 
              height={80} 
              sx={{ mb: 2, borderRadius: 2 }} 
            />
          ))
        ) : (
          <AnimatePresence>
            {chatName.map((data, index) => (
              <motion.div
                key={data.roomId}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                variants={chatItemVariants}
                layout
              >
                <Link 
                  onClick={() => handleChatClick(data.roomId, data.name)} 
                  style={{ textDecoration: 'none' }}
                >
                  <Card 
                    sx={{ 
                      display: 'flex', 
                      mb: 2, 
                      p: 1.5, 
                      width: '100%',
                      borderRadius: 3,
                      backgroundColor: activeChat === data.roomId ? 'action.selected' : 'background.paper',
                      transition: 'background-color 0.2s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: activeChat === data.roomId ? '4px' : 0,
                        backgroundColor: 'primary.main',
                        transition: 'width 0.2s ease'
                      }
                    }}
                  >
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        data.isGroup ? (
                          <GroupIcon sx={{ 
                            width: 16, 
                            height: 16,
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            borderRadius: '50%',
                            p: 0.5
                          }} />
                        ) : null
                      }
                    >
                      <Avatar 
                        sx={{ 
                          width: 56, 
                          height: 56,
                          bgcolor: 'primary.main',
                          fontSize: '1.5rem'
                        }}
                      >
                        {data.name.charAt(0).toUpperCase()}
                      </Avatar>
                    </Badge>
                    
                    <Box sx={{ 
                      flex: 1, 
                      ml: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}>
                      <Typography 
                        variant="subtitle1" 
                        noWrap
                        sx={{ 
                          fontWeight: 'medium',
                          color: activeChat === data.roomId ? 'primary.main' : 'text.primary'
                        }}
                      >
                        {data.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        noWrap
                      >
                        {data.lastMessage || 'Start a new conversation'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      ml: 1
                    }}>
                      <Typography variant="caption" color="text.secondary">
                        {data.lastMessageTime || ''}
                      </Typography>
                      {data.unreadCount > 0 && (
                        <Box sx={{
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                          borderRadius: '50%',
                          width: 20,
                          height: 20,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem'
                        }}>
                          {data.unreadCount}
                        </Box>
                      )}
                    </Box>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        
        {!loading && chatName.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '60%',
              textAlign: 'center'
            }}
          >
            <PersonIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No conversations yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Start a new chat to see it here
            </Typography>
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

export default Chat;