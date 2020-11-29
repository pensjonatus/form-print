import { useEffect, useState } from 'react';
import styles from './examSheet.module.css';
import cx from 'classnames';
import qt from '../../questionTypes';

function getLetterAtIndex(index) {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(index);
}

function DescriptiveQuestion({ question, index }) {
  return (
    <table key={index}>
      <thead>
        <tr>
          <th colSpan="2">Zad. {index + 1}</th>
        </tr>
      </thead>
      <tbody>
        {question.criteria.map((criterion, key) => (
          <tr className={cx(styles.teacherRow, styles.row)} key={key}>
            <th>{criterion}</th>
            <td />
          </tr>
        ))}
        <tr>
          <th>RAZEM</th>
          <td />
        </tr>
      </tbody>
    </table>
  );
}

function TrueOrFalseQuestion({ question, index }) {
  return (
    <table key={index}>
      <thead>
        <tr>
          <th>Zad. {index + 1}</th>
          <th>T</th>
          <th>F</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(question.questions).keys()].map((sq, sqNum) => (
          <tr key={sqNum}>
            <th>{`${index + 1}.${sqNum + 1}`}</th>
            <td>
              <span className={styles.answer}>T</span>
            </td>
            <td>
              <span className={styles.answer}>F</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MultipleChoiceQuestion({ question, index }) {
  return (
    <table key={index}>
      <thead>
        <tr>
          <th>Zad. {index + 1}</th>
          {[...Array(question.choices).keys()].map((ch, i) => (
            <th key={i}>{getLetterAtIndex(i)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(question.questions).keys()].map((sq, sqNum) => (
          <tr key={sqNum}>
            <th>{`${index + 1}.${sqNum + 1}`}</th>
            {[...Array(question.choices).keys()].map((ch, i) => (
              <td key={i}>
                <span className={styles.answer}>{getLetterAtIndex(i)}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Question({ question, index }) {
  let questionDisplay = (
    <MultipleChoiceQuestion question={question} index={index} />
  );
  if (question.type === qt.trueFalse) {
    questionDisplay = <TrueOrFalseQuestion question={question} index={index} />;
  }
  if (question.type === qt.descriptive) {
    questionDisplay = <DescriptiveQuestion question={question} index={index} />;
  }

  return (
    <div className={styles.question} key={index}>
      {questionDisplay}
    </div>
  );
}

function BoxFill({ label, numberOfBoxes }) {
  return (
    <div>
      <div>{label}</div>
      <div className={styles.boxes}>
        {[...Array(numberOfBoxes).keys()].map((i) => (
          <div key={i} className={styles.box} />
        ))}
      </div>
    </div>
  );
}

function TypeSelect({ selected }) {
  return (
    <label>
      <span>typ:</span>
      <select defaultValue={selected}>
        {Object.keys(qt).map((questionType, i) => (
          <option key={i}>{qt[questionType]}</option>
        ))}
      </select>
    </label>
  );
}

function FieldControl({ question, propName }) {
  const initialValue = question[propName];
  const [value, setValue] = useState(initialValue);

  useEffect(
    function () {
      question[propName] = value;
    },
    [value, propName, question]
  );

  let control = null;
  if (propName === 'type') {
    control = (
      <label>
        <span>typ:</span>
        <select value={value} onChange={(e) => setValue(e.target.value)}>
          {Object.keys(qt).map((questionType, i) => (
            <option key={i}>{qt[questionType]}</option>
          ))}
        </select>
      </label>
    );
  }

  if (!isNaN(value)) {
    control = (
      <label>
        <input
          type="number"
          step="1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
    );
  }
  return (
    <div className={styles.questionProp}>
      <div style={{ color: 'gray', fontSize: '60%' }}>
        {propName}: {value}
      </div>
      {control}
    </div>
  );
}

function QuestionEditor({ question, children, setQuestions }) {
  return (
    <div className={styles.editable}>
      <div className={styles.editor}>
        {Object.keys(question).map((propName, key) => (
          <FieldControl
            question={question}
            propName={propName}
            key={key}
            setQuestions={setQuestions}
          />
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function ExamSheet({ questions, setQuestions }) {
  const studentQuestions = questions.filter((q) => q.type !== qt.descriptive);
  const teacherQuestions = questions.filter((q) => q.type === qt.descriptive);
  return (
    <div className={styles.sheetWrapper}>
      <div className={styles.sheetTitle}>
        KARTA ODPOWIEDZI do matury wstępnej z języka angielskiego (poziom
        podstawowy) – grudzień 2020
      </div>
      <div className={styles.formHeader}>
        <div className={styles.codes}>
          <BoxFill label="KOD" numberOfBoxes={3} />
          <BoxFill label="PESEL" numberOfBoxes={11} />
        </div>
        <div className={styles.sticker}>Miejsce na naklejkę z nr PESEL</div>
      </div>
      <div className={styles.questions}>
        <div>
          <div className={styles.sectionHeader}>WYPEŁNIA ZDAJĄCY</div>
          {studentQuestions &&
            studentQuestions.map((question, key) => (
              <QuestionEditor
                question={question}
                key={key}
                setQuestions={setQuestions}
              >
                <Question question={question} index={key} key={key} />
              </QuestionEditor>
            ))}
        </div>
        <div className={styles.descriptive}>
          <div className={styles.sectionHeader}>WYPEŁNIA NAUCZYCIEL</div>
          {teacherQuestions &&
            teacherQuestions.map((question, key) => (
              <QuestionEditor
                question={question}
                key={key}
                setQuestions={setQuestions}
              >
                <Question
                  question={question}
                  index={key + studentQuestions.length}
                  key={key}
                />
              </QuestionEditor>
            ))}
        </div>
      </div>
    </div>
  );
}
