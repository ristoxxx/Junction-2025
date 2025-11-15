import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { QuizAnswers, UserProgress } from '../App';
import {
  Trophy,
  Target,
  TrendingUp,
  Award,
  Star,
  Zap,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface ProgressDashboardProps {
  answers: QuizAnswers;
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
}

const availableBadges = [
  { id: 'first-steps', title: 'First Steps', description: 'Completed your first quiz', icon: '🎯', unlocked: true },
  { id: 'scenario-master', title: 'Scenario Master', description: 'Completed 5 scenarios', icon: '🎮', unlocked: false },
  { id: 'learning-streak', title: 'Learning Streak', description: 'Completed 3 modules', icon: '📚', unlocked: false },
  { id: 'smart-saver', title: 'Smart Saver', description: 'Learned about emergency funds', icon: '💰', unlocked: false },
  { id: 'debt-destroyer', title: 'Debt Destroyer', description: 'Completed debt payoff module', icon: '⚔️', unlocked: false },
  { id: 'investment-novice', title: 'Investment Novice', description: 'Learned investing basics', icon: '📈', unlocked: false },
];

export function ProgressDashboard({ answers, progress, onUpdateProgress }: ProgressDashboardProps) {
  const isYoung = answers.age === '13-17' || answers.age === '18-25';

  const achievements = [
    { label: 'Quiz Completed', completed: progress.quizCompleted, icon: CheckCircle2 },
    { label: 'Scenarios Done', completed: progress.scenariosCompleted.length >= 1, icon: Target },
    { label: 'Modules Started', completed: progress.modulesCompleted.length >= 1, icon: Star },
  ];

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getHealthScoreMessage = (score: number) => {
    if (score >= 80) return isYoung ? "You're crushing it! 🌟" : "Excellent financial health!";
    if (score >= 60) return isYoung ? "Great progress! Keep it up! 💪" : "Good financial foundation";
    if (score >= 40) return isYoung ? "You're on your way! 🚀" : "Building momentum";
    return isYoung ? "Every journey starts somewhere! 🌱" : "Getting started";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-gray-900">
          {isYoung ? 'Your Money Dashboard' : 'Your Progress Dashboard'}
        </h2>
        <p className="text-gray-600">
          {isYoung
            ? "Track your wins and see how far you've come! 🎉"
            : "Monitor your financial literacy journey"}
        </p>
      </div>

      {/* Financial Health Score */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-blue-600" />
            {isYoung ? 'Your Money Score' : 'Financial Health Score'}
          </CardTitle>
          <CardDescription>
            {isYoung
              ? 'This shows how well you understand your money situation'
              : 'Based on your current financial situation and knowledge'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end gap-4">
            <div className={`text-6xl ${getHealthScoreColor(progress.financialHealthScore)}`}>
              {progress.financialHealthScore}
            </div>
            <div className="flex-1 pb-2">
              <Progress value={progress.financialHealthScore} className="h-4" />
              <p className="text-sm text-gray-600 mt-2">
                {getHealthScoreMessage(progress.financialHealthScore)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center space-y-1">
                <achievement.icon
                  className={`h-8 w-8 mx-auto ${
                    achievement.completed ? 'text-green-500' : 'text-gray-300'
                  }`}
                />
                <p className="text-xs text-gray-600">{achievement.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badges & Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-6 w-6 text-purple-600" />
            {isYoung ? 'Your Badges' : 'Achievements'}
          </CardTitle>
          <CardDescription>
            {isYoung
              ? 'Collect badges as you learn and grow! 🏆'
              : 'Unlock achievements by completing activities'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {availableBadges.map((badge) => {
              const isUnlocked = progress.badges.includes(badge.id) || badge.unlocked;
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border text-center space-y-2 ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="relative">
                    <div className="text-4xl">{badge.icon}</div>
                    {!isUnlocked && (
                      <Lock className="h-4 w-4 absolute top-0 right-0 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">{badge.title}</div>
                    <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                  </div>
                  {isUnlocked && (
                    <Badge variant="secondary" className="text-xs">
                      Unlocked!
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <Zap className="h-8 w-8 mx-auto text-yellow-500" />
              <div className="text-3xl">{progress.scenariosCompleted.length}</div>
              <p className="text-sm text-gray-600">
                {isYoung ? 'Scenarios Practiced' : 'Scenarios Completed'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <Star className="h-8 w-8 mx-auto text-purple-500" />
              <div className="text-3xl">{progress.modulesCompleted.length}</div>
              <p className="text-sm text-gray-600">
                {isYoung ? 'Lessons Completed' : 'Modules Finished'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <TrendingUp className="h-8 w-8 mx-auto text-green-500" />
              <div className="text-3xl">{progress.badges.length}</div>
              <p className="text-sm text-gray-600">
                {isYoung ? 'Badges Earned' : 'Achievements Unlocked'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Peer Stories */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle>Real Stories from People Like You</CardTitle>
          <CardDescription>See how others are taking control of their money</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🎓</div>
              <div className="flex-1">
                <p className="text-gray-700 italic">
                  "I was so stressed about student loans. SmartStart helped me create a payoff plan that actually makes sense!"
                </p>
                <p className="text-sm text-gray-500 mt-2">- Maya, 22, College student</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💼</div>
              <div className="flex-1">
                <p className="text-gray-700 italic">
                  "Got my first paycheck and had no idea what to do. The budgeting scenarios taught me exactly how to split it up!"
                </p>
                <p className="text-sm text-gray-500 mt-2">- James, 19, First job</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🌟</div>
              <div className="flex-1">
                <p className="text-gray-700 italic">
                  "I saved $500 in 3 months using the tips from SmartStart. It feels amazing to have my own money saved!"
                </p>
                <p className="text-sm text-gray-500 mt-2">- Alex, 17, Part-time worker</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
