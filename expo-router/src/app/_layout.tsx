import { Slot } from 'expo-router';
import { SessionProvider } from '@/hooks/useSession';

export default function Root() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
