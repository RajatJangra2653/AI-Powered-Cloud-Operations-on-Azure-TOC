// Scoped to Resource Group by default to ensure 100% compatibility with restricted Azure Lab environments
targetScope = 'resourceGroup'

@minLength(1)
@maxLength(64)
@description('Name of the environment which is used to generate a short unique hash for resources.')
param environmentName string

@description('Primary location for all resources. Region must support Azure OpenAI (e.g. eastus2, swedencentral).')
param location string = ''

@description('Name of the resource group (automatically filled by azd if deploying to existing group).')
param resourceGroupName string = ''

param principalId string = ''
param principalType string = 'User'

// CAF naming conventions loading
var abbreviations = loadJsonContent('./abbreviations.json')

// Define supported regions that support both Azure Static Web Apps and Azure OpenAI (gpt-4o)
var supportedLocations = [
  'eastus2'
  'swedencentral'
  'westeurope'
  'centralus'
  'eastasia'
]

// Fallback to eastus2 if the resource group location or selected location is not supported
var requestedLocation = empty(location) ? resourceGroup().location : location
var actualLocation = contains(supportedLocations, toLower(requestedLocation)) ? requestedLocation : 'eastus2'

var resourceToken = toLower(uniqueString(resourceGroup().id, environmentName, actualLocation))
var tags = { 'azd-env-name': environmentName }

// Orchestrate the services directly in current resource group scope
module resources './resources.bicep' = {
  name: 'resources-deployment'
  params: {
    location: actualLocation
    resourceToken: resourceToken
    abbreviations: abbreviations
    tags: tags
    principalId: principalId
    principalType: principalType
  }
}

// Outputs to CLI
output AZURE_STATIC_WEB_APP_URL string = resources.outputs.AZURE_STATIC_WEB_APP_URL
output AZURE_STATIC_WEB_APP_NAME string = resources.outputs.AZURE_STATIC_WEB_APP_NAME
output AZURE_OPENAI_ENDPOINT string = resources.outputs.AZURE_OPENAI_ENDPOINT
output APPLICATIONINSIGHTS_CONNECTION_STRING string = resources.outputs.APPLICATIONINSIGHTS_CONNECTION_STRING
output AZURE_LOG_ANALYTICS_WORKSPACE_ID string = resources.outputs.AZURE_LOG_ANALYTICS_WORKSPACE_ID
