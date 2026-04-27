import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import Header from './components/header';
import UserForm from './components/UserForm';
import Question from './components/Question';

const questions = [
  {
    question: "What's your favorite color?",
    options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
  },
  {
    question: "Pick a season:",
    options: ["Summer ☀️", "Winter ❄️", "Spring 🌱", "Fall 🍂"],
  },
  {
    question: "Ideal weekend?",
    options: ["Adventure 🏔️", "Beach trip 🏖️", "Forest hike 🌲", "Stargazing ✨"],
  },
  {
    question: "Your vibe?",
    options: ["Bold 🔥", "Calm 💧", "Grounded 🪨", "Free 🪁"],
  },
];

const keywords = {
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

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function (answer) {
      const elementName = elements[answer];
      counts[elementName] = (counts[elementName] || 0) + 1;
    });
    return Object.keys(counts).reduce(function (a, b) {
      return counts[a] > counts[b] ? a : b;
    });
  }

  async function fetchArtwork(keyword) {
    try {
      const searchRes = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${keyword}`
      );
      if (!searchRes.ok) throw new Error("Search failed");
      const searchData = await searchRes.json();

      if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
        setArtwork(null);
        return;
      }

      const randomId = searchData.objectIDs[Math.floor(Math.random() * searchData.objectIDs.length)];

      const objectRes = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`
      );
      if (!objectRes.ok) throw new Error("Object fetch failed");
      const objectData = await objectRes.json();

      setArtwork(objectData);
    } catch (err) {
      console.log("Artwork fetch error:", err);
      setArtwork(null);
    }
  }

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route
          path="/quiz"
          element={
            currentQuestionIndex < questions.length ? (
              <Question
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                onAnswer={handleAnswer}
              />
            ) : (
              <div>
                <p>Quiz complete! Element: {element}</p>
                {artwork && (
                  <div>
                    <h3>{artwork.title}</h3>
                    <img src={artwork.primaryImage} alt={artwork.title} width="300" />
                  </div>
                )}
              </div>
            )
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;