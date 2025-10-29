// YENİ KATILIMCI LİSTESİ (5 Kişi, Yeni Sıralama)
const participants = ["Atilla", "Elif", "Mustafa", "Orkun", "Rıza"];

// Puanları tutacak başlangıç nesnesi
let scores = {};
participants.forEach(p => scores[p] = 0);

// Her katılımcının her soruya verdiği cevabı ve doğruluğunu tutacak tarihçe
let quizHistory = {};
participants.forEach(p => quizHistory[p] = []);

let currentQuestionIndex = 0;

// Toplam 15 soru: 5 Kolay (10 puan), 5 Normal (15 puan), 5 Zor (20 puan) - Kullanıcının sağladığı son verilere göre
const questions = [
    {
        "question": "“Küçük Prens” adlı kitabın yazarı kimdir?",
        "options": [
            "Ömer Seyfettin",
            "Antoine de Saint-Exupéry",
            "Charles Dickens",
            "Victor Hugo"
        ],
        "answer": "Antoine de Saint-Exupéry",
        "difficulty": "Kolay",
        "points": 10
    },
    {
        "question": "Vücut yakıt olarak ilk önce hangisini tüketir?",
        "options": [
            "Protein",
            "Yağ",
            "Karbonhidrat",
            "Fosfor"
        ],
        "answer": "Karbonhidrat",
        "difficulty": "Kolay",
        "points": 10
    },
    {
        "question": "Dünyanın en büyük gölü hangisidir?",
        "options": [
            "Küçükçekmece",
            "Van Gölü",
            "Hazar",
            "Terkos"
        ],
        "answer": "Hazar",
        "difficulty": "Kolay",
        "points": 10
    },
    {
        "question": "Magna Carta hangi ülkede imzalanmıştır?",
        "options": [
            "İngiltere",
            "Osmanlı",
            "Roma",
            "Fransa"
        ],
        "answer": "İngiltere",
        "difficulty": "Kolay",
        "points": 10
    },
    {
        "question": "Atatürk nerede doğmuştur?",
        "options": [
            "Manastır",
            "Selanik",
            "Trabzon",
            "Edirne"
        ],
        "answer": "Selanik",
        "difficulty": "Kolay",
        "points": 10
    },
    {
        "question": "İnsan vücudundaki en büyük iç organ hangisidir?",
        "options": [
            "Kalp",
            "Dalak",
            "Karaciğer",
            "Akciğer"
        ],
        "answer": "Karaciğer",
        "difficulty": "Normal",
        "points": 15
    },
    {
        "question": "“Gılgamış Destanı” hangi uygarlığa aittir?",
        "options": [
            "Hitit",
            "Asur",
            "Babil",
            "Sümer"
        ],
        "answer": "Sümer",
        "difficulty": "Normal",
        "points": 15
    },
    {
        "question": "Aşağıdaki ülkelerden hangisinde aktif yanardağ bulunmaz?",
        "options": [
            "İtalya",
            "Danimarka",
            "Japonya",
            "İzlanda"
        ],
        "answer": "Danimarka",
        "difficulty": "Normal",
        "points": 15
    },
    {
        "question": "Dünyanın en uzun kara sınırına sahip iki ülke hangileridir?",
        "options": [
            "ABD – Kanada",
            "Rusya – Çin",
            "Hindistan – Bangladeş",
            "Arjantin – Şili"
        ],
        "answer": "ABD – Kanada",
        "difficulty": "Normal",
        "points": 15
    },
    {
        "question": "Sanayi Devrimi ilk olarak hangi ülkede başlamıştır?",
        "options": [
            "Almanya",
            "İngitere",
            "Hollanda",
            "Fransa"
        ],
        "answer": "İngitere",
        "difficulty": "Normal",
        "points": 15
    },
    {
        "question": "Aşağıdaki tarihi olaylardan hangisi yanlıştır?",
        "options": [
            "Rusların, Florya'ya bir savaş abidesi dikmesi",
            "Sürmene yerlilerinin, Antik Yunan ordusunu Deli Balı ile zehirlemesi",
            "FSM'in, Sefaköy'e yerleştirdiği toplarlarla Yenibosna'yı topa tutması",
            "Ayasofya'ya ilk minareleri Osmalıların inşa etmesi"
        ],
        "answer": "Ayasofya'ya ilk minareleri Osmalıların inşa etmesi",
        "difficulty": "Zor",
        "points": 20
    },
    {
        "question": "Bizans İmparatorluğu’nun resmi dili hangisiydi?",
        "options": [
            "Latince",
            "Yunanca",
            "Aramice",
            "İbranice"
        ],
        "answer": "Yunanca",
        "difficulty": "Zor",
        "points": 20
    },
    {
        "question": "Dünyanın en batıdaki ülkesi hangisidir (tarih çizgisine göre)?",
        "options": [
            "Fiji",
            "Yeni Zelanda",
            "Kiribati",
            "Mikronezya"
        ],
        "answer": "Kiribati",
        "difficulty": "Zor",
        "points": 20
    },
    {
        "question": "Hangi ülke “İnka İmparatorluğu”na ev sahipliği yapıyordu?",
        "options": [
            "Meksika",
            "Peru",
            "Arjantin",
            "Brezilya"
        ],
        "answer": "Peru",
        "difficulty": "Zor",
        "points": 20
    },
    {
        "question": "Dünyadaki en küçük canlı hücre aşağıdakilerden hangisidir?",
        "options": [
            "Mantar sporu",
            "Bit hücresi",
            "E. coli bakterisi",
            "İnsan alyuvarı"
        ],
        "answer": "E. coli bakterisi",
        "difficulty": "Zor",
        "points": 20
    }
];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('total-questions').textContent = questions.length;
});

function startQuiz() {
    document.getElementById('intro-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    
    displayQuestion();
    createParticipantInputs(); 
}

// Arayüzü güncelleyen ve seçenekleri oluşturan fonksiyon
function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const q = questions[currentQuestionIndex];
    
    document.getElementById('question-number').textContent = currentQuestionIndex + 1;
    document.getElementById('question-text').textContent = q.question;
    document.getElementById('difficulty-level').textContent = q.difficulty;
    document.getElementById('points-value').textContent = q.points;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        const labelText = `${String.fromCharCode(65 + index)}. ${option}`; 
        optionDiv.innerHTML = `<p>${labelText}</p>`;
        optionsContainer.appendChild(optionDiv);
    });

    participants.forEach(participant => {
        const selectElement = document.getElementById(`answer-${participant.replace(/\s/g, '-')}`);
        if (selectElement) {
            selectElement.selectedIndex = 0; 
        }
    });
}

// Katılımcı dropdown listelerini ve Next butonunu oluşturan fonksiyon (3x2 layout)
function createParticipantInputs() {
    const container = document.getElementById('participant-answers');
    container.innerHTML = ''; 

    const currentQuestionOptions = questions[currentQuestionIndex].options;

    participants.forEach((participant) => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('participant-entry');

        const label = document.createElement('label');
        label.setAttribute('for', `answer-${participant.replace(/\s/g, '-')}`);
        label.textContent = participant;

        const select = document.createElement('select');
        select.id = `answer-${participant.replace(/\s/g, '-')}`;
        
        const options = ["Cevap Girilmedi", "A", "B", "C", "D"]; // İlk seçenek artık "Cevap Girilmedi"
        
        options.forEach((optionLabel, optionIndex) => {
            const optionElement = document.createElement('option');
            // Cevap boşsa value'su "" olacak
            optionElement.value = (optionIndex === 0) ? "" : currentQuestionOptions[optionIndex - 1]; 
            optionElement.textContent = (optionIndex === 0) ? optionLabel : `${optionLabel} - ${currentQuestionOptions[optionIndex - 1]}`;
            
            if (optionIndex === 0) {
                 optionElement.selected = true;
            }
            select.appendChild(optionElement);
        });

        entryDiv.appendChild(label);
        entryDiv.appendChild(select);
        container.appendChild(entryDiv);
    });

    // Next butonu, 6. (boş) bölmeye yerleştirilir
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('next-button-container');
    buttonDiv.innerHTML = `<button onclick="nextQuestion()">Next</button>`;
    container.appendChild(buttonDiv);
}

// Sıradaki Soru butonuna tıklandığında çalışan ana mantık
function nextQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const correctOption = currentQuestion.answer;
    let tempAnswers = {};

    // 1. Cevapları topla
    participants.forEach(participant => {
        const selectElement = document.getElementById(`answer-${participant.replace(/\s/g, '-')}`);
        tempAnswers[participant] = selectElement.value; // Boşsa value "" olur
    });
    
    // 2. Doğru/Yanlış Sayısını Bul (Cevap Vermeyenler hariç)
    let correctCount = 0;
    let incorrectCount = 0;
    const answeredParticipants = participants.filter(p => tempAnswers[p] !== "");
    const basePoints = currentQuestion.points;

    answeredParticipants.forEach(participant => {
        const isCorrect = (tempAnswers[participant] === correctOption);
        isCorrect ? correctCount++ : incorrectCount++;
    });

    // Lone Wolf Belirleme (Sadece cevap verenler arasında)
    const loneCorrectUser = (correctCount === 1) 
        ? answeredParticipants.find(p => tempAnswers[p] === correctOption) 
        : null;

    const loneIncorrectUser = (incorrectCount === 1) 
        ? answeredParticipants.find(p => tempAnswers[p] !== correctOption) 
        : null;


    // 3. Puanlamayı Uygula ve Tarihçeyi Güncelle
    participants.forEach(participant => {
        const selectedAnswer = tempAnswers[participant];
        
        // Cevap verilmediyse
        if (selectedAnswer === "") {
            scores[participant] += 0; // Puan değişmez
            quizHistory[participant].push({
                correct: 'NO_ANSWER', // Yeni durum: Cevap Yok
                answer: ""
            });
            return;
        }

        // Cevap verildiyse
        const isCorrect = (selectedAnswer === correctOption);
        let finalPoints = 0;
        
        if (isCorrect) {
            finalPoints = basePoints;
            // Bonus: Sadece bir kişi bildiyse, puanı iki katına çıkar
            if (participant === loneCorrectUser) {
                finalPoints *= 2; 
            }
        } else {
            finalPoints = 0;
            // Ceza: Sadece bir kişi yanlış bildiyse, puanı kadar kaybetsin
            if (participant === loneIncorrectUser) {
                finalPoints = -basePoints; 
            }
        }
        
        scores[participant] += finalPoints;

        // Tarihçeyi güncelle
        quizHistory[participant].push({
            correct: isCorrect,
            answer: selectedAnswer
        });
    });

    // 4. Soru İlerletme
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        createParticipantInputs(); 
        displayQuestion();
        document.getElementById('total-questions').textContent = questions.length;
    } else {
        // 5. Sonuç Ekranı
        showResults();
    }
}

// Sonuçları gösteren fonksiyon (Kazanan Vurgulama ve Eşit Sıralama)
function showResults() {
    document.getElementById('quiz-page').style.display = 'none';
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'block';

    let resultHTML = '<h2>✨ Rusta Quiz Sonuçları - Toplam Puanlar</h2>';
    
    // Puanları sırala ve eşit puanları grupla
    const scoreMap = participants.map(p => ({ name: p, score: scores[p] }));
    scoreMap.sort((a, b) => b.score - a.score);

    const maxScore = scoreMap.length > 0 ? scoreMap[0].score : 0;
    const winners = scoreMap.filter(item => item.score === maxScore && maxScore > 0).map(item => item.name);
    
    // Eşit puanları yan yana gösteren tablo oluşturma
    let currentRank = 1;
    let currentScore = -1;

    resultHTML += '<table><tr><th>Sıra</th><th>Katılımcı(lar)</th><th>Toplam Puan</th></tr>';
    
    for (let i = 0; i < scoreMap.length; i++) {
        const participant = scoreMap[i].name;
        const score = scoreMap[i].score;
        
        if (score !== currentScore) {
            currentScore = score;
            currentRank = i + 1;
        }

        const isWinner = winners.includes(participant);
        const winnerClass = isWinner ? 'winner-row' : '';

        // Aynı puana sahip tüm kullanıcıları bul ve yan yana yaz (sadece ilk kullanıcı için)
        if (i === 0 || scoreMap[i-1].score !== score) {
            const tiedParticipants = scoreMap.filter(item => item.score === score);
            const tiedNames = tiedParticipants.map(item => {
                const isTiedWinner = winners.includes(item.name);
                const nameTrophy = isTiedWinner ? ' 🏆' : '';
                return `<strong>${item.name}</strong>${nameTrophy}`;
            }).join(', ');

            rowHTML = `<tr class="${winnerClass}"><td>${currentRank}.</td><td>${tiedNames}</td><td>${score} Puan</td></tr>`;
            resultHTML += rowHTML;

            i += tiedParticipants.length - 1;
        }
    }
    
    resultHTML += '</table>';
    
    // Doğru/Yanlış Matrisi
    resultHTML += '<h3>Doğru/Yanlış Detay Matrisi</h3>';
    resultHTML += '<p class="note-info">Yeşil Tik (✅): Doğru Cevap | Kırmızı Çarpı (❌): Yanlış Cevap | Turuncu (🚫): Cevap Yok</p>';
    resultHTML += '<div class="matrix-container">';
    resultHTML += '<table class="result-matrix"><thead><tr><th>Katılımcı</th>';
    
    // Başlık satırı: Soru numaraları
    for (let i = 1; i <= questions.length; i++) {
        resultHTML += `<th>S${i}</th>`;
    }
    resultHTML += '</tr></thead><tbody>';

    // Veri satırları
    participants.forEach(participant => {
        const isWinner = winners.includes(participant);
        const participantNameCell = isWinner ? `<strong>${participant}</strong>` : participant;
        
        resultHTML += `<tr><td>${participantNameCell}</td>`;
        
        // Her soru için ✅, ❌ veya 🚫 koy
        quizHistory[participant].forEach(item => {
            let icon = '';
            let cellClass = '';
            
            if (item.correct === true) {
                icon = '✅';
                cellClass = 'correct';
            } else if (item.correct === false) {
                icon = '❌';
                cellClass = 'incorrect';
            } else { // NO_ANSWER
                icon = '🚫';
                cellClass = 'no-answer';
            }

            resultHTML += `<td class="${cellClass}">${icon}</td>`;
        });

        resultHTML += '</tr>';
    });

    resultHTML += '</tbody></table></div>';
    
    resultsDiv.innerHTML = resultHTML;
}