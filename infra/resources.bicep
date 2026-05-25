param location string
param resourceToken string
param abbreviations object
param tags object
param principalId string = ''
param principalType string = 'User'

// 1. Log Analytics Workspace (Challenge 1, 2, 5 logging baseline)
resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2021-12-01-preview' = {
  name: '${abbreviations.logAnalyticsWorkspace}${resourceToken}'
  location: location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
  }
  tags: tags
}

// 2. Application Insights (Challenge 1, 2 metric collection)
resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: '${abbreviations.appInsights}${resourceToken}'
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalytics.id
  }
  tags: tags
}

// 3. Azure OpenAI Account (Challenge 1, 2, 3, 5, 6 dynamic assistant)
resource openAi 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: 'openai-${resourceToken}'
  location: location
  kind: 'OpenAI'
  sku: {
    name: 'S0'
  }
  properties: {
    customSubDomainName: 'openai-${resourceToken}'
    publicNetworkAccess: 'Enabled'
  }
  tags: tags
}

// Model deployment - gpt-4o-mini (standard engine)
resource gpt4oMini 'Microsoft.CognitiveServices/accounts/deployments@2023-05-01' = {
  parent: openAi
  name: 'gpt-4o-mini'
  sku: {
    name: 'GlobalStandard'
    capacity: 10
  }
  properties: {
    model: {
      format: 'OpenAI'
      name: 'gpt-4o-mini'
      version: '2024-07-18'
    }
  }
}

// 5. Azure Static Web App (hosts the glassmorphic operations dashboard)
// Tagged with azd-service-name to bind SWA to the azd service
resource staticWebApp 'Microsoft.Web/staticSites@2022-03-01' = {
  name: '${abbreviations.staticWebApp}${resourceToken}'
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {}
  tags: union(tags, {
    'azd-service-name': 'web'
  })
}

// Exports
output AZURE_STATIC_WEB_APP_URL string = staticWebApp.properties.defaultHostname
output AZURE_STATIC_WEB_APP_NAME string = staticWebApp.name
output AZURE_OPENAI_ENDPOINT string = openAi.properties.endpoint
output APPLICATIONINSIGHTS_CONNECTION_STRING string = appInsights.properties.ConnectionString
output AZURE_LOG_ANALYTICS_WORKSPACE_ID string = logAnalytics.properties.customerId

// 6. Role Assignment for Deployer (Contributor role on the Static Web App)
// This resolves the 403 AuthorizationFailed error during the azd deployment phase.
resource staticWebAppRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (!empty(principalId)) {
  name: guid(staticWebApp.id, principalId, 'b24988ac-6180-42a0-ab88-20f7382dd24c')
  scope: staticWebApp
  properties: {
    principalId: principalId
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'b24988ac-6180-42a0-ab88-20f7382dd24c') // Contributor
    principalType: principalType
  }
}
