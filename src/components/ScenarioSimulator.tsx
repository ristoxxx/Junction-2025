import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { QuizAnswers, UserProgress } from '../App';
import { Gamepad2, TrendingUp, TrendingDown, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface ScenarioSimulatorProps {
  answers: QuizAnswers;
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
}

interface Scenario {
  id: string;
  title: string;
  situation: string;
  money: number;
  options: ScenarioOption[];
  ageGroup: string[];
}

interface ScenarioOption {
  text: string;
  outcome: string;
  impact: 'positive' | 'negative' | 'neutral';
  learning: string;
  moneyChange: number;
}

const scenarios: Scenario[] = [
  {
    id: 'first-paycheck',
    title: 'Your First Paycheck! 💰',
    situation: "Congrats! You just got your first paycheck of $500. What's your move?",
    money: 500,
    ageGroup: ['13-17', '18-25'],
    options: [
      {
        text: 'Spend it all on stuff I want',
        outcome: 'You bought some cool things, but now you have $0 saved. Next time an emergency hits, you might struggle.',
        impact: 'negative',
        learning: 'Spending everything feels good now, but leaves you vulnerable later. Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings!',
        moneyChange: -500,
      },
      {
        text: 'Save it all',
        outcome: "You saved $500! That's amazing discipline. But you also need to enjoy your hard work sometimes.",
        impact: 'positive',
        learning: "Saving is great, but balance matters! It's okay to spend some on things you enjoy. Aim to save 20% as a good starting point.",
        moneyChange: 0,
      },
      {
        text: 'Save $100, spend $400',
        outcome: 'You saved $100 (20%) and enjoyed the rest! This is a balanced approach that builds savings while letting you live.',
        impact: 'positive',
        learning: 'Perfect! This follows the 50/30/20 rule. You enjoyed your money AND started building financial security.',
        moneyChange: -400,
      },
      {
        text: 'Save $250, spend $250',
        outcome: 'You saved 50%! This aggressive saving will build your emergency fund fast, and you still got to enjoy some of your earnings.',
        impact: 'positive',
        learning: "Wow! Saving 50% is incredible if you can manage it. You're on the fast track to financial security!",
        moneyChange: -250,
      },
    ],
  },
  {
    id: 'impulse-buy',
    title: 'The Impulse Buy Trap 🛍️',
    situation: "You're scrolling social media and see an influencer promoting sneakers for $150. Everyone's buying them. You have $300 saved. What do you do?",
    money: 300,
    ageGroup: ['13-17', '18-25'],
    options: [
      {
        text: 'Buy them right now!',
        outcome: 'You bought the sneakers. They look cool for a week, then you see another trend. Half your savings is gone.',
        impact: 'negative',
        learning: 'Impulse buys often lead to regret. Try the 24-hour rule: wait a day before buying. You might realize you don\'t really want them!',
        moneyChange: -150,
      },
      {
        text: 'Wait 24 hours and think about it',
        outcome: 'After a day, you realize you don\'t need them that badly. You saved $150 and the hype passed.',
        impact: 'positive',
        learning: 'Smart move! The 24-hour rule helps you avoid impulse purchases driven by FOMO (Fear Of Missing Out).',
        moneyChange: 0,
      },
      {
        text: 'Check if you really need them vs. just want them',
        outcome: 'You already have 3 pairs of sneakers. You decide to save the money for something you actually need.',
        impact: 'positive',
        learning: 'Excellent critical thinking! Needs vs. wants is a crucial skill. Marketing makes everything feel like a need.',
        moneyChange: 0,
      },
      {
        text: 'Look for cheaper alternatives',
        outcome: 'You found similar sneakers on sale for $70. You saved $80 and still got what you wanted!',
        impact: 'positive',
        learning: 'Perfect! Shopping smart means getting what you want while keeping more money in your pocket.',
        moneyChange: -70,
      },
    ],
  },
  {
    id: 'unexpected-expense',
    title: 'Emergency! Phone Breaks 📱',
    situation: 'Your phone screen cracked and costs $200 to fix. You have $150 in savings and your paycheck comes in 2 weeks. What do you do?',
    money: 150,
    ageGroup: ['13-17', '18-25', '26-35'],
    options: [
      {
        text: 'Put it on a credit card',
        outcome: "You fixed your phone, but now you owe $200 plus interest. If you don't pay it off quickly, it could cost you $250+.",
        impact: 'negative',
        learning: 'Credit cards can trap you in debt. Interest adds up fast! This is why emergency funds are so important.',
        moneyChange: -200,
      },
      {
        text: 'Use my savings and wait for paycheck',
        outcome: 'You used your $150 savings and will add $50 from your next paycheck. Phone fixed, minimal debt!',
        impact: 'positive',
        learning: 'Good! This is exactly why emergency funds exist. Now focus on rebuilding that $150 quickly.',
        moneyChange: -150,
      },
      {
        text: 'See if I can get it fixed cheaper',
        outcome: 'You found a local repair shop that does it for $120. You saved $80 and learned to shop around!',
        impact: 'positive',
        learning: 'Excellent! Always compare prices for repairs and services. You can often find better deals.',
        moneyChange: -120,
      },
      {
        text: 'Ask family for help and pay them back',
        outcome: 'Your family loaned you $50. You fixed the phone and will pay them back from your next check. No interest!',
        impact: 'positive',
        learning: 'Smart! Borrowing from family (and paying back) is better than credit card debt. Just always honor your promise.',
        moneyChange: -150,
      },
    ],
  },
  {
    id: 'summer-job',
    title: 'Summer Job Windfall ☀️',
    situation: "You earned $2,000 from your summer job! That's a lot of money. What's your plan?",
    money: 2000,
    ageGroup: ['13-17', '18-25'],
    options: [
      {
        text: 'Save it all for college/future',
        outcome: "You saved $2,000! That's incredible discipline. This could be the start of your emergency fund or education savings.",
        impact: 'positive',
        learning: "Amazing! You're thinking long-term. Just remember to reward yourself occasionally for your hard work.",
        moneyChange: 0,
      },
      {
        text: 'Spend on a trip with friends',
        outcome: 'You had an awesome trip but spent $1,500. The memories are great, but you have little to show for a summer of work.',
        impact: 'neutral',
        learning: "Experiences matter, but so does balance. Maybe spend $500 on fun and save $1,500? You get both!",
        moneyChange: -1500,
      },
      {
        text: 'Save $1,500, spend $500 on things I enjoy',
        outcome: 'You saved 75% ($1,500) and enjoyed some of your hard work ($500). Perfect balance!',
        impact: 'positive',
        learning: 'Excellent! You built serious savings while still enjoying your summer. This is financial maturity!',
        moneyChange: -500,
      },
      {
        text: 'Save $1,000 for emergency, invest $1,000',
        outcome: "You split it perfectly: $1,000 emergency fund + $1,000 invested. You're building wealth at a young age!",
        impact: 'positive',
        learning: "Wow! You're thinking like a financial pro. Emergency fund + investments = long-term wealth building.",
        moneyChange: 0,
      },
    ],
  },
  {
    id: 'subscription-trap',
    title: 'Subscription Overload 💳',
    situation: "You realize you're paying for 5 streaming services, a gym membership you never use, and a snack box. That's $120/month! What do you do?",
    money: 500,
    ageGroup: ['18-25', '26-35'],
    options: [
      {
        text: 'Keep everything, I might use them',
        outcome: "You're spending $1,440/year on things you barely use. That's money that could go to savings or things you actually enjoy.",
        impact: 'negative',
        learning: 'Unused subscriptions are silent money drains. Most people forget about them but they add up fast!',
        moneyChange: -120,
      },
      {
        text: 'Cancel what I haven\'t used in 30 days',
        outcome: 'You canceled 3 subscriptions, saving $75/month ($900/year)! You kept what you actually use.',
        impact: 'positive',
        learning: 'Perfect! Regular subscription audits are crucial. That $75/month could become a $900 emergency fund in a year.',
        moneyChange: -45,
      },
      {
        text: 'Share accounts with family/friends',
        outcome: 'You split costs with friends and reduced your bill to $40/month. You saved $80/month ($960/year)!',
        impact: 'positive',
        learning: 'Smart! Many services allow sharing. This is a win-win: you save money and stay connected with friends.',
        moneyChange: -40,
      },
      {
        text: 'Rotate services monthly',
        outcome: 'You keep one streaming service at a time, rotating each month. You cut costs by $90/month!',
        impact: 'positive',
        learning: "Genius! You don't need everything at once. Rotating services gives variety while saving serious money.",
        moneyChange: -30,
      },
    ],
  },
];

export function ScenarioSimulator({ answers, progress, onUpdateProgress }: ScenarioSimulatorProps) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const isYoung = answers.age === '13-17' || answers.age === '18-25';

  const relevantScenarios = scenarios.filter((s) => s.ageGroup.includes(answers.age));

  const currentScenario = relevantScenarios.find((s) => s.id === selectedScenario);

  const handleSelectScenario = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setSelectedOption(null);
    setShowResult(false);
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowResult(true);

    // Update progress
    if (currentScenario && !progress.scenariosCompleted.includes(currentScenario.id)) {
      const newCompleted = [...progress.scenariosCompleted, currentScenario.id];
      const newScore = Math.min(progress.financialHealthScore + 5, 100);
      const newBadges = [...progress.badges];

      if (newCompleted.length >= 5 && !newBadges.includes('scenario-master')) {
        newBadges.push('scenario-master');
      }

      onUpdateProgress({
        scenariosCompleted: newCompleted,
        financialHealthScore: newScore,
        badges: newBadges,
      });
    }
  };

  const handleReset = () => {
    setSelectedScenario(null);
    setSelectedOption(null);
    setShowResult(false);
  };

  if (!selectedScenario) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-gray-900">
            {isYoung ? 'Practice Real Money Decisions' : 'Scenario Simulator'}
          </h2>
          <p className="text-gray-600">
            {isYoung
              ? 'Try out different choices and see what happens - no real money at risk! 🎮'
              : 'Practice making financial decisions in a safe environment'}
          </p>
        </div>

        <Alert className="border-blue-200 bg-blue-50">
          <AlertDescription>
            <strong>How it works:</strong> Pick a scenario, make a choice, and see the outcome. 
            Learn from each decision without risking real money!
          </AlertDescription>
        </Alert>

        <div className="grid gap-4">
          {relevantScenarios.map((scenario) => {
            const completed = progress.scenariosCompleted.includes(scenario.id);
            return (
              <Card
                key={scenario.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  completed ? 'border-green-200 bg-green-50' : ''
                }`}
                onClick={() => handleSelectScenario(scenario.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <Gamepad2 className="h-5 w-5" />
                        {scenario.title}
                      </CardTitle>
                      <CardDescription className="mt-2">{scenario.situation}</CardDescription>
                    </div>
                    {completed && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  if (!currentScenario) return null;

  const currentOption = selectedOption !== null ? currentScenario.options[selectedOption] : null;

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={handleReset}>
        ← Back to Scenarios
      </Button>

      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle>{currentScenario.title}</CardTitle>
          <CardDescription className="text-base">{currentScenario.situation}</CardDescription>
          <div className="pt-2">
            <Badge variant="outline" className="text-base">
              💵 You have: ${currentScenario.money}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showResult ? (
            <>
              <p className="text-gray-700">Choose your action:</p>
              <div className="space-y-3">
                {currentScenario.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full h-auto p-4 text-left justify-start hover:bg-blue-50"
                    onClick={() => handleSelectOption(index)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </>
          ) : currentOption ? (
            <>
              <Alert
                className={`${
                  currentOption.impact === 'positive'
                    ? 'border-green-200 bg-green-50'
                    : currentOption.impact === 'negative'
                    ? 'border-red-200 bg-red-50'
                    : 'border-yellow-200 bg-yellow-50'
                }`}
              >
                <AlertDescription>
                  <div className="flex items-start gap-2">
                    {currentOption.impact === 'positive' ? (
                      <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : currentOption.impact === 'negative' ? (
                      <TrendingDown className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="mb-2">{currentOption.outcome}</p>
                      {currentOption.moneyChange !== 0 && (
                        <p className="text-sm">
                          💰 Money left: $
                          {currentScenario.money + currentOption.moneyChange}
                        </p>
                      )}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    What You Learned
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{currentOption.learning}</p>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button onClick={handleReset} className="flex-1">
                  Try Another Scenario
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedOption(null);
                    setShowResult(false);
                  }}
                  className="flex-1"
                >
                  Try Different Choice
                </Button>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
