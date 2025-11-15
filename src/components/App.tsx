import { useState, createContext, useContext } from 'react';
import { QuizFlow } from './components/QuizFlow';
import { StarterKit } from './components/StarterKit';
import { ScenarioSimulator } from './components/ScenarioSimulator';
import { LearningModules } from './components/LearningModules';
import { ProgressDashboard } from './components/ProgressDashboard';
import { AvatarSelector } from './components/AvatarSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  Gamepad2,
  Globe,
  Users
} from 'lucide-react';

export interface QuizAnswers {
  age: string;
  income: string;
  savings: string;
  debt: string;
  goals: string;
  experience: string;
  avatar?: string;
  emotionalState?: string;
}

export interface UserProgress {
  quizCompleted: boolean;
  badges: string[];
  scenariosCompleted: string[];
  modulesCompleted: string[];
  financialHealthScore: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
}

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<string, string>> = {
  en: {
    appTitle: 'SmartStart Money',
    tagline: 'Your journey to financial confidence starts here',
    dashboard: 'Dashboard',
    myPlan: 'My Plan',
    learn: 'Learn',
    practice: 'Practice',
    community: 'Community',
    teacherMode: 'Teacher Mode',
  },
  es: {
    appTitle: 'SmartStart Dinero',
    tagline: 'Tu viaje hacia la confianza financiera comienza aquí',
    dashboard: 'Panel',
    myPlan: 'Mi Plan',
    learn: 'Aprender',
    practice: 'Practicar',
    community: 'Comunidad',
    teacherMode: 'Modo Profesor',
  },
  fr: {
    appTitle: 'SmartStart Argent',
    tagline: 'Votre parcours vers la confiance financière commence ici',
    dashboard: 'Tableau de bord',
    myPlan: 'Mon Plan',
    learn: 'Apprendre',
    practice: 'Pratiquer',
    community: 'Communauté',
    teacherMode: 'Mode Enseignant',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export default function App() {
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState<'student' | 'teacher'>('student');
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const [progress, setProgress] = useState<UserProgress>({
    quizCompleted: false,
    badges: [],
    scenariosCompleted: [],
    modulesCompleted: [],
    financialHealthScore: 0,
    achievements: [],
  });

  const t = (key: string) => translations[language][key] || key;

  const handleQuizComplete = (quizAnswers: QuizAnswers) => {
    setAnswers(quizAnswers);
    setQuizComplete(true);
    setProgress({
      ...progress,
      quizCompleted: true,
      badges: ['first-steps'],
      financialHealthScore: calculateInitialScore(quizAnswers),
    });
  };

  const calculateInitialScore = (answers: QuizAnswers): number => {
    let score = 50; // Base score
    if (answers.savings !== 'none') score += 15;
    if (answers.debt === 'none') score += 15;
    if (answers.experience !== 'new') score += 10;
    if (answers.goals !== 'learn') score += 10;
    return Math.min(score, 100);
  };

  const handleReset = () => {
    setQuizComplete(false);
    setAnswers(null);
  };

  const updateProgress = (updates: Partial<UserProgress>) => {
    setProgress({ ...progress, ...updates });
  };

  const languageContextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  if (!quizComplete) {
    return (
      <LanguageContext.Provider value={languageContextValue}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                {['en', 'es', 'fr'].map((lang) => (
                  <Button
                    key={lang}
                    variant={language === lang ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLanguage(lang)}
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    {lang.toUpperCase()}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMode(mode === 'student' ? 'teacher' : 'student')}
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                {mode === 'student' ? 'Teacher Mode' : 'Student Mode'}
              </Button>
            </div>
            <QuizFlow onComplete={handleQuizComplete} mode={mode} />
          </div>
        </div>
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={languageContextValue}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-blue-900">{t('appTitle')}</h1>
              <p className="text-gray-600">{t('tagline')}</p>
            </div>
            <div className="flex gap-2">
              {['en', 'es', 'fr'].map((lang) => (
                <Button
                  key={lang}
                  variant={language === lang ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLanguage(lang)}
                >
                  <Globe className="h-4 w-4 mr-1" />
                  {lang.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">{t('dashboard')}</span>
              </TabsTrigger>
              <TabsTrigger value="plan" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">{t('myPlan')}</span>
              </TabsTrigger>
              <TabsTrigger value="learn" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">{t('learn')}</span>
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex items-center gap-2">
                <Gamepad2 className="h-4 w-4" />
                <span className="hidden sm:inline">{t('practice')}</span>
              </TabsTrigger>
              <TabsTrigger value="community" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">{t('community')}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <ProgressDashboard 
                answers={answers!} 
                progress={progress} 
                onUpdateProgress={updateProgress}
              />
            </TabsContent>

            <TabsContent value="plan">
              <StarterKit 
                answers={answers!} 
                onReset={handleReset}
                progress={progress}
                onUpdateProgress={updateProgress}
              />
            </TabsContent>

            <TabsContent value="learn">
              <LearningModules 
                answers={answers!}
                progress={progress}
                onUpdateProgress={updateProgress}
              />
            </TabsContent>

            <TabsContent value="practice">
              <ScenarioSimulator 
                answers={answers!}
                progress={progress}
                onUpdateProgress={updateProgress}
              />
            </TabsContent>

            <TabsContent value="community">
              <div className="text-center py-12 text-gray-600">
                Community features coming soon! Share your wins and learn from peers.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </LanguageContext.Provider>
  );
}
