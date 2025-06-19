import { ProfileCard } from "@/components/profiles/profile-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile page",
};

const ProfilePage = () => {
  return (
    <div className="w-full p-4">
      <ProfileCard />
    </div>
  );
};

export default ProfilePage;
