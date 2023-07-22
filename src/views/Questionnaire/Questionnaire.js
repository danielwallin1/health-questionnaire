import React, { useState, useEffect } from "react";
import Button from '../../components/atoms/Button/Button';
import RadioWithLabel from '../../components/molecules/RadioWithLabel/RadioWithLabel';
import Heading from '../../components/atoms/Heading/Heading';
import styles from './Questionnaire.module.css';

export default function Questionnaire({ data }) {
  const [questionId, setQuestionId] = useState(data.questions[0].id);
  const [answer, setAnswer] = useState(null);
  const [scores, setScores] = useState([]);
  const [score, setScore] = useState();
  const [outcome, setOutcome] = useState()
  const [isOutcome, setIsOutcome] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  useEffect(() => {
    setScores(Object.assign(scores, {[questionId]: score}));
    setIsActive(scores[questionId] != null);
    handleSummary();
  }, [answer])

  function getQuestion() {
    return data.questions.filter(item => item.id === questionId)[0];
  }

  function handleSelection(id, value) {
    setAnswer(id);
    setScore(value);
  }

  function handleQuestionId(answer) {
    let id = '';
    const question = getQuestion();

    question?.next.map(item => {
      if (item.hasOwnProperty('answered')) {
        if (item.answered === answer) {
          id = item?.next_question;
        }
      } else {
        id = item?.next_question;
      }
    })
    setQuestionId(id);
  }

  function handleOutcome() {
    let sum = 0;
    let id = '';
    const values = Object.values(scores);
    const question = getQuestion(questionId);

    values.map(element => sum += element)
    
    question.next.forEach(item => {
      if (item.hasOwnProperty('max_score')) {
        if (item['max_score'] >= sum && !id) {
          id = item.outcome;
        }
      } else {
        if (!id) {
          id = item.outcome;
        }
      }
    })

    const outcome = data.outcomes.filter(item => item.id === id)[0];
    setOutcome(outcome);
  }

  function handleRewind() {
    if (Object.keys(scores).length > 1) {
      const keys = Object.keys(scores);
      delete scores[questionId]
      setQuestionId(keys[keys.length -2]);
    }
  }

  function handleForward() {
    if (!isLastQuestion) {
      setAnswer(null);
      setScore(null);
      handleQuestionId(answer);
    } else {
      handleOutcome();
      setIsOutcome(true);
    }
  }

  function handleSummary() {
    const question = getQuestion();
    const hasOutcome = question?.next.map(item => item.hasOwnProperty('outcome'));
    setIsLastQuestion(hasOutcome?.includes(true));
  }

  function handleReset() {
    setQuestionId(data.questions[0].id);
    setIsOutcome(false);
    setAnswer(null);
    setScores([]);
    setScore(null);
  }

  function renderOptions() {
    const question = getQuestion(questionId);

    return question?.answers.map((item, i) => {
        return (
          <RadioWithLabel
            id={item.id}
            item={item}
            key={i}
            value={item.score}
            handleSelection={handleSelection}
            checked={answer}
            text={item.label} />
        )
      })
  }

  function renderOutcome() {
    return (
      <div className={styles['summary-text']}>
        <h1 className={styles.thankyou} >Thank you for answering the questions!</h1>
        <p>{outcome?.text}</p>
        {outcome?.show_booking_button &&
          <div className={styles['meeting-btn']}>
            <Button text="Book a metting" />
          </div>
        } 
        <p className={styles.restart} onClick={handleReset}>Back to the start screen</p>
      </div>
    )
  }

  return (
    <React.Fragment>
      <header className={styles.header}>
        {!isOutcome && Object.keys(scores).length > 1 &&
          <p className={styles['rewind-btn']} onClick={handleRewind}>&#10094;</p>
        }
        <Heading text="Heartburn Checker" size="24px" />
      </header>
      <section className={styles.container}>
        <div className={styles.question}>
          {!isOutcome &&
            <div>
              <p className={styles.step}>Step {Object.keys(scores).length ? Object.keys(scores).length : 1 }</p>
              <Heading text={getQuestion(questionId)?.question_text} size="20px" />
            </div>
          }   
        </div>
        <div className={styles.options}>
          {!isOutcome ? renderOptions() : renderOutcome()}
        </div>
        {!isOutcome &&
          <div className={isActive ? styles['forward-btn'] : styles['forward-btn--disabled']}>
            <Button
              isActive={isActive}
              clickHandler={handleForward}
              text="Next" />
          </div>
        }
      </section>
    </React.Fragment>
  )
} 