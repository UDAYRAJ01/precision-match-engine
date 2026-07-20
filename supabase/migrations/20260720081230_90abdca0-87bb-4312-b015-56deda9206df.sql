
-- ===== Roles =====
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can read own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ===== Updated_at trigger helper =====
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ===== Page sections (generic CMS store) =====
CREATE TABLE public.page_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL,
  section_key text NOT NULL,
  section_type text NOT NULL DEFAULT 'text',
  sort_order int NOT NULL DEFAULT 0,
  label text,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  UNIQUE (page_slug, section_key)
);

GRANT SELECT ON public.page_sections TO anon;
GRANT SELECT ON public.page_sections TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.page_sections TO authenticated;
GRANT ALL ON public.page_sections TO service_role;

ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published sections"
ON public.page_sections FOR SELECT
TO anon, authenticated
USING (published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert sections"
ON public.page_sections FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update sections"
ON public.page_sections FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete sections"
ON public.page_sections FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_page_sections_updated_at
BEFORE UPDATE ON public.page_sections
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_page_sections_page ON public.page_sections (page_slug, sort_order);
