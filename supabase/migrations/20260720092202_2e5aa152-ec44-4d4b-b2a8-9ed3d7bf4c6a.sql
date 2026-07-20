GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_sections TO authenticated;
GRANT SELECT ON public.page_sections TO anon;
GRANT ALL ON public.page_sections TO service_role;
GRANT INSERT ON public.demo_requests TO anon, authenticated;
GRANT ALL ON public.demo_requests TO service_role;
GRANT USAGE ON TYPE public.app_role TO authenticated, service_role;

DROP POLICY IF EXISTS "Admins can delete sections" ON public.page_sections;
DROP POLICY IF EXISTS "Admins can insert sections" ON public.page_sections;
DROP POLICY IF EXISTS "Admins can read all sections" ON public.page_sections;
DROP POLICY IF EXISTS "Admins can update sections" ON public.page_sections;
DROP POLICY IF EXISTS "Public can read published sections" ON public.page_sections;

CREATE POLICY "Public can read published sections"
ON public.page_sections
FOR SELECT
TO anon, authenticated
USING (published = true);

CREATE POLICY "Admins can read all sections"
ON public.page_sections
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can insert sections"
ON public.page_sections
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update sections"
ON public.page_sections
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete sections"
ON public.page_sections
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));