import { useState, useRef } from 'react';
import styles from './App.module.css';
import ExamSheet from './components/examSheet';
import qt from './questionTypes';
import ReactToPrint from 'react-to-print';

const initialQuestions = [
  {
    id: 'reardon342',
    type: qt.trueFalse,
    questions: 5,
  },
  {
    id: 'mcmillan5423',
    type: qt.multiple,
    questions: 4,
    choices: 5,
  },
  {
    id: 'papa9542',
    type: qt.multiple,
    questions: 6,
    choices: 3,
  },
  {
    id: 'slime237',
    type: qt.multiple,
    questions: 4,
    choices: 6,
  },
  {
    id: 'majestic12',
    type: qt.multiple,
    questions: 3,
    choices: 3,
  },
  {
    id: 'bluebook1',
    type: qt.multiple,
    questions: 5,
    choices: 4,
  },
  {
    id: 'thelema',
    type: qt.multiple,
    questions: 3,
    choices: 5,
  },
  {
    id: 'creditCardNumber',
    type: qt.multiple,
    questions: 5,
    choices: 3,
  },
  {
    id: 'bezpiecznik4',
    type: qt.multiple,
    questions: 5,
    choices: 3,
  },
  {
    id: 'poetry3',
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
      trigger={() => (
        <div className={styles.buttonWrapper}>
          <button className={styles.printButton}>Wydrukuj</button>
        </div>
      )}
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
        <h1>Karta odpowiedzi</h1>
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
