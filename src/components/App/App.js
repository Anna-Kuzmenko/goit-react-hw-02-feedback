import React, { Component } from "react";
import Section from "../Section/";
import FeedbackOptions from "../FeedbackOptions/";
import Statistics from "../Statistics/";
import Notification from "../Notification/";

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  optionKeys = Object.keys(this.state);

  handleFeedBackAdd = (option) => {
    this.setState((prevState) => ({ [option]: prevState[option] + 1 }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { good, neutral, bad } = this.state;
    return Math.round((good / (good + neutral + bad)) * 100);
  };

  render() {
    const { good, neutral, bad } = this.state;

    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={this.optionKeys}
            onLeaveFeedback={this.handleFeedBackAdd}
          />
        </Section>

        {this.countTotalFeedback() === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Section title="Statistics">
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          </Section>
        )}
      </div>
    );
  }
}

export default App;
