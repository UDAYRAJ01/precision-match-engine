
DROP POLICY IF EXISTS "cms images anon read" ON storage.objects;
CREATE POLICY "cms images anon read" ON storage.objects
  FOR SELECT USING (bucket_id = 'cms-images');
DROP POLICY IF EXISTS "cms images anon insert" ON storage.objects;
CREATE POLICY "cms images anon insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'cms-images');
