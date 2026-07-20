GRANT USAGE ON TYPE public.app_role TO authenticated;
GRANT USAGE ON TYPE public.app_role TO service_role;

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

GRANT SELECT ON public.page_sections TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_sections TO authenticated;
GRANT ALL ON public.page_sections TO service_role;

GRANT INSERT ON public.demo_requests TO anon;
GRANT INSERT ON public.demo_requests TO authenticated;
GRANT ALL ON public.demo_requests TO service_role;