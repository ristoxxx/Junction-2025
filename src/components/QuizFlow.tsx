import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { QuizAnswers } from '../App';
import { ArrowRight, ArrowLeft, HelpCircle, Heart, Smile, Meh, Frown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { AvatarSelector } from './AvatarSelector';
import { Alert, AlertDescription } from './ui/alert';

interface Question {
  id: keyof QuizAnswers;
  question: string;
  helpText?: string;
  options: { value: string; label: string; description?: string }[];
}

const questions: Question[] = [
  {
    id: 'age',
    question: "How old are you?",
    helpText: "This helps us give you advice that fits your stage of life!",
    options: [
      { value: '13-17', label: '13-17 years old', description: 'Middle/High school' },
      { value: '18-25', label: '18-25 years old', description: 'College or starting out' },
      { value: '26-35', label: '26-35 years old', description: 'Building your career' },
      { value: '36+', label: '36+ years old', description: 'Established career' },
    ],
  },
  {
    id: 'income',
    question: "How much money do you earn or receive each year?",
    helpText: "Income means money you get - could be from a job, allowance, gifts, or side gigs. If you're not sure, make your best guess!",
    options: [
      { value: 'none', label: "I don't earn money yet", description: 'No regular income' },
      { value: 'under-15k', label: 'Less than $15,000', description: 'Part-time job or allowance' },
      { value: '15k-40k', label: '$15,000 - $40,000', description: 'First job or entry level' },
      { value: '40k-70k', label: '$40,000 - $70,000', description: 'Growing income' },
      { value: 'over-70k', label: 'Over $70,000', description: 'Established income' },
    ],
  },
  {
    id: 'savings',
    question: 'How much money do you have saved up right now?',
    helpText: "Savings is money you've put aside and aren't planning to spend right away - could be in a piggy bank, savings account, or anywhere safe!",
    options: [
      { value: 'none', label: 'Less than $100', description: "Just getting started - that's okay!" },
      { value: 'small', label: '$100 - $1,000', description: 'Building your safety cushion' },
      { value: 'some', label: '$1,000 - $5,000', description: 'Nice emergency fund started' },
      { value: 'moderate', label: '$5,000 - $15,000', description: 'Solid savings!' },
      { value: 'substantial', label: 'Over $15,000', description: 'Great work!' },
    ],
  },
  {
    id: 'debt',
    question: "Do you owe money to anyone?",
    helpText: "Debt means money you borrowed and need to pay back - like student loans, car loans, or credit cards. It's totally normal!",
    options: [
      { value: 'none', label: "No, I don't owe anything", description: 'Starting fresh' },
      { value: 'low', label: 'A little (under $5,000)', description: 'Small credit card or loan' },
      { value: 'moderate', label: 'Some debt ($5,000 - $30,000)', description: 'Student loans or car loan' },
      { value: 'high', label: 'Quite a bit (over $30,000)', description: 'Multiple loans or large balance' },
    ],
  },
  {
    id: 'goals',
    question: "What do you want to do with your money?",
    helpText: "Pick what feels most important to you right now - you can work on other goals later!",
    options: [
      { value: 'learn', label: 'Learn the basics', description: "I'm just starting to understand money" },
      { value: 'save', label: 'Start saving money', description: 'Build my first emergency fund' },
      { value: 'debt', label: 'Pay off what I owe', description: 'Get rid of my debt' },
      { value: 'big-purchase', label: 'Save for something big', description: 'Car, trip, college, etc.' },
      { value: 'invest', label: 'Grow my money', description: 'Start investing for the future' },
    ],
  },
  {
    id: 'experience',
    question: "How comfortable are you with managing money?",
    helpText: "Be honest - everyone starts somewhere, and there's no wrong answer!",
    options: [
      { value: 'new', label: "I'm brand new to this", description: "Money feels confusing" },
      { value: 'beginner', label: 'Learning the basics', description: "I know a little but want to learn more" },
      { value: 'intermediate', label: 'Pretty comfortable', description: 'I handle my money okay' },
      { value: 'advanced', label: 'Very confident', description: 'I manage my finances well' },
    ],
  },
];

interface QuizFlowProps {
  onComplete: (answers: QuizAnswers) => void;
  mode: 'student' | 'teacher';
}

export function QuizFlow({ onComplete, mode }: QuizFlowProps) {
  const [currentQuestion, setCurrentQuestion] = useState(-1); // Start with avatar selection
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [emotionalState, setEmotionalState] = useState<string>('');
  const [showEncouragement, setShowEncouragement] = useState(false);

  const progress = currentQuestion < 0 ? 0 : ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = currentQuestion >= 0 ? questions[currentQuestion] : null;
  const currentAnswer = currentQ ? answers[currentQ.id] : undefined;

  const encouragementMessages = [
    "You're doing great! Every question brings you closer to financial confidence. 💪",
    "Nice progress! Remember, understanding your money situation is the first step to success. ⭐",
    "Keep going! You're building a foundation that will serve you for life. 🌟",
    "Awesome! Financial literacy is a superpower, and you're unlocking it. 🚀",
  ];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQ!.id]: value });
    
    // Show encouragement every 2 questions
    if ((currentQuestion + 1) % 2 === 0) {
      setShowEncouragement(true);
      setTimeout(() => setShowEncouragement(false), 3000);
    }
  };

  const handleAvatarSelect = (avatar: string) => {
    setAnswers({ ...answers, avatar });
    setCurrentQuestion(0);
  };

  const handleEmotionalCheck = (emotion: string) => {
    setEmotionalState(emotion);
    setAnswers({ ...answers, emotionalState: emotion });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      
      // Emotional check-in at halfway point
      if (currentQuestion === Math.floor(questions.length / 2) - 1) {
        setShowEncouragement(true);
        setTimeout(() => setShowEncouragement(false), 4000);
      }
    } else {
      onComplete(answers as QuizAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentQuestion === 0) {
      setCurrentQuestion(-1);
    }
  };

  const isAnswered = currentAnswer !== undefined;

  // Avatar selection screen
  if (currentQuestion === -1) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-blue-900">SmartStart Money</h1>
          <p className="text-gray-600">
            {mode === 'teacher' 
              ? 'Welcome, educator! Use this tool to help your students build financial confidence.'
              : 'Your journey to financial confidence starts here! 🚀'}
          </p>
        </div>

        <AvatarSelector onSelect={handleAvatarSelect} mode={mode} />

        {mode === 'teacher' && (
          <Alert className="border-blue-200 bg-blue-50">
            <AlertDescription>
              <p className="mb-2">
                <strong>Teacher Tip:</strong> This quiz helps students understand their current financial situation and builds personalized learning paths.
              </p>
              <p className="text-sm">You can use the results to identify common challenges in your classroom and tailor lessons accordingly.</p>
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  }

  // Emotional check-in at halfway point
  if (currentQuestion === Math.floor(questions.length / 2) && !emotionalState) {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-purple-600" />
              Quick Check-In
            </CardTitle>
            <CardDescription>
              How are you feeling about this so far? There's no wrong answer!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2"
                onClick={() => handleEmotionalCheck('confident')}
              >
                <Smile className="h-8 w-8 text-green-500" />
                <span>Feeling good!</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2"
                onClick={() => handleEmotionalCheck('okay')}
              >
                <Meh className="h-8 w-8 text-yellow-500" />
                <span>Doing okay</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2"
                onClick={() => handleEmotionalCheck('nervous')}
              >
                <Frown className="h-8 w-8 text-orange-500" />
                <span>A bit nervous</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2"
                onClick={() => handleEmotionalCheck('confused')}
              >
                <HelpCircle className="h-8 w-8 text-blue-500" />
                <span>Confused</span>
              </Button>
            </div>
            
            {mode !== 'teacher' && (
              <Alert className="bg-blue-50 border-blue-200">
                <AlertDescription>
                  💙 Remember: Everyone starts somewhere! It's totally normal to feel unsure about money stuff. 
                  The fact that you're here learning means you're already ahead of the game.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-blue-900">Your Money Starter Kit</h1>
        <p className="text-gray-600">
          Take this quick quiz to get personalized money tips just for you! 🚀
        </p>
      </div>

      {showEncouragement && (
        <Alert className="border-green-200 bg-green-50 animate-in fade-in slide-in-from-top-2">
          <AlertDescription className="text-center">
            {encouragementMessages[currentQuestion % encouragementMessages.length]}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <CardDescription>
                Question {currentQuestion + 1} of {questions.length}
              </CardDescription>
              <span className="text-blue-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>
          <div className="pt-4 flex items-start gap-2">
            <CardTitle className="flex-1">{currentQ!.question}</CardTitle>
            {currentQ!.helpText && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="flex-shrink-0 text-blue-500 hover:text-blue-600">
                      <HelpCircle className="h-5 w-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{currentQ!.helpText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={currentAnswer} onValueChange={handleAnswer}>
            <div className="space-y-3">
              {currentQ!.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleAnswer(option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <div>{option.label}</div>
                    {option.description && (
                      <div className="text-gray-500 mt-1">{option.description}</div>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleNext} disabled={!isAnswered}>
              {currentQuestion === questions.length - 1 ? 'Get My Kit' : 'Next'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}