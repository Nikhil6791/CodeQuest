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
    prompt: "Which instruction stops the robot from reaching its goal?",
    goal: "Start facing north. Move north twice, turn right, then move east to the goal.",
    steps: [
      "Move Forward",
      "Move Forward",
      "Turn Right",
      "Turn Left",
      "Move Forward",
    ],
    wrongIndex: 3,
    explanation:
      "After turning right, the robot faces east. Turning left changes it back to north, so it moves away from the goal instead of east.",
  },
  {
    id: 2,
    prompt:
      "Which instruction changes the robot's direction after it reaches the goal?",
    goal: "Start facing north. Turn left, move west, turn left again, then move south to the goal and stop facing south.",
    steps: [
      "Turn Left",
      "Move Forward",
      "Turn Left",
      "Move Forward",
      "Turn Right",
    ],
    wrongIndex: 4,
    explanation:
      "After moving south to the goal, the robot should stop facing south. The final right turn makes it face west instead.",
  },
  {
    id: 3,
    prompt: "Which instruction turns the robot away from its goal?",
    goal: "Start facing north. Move north, turn right, move east, then continue east to the goal.",
    steps: [
      "Move Forward",
      "Turn Right",
      "Move Forward",
      "Turn Left",
      "Move Forward",
    ],
    wrongIndex: 3,
    explanation:
      "After moving east, the robot should keep facing east. Turning left points it north, so the last move misses the goal.",
  },
  {
    id: 4,
    prompt: "Which extra instruction makes the robot face away from its goal?",
    goal: "Start facing north. Move north twice, turn right, then move east to the goal and stop facing east.",
    steps: [
      "Move Forward",
      "Move Forward",
      "Turn Right",
      "Move Forward",
      "Turn Right",
    ],
    wrongIndex: 4,
    explanation:
      "After moving east to the goal, the robot should still face east. The final right turn makes it face south instead.",
  },
  {
    id: 5,
    prompt:
      "Which instruction turns the robot away before it reaches the goal?",
    goal: "Start facing north. Turn right, move east three times, and reach the goal while facing east.",
    steps: [
      "Turn Right",
      "Move Forward",
      "Move Forward",
      "Turn Left",
      "Move Forward",
    ],
    wrongIndex: 3,
    explanation:
      "After moving east twice, the robot should keep facing east for the last move. Turning left points it north, away from the goal.",
  },
];
