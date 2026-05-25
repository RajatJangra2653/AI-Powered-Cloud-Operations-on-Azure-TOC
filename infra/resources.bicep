param location string
param resourceToken string
param abbreviations object
param tags object

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
