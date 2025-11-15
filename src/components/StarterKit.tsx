import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { QuizAnswers, UserProgress } from '../App';
import {
  CheckCircle2,
  BookOpen,
  Target,
  TrendingUp,
  AlertCircle,
  DollarSign,
  RefreshCw,
  Download,
  Lightbulb,
  Rocket,
  PiggyBank,
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface StarterKitProps {
  answers: QuizAnswers;
  onReset: () => void;
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
}

interface Recommendation {
  icon: any;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionSteps?: string[];
}

function generateRecommendations(answers: QuizAnswers): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const isYoung = answers.age === '13-17' || answers.age === '18-25';
  const isNewToMoney = answers.experience === 'new' || answers.experience === 'beginner';

  // Learning recommendation for beginners and young people
  if (isNewToMoney || answers.goals === 'learn') {
    recommendations.push({
      icon: Lightbulb,
      title: isYoung ? 'Start Your Money Journey!' : 'Learn the Money Basics',
      description: isYoung
        ? "You're at the perfect age to start! Understanding money now will give you a huge advantage. Let's break it down into simple steps."
        : "Getting the basics right is the foundation of financial success. Let's make money management feel easy and natural.",
      priority: 'high',
      actionSteps: isYoung
        ? [
            'Understand the difference between needs (food, shelter) and wants (fun stuff)',
            'Learn how to track money coming in and going out',
            'Watch YouTube channels like "Two Cents" or "The Financial Diet"',
          ]
        : [
            'Set up a simple budget using the 50/30/20 rule',
            'Understand your paycheck (taxes, deductions, net pay)',
            'Read "I Will Teach You to Be Rich" by Ramit Sethi',
          ],
    });
  }

  // Savings recommendation with age-appropriate language
  if (answers.savings === 'none' || answers.savings === 'small') {
    recommendations.push({
      icon: PiggyBank,
      title: isYoung ? 'Start Your Safety Stash' : 'Build Your Emergency Fund',
      description: isYoung
        ? "Having money saved up means you can handle surprises (like a broken phone) without panicking. Start small - every dollar counts!"
        : "An emergency fund is your financial safety net. It protects you from unexpected expenses and gives you peace of mind.",
      priority: 'high',
      actionSteps: isYoung
        ? [
            'Set a goal to save $100 first, then $500',
            'Put aside money before you spend it (even $5/week adds up!)',
            'Keep it somewhere safe but easy to access (savings account)',
          ]
        : [
            'Start with $1,000, then build to 3-6 months of expenses',
            'Automate transfers to savings right after payday',
            'Use a high-yield savings account (4-5% interest)',
          ],
    });
  }

  // Earning recommendation for very young or no income
  if (answers.income === 'none' && answers.age === '13-17') {
    recommendations.push({
      icon: Rocket,
      title: 'Start Earning Your Own Money',
      description: "Making your own money is empowering! You'll learn valuable skills and have more control over your financial future.",
      priority: 'medium',
      actionSteps: [
        'Try babysitting, pet sitting, or yard work in your neighborhood',
        'Sell things you make (art, baked goods, crafts)',
        'Look for part-time jobs when you\'re old enough (retail, food service)',
      ],
    });
  }

  // Debt management
  if (answers.debt === 'moderate' || answers.debt === 'high') {
    recommendations.push({
      icon: Target,
      title: isYoung ? 'Tackle What You Owe' : 'Create Your Debt Freedom Plan',
      description: isYoung
        ? "Owing money can feel stressful, but you can totally handle this! The key is to make a plan and stick with it. You've got this!"
        : "Having a clear strategy to eliminate debt frees up your future income and reduces financial stress.",
      priority: 'high',
      actionSteps: isYoung
        ? [
            'List out everything you owe and the interest rates',
            'Pay the minimum on everything, then extra on the highest interest debt',
            "Don't take on new debt while paying off old debt",
          ]
        : [
            'Use the avalanche method (highest interest first) to save money',
            'Consider balance transfers for high-interest credit cards',
            'Negotiate with lenders for better rates or payment plans',
          ],
    });
  }

  // Smart spending for younger users
  if (isYoung && answers.experience === 'new') {
    recommendations.push({
      icon: DollarSign,
      title: 'Make Smart Spending Choices',
      description: "It's not about never having fun - it's about making sure you're spending on things that actually make you happy!",
      priority: 'medium',
      actionSteps: [
        'Wait 24 hours before buying something you want (impulse control!)',
        'Ask yourself: "Will I still care about this in a month?"',
        'Find free or cheap alternatives (library books, free events, cooking at home)',
      ],
    });
  }

  // Investment recommendation
  if (
    ((answers.savings === 'some' || answers.savings === 'moderate' || answers.savings === 'substantial') &&
    answers.debt !== 'high') || answers.goals === 'invest'
  ) {
    recommendations.push({
      icon: TrendingUp,
      title: isYoung ? 'Make Your Money Grow' : 'Start Investing for Your Future',
      description: isYoung
        ? "Investing sounds fancy, but it's really just putting your money to work so it grows over time. Starting young is your superpower!"
        : "Time is your greatest asset when investing. Even small amounts invested consistently can grow significantly over time.",
      priority: answers.goals === 'invest' ? 'high' : 'medium',
      actionSteps: isYoung && answers.age === '13-17'
        ? [
            'Ask a parent to help you open a custodial investment account',
            'Learn about index funds (they own a bit of everything)',
            'Start with just $10-20 a month - seriously, that\'s enough!',
          ]
        : isYoung
        ? [
            'Open a Roth IRA - you can invest up to $7,000/year',
            'Start with a simple target-date fund or S&P 500 index fund',
            'Contribute to your employer\'s 401k, especially if they match',
          ]
        : [
            'Max out employer 401k match (free money!)',
            'Consider low-cost index funds (0.03-0.10% expense ratio)',
            'Diversify across stocks and bonds based on your age',
          ],
    });
  }

  // Big purchase planning for those with that goal
  if (answers.goals === 'big-purchase') {
    recommendations.push({
      icon: Target,
      title: 'Save Smart for Your Big Goal',
      description: "Having a specific goal makes saving way easier! Let's break down how to actually make it happen.",
      priority: 'high',
      actionSteps: [
        'Figure out exactly how much you need and when you need it',
        'Divide the total by the number of months - that\'s your monthly goal',
        'Put this money in a separate savings account so you\'re not tempted to spend it',
      ],
    });
  }

  // Career and income growth
  if ((answers.age === '18-25' || answers.age === '26-35') && (answers.income === 'under-15k' || answers.income === '15k-40k')) {
    recommendations.push({
      icon: Rocket,
      title: 'Grow Your Income',
      description: "Earning more money is just as important as managing what you have. Your income is your biggest wealth-building tool!",
      priority: 'medium',
      actionSteps: [
        'Develop valuable skills through free courses (Coursera, Khan Academy)',
        'Ask for a raise or promotion after 12-18 months of great work',
        'Start a side hustle based on skills you already have',
      ],
    });
  }

  return recommendations;
}

function getPriorityBadge(priority: 'high' | 'medium' | 'low') {
  const variants = {
    high: 'destructive',
    medium: 'default',
    low: 'secondary',
  } as const;

  const labels = {
    high: 'Start First',
    medium: 'Important',
    low: 'When Ready',
  };

  return <Badge variant={variants[priority]}>{labels[priority]}</Badge>;
}

function getQuickWins(answers: QuizAnswers): string[] {
  const isYoung = answers.age === '13-17' || answers.age === '18-25';

  if (isYoung) {
    return [
      'Open a savings account (or check if you already have one!)',
      'Download a money tracking app like Mint or use a simple spreadsheet',
      'Unsubscribe from store emails that tempt you to spend',
      'Set up automatic savings - even $5 per week adds up to $260/year',
    ];
  }

  return [
    'Open a high-yield savings account (currently 4-5% interest)',
    'Set up automatic transfers to savings on payday',
    'Review your subscriptions and cancel what you don\'t use',
    'Check your credit report for free at AnnualCreditReport.com',
  ];
}

function getResources(answers: QuizAnswers) {
  const isYoung = answers.age === '13-17' || answers.age === '18-25';

  if (isYoung) {
    return [
      {
        title: 'Two Cents (YouTube)',
        description: 'Fun, animated videos explaining money concepts in simple terms',
      },
      {
        title: 'The Financial Diet (Website/YouTube)',
        description: 'Real talk about money for young adults, no judgment',
      },
      {
        title: 'Mint or Goodbudget',
        description: 'Free apps to track spending and create budgets easily',
      },
      {
        title: 'r/personalfinance Wiki',
        description: 'Comprehensive guides for every money situation',
      },
    ];
  }

  return [
    {
      title: 'r/personalfinance Wiki',
      description: 'Comprehensive financial advice for all situations',
    },
    {
      title: 'YNAB or Mint',
      description: 'Budget tracking apps to manage your money',
    },
    {
      title: 'Investopedia',
      description: 'Learn about investing and financial terms',
    },
    {
      title: 'NerdWallet',
      description: 'Compare financial products and get expert advice',
    },
  ];
}

export function StarterKit({ answers, onReset, progress, onUpdateProgress }: StarterKitProps) {
  const recommendations = generateRecommendations(answers);
  const quickWins = getQuickWins(answers);
  const resources = getResources(answers);
  const isYoung = answers.age === '13-17' || answers.age === '18-25';

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
          <h1 className="text-green-700">Your Personalized Money Kit</h1>
        </div>
        <p className="text-gray-600">
          {isYoung
            ? "Here's your custom roadmap to money success! Take it one step at a time - you've got this! 💪"
            : "Based on your answers, here's your personalized financial roadmap"}
        </p>
      </div>

      {/* Research-Based Credibility Note */}
      <Alert className="border-purple-200 bg-purple-50">
        <AlertDescription>
          <p>
            <strong>Evidence-Based Guidance:</strong> This plan is built on financial literacy research and aligns with national educational standards. 
            {isYoung && " It's designed specifically for your age group to bridge the gap between school knowledge and real-world money skills."}
          </p>
        </AlertDescription>
      </Alert>

      {/* Priority Actions */}
      <Card className="border-2 border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle>{isYoung ? 'Your Action Plan' : 'Your Priority Actions'}</CardTitle>
          <CardDescription>
            {isYoung
              ? "Start with the first one, then move to the next. No rush - progress is progress!"
              : "Focus on these steps based on your current situation"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec, index) => {
            const Icon = rec.icon;
            return (
              <div
                key={index}
                className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-gray-900">{rec.title}</h3>
                    {getPriorityBadge(rec.priority)}
                  </div>
                  <p className="text-gray-600">{rec.description}</p>
                  {rec.actionSteps && (
                    <ul className="space-y-2 mt-3">
                      {rec.actionSteps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-2 text-gray-700">
                          <span className="text-blue-500 flex-shrink-0">→</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Quick Wins */}
      <Card>
        <CardHeader>
          <CardTitle>{isYoung ? 'Do This Week!' : 'Quick Wins This Week'}</CardTitle>
          <CardDescription>
            {isYoung
              ? "Small wins that'll make you feel awesome and build momentum"
              : "Small actions that can make an immediate impact"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {quickWins.map((win, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{win}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recommended Resources */}
      <Card>
        <CardHeader>
          <CardTitle>{isYoung ? 'Helpful Resources' : 'Recommended Resources'}</CardTitle>
          <CardDescription>
            {isYoung
              ? "Check these out when you want to learn more (they're actually good!)"
              : "Tools and platforms to support your journey"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {resources.map((resource, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                <BookOpen className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-gray-900">{resource.title}</div>
                  <p className="text-gray-600">{resource.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center">
        <Button variant="outline" onClick={onReset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Retake Quiz
        </Button>
        <Button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Download className="mr-2 h-4 w-4" />
          Save as PDF
        </Button>
      </div>
    </div>
  );
}