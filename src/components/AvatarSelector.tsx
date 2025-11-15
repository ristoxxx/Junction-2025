import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { User } from 'lucide-react';

const avatars = [
  { id: 'avatar1', emoji: '🧑‍🎓', name: 'Student', color: 'bg-blue-100' },
  { id: 'avatar2', emoji: '💼', name: 'Professional', color: 'bg-purple-100' },
  { id: 'avatar3', emoji: '🎨', name: 'Creative', color: 'bg-pink-100' },
  { id: 'avatar4', emoji: '⚡', name: 'Go-Getter', color: 'bg-yellow-100' },
  { id: 'avatar5', emoji: '🌱', name: 'Starter', color: 'bg-green-100' },
  { id: 'avatar6', emoji: '🚀', name: 'Ambitious', color: 'bg-indigo-100' },
  { id: 'avatar7', emoji: '🎯', name: 'Focused', color: 'bg-red-100' },
  { id: 'avatar8', emoji: '✨', name: 'Dreamer', color: 'bg-orange-100' },
];

interface AvatarSelectorProps {
  onSelect: (avatar: string) => void;
  mode: 'student' | 'teacher';
}

export function AvatarSelector({ onSelect, mode }: AvatarSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-6 w-6" />
          {mode === 'teacher' ? 'Choose Your Avatar' : 'Pick Your Money Journey Avatar'}
        </CardTitle>
        <CardDescription>
          {mode === 'teacher'
            ? 'Select an avatar to represent you in this session'
            : "Choose a character that represents you! This makes your journey more fun and personal. Don't worry, you can change it anytime."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {avatars.map((avatar) => (
            <Button
              key={avatar.id}
              variant="outline"
              className={`h-24 flex flex-col gap-2 hover:scale-105 transition-transform ${avatar.color}`}
              onClick={() => onSelect(avatar.id)}
            >
              <span className="text-4xl">{avatar.emoji}</span>
              <span className="text-xs">{avatar.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
