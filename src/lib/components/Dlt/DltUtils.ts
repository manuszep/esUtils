import { KeyedObject } from "../../../index";

export function hasAgent(agentId: string) {
  return agentId !== "" && agentId !== null && typeof agentId !== "undefined";
}

export function hasOneProspectPointOfSale(checkProspectSituation: KeyedObject) {
  return checkProspectSituation
    && checkProspectSituation.pointsOfSale !== undefined
    && checkProspectSituation.pointsOfSale.length === 1;
}

export function hasMoreThanOneProspectPointOfSale(checkProspectSituation: KeyedObject) {
  return checkProspectSituation
    && checkProspectSituation.pointsOfSale !== undefined
    && checkProspectSituation.pointsOfSale.length > 1;
}

export function hasOneFSMACompany(userFsmaCompanies: any) {
  return userFsmaCompanies
    && userFsmaCompanies !== undefined
    && userFsmaCompanies.length === 1;
}

export function hasMoreThanOneFSMACompany(userFsmaCompanies: any) {
  return userFsmaCompanies
    && userFsmaCompanies !== undefined
    && userFsmaCompanies.length > 1;
}

export function hasNoFSMACompanies(userFsmaCompanies: any) {
  return (userFsmaCompanies === undefined
    || userFsmaCompanies === null
    || (userFsmaCompanies !== undefined
      && userFsmaCompanies !== null
      && userFsmaCompanies <= 0));
}
