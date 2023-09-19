import getChannels from '../actions/getChannels';
import getCurrentUser from '../actions/getCurrentUser';
import { Sidebar } from '../components/sidebar/Sidebar';

export default async function ChannelsLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const currentUser = await getCurrentUser();
  const channels = await getChannels();

  return (
    <Sidebar
      currentUser={currentUser!}
      channels={channels}
    >
      <div className="h-full">
        {children}
      </div>
    </Sidebar>
  )
}