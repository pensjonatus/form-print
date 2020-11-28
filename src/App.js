import { useState, useRef } from 'react';
import styles from './App.module.css';
import ExamSheet from './components/examSheet';
import qt from './questionTypes';
import ReactToPrint from 'react-to-print';

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

function PrintButton({ sheetRef }) {
  return (
    <ReactToPrint
      trigger={() => <button>Wydrukuj</button>}
      content={() => sheetRef.current}
    />
  );
}

function App() {
  const [questions, setQuestions] = useState(initialQuestions);
  const sheetRef = useRef();
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>Zbuduj formularz </h1>
      </header>
      <main className={styles.main}>
        <PrintButton sheetRef={sheetRef} />
        <div ref={sheetRef}>
          <ExamSheet questions={questions} setQuestions={setQuestions} />
        </div>
        <PrintButton sheetRef={sheetRef} />
      </main>
    </div>
  );
}

export default App;
