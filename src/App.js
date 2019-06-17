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
  constructor(props) {
    super(props);
    this.state = {value: 0};
    this.bulletRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    //let sliderValue = event.target.value;
    this.setState({value: event.target.value});
  }

  render() {
    const currval = this.state.value;

    /*return (
      <div className="bg-red-700 px-10">
        <div className="range-slider">
          <span id="rs-bullet" className="rs-label" ref={this.bulletRef}>{currval}</span>
          <input id="rs-range-line"
            className="rs-range"
            type="range"
            value={currval}
            min="0"
            max="200"
            onChange={this.handleChange}
          />
        </div>
        <div className="box-minmax">
          <span>0</span><span>200</span>
        </div>
      </div>
    );*/
    return (
      <div className="flex flex-col h-64">
        <div className="border-dashed border-4 border-black">
          <input
            className="as-range appearance-none outline-none"
            type="range"
            value={currval}
            min="0"
            max="4"
            onChange={this.handleChange}
          />
        </div>
        <div ref={this.bulletRef}>{currval}</div>
      </div>
    );
  }
}

class ScreenerControl extends React.Component {
  render() {
    return (
      <div className="md:flex md:items-center mt-16">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
          className="w-32 border-2 border-green-500 text-gray-700 focus:border-red-500 focus:outline-none font-bold py-2 px-4 rounded"
          type="button"
          onClick={() => this.props.doAction('cancel')}
          >
          Cancel
          </button>
          <button
            className="w-32 mr-4 bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => this.props.doAction('next')}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

class ScreenerQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      header: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
      question: 'Feeling nervous, anxious or on edge',
      choices: [
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
      ],
      questionTransitioning: false
    };
  }

  handleAction(action) {
    if( action === 'next' ){
      this.setState({
        questionTransitioning: true
      });
      setTimeout(() => {
        this.setState({
          question: 'Not being able to stop or control worrying',
          questionTransitioning: false
        });
      }, 300);
    }
  }

  render() {
    const ANSWER_SLIDER = {
            top: 0,
            position: 'relative',
            height: '100%',
            minHeight: '16rem',
            'touchAction': 'pan-y'
          },
          ANSWER_HANDLE = {
            top: '210px',
            left: '-0.75rem',
            position: 'absolute',
          };
    const questionText = this.state.question,
          questionChoices = this.state.choices,
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
            <div className="mt-4 text-purple-800"><strong>{questionChoices[0].text}</strong></div>
          </div>
          <div className="flex flex-row w-20">
            <div className="flex flex-col w-1/5">
              <div className="w-4 bg-teal-200 rounded-full shadow-slider" style={ANSWER_SLIDER}>
                <div className="h-6 w-10 bg-gray-500 rounded shadow-2xl" style={ANSWER_HANDLE}></div>
              </div>
            </div>
            <div className="flex flex-col-reverse w-4/5 text-left text-gray-800">
              <div className="flex-1"><p className="mt-4 pl-2">––</p></div>
              <div className="flex-1"><p className="mt-4 pl-2">––</p></div>
              <div className="flex-1"><p className="mt-4 pl-2">––</p></div>
              <div className="flex-1"><p className="mt-4 pl-2">––</p></div>
            </div>
          </div>
        </div>
        </CSSTransition>
        <AnswerControl />
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
