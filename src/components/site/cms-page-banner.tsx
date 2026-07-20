import type { ReactNode } from "react";
import { PageBanner } from "@/components/site/page-banner";
import { useCmsContent } from "@/hooks/use-cms";

type Props = {
  page: string;
  sectionKey?: string;
  image: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
};

/**
 * Hero banner driven by CMS. Any field the admin leaves blank falls back
 * to the hardcoded default passed by the route (existing copy).
 */
export function CmsPageBanner(props: Props) {
  const { get } = useCmsContent(props.page);
  const data = get(props.sectionKey ?? "hero", {
    image: props.image,
    eyebrow: props.eyebrow ?? "",
    title: "",
    subtitle: "",
  });
  return (
    <PageBanner
      image={data.image}
      eyebrow={data.eyebrow || undefined}
      title={data.title ? data.title : props.title}
      subtitle={data.subtitle ? data.subtitle : props.subtitle}
      align={props.align}
    />
  );
}