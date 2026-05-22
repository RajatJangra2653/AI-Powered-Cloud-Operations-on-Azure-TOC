targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the environment which is used to generate a short unique hash for resources.')
param environmentName string

@description('Primary location for all resources. Region must support Azure OpenAI (e.g. eastus2, swedencentral).')
param location string = 'eastus2'

// CAF naming conventions loading
var abbreviations = loadJsonContent('./abbreviations.json')
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))
var tags = { 'azd-env-name': environmentName }

// Create a resource group to hold our architecture
resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: '${abbreviations.resourceGroup}${environmentName}'
  location: location
  tags: tags
}

// Orchestrate the resource group services
module resources './resources.bicep' = {
  name: 'resources-deployment'
  scope: rg
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
