import ProfileView from "@/components/views/profile/";
import Head from "next/head";

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main>
        <ProfileView />
      </main>
    </>
  );
}
