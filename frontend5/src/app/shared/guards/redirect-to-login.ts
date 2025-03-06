import { redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { ESections } from "../constants/routing.constants";

export const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([ESections.login]);
