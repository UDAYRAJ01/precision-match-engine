
DROP POLICY "Anyone can submit a demo request" ON public.demo_requests;
CREATE POLICY "Public demo submissions with validation"
  ON public.demo_requests
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(full_name) BETWEEN 2 AND 120
    AND char_length(email) BETWEEN 5 AND 200
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND organization_type IN ('hospital','school','hotel','transit','investor','corporate','other')
  );
