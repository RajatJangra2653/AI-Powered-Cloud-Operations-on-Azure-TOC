// Scoped to Resource Group by default to ensure 100% compatibility with restricted Azure Lab environments
targetScope = 'resourceGroup'

@minLength(1)
@maxLength(64)
@description('Name of the environment which is used to generate a short unique hash for resources.')
param environmentName string

@description('Primary location for all resources. Region must support Azure OpenAI (e.g. eastus2, swedencentral).')
param location string = resourceGroup().location

// CAF naming conventions loading
var abbreviations = loadJsonContent('./abbreviations.json')
var resourceToken = toLower(uniqueString(resourceGroup().id, environmentName, location))
var tags = { 'azd-env-name': environmentName }

// Orchestrate the services directly in current resource group scope
module resources './resources.bicep' = {
  name: 'resources-deployment'
  params: {
    location: location
    resourceToken: resourceToken
    abbreviations: abbreviations
    tags: tags
  }
}

// Outputs to CLI
output AZURE_STATIC_WEB_APP_URL string = resources.outputs.AZURE_STATIC_WEB_APP_URL
output AZURE_STATIC_WEB_APP_NAME string = resources.outputs.AZURE_STATIC_WEB_APP_NAME
output AZURE_OPENAI_ENDPOINT string = resources.outputs.AZURE_OPENAI_ENDPOINT
output AZURE_ANOMALY_DETECTOR_ENDPOINT string = resources.outputs.AZURE_ANOMALY_DETECTOR_ENDPOINT
