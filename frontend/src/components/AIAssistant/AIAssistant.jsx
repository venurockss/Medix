import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaMicrophone, FaMicrophoneSlash, FaTimes, FaPaperPlane, FaUserMd } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AIAssistant.css';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Initial greeting message
  useEffect(() => {
    setMessages([
      {
        text: "Hello! I'm your Medix AI Assistant. I can help you find the right doctor based on your condition. How can I assist you today?",
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString(),
      }
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getDoctorRecommendation = (condition) => {
    // Map conditions to specialties
    const conditionToSpecialty = {
      'heart': 'Cardiology',
      'cardiac': 'Cardiology',
      'chest pain': 'Cardiology',
      'headache': 'Neurology',
      'migraine': 'Neurology',
      'brain': 'Neurology',
      'stomach': 'Gastroenterology',
      'digestion': 'Gastroenterology',
      'gut': 'Gastroenterology',
      'bone': 'Orthopedics',
      'joint': 'Orthopedics',
      'muscle': 'Orthopedics',
      'skin': 'Dermatology',
      'rash': 'Dermatology',
      'acne': 'Dermatology',
      'eye': 'Ophthalmology',
      'vision': 'Ophthalmology',
      'ear': 'ENT',
      'nose': 'ENT',
      'throat': 'ENT',
      'child': 'Pediatrics',
      'kid': 'Pediatrics',
      'baby': 'Pediatrics',
      'pregnancy': 'Obstetrics',
      'pregnant': 'Obstetrics',
      'gynecology': 'Obstetrics',
      'mental': 'Psychiatry',
      'depression': 'Psychiatry',
      'anxiety': 'Psychiatry',
      'cancer': 'Oncology',
      'tumor': 'Oncology',
      'diabetes': 'Endocrinology',
      'thyroid': 'Endocrinology',
      'hormone': 'Endocrinology',
    };

    // Find matching specialty
    const conditionLower = condition.toLowerCase();
    let matchedSpecialty = null;

    for (const [key, specialty] of Object.entries(conditionToSpecialty)) {
      if (conditionLower.includes(key)) {
        matchedSpecialty = specialty;
        break;
      }
    }

    return matchedSpecialty;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Process the message and find relevant doctors
    const specialty = getDoctorRecommendation(inputMessage);
    
    setTimeout(() => {
      let response;
      if (specialty) {
        response = {
          text: `Based on your condition, I recommend consulting a ${specialty} specialist. Would you like me to show you available ${specialty} doctors?`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString(),
          action: {
            type: 'show_doctors',
            specialty: specialty
          }
        };
      } else {
        response = {
          text: "I'm not sure about the exact specialty for your condition. Could you please provide more details about your symptoms?",
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString(),
        };
      }
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1000);
  };

  const handleDoctorSearch = (specialty) => {
    navigate(`/doctors/${specialty.toLowerCase()}`);
    setIsOpen(false);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Implement voice recognition logic here
  };

  return (
    <div className="ai-assistant-container">
      {/* Floating Robot Button */}
      <motion.button
        className="ai-assistant-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaRobot className="robot-icon" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="chat-header">
              <div className="assistant-info">
                <FaRobot className="robot-icon" />
                <span>Medix AI Assistant</span>
              </div>
              <button className="close-button" onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="messages-container">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.sender === 'user' ? 'user-message' : 'assistant-message'}`}
                >
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-timestamp">{message.timestamp}</span>
                    {message.action && message.action.type === 'show_doctors' && (
                      <button
                        className="doctor-search-button"
                        onClick={() => handleDoctorSearch(message.action.specialty)}
                      >
                        <FaUserMd /> Show {message.action.specialty} Doctors
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message assistant-message">
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="input-container">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Describe your condition or symptoms..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                className={`voice-button ${isListening ? 'listening' : ''}`}
                onClick={toggleVoiceInput}
              >
                {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
              <button className="send-button" onClick={handleSendMessage}>
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistant; 