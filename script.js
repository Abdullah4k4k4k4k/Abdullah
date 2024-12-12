let recognition;
const messageInput = document.getElementById('messageInput');
const voiceButton = document.getElementById('voiceButton');

// التحقق من وجود Web Speech API
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition(); // إنشاء مثيل من WebkitSpeechRecognition
    recognition.lang = 'ar-SA'; // اللغة العربية
    recognition.interimResults = true; // الحصول على النتائج المؤقتة (أي نص مستمر أثناء الكلام)
    recognition.maxAlternatives = 1; // عدد البدائل المسموح بها

    // عندما يبدأ التسجيل
    recognition.onstart = function () {
        console.log('التسجيل بدأ');
        voiceButton.textContent = '⏺️ إيقاف التسجيل';
    };

    // عندما يتوقف التسجيل
    recognition.onend = function () {
        console.log('التسجيل انتهى');
        voiceButton.textContent = '🎤 تسجيل الصوت';
    };

    // عندما يتم تحويل الصوت إلى نص
    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        console.log('تم تحويل الصوت إلى نص:', transcript);
        messageInput.value = transcript; // وضع النص في خانة الإدخال
    };

    // إذا حدث خطأ أثناء التسجيل
    recognition.onerror = function (event) {
        console.error('حدث خطأ أثناء التسجيل:', event.error);
        alert('حدث خطأ أثناء التسجيل الصوتي');
    };
} else {
    // إذا لم يكن Web Speech API مدعومًا في المتصفح
    voiceButton.disabled = true;
    alert('التحويل الصوتي غير مدعوم في متصفحك');
}

// عند الضغط على زر التسجيل
function startVoiceRecognition() {
    if (recognition) {
        recognition.start();
    }
}

// إرسال الرسالة
function sendMessage() {
    const messageText = messageInput.value.trim();

    if (messageText === '') return;

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const userElement = document.createElement('span');
    userElement.classList.add('user');
    userElement.textContent = 'You';

    const textElement = document.createElement('div');
    textElement.classList.add('text');
    textElement.textContent = messageText;

    const timeElement = document.createElement('div');
    timeElement.classList.add('time');
    timeElement.textContent = new Date().toLocaleTimeString();

    messageElement.appendChild(userElement);
    messageElement.appendChild(textElement);
    messageElement.appendChild(timeElement);

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    messageInput.value = ''; // إفراغ مربع الإدخال بعد الإرسال
}
