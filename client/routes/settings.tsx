import { Head } from "$fresh/runtime.ts";
import SettingsPage from "../islands/SettingsPage.tsx";

export default function SettingsRoute() {
  return (
    <>
      <Head>
        <title>Settings - Zapreach</title>
      </Head>
      <div class="p-6">
        <SettingsPage />
      </div>
    </>
  );
}
