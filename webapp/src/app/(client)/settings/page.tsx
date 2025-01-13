"use client";

import { PageTtle } from "@/components/page-title";
import { SettingsForm } from "@/features/settings/components";

const SettingsPage = () => {
  return (
    <div className="container space-y-6">
      <PageTtle label="Settings" />
      <SettingsForm />
    </div>
  );
};

export default SettingsPage;
