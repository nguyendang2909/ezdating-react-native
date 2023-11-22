import { PrefetchConversations } from './PrefetchConversations';
import { PrefetchDatingNearby } from './PrefetchDatingNearby';
import { PrefetchDatingSwipe } from './PrefetchDatingSwipe';
import { PrefetchMatches } from './PrefetchMatches';

export const PrefetchData = () => {
  return (
    <>
      <PrefetchDatingSwipe />
      <PrefetchDatingNearby />
      <PrefetchMatches />
      <PrefetchConversations />
    </>
  );
};
