import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { TopicAddForm } from "@/features/topics/components/form/topic-add";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    href: "/topics",
    label: "Topics",
  },
  {
    href: "/topics/add",
    label: "Add Topic",
  },
];

const AddTopicPage = () => {
  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label="Add Topic" backBtnHref="/topics" />

      <TopicAddForm />
    </PageStructure>
  );
};

export default AddTopicPage;
