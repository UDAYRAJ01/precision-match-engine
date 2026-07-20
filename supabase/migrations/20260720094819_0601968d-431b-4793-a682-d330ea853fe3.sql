
-- Public read + admin-write policies for cms-images bucket
DROP POLICY IF EXISTS "cms images public read" ON storage.objects;
CREATE POLICY "cms images public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'cms-images');

DROP POLICY IF EXISTS "cms images public write" ON storage.objects;
CREATE POLICY "cms images public write" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'cms-images');

DROP POLICY IF EXISTS "cms images public update" ON storage.objects;
CREATE POLICY "cms images public update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'cms-images');

DROP POLICY IF EXISTS "cms images public delete" ON storage.objects;
CREATE POLICY "cms images public delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'cms-images');

-- Seed a "hero" section for every known page with the current defaults.
-- Fields: eyebrow, title, subtitle, image (public URL). Idempotent via ON CONFLICT DO NOTHING.
INSERT INTO public.page_sections (page_slug, section_key, section_type, sort_order, label, content, published)
VALUES
  ('home','hero','fields',10,'Hero',
    '{"eyebrow":"Clinical Grade MedTech","title":"Intelligent CPR Guidance Systems.","subtitle":"Precision metronome, depth feedback, and real-time analytics engineered for professional responders. CPR PRAYAS™ bridges the gap between effort and outcomes.","image":"/src/assets/hero-banner.jpg"}'::jsonb, true),
  ('about','hero','fields',10,'Hero',
    '{"eyebrow":"Corporate profile & mission","title":"Engineered to give every heart a second chance at life.","subtitle":"CPR PRAYAS™ is an Indian MedTech company developing intelligent CPR guidance technologies that empower anyone — from trained healthcare professionals to everyday bystanders — to save lives during cardiac emergencies.","image":"/src/assets/banner-about.jpg"}'::jsonb, true),
  ('products','hero','fields',10,'Hero',
    '{"eyebrow":"Product portfolio","title":"CPR PRAYAS™ device family","subtitle":"Real product photography of our resuscitation guidance devices.","image":"/src/assets/product-pro-scene.jpg"}'::jsonb, true),
  ('technology','hero','fields',10,'Hero',
    '{"eyebrow":"Biomechanical engineering","title":"Precision sensor architecture & real-time algorithmic intelligence","subtitle":"Multi-sensor hardware arrays fused with embedded microcontrollers deliver zero-latency resuscitation guidance.","image":"/src/assets/banner-technology.jpg"}'::jsonb, true),
  ('applications','hero','fields',10,'Hero',
    '{"eyebrow":"Deployment scenarios","title":"Where CPR PRAYAS™ saves lives","subtitle":"From hospitals and hotels to schools and transit — real-time CPR guidance across every high-risk environment.","image":"/src/assets/banner-about.jpg"}'::jsonb, true),
  ('clinical-validation','hero','fields',10,'Hero',
    '{"eyebrow":"Evidence-based medicine","title":"Clinical validation & statistical research","subtitle":"Groundbreaking statistical trials demonstrating significant ROSC survival improvements through real-time multi-sensory feedback.","image":"/src/assets/banner-clinical.jpg"}'::jsonb, true),
  ('patents','hero','fields',10,'Hero',
    '{"eyebrow":"MedTech IP portfolio","title":"Proprietary patent architecture & global IP protection roadmap","subtitle":"Securing core technological innovations across international emergency medicine jurisdictions.","image":"/src/assets/banner-patents.jpg"}'::jsonb, true),
  ('investors','hero','fields',10,'Hero',
    '{"eyebrow":"Capital & growth portal","title":"Disrupting the $4.8B global resuscitation MedTech market","subtitle":"Partner with CPR PRAYAS™ in bringing scalable, high-margin resuscitation guidance technology to worldwide markets.","image":"/src/assets/banner-investors.jpg"}'::jsonb, true),
  ('hotels','hero','fields',10,'Hero',
    '{"eyebrow":"Hospitality safety","title":"Revolutionizing emergency response in hotels","subtitle":"A professional PRAYAS pitch for guest and staff safety — helping hotels respond confidently during the first critical minutes of a medical emergency through guided CPR support.","image":"/src/assets/banner-hotels.jpg"}'::jsonb, true),
  ('how-to-use','hero','fields',10,'Hero',
    '{"eyebrow":"Quick-start guide","title":"How to use CPR PRAYAS™","subtitle":"PRAYAS turns panic into protocol. From the moment you find an unresponsive person to the arrival of professional help, the device guides every compression with voice, light, and haptic feedback.","image":"/src/assets/banner-howto.jpg"}'::jsonb, true),
  ('faq','hero','fields',10,'Hero',
    '{"eyebrow":"Support & knowledge base","title":"Frequently asked questions","subtitle":"Everything about device mechanics, AHA compliance, battery maintenance, and institutional deployment of CPR PRAYAS™.","image":"/src/assets/banner-faq.jpg"}'::jsonb, true),
  ('contact','hero','fields',10,'Hero',
    '{"eyebrow":"Partner with us","title":"Request a live institutional demo & RFP procurement quotation","subtitle":"Connect with our MedTech clinical deployment team to evaluate CPR PRAYAS™ for your hospital, school district, hotel group, or emergency network.","image":"/src/assets/banner-contact.jpg"}'::jsonb, true)
ON CONFLICT DO NOTHING;

-- Ensure a unique (page_slug, section_key) so upserts are safe
CREATE UNIQUE INDEX IF NOT EXISTS page_sections_page_key_unique ON public.page_sections(page_slug, section_key);
