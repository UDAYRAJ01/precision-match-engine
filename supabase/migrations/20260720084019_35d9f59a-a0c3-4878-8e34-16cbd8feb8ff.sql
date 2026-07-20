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
USING (
  EXISTS (
    SELECT 1
    FROM public.user_roles ur
    WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'::public.app_role
  )
);