import AuthForm from './components/AuthForm';

export default function Home() {
  return (
    <div
      className="
      bg-gray-100/50
      min-h-full
      flex
      flex-col
      justify-center
      "
    >
      <div
        className="
        sm:mx-auto
        sm:w-full
        sm:max-w-md
        mb-8
        "
      >
        <h2
          className="
          text-center
          text-3xl
          text-gray-900
          tracking-widest
          "
        >
          Welcome to <strong>Chat Group</strong>
        </h2>
      </div>
      <AuthForm />
    </div>
  )
}
