"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hasAgent(agentId) {
    return agentId !== "" && agentId !== null && typeof agentId !== "undefined";
}
exports.hasAgent = hasAgent;
function hasOneProspectPointOfSale(checkProspectSituation) {
    return checkProspectSituation
        && checkProspectSituation.pointsOfSale !== undefined
        && checkProspectSituation.pointsOfSale.length === 1;
}
exports.hasOneProspectPointOfSale = hasOneProspectPointOfSale;
function hasMoreThanOneProspectPointOfSale(checkProspectSituation) {
    return checkProspectSituation
        && checkProspectSituation.pointsOfSale !== undefined
        && checkProspectSituation.pointsOfSale.length > 1;
}
exports.hasMoreThanOneProspectPointOfSale = hasMoreThanOneProspectPointOfSale;
function hasOneFSMACompany(userFsmaCompanies) {
    return userFsmaCompanies
        && userFsmaCompanies !== undefined
        && userFsmaCompanies.length === 1;
}
exports.hasOneFSMACompany = hasOneFSMACompany;
function hasMoreThanOneFSMACompany(userFsmaCompanies) {
    return userFsmaCompanies
        && userFsmaCompanies !== undefined
        && userFsmaCompanies.length > 1;
}
exports.hasMoreThanOneFSMACompany = hasMoreThanOneFSMACompany;
function hasNoFSMACompanies(userFsmaCompanies) {
    return (userFsmaCompanies === undefined
        || userFsmaCompanies === null
        || (userFsmaCompanies !== undefined
            && userFsmaCompanies !== null
            && userFsmaCompanies <= 0));
}
exports.hasNoFSMACompanies = hasNoFSMACompanies;
