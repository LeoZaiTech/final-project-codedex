import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import Header from './components/header';
import { useState } from 'react';
import UserForm from './components/UserForm';
import Question from './components/Question';

const questions = [

  {
    question: "What's your favorite color?",
    options: [ ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],]

  },
  {
    question: "Pick a season:",
    options: [ ["Spring 🌸", "Summer ☀️", "Autumn 🍂", "Winter ❄️"],]

  },

  {

    question: "Ideal weekend?",
    options:  ["Adventure 🏔️", "Beach trip 🏖️", "Forest hike 🌲", "Stargazing ✨"],
  },
  {
    question:"your vibe?",
     options: ["Bold 🔥", "Calm 💧", "Grounded 🪨", "Free 🪁"],
  },
];

const keywords ={
  Fire: "fire",
  Water: "water",
  Earth: "earth",
  Air: "air",
};


const elements = {
 "Red 🔴": "Fire",
  "Blue 🔵": "Water",
  "Green 🟢": "Earth",
  "Yellow 🟡": "Air",
  "Summer ☀️": "Fire",
  "Winter ❄️": "Water",
  "Spring 🌱": "Earth",
  "Fall 🍂": "Air",
  "Adventure 🏔️": "Fire",
  "Beach trip 🏖️": "Water",
  "Forest hike 🌲": "Earth",
  "Stargazing ✨": "Air",
  "Bold 🔥": "Fire",
  "Calm 💧": "Water",
  "Grounded 🪨": "Earth",
  "Free 🪁": "Air",
};




function App() {
     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
     const [answers, setAnswers] = useState([]);
     const [element, setElement] = useState("");
     const [artwork, setArtwork] = useState(null);

     function handleAnswer(answer) {
      setAnswers([...answers, answer]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
     }

     function determineElement(answer) {
      const counts = {};
      answer.forEach(function (answer) {
        const elementName = elements[answer];
        counts[elementName] = (counts[elementName] || 0) +1;
      });
     }

  
  return (
  <UserProvider>
    <Header/>
    <Routes>
      <Route path="/" element={<p>Home placeholder</p>} />
      <Route path="/quiz" element={currentQuestionIndex < questions.length ? (
        <Question
        question={questions[currentQuestionIndex].question}
        options={questions[currentQuestionIndex].options}
        onAnswer={handleAnswer}
       /> 
      ) : (
          <p>Quiz complete!</p>

      )
    }
    />
      </Routes>
  </UserProvider>
  );
}

export default App;