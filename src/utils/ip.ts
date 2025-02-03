import { AppModules, EModuleKey } from "@/services/base/constant";

const ipRoot = APP_CONFIG_IP_ROOT; // ip dev

// Ip Chính => Mặc định dùng trong các useInitModel
const ip3 = ipRoot; // ip dev
// const ip3 = 'http://localhost:3000' ; // ip dev

// Ip khác
const ipNotif = ipRoot + "notification"; // ip dev
const ipSlink = ipRoot + "slink"; // ip dev

const currentRole = EModuleKey.TCNS;
const oneSignalRole = EModuleKey.CONG_CAN_BO;

// DO NOT TOUCH
const keycloakClientID = AppModules[currentRole].clientId;
const keycloakAuthority = APP_CONFIG_KEYCLOAK_AUTHORITY;
const resourceServerClientId = `${APP_CONFIG_PREFIX_OF_KEYCLOAK_CLIENT_ID}auth`;
const keycloakAuthEndpoint = APP_CONFIG_KEYCLOAK_AUTHORITY + "/protocol/openid-connect/auth";
const keycloakTokenEndpoint = APP_CONFIG_KEYCLOAK_AUTHORITY + "/protocol/openid-connect/token";
const keycloakUserInfoEndpoint = APP_CONFIG_KEYCLOAK_AUTHORITY + "/protocol/openid-connect/userinfo";
const sentryDSN = APP_CONFIG_SENTRY_DSN;
const oneSignalClient = APP_CONFIG_ONE_SIGNAL_ID;

export {
  ip3,
  ipNotif,
  ipSlink,
  currentRole,
  oneSignalRole,
  keycloakClientID,
  resourceServerClientId,
  keycloakAuthEndpoint,
  keycloakTokenEndpoint,
  keycloakUserInfoEndpoint,
  keycloakAuthority,
  sentryDSN,
  oneSignalClient,
};
