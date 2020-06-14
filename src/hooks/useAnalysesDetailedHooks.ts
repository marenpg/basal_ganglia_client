import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const analysisDetailedQuery = gql`
  query analysisOnId($filter: _AnalysisFilter) {
    Analysis(filter: $filter) {
      id
      name
      numberOfAnimals
      brainRegions {
        id
        name
      }
      experiment {
        id
        name

        animalStatus
        ageLowerLimit
        ageUpperLimit
        weightLowerLimit
        weightUpperLimit
        source {
          id
          title
          type
          insertedDate
          publicationYear
          rawDataAvailable
          sourceName
          collectedFrom {
            name
            identifier
          }
        }
        anaesthetic {
          id
          name
        }
        perfusionFixMedium {
          id
          name
        }
      }
      specimen {
        id
        name
        form
        order
        specie {
          id
          name
        }
        strain {
          id
          name
          ontology
        }
        substrain {
          id
          name
          ontology
        }
        transgenicLine {
          id
          name
          RRID
        }
        sex {
          id
          name
          ontology
        }
        ageCategory {
          id
          name
          description
          ontology
        }
      }
      dataType
      objectOfInterest {
        NeuralStructure {
          id
          name
          ontology
        }
        recognitionCriteria
      }
      cellTypePutative {
        id
        name
      }
      visualizationMethod {
        name
      }
      sectioningDetail {
        sectionThickness
        sectionOrientation
        sectioningInstrument {
          id
          name
        }
      }
      reporterIncubations {
        id
        order
        concentration
        time
        temperature
        reporter {
          name
          type
          rrid
          comment
          originSpecie
          target {
            id
            phenotype
          }
          label {
            id
            name
          }
        }
      }
      quantitations {
        id
        name
        estimateRelevance
        sectionSampling
        samplingFraction
        subsectionalSampling
        finalEstimateBasis
        originalExtent
        number
        numberSD
        density
        densityUnit
        densitySD
        volumetricDensity
        estimateExtraction

        targetCellularRegion {
          id
          name
          ontology
        }
        targetCell {
          id
          name
        }
        regionRecord {
          id
          name
          coverage
          specificity
          numberOfOriginalRegions
          originalRegionRetained
          parcellationScheme
          atlasCoordinates
          illustration
          semanticDescription
          annotatedImages
          regionalCharacteristics
          isAtlasRegion
          serialSections
          collectorsComment
          documentationScore

          primaryRegion {
            name
          }
        }
        regionZone {
          id
          name
          ontology
        }
        software {
          id
          name
          rrid
        }
        stereology {
          id
          name
          probe
          identificationFeature
          disectorHeight
          areaSubfraction
          heightSubfraction
          investigatedSections
          investigatedFields
          countedObjects
          coefficientOfError
          estimatedVolume
          volumeUnit
          anyExceptProbe
        }
        relatedDistributions {
          id
          name
          sectionSampling
          samplingFraction
          subsectionalSampling
          finalEstimateBasis
          distribution
          distributionDimensions
          analysisTypePrimary
          analysisTypeSecondary
        }
        calculations {
          id
          description
        }
      }
      cellMorphologies {
        id
        name
        neuromorphoId
        somaSurface
        numberOfStems
        numberOfBifurcations
        numberOfBranches
        overallWidth
        overallHeight
        overallDepth
        averageBranchDiameter
        averageContraction
        totalArborLength
        totalArborSurface
        totalArborVolume
        maxEuclideanDistance
        maxPathDistance
        maxBranchOrder
        totalFragmentation
        partitionAsymmetry
        averageRalls
        averageBifurcationAngleLocal
        averageBifurcationAngleRemote
        fractalDimension
        physicalIntegrity
        structuralDomains
        morphologicalAttributes
        originalFormat

        regionRecord {
          id
          name
          coverage
          specificity
          numberOfOriginalRegions
          originalRegionRetained
          parcellationScheme
          atlasCoordinates
          illustration
          semanticDescription
          annotatedImages
          regionalCharacteristics
          isAtlasRegion
          serialSections
          collectorsComment
          documentationScore

          primaryRegion {
            name
          }
        }
        regionZone {
          id
          name
          ontology
        }
        reconstructionMethod {
          id
          name
          rrid
        }
      }
      distributions {
        id
        name
        sectionSampling
        samplingFraction
        subsectionalSampling
        finalEstimateBasis
        distribution
        distributionDimensions
        analysisTypePrimary
        analysisTypeSecondary

        regionRecord {
          id
          name
          coverage
          specificity
          numberOfOriginalRegions
          originalRegionRetained
          parcellationScheme
          atlasCoordinates
          illustration
          semanticDescription
          annotatedImages
          regionalCharacteristics
          isAtlasRegion
          serialSections
          collectorsComment
          documentationScore

          primaryRegion {
            name
          }
        }
        cellularRegion {
          id
          name
          ontology
        }
        software {
          id
          name
          rrid
        }
        stereology {
          id
          name
          probe
          identificationFeature
          disectorHeight
          areaSubfraction
          heightSubfraction
          investigatedSections
          investigatedFields
          countedObjects
          coefficientOfError
          estimatedVolume
          volumeUnit
          anyExceptProbe
        }
        relatedQuantitation {
          id
          name
          estimateRelevance
          sectionSampling
          samplingFraction
          subsectionalSampling
          finalEstimateBasis
          originalExtent
          number
          numberSD
          density
          densityUnit
          densitySD
          volumetricDensity
          estimateExtraction
        }
      }
      electronMicroscopes {
        id
        name
        gridType
        magnification
        microscope {
          id
          type
          ontology
        }
      }
      lightFluorescenceMicroscopes {
        id
        name
        mountingMedium
        refractionMedium
        numericalAperature
        objectiveLens
        totalMagnification
        pixelSize
        z_stack
        opticalSliceSize
        microscope {
          id
          type
          ontology
        }
      }
    }
  }
`;

export default <T>(
  id: string
): {
  loading?: any;
  error?: any;
  data?: T;
  refetch?: any;
} => {
  return useQuery(analysisDetailedQuery, {
    fetchPolicy: "network-only",
    variables: {
      filter: {
        id,
      },
    },
  });
};