import { useState } from 'react';
import styles from './App.module.css';
import ExamSheet from './components/examSheet';
import qt from './questionTypes';

const initialQuestions = [
  {
    type: qt.trueFalse,
    questions: 5,
  },
  {
    type: qt.multiple,
    questions: 4,
    choices: 5,
  },
  {
    type: qt.multiple,
    questions: 6,
    choices: 3,
  },
  {
    type: qt.multiple,
    questions: 4,
    choices: 6,
  },
  {
    type: qt.multiple,
    questions: 3,
    choices: 3,
  },
  {
    type: qt.multiple,
    questions: 5,
    choices: 4,
  },
  {
    type: qt.multiple,
    questions: 3,
    choices: 5,
  },
  {
    type: qt.multiple,
    questions: 5,
    choices: 3,
  },
  {
    type: qt.multiple,
    questions: 5,
    choices: 3,
  },
  {
    type: qt.descriptive,
    criteria: [
      'Treść',
      'Spójność i logika',
      'Zakres środków językowych',
      'Poprawność środków językowych',
    ],
  },
];

function App() {
  const [questions, setQuestions] = useState(initialQuestions);
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>Zbuduj formularz </h1>
      </header>
      <main className={styles.main}>
        <section>
          <h2>Podgląd formularza</h2>
          <ExamSheet questions={questions} setQuestions={setQuestions} />
        </section>
      </main>
    </div>
  );
}

export default App;
