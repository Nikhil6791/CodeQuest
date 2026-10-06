export const sequenceQuestions = [
  {
    id: 1,
    prompt: "How do you brush your teeth?",
    steps: [
      "Wake up",
      "Wet toothbrush",
      "Put toothpaste",
      "Brush your teeth",
      "Rinse",
    ],
    correctAnswer: [
      "Wake up",
      "Wet toothbrush",
      "Put toothpaste",
      "Brush your teeth",
      "Rinse",
    ],
    explanation:
      "The steps must happen in the correct order to clean your teeth well.",
  },
  {
    id: 2,
    prompt: "How do you make a sandwich?",
    steps: [
      "Put bread on the plate",
      "Add filling",
      "Close the sandwich",
      "Cut it",
      "Eat it",
    ],
    correctAnswer: [
      "Put bread on the plate",
      "Add filling",
      "Close the sandwich",
      "Cut it",
      "Eat it",
    ],
    explanation:
      "You need the bread and filling first before you can enjoy the sandwich.",
  },
  {
    id: 3,
    prompt: "What is the correct order to pack a bag?",
    steps: [
      "Pack your notebook",
      "Put in your lunchbox",
      "Pick up your bag",
      "Zip it closed",
    ],
    correctAnswer: [
      "Pick up your bag",
      "Pack your notebook",
      "Put in your lunchbox",
      "Zip it closed",
    ],
    explanation:
      "First choose the bag, then add the things you need, and finally close it.",
  },
];

export const ifElseQuestions = [
  {
    id: 1,
    prompt: "🌧️ It is raining. What should the robot do?",
    options: ["Take an umbrella", "Wear sunglasses"],
    correctAnswer: "Take an umbrella",
    explanation:
      "Because the condition is true, the robot should take an umbrella.",
  },
  {
    id: 2,
    prompt: "🚦 The traffic light is red. What should the robot do?",
    options: ["Go", "Stop"],
    correctAnswer: "Stop",
    explanation: "A red light means the robot must stop.",
  },
  {
    id: 3,
    prompt: "🌡️ The room is very hot. What should happen?",
    options: ["Turn on the fan", "Turn off the fan"],
    correctAnswer: "Turn on the fan",
    explanation: "When it is hot, the fan helps cool the room.",
  },
  {
    id: 4,
    prompt: "🔋 The battery is low. What should the robot do?",
    options: ["Charge the battery", "Keep moving without charging"],
    correctAnswer: "Charge the battery",
    explanation: "Low battery means the robot needs a charge.",
  },
  {
    id: 5,
    prompt: "🚪 The door is locked. What should the robot do?",
    options: ["Use the key", "Open it without a key"],
    correctAnswer: "Use the key",
    explanation: "A locked door needs the key before it opens.",
  },
];

export const loopChallenges = [
  {
    id: 1,
    prompt:
      "The robot needs to move forward 5 times. What number should go in the loop?",
    options: [2, 4, 5, 8],
    correctAnswer: 5,
    explanation: "The loop must repeat the action 5 times.",
  },
  {
    id: 2,
    prompt: "The robot must jump 3 times. How many times should it repeat?",
    options: [3, 6, 9, 1],
    correctAnswer: 3,
    explanation:
      "Repeating the jump 3 times makes the robot jump exactly 3 times.",
  },
  {
    id: 3,
    prompt: "The robot needs to clap 4 times. Choose the right value.",
    options: [1, 4, 7, 10],
    correctAnswer: 4,
    explanation: "The loop count matches the number of actions required.",
  },
];

export const debugQuestions = [
  {
    id: 1,
    prompt: "Which instruction is wrong?",
    steps: [
      "Move Forward",
      "Move Forward",
      "Turn Right",
      "Turn Left",
      "Move Forward",
    ],
    wrongIndex: 3,
    explanation:
      "Instruction 4 changed the robot in the wrong direction, so it missed the goal.",
  },
  {
    id: 2,
    prompt: "Which step causes the problem?",
    steps: [
      "Turn Left",
      "Move Forward",
      "Turn Left",
      "Move Forward",
      "Turn Right",
    ],
    wrongIndex: 4,
    explanation: "The final turn makes the robot face the wrong direction.",
  },
  {
    id: 3,
    prompt: "Find the bug in this path:",
    steps: [
      "Move Forward",
      "Turn Right",
      "Move Forward",
      "Turn Left",
      "Move Forward",
    ],
    wrongIndex: 3,
    explanation:
      "Turning left instead of right sends the robot away from the goal.",
  },
  {
    id: 4,
    prompt: "Which instruction should be changed?",
    steps: [
      "Move Forward",
      "Move Forward",
      "Turn Right",
      "Move Forward",
      "Turn Right",
    ],
    wrongIndex: 4,
    explanation:
      "The last turn changes direction when the robot should continue straight.",
  },
  {
    id: 5,
    prompt: "Detect the problem in this plan:",
    steps: [
      "Turn Right",
      "Move Forward",
      "Move Forward",
      "Turn Left",
      "Move Forward",
    ],
    wrongIndex: 3,
    explanation:
      "A left turn after moving forward changes the path unexpectedly.",
  },
];
