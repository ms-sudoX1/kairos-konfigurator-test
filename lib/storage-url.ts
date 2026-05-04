const SUPABASE_PUBLIC_BASE =
  "https://vmbyyqkfykdaznssofks.supabase.co/storage/v1/object/public/customer-media/kairos";

export const supabaseAsset = (path: string): string =>
  `${SUPABASE_PUBLIC_BASE}/${path.replace(/^\/+/, "")}`;
