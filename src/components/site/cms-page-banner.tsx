import { PageBanner } from "@/components/site/page-banner";
import { useCmsContent } from "@/hooks/use-cms";

type Props = {
  page: string;
  sectionKey?: string;
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

/**
 * Hero banner driven by CMS. Falls back to props (existing hardcoded copy)
 * whenever the section or a specific field is missing/blank.
 */
export function CmsPageBanner(props: Props) {
  const { get } = useCmsContent(props.page);
  const data = get(props.sectionKey ?? "hero", {
    image: props.image,
    eyebrow: props.eyebrow ?? "",
    title: props.title,
    subtitle: props.subtitle ?? "",
  });
  return (
    <PageBanner
      image={data.image}
      eyebrow={data.eyebrow || undefined}
      title={data.title}
      subtitle={data.subtitle || undefined}
      align={props.align}
    />
  );
}