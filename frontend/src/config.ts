import { z } from "zod";
import packageJson from '../package.json';


const ConfigSchema = z.object({
  kindeDomain: z.string().nonempty("VITE_APP_KINDE_DOMAIN is required"),
  kindeClientId: z.string().nonempty("VITE_APP_KINDE_CLIENT_ID is required"),
  backendApiBaseUrl: z.string().nonempty("VITE_APP_BACKEND_API_BASE_URL is required"),
  stripePublicKey: z.string().nonempty("VITE_STRIPE_PUBLIC_KEY is required"),
});

const validatedConfig = ConfigSchema.parse({
  kindeDomain: import.meta.env.VITE_APP_KINDE_DOMAIN,
  kindeClientId: import.meta.env.VITE_APP_KINDE_CLIENT_ID,
  backendApiBaseUrl: import.meta.env.VITE_APP_BACKEND_API_BASE_URL,
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
});

// Export individual values for backward compatibility
export const secretKey = import.meta.env.VITE_APP_SECRET_KEY ?? 'unaChiaveSegreta';
export const authorization = import.meta.env.VITE_APP_AUTHORIZATION ?? 'authorization';
export const randomBg = 'https://source.unsplash.com/random?wallpapers';
export const mainColor = '#FF9F0A';
export const secondaryColor = '#1E1E1E';
export const Version = packageJson.version;
export const kindeClientID = validatedConfig.kindeClientId;
export const kindeDomain = validatedConfig.kindeDomain;
export const beUrl = validatedConfig.backendApiBaseUrl;
export const stripePublicKey = validatedConfig.stripePublicKey;

export default validatedConfig;