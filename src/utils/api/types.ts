export interface BrainRegion {
  id: string;
  name: string;
  abbreviation?: string;
  specie?: Specie;
  partOf?: BrainRegion;
  subRegions: BrainRegion[];
  nomenclature?: Nomenclature;
  cellsObserved: CellType[];
  analyses: Analysis[];
  regionMappingsBams: RegionMapping[];
}

export interface RegionMapping {
  relationType: string;
  BamsRegion: BamsRegion;
}

export interface BamsRegion {
  id: string;
  name: string;
  description: string;
  regionConnection: BamsRegionConnectionConnections;
  regionMappings: BamsRegionMapping[];
}

export interface BamsRegionConnectionConnections {
  from: BamsRegionConnection[];
  to: BamsRegionConnection[];
}

export interface BamsRegionConnection {
  BamsRegion: BamsRegion;
  strength: string;
  technique: string;
  description: string;
  reference: string;
}

export interface BamsRegionMapping {
  relationType: string;
  description: string;
  BrainRegion: BrainRegion;
}

export interface RegionRecord {
  id: string;
  name: string;
  coverage: string;
  specificity: string;
  numberOfOriginalRegions: number;
  originalRegionRetained: number;
  parcellationScheme: string;
  atlasCoordinates: string;
  illustration: string;
  semanticDescription: string;
  annotatedImages: string;
  regionalCharacteristics: string;
  isAtlasRegion: string;
  serialSections: string;
  collectorsComment: string;
  documentationScore: number;

  primaryRegion: BrainRegion;
  secondaryRegion: BrainRegion;
}

export interface RegionZone {
  id: string;
  name: string;
  ontology: string;
}

export interface Nomenclature {
  id: string;
  name: string;
  version: string;
  authors: string;
  published: number;
  publicationType: string;
  doi: string;
  preferred: number;

  specie: Specie;
  strain: Strain;
}

export interface RegionOther {
  id: string;
  name: string;
  abbreviation: string;
  comments: string;
  originalRegionRecord: OriginalRegionRecord;
}

export interface OriginalRegionRecord {
  from: RegionOther;
  to: Nomenclature;
  originalCoordinateMinAP: number;
  originalCoordinateMaxAP: number;
  originalCoordinateMinDV: number;
  originalCoordinateMaxDV: number;
  originalCoordinateMinML: number;
  originalCoordinateMaxML: number;
}

export interface CellPhenotype {
  id: string;
  name: string;
  ontology: string;
  category: CellPhenotypeCategory;
}

export interface CellPhenotypeCategory {
  id: string;
  name: string;
  phenotypes: CellPhenotype;
}

export interface CellDescription {
  id: string;
  description: string;
  iri: string;
}

export interface CellType {
  id: string;
  name: string;
  ontology: string;

  description: CellDescription;
  classMembership: CellClass;
  observedInRegions: BrainRegion[];
  observedInSpecies: Specie[];
  analyses: Analysis[];
}

export interface CellClass {
  id: string;
  name: string;
  ontology: string;
  description: CellDescription;
  groupMembership: CellGroup;
  cellTypesInClass: CellType[];
}

export interface CellGroup {
  id: string;
  name: string;
  ontology: string;
  description: CellDescription;
  cellClassesInGroup: CellClass[];
}

export interface NeuralStructure {
  id: string;
  name: string;
  ontology: string;
}

export interface CellularRegion {
  id: string;
  name: string;
  ontology: string;
}

export interface Specimen {
  id: string;
  name: string;
  form: string;
  order: string;
  specie: Specie;
  strain: Strain;
  substrain: Substrain;
  transgenicLine: TransgenicLine;
  sex: Sex;
  ageCategory: AgeCategory;
}

export interface Specie {
  id: string;
  name: string;
  ontology: string;
  specimens: Specimen[];
}

export interface Strain {
  id: string;
  name: string;
  ontology: string;
  comesFrom: Specie;
  substrains: Substrain[];
}

export interface Substrain {
  id: string;
  name: string;
  ontology: string;
}

export interface Sex {
  id: string;
  name: string;
  ontology: string;
}

export interface AgeCategory {
  id: string;
  name: string;
  description: string;
  ontology: string;
  specie: Specie;
}

export interface TransgenicLine {
  id: string;
  name: string;
  RRID: string;
}

export interface Source {
  id: string;
  title: string;
  type: string;
  insertedDate: string;
  publicationYear: number;
  sourceName: string;
  rawDataAvailable: string;
  collectedFrom: SourceOrigin;
}

export interface SourceOrigin {
  id: string;
  name: string;
  identifier: string;
  repositories: Source[];
}

export interface ConsideredPaper {
  id: string;
  title: string;
  publishedYear: number;
  firstAuthor: string;
  isIncluded: boolean;

  publishedIn: SourceOrigin;
  exclustionReason: ExclusionReason;
  collectedFrom: SourceOrigin;
}

export interface ExclusionReason {
  reason: string;
  papersExcludedWithReasion: ConsideredPaper[];
}

export interface Calculation {
  id: string;
  description: string;
}

export interface StereologyDetail {
  id: string;
  name: string;
  probe: string;
  identificationFeature: string;
  disectorHeight: number;
  areaSubfraction: number;
  heightSubfraction: number;
  investigatedSections: number;
  investigatedFields: number;
  countedObjects: number;
  coefficientOfError: number;
  estimatedVolume: number;
  volumeUnit: string;
  anyExceptProbe: number;
}

export interface Distribution {
  id: string;
  name: string;
  sectionSampling: string;
  samplingFraction: string;
  subsectionalSampling: string;
  finalEstimateBasis: string;
  distribution: string;
  distributionDimensions: string;
  analysisTypePrimary: string;
  analysisTypeSecondary: string;

  cellularTargetRegion: CellularTargetRegion;
  regionRecord: RegionRecord;
  software: Software;
  stereology: StereologyDetail;
  relatedQuantitation: Quantitation;
  analysis: Analysis;
}

export interface CellularTargetRegion {
  CellularRegion: CellularRegion;
  cytochemicalId: string;
}

export interface CellMorphology {
  id: string;
  name: string;
  neuromorphoId: string;
  somaSurface: number;
  numberOfStems: number;
  numberOfBifurcations: number;
  numberOfBranches: number;
  overallWidth: number;
  overallHeight: number;
  overallDepth: number;
  averageBranchDiameter: number;
  averageContraction: number;
  totalArborLength: number;
  totalArborSurface: number;
  totalArborVolume: number;
  maxEuclideanDistance: number;
  maxPathDistance: number;
  maxBranchOrder: number;
  totalFragmentation: number;
  partitionAsymmetry: number;
  averageRalls: number;
  averageBifurcationAngleLocal: number;
  averageBifurcationAngleRemote: number;
  fractalDimension: number;
  physicalIntegrity: string;
  structuralDomains: string;
  morphologicalAttributes: string;
  originalFormat: string;

  regionRecord: RegionRecord;
  regionZone: RegionZone;
  reconstructionMethod: Software;
  morphology: Neuromorpho;
}

export interface Neuromorpho {
  id: string;
  href: string;
  base64: string;
  archive: string;
  dois: string;
}

export interface Quantitation {
  id: string;
  name: string;
  estimateRelevance: string;
  sectionSampling: string;
  samplingFraction: string;
  subsectionalSampling: string;
  finalEstimateBasis: string;
  originalExtent: string;
  number: number;
  numberSD: number;
  density: string;
  densityUnit: string;
  densitySD: string;
  volumetricDensity: number;
  estimateExtraction: string;

  targetCellularRegion: CellularRegion;
  targetCell: CellType;
  regionRecord: RegionRecord;
  regionZone: RegionZone;
  software: Software;
  stereology: StereologyDetail;
  relatedDistributions: Distribution[];
  calculations: Calculation[];
  analysis: Analysis;
}

export interface DataType {
  id: string;
  name: string;
  regionRecord: RegionRecord;
  regionZone?: RegionZone;
}

export interface ObjectOfInterest {
  NeuralStructure: NeuralStructure;
  recognitionCriteria: string;
}

export interface Analysis {
  id: string;
  name: string;
  numberOfAnimals: number;
  shrinkageConnection: string;
  dataType: string;

  experiment: Experiment;
  specimen: Specimen;
  objectOfInterest: ObjectOfInterest;
  cellTypePutative: CellType;
  visualizationMethod: VisualizationProtocol;
  sectioningDetail: SectioningDetail;
  reporterIncubations: ReporterIncubation[];

  dataTypes: DataType[];
  quantitations: Quantitation[];
  cellMorphologies: CellMorphology[];
  distributions: Distribution[];
  electronMicroscopes: ElectronMicroscopeDetail[];
  lightFluorescenceMicroscopes: LightFluorescenceMicroscopeDetail[];
  brainRegions: BrainRegion[];
  similarAnalyses: AnalysisSimilarityRelation;
}

export interface AnalysisSimilarity {
  Analysis: Analysis;
  score: number;
}

export interface AnalysisSimilarityRelation {
  from: AnalysisSimilarity[];
  //to: AnalysisSimilarity;
}

export interface Experiment {
  id: string;
  name: string;
  animalStatus: string;
  ageLowerLimit: number;
  ageUpperLimit: number;
  weightLowerLimit: number;
  weightUpperLimit: number;

  source: Source;
  anaesthetic: Solution;
  perfusionFixMedium: Solution;

  analyses: Analysis[];
  brainRegions: BrainRegion[];
}

export interface SectioningDetail {
  SectioningInstrument: SectioningInstrument;
  sectionThickness: number;
  sectionOrientation: string;
}

export interface SectioningInstrument {
  id: string;
  name: string;
}

export interface ReporterIncubation {
  Reporter: Reporter;
  order: string;
  concentration: string;
  time: string;
  temperature: string;
}

export interface Reporter {
  id: string;
  name: string;
  type: string;
  rrid: string;
  comment: string;
  originSpecie: string;

  target: ReporterTarget;
  label: ReporterLabel;
}

export interface ReporterLabel {
  id: string;
  name: string;
}

export interface ReporterTarget {
  id: string;
  phenotype: string;
}

export interface VisualizationProtocol {
  id: string;
  name: string;
  ontology: string;
}

export interface Software {
  id: string;
  name: string;
  rrid: string;
}

export interface Solution {
  id: string;
  name: string;
}

export interface Microscope {
  id: string;
  type: string;
  ontology: string;
}

export interface ElectronMicroscopeDetail {
  id: string;
  name: string;
  gridType: string;
  magnification: number;
  microscope: Microscope;
}

export interface LightFluorescenceMicroscopeDetail {
  id: string;
  name: string;
  refractionMedium: string;
  numericalAperature: number;
  objectiveLens: string;
  totalMagnification: string;
  pixelSize: number;
  z_stack: boolean;
  opticalSliceSize: string;
  mountingMedium: Solution;
  microscope: Microscope;
}
