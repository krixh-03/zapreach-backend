import  SendEmail from "../islands/SendEmail.tsx"

export default function Home() {
  return (
       <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">Zapreach Frontend</h1>
        <SendEmail />
    </div>
  );
}
