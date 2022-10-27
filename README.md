# QuizApp

### How to run this project:
1. Clone this project.
2. run `yarn`
3. run `pod install` then open `ios/QuizApp.xcworkplace` on Xcode (iOS) / `android` on Android studio
4. run `yarn start`
5. run `yarn android`/`yarn ios`

### Requirements

- [x] the screen is divided into two parts - top (white) and bottom (blue)
- [x] on the top part there’s a header with the question text and small description
- [x] on the bottom part there’s answer picker and „next” button
- [x] by default the question displays array of possible answers as checkbox or radio group on the bottom part
- [x] each question CAN (but doesn’t have to) have custom answer component that, based on particular question config, can be displayed instead of default checkbox/radio group
- [x] each question CAN (but doesn’t need to) have custom validity check, custom initial value, if those are not defined, they fall back to default
- [x] at the end there’s summary step that displays list of all questions and its answers
- [x] in each answer listed in the summary there’s link to go back to that particular question and change the answer
- [x] after you go back to question from summary, edit the answer and click „next”, it takes you back to the summary
- [x] there are questions that are only present if other question has particular value. example:
      question A: do you have a dog? yes/no
      1. if the answer to question A is yes - there’s question B - what’s your dog’s name
      2. is the answer to question A is no - there’s no question B
      
### Figma link: https://www.figma.com/file/Q9nvcS0xlMkysEeUZCg2De/Question?node-id=9%3A155


### Improvement:
- [ ] Add test
