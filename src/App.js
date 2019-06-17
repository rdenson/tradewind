import React from 'react';
import { CSSTransition } from 'react-transition-group';
//import logo from './logo.svg';
//import cardTop from './card-top.jpg';
import './css/App.css';


/*class AnswerControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 0};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    const TEST = {
            height: '400px'
          },
          TEST_RANGE = {
            transform: 'rotate(270deg)',
            scrollBehavior: 'smooth'
          };

    return (
      <div style={TEST}>
        <input type="range"
          className="w-1/4 bg-teal-200 appearance-none rounded-full shadow-slider outline-none"
          style={TEST_RANGE}
          min="0"
          max="3"
          step="1"
          value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  }
}*/

function ScreenerFooter(props) {
  const LOCAL_STYLE = {
          borderTop: '1px solid #a0aec0'
        };

  return (
    <div className="mt-8 mx-8 p-2 text-gray-500" style={LOCAL_STYLE}>
      {props.formName}
    </div>
  );
}

class AnswerControl extends React.Component {
  render() {
    return (
      <input
        className="as-range appearance-none outline-none"
        type="range"
        value={this.props.value}
        min="0"
        max="3"
        onChange={(e) => this.props.listener(e)}
      />
    );
  }
}

class ScreenerControl extends React.Component {
  render() {
    return (
      <div className="flex mt-40 items-center justify-around">
        <button
          className="w-32 border-2 border-gray-500 text-gray-700 focus:border-red-500 focus:outline-none font-bold py-2 px-4 rounded"
          type="button"
          onClick={() => this.props.doAction('cancel')}
        >
        Cancel
        </button>
        <button
          className="w-32 bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={() => this.props.doAction('next')}
        >
        Next
        </button>
      </div>
    );
  }
}

class ScreenerQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.answerListener = this.answerListener.bind(this);
    this.choices = [
      {
        "text": "not at all",
        "value": 0
      },{
        "text": "several days",
        "value": 1
      },{
        "text": "more than half the days",
        "value": 2
      },{
        "text": "nearly every day",
        "value": 3
      }
    ];
    this.qitr = 0;
    this.questions = [
      "Feeling nervous, anxious or on edge",
      "Not being able to stop or control worrying",
      "Worrying too much about different things",
      "Trouble relaxing",
      "Being so restless that it is hard to sit still",
      "Becoming easily annoyed or irritable",
      "Feeling afraid as if something awful might happen"
    ];

    this.state = {
      answerValue: 0,
      header: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
      qitr: 0,
      questionTransitioning: false
    };
  }

  handleAction(action) {
    let qitrNext = this.state.qitr + 1;

    //"next" question (button)
    if( action === 'next' ){
      //need to make sure we can fetch another question
      if( qitrNext < this.questions.length ){
        //TODO: save before updating state
        this.setState({
          questionTransitioning: true
        });
        setTimeout(() => {
          this.setState({
            answerChoice: this.choices[0].text,
            answerValue: 0,
            qitr: qitrNext,
            questionTransitioning: false
          });
        }, 300);
      } else{
        console.log('redirect to completion screen');
      }
    } else{
      //"cancel" screener (button)
      console.log('redirect to beginning screen');
    }
  }

  answerListener(e) {
    this.setState({
      answerChoice: this.choices[e.target.value].text,
      answerValue: e.target.value
    });
  }

  render() {
    const answerText = this.choices[this.state.answerValue].text,
          questionText = this.questions[this.state.qitr],
          questionHeader = this.state.header;

    return (
      <div>
        <div className="max-w h-auto rounded overflow-hidden shadow-lg m-4 bg-orange-200">
          <div className="px-4 py-2 text-left text-gray-700 text-xl">
            {questionHeader}
          </div>
        </div>
        <CSSTransition
          in={this.state.questionTransitioning}
          timeout={300}
          classNames="question-swipe"
        >
        <div className="flex flex-row p-4">
          <div className="flex flex-col">
            <div className="px-6 py-4 text-left text-indigo-600 text-lg capitalize">
              {questionText}
            </div>
            <div className="mt-4 text-purple-800"><strong>{answerText}</strong></div>
          </div>
          <AnswerControl listener={this.answerListener} value={this.state.answerValue}/>
        </div>
        </CSSTransition>
        <ScreenerControl doAction={(a) => this.handleAction(a)} />
      </div>
    );
  }
}

/*const duration = 500;
const defaultStyle = {
  transition: `all ${duration}ms ease-in`,
  opacity: 1,
}

const transitionStyles = {
  entering: { opacity: 0.3 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};
const Fade = ({ in: inProp }) => (
  <Transition in={inProp} timeout={duration}>
    {state => (
      <div className="bg-blue-700 text-white" style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        I'm a fade Transition!
      </div>
    )}
  </Transition>
);*/

function App() {
  return (
    <div className="App">
      <ScreenerQuestion />
      <ScreenerFooter formName="GAD-7"/>
    </div>
  );
}

export default App;
