export const oauthConfig = {
    clientId: process.env.REACT_APP_FHIR_CLIENT_ID,
    redirectUri: "http://localhost:3000/connectingrecords",
    authorizeUrl: "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize",
    tokenUrl: "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token",
    scope: "openid",
    audience: "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4",
  };
  