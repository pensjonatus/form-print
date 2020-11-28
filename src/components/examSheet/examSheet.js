import styles from './examSheet.module.css';
import cx from 'classnames';
import qt from '../../questionTypes';

function getLetterAtIndex(index) {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(index);
}

function DescriptiveQuestion({ question, index }) {
  return (
    <table className={styles.descriptive}>
      <thead>
        <tr>
          <th colspan="2">Zad. {index + 1}</th>
        </tr>
      </thead>
      <tbody>
        {question.criteria.map((criterion, key) => (
          <tr className={cx(styles.teacherRow, styles.row)}>
            <th>{criterion}</th>
            <td />
          </tr>
        ))}
        <tr>
          <th>RAZEM</th>
          <td/>
        </tr>
      </tbody>
    </table>
  );
}

function TrueOrFalseQuestion({ question, index }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Zad. {index + 1}</th>
          <th>T</th>
          <th>F</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(question.questions).keys()].map((sq, sqNum) => (
          <tr>
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
    <table>
      <thead>
        <tr>
          <th>Zad. {index + 1}</th>
          {[...Array(question.choices).keys()].map((ch, i) => (
            <th>{getLetterAtIndex(i)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(question.questions).keys()].map((sq, sqNum) => (
          <tr>
            <th>{`${index + 1}.${sqNum + 1}`}</th>
            {[...Array(question.choices).keys()].map((ch, i) => (
              <td>
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

  return <div className={styles.question}>{questionDisplay}</div>;
}

export default function ExamSheet({ questions }) {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.formTitle}>
        KARTA ODPOWIEDZI do matury wstępnej z języka angielskiego (poziom
        podstawowy) – grudzień 2020
      </div>
      <div className={styles.formHeader}>
        <div className={styles.codes}>
          <div>
            <div>KOD</div>
            <div className={styles.boxes}>
              {[...Array(3).keys()].map((i) => (
                <div key={i} className={styles.box} />
              ))}
            </div>
          </div>
          <div>
            <div>PESEL</div>
            <div className={styles.boxes}>
              {[...Array(11).keys()].map((i) => (
                <div key={i} className={styles.box} />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.sticker}>Miejsce na naklejkę z nr PESEL</div>
      </div>
      <div className={styles.formBody}>
        {questions &&
          questions.map((question, key) => (
            <Question question={question} index={key} />
          ))}
      </div>
    </div>
  );
}
