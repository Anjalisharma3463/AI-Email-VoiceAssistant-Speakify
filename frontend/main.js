    const messagesContainer = document.getElementById('messagesContainer');
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        const micButton = document.getElementById('micButton');
        const orbOverlay = document.getElementById('orbOverlay');
        const listeningOrb = document.getElementById('listeningOrb');
        const typingIndicator = document.getElementById('typingIndicator');
        const particles = document.getElementById('particles');

        let isListening = false;

        // Create particles for the orb
        function createParticles() {
            particles.innerHTML = '';
            for (let i = 0; i < 12; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 3 + 's';
                particles.appendChild(particle);
            }
        }

        // Add message to chat
        function addMessage(content, isUser = false) {
            const message = document.createElement('div');
            message.className = `message ${isUser ? 'user' : 'assistant'}`;
            
            const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            message.innerHTML = `
                <div class="avatar ${isUser ? 'user' : 'assistant'}">${isUser ? '👤' : '🤖'}</div>
                <div>
                    <div class="message-bubble">${content}</div>
                    <div class="message-time">${currentTime}</div>
                </div>
            `;
            
            messagesContainer.appendChild(message);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // Show typing indicator
        function showTyping() {
            typingIndicator.style.display = 'flex';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // Hide typing indicator
        function hideTyping() {
            typingIndicator.style.display = 'none';
        }

        // Handle user input
        function handleUserInput(input) {
            if (!input.trim()) return;
            
            addMessage(input, true);
            showTyping();
            
            // Simulate AI response after delay
            setTimeout(() => {
                hideTyping();
                const response = generateResponse(input.toLowerCase());
                addMessage(response);
            }, 1500 + Math.random() * 1000);
        }

        // Generate AI responses
        function generateResponse(input) {
            if (input.includes('youtube') || input.includes('open youtube')) {
                return "Opening YouTube for you! 📺 You can now browse and watch videos. Would you like me to search for something specific?";
            }
            if (input.includes('music') || input.includes('spotify') || input.includes('play')) {
                return "🎵 Opening Spotify! What genre or artist would you like to listen to today?";
            }
            if (input.includes('email') || input.includes('gmail')) {
                return "📧 Accessing your Gmail. I can help you read your latest emails, compose new ones, or search through your inbox. What would you like to do?";
            }
            if (input.includes('calculator') || input.includes('calculate') || input.includes('+') || input.includes('2+2')) {
                return "🔢 Opening calculator! If you asked 2+2, the answer is 4. I can help with any mathematical calculations you need.";
            }
            if (input.includes('weather')) {
                return "🌤️ The weather today is partly cloudy with a high of 24°C. Perfect for outdoor activities! Would you like a detailed forecast?";
            }
            if (input.includes('hello') || input.includes('hi')) {
                return "Hello! Great to see you again. How can I assist you today? I'm ready to help with emails, music, calculations, or opening any apps you need!";
            }
            if (input.includes('help') || input.includes('what can you do')) {
                return "I can help you with: 📧 Managing emails, 🎵 Playing music, 📺 Opening YouTube, 🔢 Calculations, 🌤️ Weather updates, and launching various apps. Just ask me naturally!";
            }
            
            return `I understand you said "${input}". I'm processing your request and learning how to help you better! Is there a specific app you'd like me to open or task you'd like assistance with?`;
        }

        // Mic button functionality
        micButton.addEventListener('click', () => {
            if (!isListening) {
                startListening();
            } else {
                stopListening();
            }
        });

        function startListening() {
            isListening = true;
            micButton.classList.add('active');
            orbOverlay.classList.add('active');
            createParticles();
            
            // Simulate voice recognition
            setTimeout(() => {
                stopListening();
                const voiceInputs = [
                    "Open YouTube",
                    "Play some music",
                    "Check my emails",
                    "What's 15 times 7?",
                    "How's the weather today?"
                ];
                const randomInput = voiceInputs[Math.floor(Math.random() * voiceInputs.length)];
                messageInput.value = randomInput;
                handleUserInput(randomInput);
                messageInput.value = '';
            }, 2000 + Math.random() * 2000);
        }

        function stopListening() {
            isListening = false;
            micButton.classList.remove('active');
            orbOverlay.classList.remove('active');
        }

        // Handle text input
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Monitor input for send button state
        messageInput.addEventListener('input', (e) => {
            const hasText = e.target.value.trim().length > 0;
            if (hasText) {
                sendButton.classList.add('active');
            } else {
                sendButton.classList.remove('active');
            }
        });

        // Send button functionality
        sendButton.addEventListener('click', () => {
            if (messageInput.value.trim()) {
                sendMessage();
            }
        });

        function sendMessage() {
            const message = messageInput.value.trim();
            if (message) {
                handleUserInput(message);
                messageInput.value = '';
                sendButton.classList.remove('active');
            }
        }

        // App icon functionality
        document.querySelectorAll('.app-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                const app = icon.dataset.app;
                let message = '';
                
                switch(app) {
                    case 'gmail':
                        message = 'Open Gmail';
                        break;
                    case 'youtube':
                        message = 'Open YouTube';
                        break;
                    case 'spotify':
                        message = 'Play music on Spotify';
                        break;
                    case 'calculator':
                        message = 'Open calculator';
                        break;
                    case 'weather':
                        message = 'Show me the weather';
                        break;
                }
                
                if (message) {
                    handleUserInput(message);
                }
            });
        });

        // Initialize particles
        createParticles();
        
        // Add some demo messages after a short delay
        setTimeout(() => {
            // You can add more demo messages here if needed
        }, 1000);