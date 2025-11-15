import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { QuizAnswers, UserProgress } from '../App';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Play,
  ShoppingCart,
  AlertTriangle,
  Target,
  TrendingUp,
  CreditCard,
  DollarSign,
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface LearningModulesProps {
  answers: QuizAnswers;
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
}

interface Module {
  id: string;
  title: string;
  description: string;
  icon: any;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: ModuleContent;
  ageGroup: string[];
}

interface ModuleContent {
  introduction: string;
  keyPoints: string[];
  practicalTips: string[];
  commonMistakes: string[];
  realLifeExample: string;
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

const modules: Module[] = [
  {
    id: 'needs-vs-wants',
    title: 'Needs vs. Wants: The Foundation',
    description: 'Learn to tell the difference between what you need and what you want',
    icon: ShoppingCart,
    duration: '5 min',
    difficulty: 'beginner',
    ageGroup: ['13-17', '18-25', '26-35', '36+'],
    content: {
      introduction:
        "This is THE most important financial skill. If you can master telling needs from wants, you'll avoid most money problems!",
      keyPoints: [
        'Needs: Things you must have to survive and function (food, shelter, basic clothing, healthcare)',
        'Wants: Things that make life better but aren\'t essential (latest phone, designer clothes, entertainment)',
        'The trick: Marketing makes wants feel like needs!',
        'Your phone is a need, but the latest iPhone is a want',
      ],
      practicalTips: [
        'Before buying, ask: "What happens if I don\'t get this?" If the answer is "nothing bad," it\'s a want',
        'Wait 24-48 hours before buying wants. The urge often passes!',
        'Budget for wants! Just do needs first, then wants with leftover money',
        'Influencers are paid to make you want things. Remember that!',
      ],
      commonMistakes: [
        'Thinking "everyone has it" makes something a need',
        'Buying wants first, then struggling with needs',
        'Not budgeting ANY money for wants (this leads to guilt and giving up)',
        'Confusing quality of life with standard of living',
      ],
      realLifeExample:
        "Sarah earns $400/month from her part-time job. She spent $300 on a concert ticket (want) and didn't have enough for gas to get to work (need). She had to borrow from friends and felt embarrassed. Now she covers needs first, then decides on wants.",
      quiz: {
        question: 'Which of these is a WANT, not a need?',
        options: [
          'Grocery money for the week',
          'A Netflix subscription',
          'Your monthly rent',
          'Medicine for an illness',
        ],
        correctAnswer: 1,
        explanation:
          'Netflix is entertainment - nice to have, but not essential! All the others are needs for survival and health.',
      },
    },
  },
  {
    id: 'social-media-tricks',
    title: 'How Social Media Makes You Spend',
    description: 'Recognize marketing tricks and resist the pressure to buy',
    icon: AlertTriangle,
    duration: '8 min',
    difficulty: 'beginner',
    ageGroup: ['13-17', '18-25', '26-35'],
    content: {
      introduction:
        "Social media isn't just for fun - it's designed to make you buy things. Let's expose the tricks so you can take back control!",
      keyPoints: [
        'Influencers are paid actors, not friends giving advice',
        '"Limited time!" and "Only 3 left!" create fake urgency',
        'Before/after photos are often edited or misleading',
        'Your feed is curated to show you ads based on your insecurities',
      ],
      practicalTips: [
        'Unfollow accounts that make you feel like you need to buy things',
        'When you see "limited time," tell yourself: "It will be on sale again"',
        'Ask yourself: "Did I want this before I saw the ad?"',
        'Turn off shopping notifications on social apps',
        'Remember: People only show their highlight reel, not their debt',
      ],
      commonMistakes: [
        'Thinking influencers actually use everything they promote',
        'Buying to "keep up" with what you see online',
        'Not realizing affiliate links mean they profit from your purchase',
        'Falling for "It\'s only $5!" (which happens 20 times and becomes $100)',
      ],
      realLifeExample:
        'Marcus saw his favorite YouTuber promoting a gaming chair "on sale for 24 hours only!" for $300. He almost bought it, but searched online and found the same chair regularly on sale at that price. He realized the urgency was fake and saved his money.',
      quiz: {
        question: 'What does it mean when an influencer has an "affiliate link"?',
        options: [
          "They're doing you a favor by finding a good deal",
          'They get paid when you buy through their link',
          "It means the product is guaranteed to be good",
          'They personally tested everything they promote',
        ],
        correctAnswer: 1,
        explanation:
          "Affiliate links mean the influencer gets paid (sometimes up to 10-20%) when you buy. It's not about helping you - it's their income!",
      },
    },
  },
  {
    id: 'emergency-fund-basics',
    title: 'Build Your Safety Net',
    description: 'Why you need emergency money and how to start saving it',
    icon: Target,
    duration: '7 min',
    difficulty: 'beginner',
    ageGroup: ['13-17', '18-25', '26-35', '36+'],
    content: {
      introduction:
        'An emergency fund is money saved for surprises - car breaks, phone dies, lose your job. It keeps bad situations from becoming disasters!',
      keyPoints: [
        'Start small: $100, then $500, then $1,000, then 3-6 months expenses',
        'This money is ONLY for real emergencies, not wants',
        'Keep it in a savings account - easy to access but separate from spending money',
        'Even $5/week adds up: that\'s $260 in a year!',
      ],
      practicalTips: [
        'Open a separate savings account and name it "Emergency Fund"',
        'Automate savings: have $10-20 automatically moved each paycheck',
        'Save windfalls: birthday money, tax refunds, bonuses',
        'Start with "baby emergency fund" of $500-1,000',
        "Once you use it, rebuild it immediately!",
      ],
      commonMistakes: [
        'Thinking "I\'ll save what\'s left" (there\'s never anything left!)',
        'Using emergency fund for non-emergencies',
        'Keeping it in checking where it\'s too easy to spend',
        'Getting discouraged and giving up after small setbacks',
      ],
      realLifeExample:
        "Destiny saved $20/month for 6 months and had $120 when her laptop broke. The repair was $100. She was stressed but handled it without going into debt. She felt proud and motivated to keep saving. Now she has $500 saved and feels way less anxious about money.",
      quiz: {
        question: 'Which of these is a good reason to use your emergency fund?',
        options: [
          'A concert ticket for your favorite artist',
          'Your car needs a new tire to be safe',
          'A really good sale on clothes',
          'A vacation you really need',
        ],
        correctAnswer: 1,
        explanation:
          'A car tire is a true emergency - you need it for safety and to get to work/school. The others are wants, not emergencies!',
      },
    },
  },
  {
    id: 'budget-basics',
    title: 'Budgeting Without the Boring',
    description: 'Create a simple budget that actually works for your life',
    icon: DollarSign,
    duration: '10 min',
    difficulty: 'beginner',
    ageGroup: ['13-17', '18-25', '26-35', '36+'],
    content: {
      introduction:
        "Budgeting sounds boring, but it's really just a plan for your money. It's how you make sure your money does what YOU want!",
      keyPoints: [
        "The 50/30/20 rule: 50% needs, 30% wants, 20% savings",
        'Track where your money goes for one month (you\'ll be surprised!)',
        'A budget is permission to spend, not restriction',
        'Adjust as you go - no budget is perfect immediately',
      ],
      practicalTips: [
        'Use an app like Mint, Goodbudget, or just a simple spreadsheet',
        'Write down EVERY expense for 30 days to find money leaks',
        'Include "fun money" in your budget so you don\'t feel deprived',
        'Review and adjust monthly - life changes!',
        'Start simple, add complexity later',
      ],
      commonMistakes: [
        'Making the budget too complicated (then giving up)',
        'Forgetting irregular expenses (car insurance, gifts, etc.)',
        'Being too restrictive (leads to budget burnout)',
        'Not tracking actual spending vs. the plan',
        'Giving up after one bad month',
      ],
      realLifeExample:
        "Jordan started tracking expenses and realized he spent $150/month on food delivery! He had no idea. He cut it to $50/month and saved $100. That's $1,200/year - enough for a vacation he actually wanted.",
      quiz: {
        question: 'In the 50/30/20 budget rule, what does the 20% go toward?',
        options: [
          'Fun stuff and entertainment',
          'Food and rent',
          'Savings and paying off debt',
          'Whatever you want',
        ],
        correctAnswer: 2,
        explanation:
          'The 20% goes to savings and debt payoff - building your financial future! 50% is needs, 30% is wants.',
      },
    },
  },
  {
    id: 'credit-cards-101',
    title: 'Credit Cards: The Truth',
    description: 'How credit cards work and how to avoid the debt trap',
    icon: CreditCard,
    duration: '12 min',
    difficulty: 'intermediate',
    ageGroup: ['18-25', '26-35', '36+'],
    content: {
      introduction:
        "Credit cards can be tools or traps. Used right, they build credit and offer rewards. Used wrong, they destroy your finances with debt.",
      keyPoints: [
        "Only buy what you can pay off that month",
        'Interest rates are usually 18-25% - that doubles debt fast!',
        'Minimum payments are a trap - you\'ll pay for years',
        'Credit cards are not free money - every dollar must be repaid',
      ],
      practicalTips: [
        'Treat credit cards like debit - only spend money you have',
        'Pay the full balance every month, not minimum',
        'Set up autopay for at least the minimum (never miss payments!)',
        'Start with one card, low limit ($500-1,000)',
        'Use for planned purchases, not impulse buys',
      ],
      commonMistakes: [
        'Carrying a balance "to build credit" (you don\'t need to pay interest to build credit!)',
        'Only paying the minimum',
        'Opening too many cards',
        'Using cards for emergencies instead of emergency fund',
        'Not understanding that "available credit" isn\'t money you have',
      ],
      realLifeExample:
        "Priya got her first credit card with a $1,000 limit. She bought $800 of stuff thinking she'd pay it later. With minimum payments of $25/month at 20% interest, it would take her 4 years and cost $1,200 total. She learned to only use it for gas and groceries she can pay off immediately.",
    },
  },
  {
    id: 'investing-basics',
    title: 'Investing 101: Make Your Money Grow',
    description: 'Understand the basics of making your money work for you',
    icon: TrendingUp,
    duration: '15 min',
    difficulty: 'intermediate',
    ageGroup: ['18-25', '26-35', '36+'],
    content: {
      introduction:
        "Investing isn't just for rich people! It's how you turn today's money into tomorrow's wealth. Starting young is your biggest advantage!",
      keyPoints: [
        'Compound interest = your money makes money, then that money makes money',
        'Index funds own a bit of everything - simple and safe for beginners',
        'Time matters more than timing - start small, start now',
        'You don\'t need thousands to start - many apps let you start with $5',
      ],
      practicalTips: [
        'Start with employer 401k if available (especially if they match - free money!)',
        'Open a Roth IRA - you can invest up to $7,000/year',
        'Begin with target-date funds or S&P 500 index funds',
        "Don't try to pick individual stocks as a beginner",
        'Invest regularly (monthly) rather than trying to time the market',
      ],
      commonMistakes: [
        'Waiting until you have "enough" to start',
        'Trying to pick hot stocks (gambling, not investing)',
        'Selling when market drops (missing the recovery)',
        'Not taking employer 401k match (refusing free money!)',
        'Investing money you need in the next 5 years',
      ],
      realLifeExample:
        "Alex started investing $100/month at age 22 in an index fund. By age 65, even at moderate returns, that becomes over $300,000! His friend who waited until 35 to start investing the same amount ended up with only $130,000. Starting early makes a HUGE difference.",
      quiz: {
        question: 'What is compound interest?',
        options: [
          'Interest that makes things more complicated',
          'When your money earns interest, then that interest earns interest',
          'A type of savings account',
          'Interest that gets paid all at once',
        ],
        correctAnswer: 1,
        explanation:
          "Compound interest is when your money earns money, and then that money also earns money. It's how wealth grows exponentially over time!",
      },
    },
  },
];

export function LearningModules({ answers, progress, onUpdateProgress }: LearningModulesProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const isYoung = answers.age === '13-17' || answers.age === '18-25';

  const relevantModules = modules.filter((m) => m.ageGroup.includes(answers.age));

  const currentModule = relevantModules.find((m) => m.id === selectedModule);

  const handleSelectModule = (moduleId: string) => {
    setSelectedModule(moduleId);
    setShowQuiz(false);
    setQuizAnswer(null);
    setShowQuizResult(false);
  };

  const handleCompleteModule = () => {
    if (currentModule && !progress.modulesCompleted.includes(currentModule.id)) {
      const newCompleted = [...progress.modulesCompleted, currentModule.id];
      const newScore = Math.min(progress.financialHealthScore + 8, 100);
      const newBadges = [...progress.badges];

      if (newCompleted.length >= 3 && !newBadges.includes('learning-streak')) {
        newBadges.push('learning-streak');
      }

      if (currentModule.id === 'emergency-fund-basics' && !newBadges.includes('smart-saver')) {
        newBadges.push('smart-saver');
      }

      if (currentModule.id === 'investing-basics' && !newBadges.includes('investment-novice')) {
        newBadges.push('investment-novice');
      }

      onUpdateProgress({
        modulesCompleted: newCompleted,
        financialHealthScore: newScore,
        badges: newBadges,
      });
    }

    if (currentModule?.content.quiz) {
      setShowQuiz(true);
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setQuizAnswer(answerIndex);
    setShowQuizResult(true);
  };

  const handleReset = () => {
    setSelectedModule(null);
    setShowQuiz(false);
    setQuizAnswer(null);
    setShowQuizResult(false);
  };

  if (!selectedModule) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-gray-900">
            {isYoung ? 'Learn Money Skills' : 'Learning Modules'}
          </h2>
          <p className="text-gray-600">
            {isYoung
              ? 'Short, fun lessons that teach you real money skills 📚'
              : 'Bite-sized lessons on essential financial topics'}
          </p>
        </div>

        <div className="flex gap-2 justify-center flex-wrap">
          <Badge variant="outline">
            {progress.modulesCompleted.length} / {relevantModules.length} completed
          </Badge>
          <Badge variant="secondary" className="bg-purple-100">
            {Math.round((progress.modulesCompleted.length / relevantModules.length) * 100)}%
          </Badge>
        </div>

        <div className="grid gap-4">
          {relevantModules.map((module) => {
            const completed = progress.modulesCompleted.includes(module.id);
            const Icon = module.icon;

            return (
              <Card
                key={module.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  completed ? 'border-green-200 bg-green-50' : ''
                }`}
                onClick={() => handleSelectModule(module.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3 flex-1">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          completed ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          <Icon className={`h-6 w-6 ${
                            completed ? 'text-green-600' : 'text-blue-600'
                          }`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">{module.title}</CardTitle>
                        <CardDescription className="mt-1">{module.description}</CardDescription>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            {module.duration}
                          </Badge>
                          <Badge variant="outline" className="text-xs capitalize">
                            {module.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {completed ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                    ) : (
                      <Play className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <Alert className="border-purple-200 bg-purple-50">
          <AlertDescription>
            💡 <strong>Pro tip:</strong> Complete modules to earn badges and increase your financial health score!
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!currentModule) return null;

  const Icon = currentModule.icon;

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={handleReset}>
        ← Back to Modules
      </Button>

      <Card className="border-2 border-purple-200">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <CardTitle>{currentModule.title}</CardTitle>
              <CardDescription className="mt-1">{currentModule.description}</CardDescription>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">{currentModule.duration}</Badge>
                <Badge variant="outline" className="capitalize">
                  {currentModule.difficulty}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {!showQuiz ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{currentModule.content.introduction}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Key Points</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {currentModule.content.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Practical Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {currentModule.content.practicalTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-500 flex-shrink-0 mt-0.5">→</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Common Mistakes to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {currentModule.content.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-orange-600 flex-shrink-0">⚠️</span>
                    <span className="text-gray-700">{mistake}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-base">Real-Life Example</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 italic">{currentModule.content.realLifeExample}</p>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-4">
            <Button onClick={handleCompleteModule} size="lg" className="min-w-[200px]">
              {currentModule.content.quiz ? 'Take Quick Quiz' : 'Mark as Complete'}
            </Button>
          </div>
        </>
      ) : (
        currentModule.content.quiz && (
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle>Quick Knowledge Check</CardTitle>
              <CardDescription>Test what you learned!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{currentModule.content.quiz.question}</p>

              {!showQuizResult ? (
                <div className="space-y-3">
                  {currentModule.content.quiz.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full h-auto p-4 text-left justify-start"
                      onClick={() => handleQuizAnswer(index)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              ) : (
                <>
                  <Alert
                    className={
                      quizAnswer === currentModule.content.quiz.correctAnswer
                        ? 'border-green-200 bg-green-50'
                        : 'border-orange-200 bg-orange-50'
                    }
                  >
                    <AlertDescription>
                      <div className="flex items-start gap-2">
                        {quizAnswer === currentModule.content.quiz.correctAnswer ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                        )}
                        <div>
                          <p className="mb-2">
                            {quizAnswer === currentModule.content.quiz.correctAnswer
                              ? '🎉 Correct! You got it!'
                              : "Not quite, but that's okay - learning takes practice!"}
                          </p>
                          <p className="text-sm">{currentModule.content.quiz.explanation}</p>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <Button onClick={handleReset} className="w-full">
                    Continue Learning
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
