import { CheckBoxElement } from "../../../utils/types";
import { BrainRegion, BamsRegion, BamsRegionConnection } from "../../../utils/api/types";
import { RegionConnectivity } from "./types";

const sortFunction = (a:string, b:string, order: string) => {
  if (order === "asc") {
    return a > b? 1 : a < b ? -1 : 0
  }

  return a < b ? 1 : a > b ? -1 : 0
}

export const sortRegionConnections = (
  connections: RegionConnectivity[],
  order: string,
  orderBy: "direction" | "region" | "strength" | "technique"
): RegionConnectivity[] => {
  if (orderBy === "region") {
      return connections.sort((a, b) => sortFunction(a.connectedRegion.name, b.connectedRegion.name, order));
  }

  return connections.sort((a, b) => sortFunction(a[orderBy], b[orderBy], order));
};

export const getFilteredConnections = (
  connections: RegionConnectivity[],
  directions: CheckBoxElement[],
  relTypes: CheckBoxElement[],
) => {
  const selectedDirections: string[] = directions
    .filter((d) => d.selected)
    .map((d) => d.name.toLocaleLowerCase());

  const selectedRelTypes: string[] = relTypes.filter(r => r.selected).map(r => r.name.toLocaleLowerCase());

  const filterConnections: RegionConnectivity[] = connections.filter((conn) =>
    selectedDirections.includes(conn.direction) && selectedRelTypes.includes(conn.strength)
  );

  return filterConnections;
};

const getRegionConnectivityHelper = (connections: BamsRegionConnection[], originalRegion: BamsRegion, direction: "efferent" | "afferent", baseObject: {id: string, name:string,mappingStrengthFrom: string }) => {
  const connectionMappings: RegionConnectivity[] = []
  connections.map( conn => {
    if(!conn.BamsRegion?.regionMappings) return connectionMappings;
    const connBaseObject = {
      ...baseObject,
      strength: conn.strength,
      technique: conn.technique,
      description: conn.description,
      reference: conn.reference,
      bamsRegionFrom: direction==="efferent" ? originalRegion : conn.BamsRegion,
      bamsRegionTo: direction==="afferent" ? originalRegion : conn.BamsRegion,
      direction,
    }

    conn.BamsRegion.regionMappings.map(mapping => {

      connectionMappings.push({
        ...connBaseObject,
        mappingStrengthTo: mapping.relationType,
        connectedRegion: mapping.BrainRegion,
      })
    });
  }

  )
  return connectionMappings;
}

export const getRegionConnectivity = (brainRegion: BrainRegion): RegionConnectivity[] => {
  let connectivities: RegionConnectivity[] = []
  if(!brainRegion.regionMappingsBams) return connectivities;

  brainRegion.regionMappingsBams.map(mapping => {
    if(!mapping.BamsRegion || (!mapping.BamsRegion.regionConnection?.from && !mapping.BamsRegion.regionConnection?.to)){ 
      return connectivities;
    }

    const baseObject = {
      id: brainRegion.id,
      name: brainRegion.name,
      mappingStrengthFrom: mapping.relationType
    }
    
    const outputs = getRegionConnectivityHelper(mapping.BamsRegion.regionConnection.from, mapping.BamsRegion, "efferent", baseObject);
    const inputs = getRegionConnectivityHelper(mapping.BamsRegion.regionConnection.to, mapping.BamsRegion, "afferent", baseObject);
    const connectivity = outputs.concat(inputs);
    connectivities = [...connectivities, ...connectivity]
  })
  return connectivities;
}

export const getConnectionId = (connection: RegionConnectivity): string => {
  return `${connection.direction}-${connection.id}-${connection.connectedRegion.id}-${connection.bamsRegionFrom.id}-${connection.bamsRegionTo.id}`
}