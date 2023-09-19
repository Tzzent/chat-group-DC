import InputForm from './components/InputForm';
import Body from './components/Body';
import Header from './components/Header';
import getMessages from '@/app/actions/getMessages';

interface IParams {
  channelId: string,
}

export default async function ChannelConversation(
  { params }: { params: IParams },
) {
  const messages = await getMessages(params.channelId);

  return (
    <div
      className="
      bg-[#252329]
      text-white
      h-full
      flex
      flex-col
      "
    >
      <Header />
      <Body initialMessages={messages} />
      <div
        className="
        px-5
        lg:px-20
        mb-8
        "
      >
        <InputForm />
      </div>
    </div>
  )
}
