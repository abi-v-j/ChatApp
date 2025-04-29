import React, { useContext, useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Button, 
  Card, 
  IconButton, 
  InputAdornment, 
  InputLabel, 
  OutlinedInput, 
  Typography,
  Avatar,
  Badge,
  Tooltip
} from '@mui/material';
import { 
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiIcon,
  Mic as MicIcon
} from '@mui/icons-material';
import SocketContext from '../../MyContext';
import Cookies from 'js-cookie';
import axios from 'axios';
import ChatHead from './ChatHead';
import styled from '@emotion/styled';
import { format, isToday, isYesterday } from 'date-fns';

const ChatWindow = ({ Id, userName }) => {
  const { socket } = useContext(SocketContext);
  const messagesContainerRef = useRef();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  // Format message time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'h:mm a');
  };

  // Format message date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM d, yyyy');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const Uid = Cookies.get('userId');
    socket.emit('send-message', { message, Id, Uid });
    setMessage('');
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    socket.emit('typing-started', { Id });

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(setTimeout(() => {
      socket.emit('typing-stopped', { Id });
    }, 1000));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const Uid = Cookies.get('userId');

    if (!file) return;

    const randomString = Math.random().toString(36).substring(2, 15);
    const timestamp = new Date().getTime();
    const fileName = `${randomString}_${timestamp}_${file.name}`;
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const data = reader.result;
      socket.emit('upload', { data, Id, Uid, fileName });
    };
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [chat]);

  // Fetch messages and set up socket listeners
  useEffect(() => {
    if (!socket) return;

    const fetchData = async () => {
      try {
        const Uid = Cookies.get('userId');
        const response = await axios.post('http://localhost:7000/showChat/', { Uid, Id });
        setChat(response.data.userDataWithReceived);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchData();

    const handleMessageFromServer = () => fetchData();
    socket.on('message-from-server', handleMessageFromServer);
    socket.on('uploaded', handleMessageFromServer);
    socket.on('typing-started-from-server', () => setTyping(true));
    socket.on('typing-stopped-from-server', () => setTyping(false));

    return () => {
      socket.off('message-from-server', handleMessageFromServer);
      socket.off('uploaded', handleMessageFromServer);
      socket.off('typing-started-from-server');
      socket.off('typing-stopped-from-server');
    };
  }, [socket, Id]);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  // Message animation variants
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      height: '100vh',
      backgroundColor: 'background.default',
      p: 2,
      width:900
    }}>
      <Card sx={{ 
        width: '100%', 
        maxWidth: 800,
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        boxShadow: 3,
        overflow: 'hidden'
      }}>
        {/* Chat Header */}
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper'
        }}>
          <ChatHead userData={userName} />
        </Box>

        {/* Messages Area */}
        <Box
          ref={messagesContainerRef}
          sx={{
            flex: 1,
            p: 2,
            overflowY: 'auto',
            backgroundColor: 'background.default',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'text.disabled',
              borderRadius: '3px',
            },
          }}
        >
          <AnimatePresence>
            {chat.map((msg, index) => {
              // Group messages by date
              const showDate = index === 0 || 
                formatDate(msg.dateTime) !== formatDate(chat[index - 1].dateTime);
              
              return (
                <React.Fragment key={msg._id || index}>
                  {showDate && (
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      my: 1 
                    }}>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          px: 2, 
                          py: 1, 
                          backgroundColor: 'background.paper',
                          borderRadius: 4,
                          color: 'text.secondary'
                        }}
                      >
                        {formatDate(msg.dateTime)}
                      </Typography>
                    </Box>
                  )}
                  
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={messageVariants}
                    layout
                    style={{
                      display: 'flex',
                      justifyContent: msg.received ? 'flex-end' : 'flex-start',
                      marginBottom: 1
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'flex-end',
                      maxWidth: '70%',
                      gap: 1,
                      flexDirection: msg.received ? 'row-reverse' : 'row'
                    }}>
                      {!msg.received && (
                        <Avatar sx={{ 
                          width: 32, 
                          height: 32,
                          bgcolor: 'primary.main',
                          fontSize: '0.875rem'
                        }}>
                          {userName?.charAt(0).toUpperCase()}
                        </Avatar>
                      )}
                      
                      <Card
                        component={motion.div}
                        whileHover={{ scale: 1.02 }}
                        sx={{
                          px: 2,
                          py: 1,
                          borderRadius: 4,
                          backgroundColor: msg.received ? 'primary.main' : 'background.paper',
                          color: msg.received ? 'primary.contrastText' : 'text.primary',
                          borderTopLeftRadius: msg.received ? 16 : 4,
                          borderTopRightRadius: msg.received ? 4 : 16,
                          boxShadow: 1
                        }}
                      >
                        {msg.image && (
                          <Box sx={{ mb: 1 }}>
                            <img 
                              src={msg.image} 
                              alt="Attachment" 
                              style={{ 
                                maxWidth: '100%', 
                                maxHeight: 200,
                                borderRadius: 8
                              }} 
                            />
                          </Box>
                        )}
                        
                        {msg.message && (
                          <Typography sx={{ 
                            fontWeight: 400,
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word'
                          }}>
                            {msg.message}
                          </Typography>
                        )}
                        
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'flex-end',
                          mt: 0.5
                        }}>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              opacity: 0.7,
                              fontSize: '0.65rem',
                              color: msg.received ? 'primary.contrastText' : 'text.secondary'
                            }}
                          >
                            {formatTime(msg.dateTime)}
                          </Typography>
                        </Box>
                      </Card>
                    </Box>
                  </motion.div>
                </React.Fragment>
              );
            })}
          </AnimatePresence>
          
          {typing && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 1,
              my: 1,
              ml: 6,
              px: 2,
              py: 1
            }}>
              <Avatar sx={{ width: 32, height: 32 }} />
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {[1, 2, 3].map((dot) => (
                  <Box
                    key={dot}
                    component={motion.div}
                    animate={{ 
                      y: [0, -5, 0],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      delay: dot * 0.2
                    }}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: 'text.secondary'
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* Input Area */}
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ 
            p: 2, 
            borderTop: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper'
          }}
        >
          <OutlinedInput
            fullWidth
            multiline
            maxRows={4}
            value={message}
            onChange={handleInput}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            sx={{ 
              borderRadius: 4,
              backgroundColor: 'background.default',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider'
              }
            }}
            startAdornment={
              <InputAdornment position="start">
                <Tooltip title="Attach file">
                  <IconButton component="label">
                    <VisuallyHiddenInput 
                      type="file" 
                      onChange={handleFile} 
                      accept="image/*, .pdf, .doc, .docx"
                    />
                    <AttachFileIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Emoji">
                  <IconButton>
                    <EmojiIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {message ? (
                  <IconButton 
                    type="submit" 
                    color="primary"
                    disabled={!message.trim()}
                  >
                    <SendIcon />
                  </IconButton>
                ) : (
                  <Tooltip title="Voice message">
                    <IconButton
                      color={isRecording ? 'error' : 'default'}
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      <MicIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </InputAdornment>
            }
          />
        </Box>
      </Card>
    </Box>
  );
};

export default ChatWindow;