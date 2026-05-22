# CloudOps AI: Intelligent Cloud Operations & Insights Portal

An interactive, high-fidelity, and glassmorphic Single Page Web Application designed to demonstrate and visualize the concepts taught in the **AI-Powered Cloud Operations on Azure** course.

This application allows you to simulate live cloud incidents, visualize telemetry anomalies, review security vulnerabilities, analyze cloud cost leakages, examine ML forecasted baselines, and query a simulated **Azure Copilot** using natural language!

---

## Features Mapping to Course Challenges

1. **📊 Dashboard Overview**: Centralized operations cockpit displaying live health status and highlights.
2. **⚡ Performance Observability (Challenge 1)**: Visualizes user request times correlated with database dependency delays, highlighting AI-detected latency anomalies.
3. **🛡️ Security Posture (Challenge 3)**: Audits active sign-in logs, geolocations, and admin operations. Shows suspicious identity risks and outputs **Least-Privilege AI Recommendations**.
4. **💰 Cost & Resource Optimizer (Challenge 4)**: Maps cloud spend trends, spotlights daily billing spikes, lists orphaned resources, and generates automated **PowerShell Cleanup Runbooks**.
5. **📈 Baselines & Forecasting (Challenge 5)**: Illustrates an AutoML forecasting model displaying historical baselines, confidence intervals, and out-of-bounds actual telemetry (memory leaks).
6. **💬 Azure Copilot Operations Center (Challenge 6)**: A natural language chatbot interface powered by simulated **GPT-4o** to analyze events, explain root causes, and provide remediation.
7. **🎛️ Incident Simulator Panel**: Sidebar controls that let you trigger specific cloud failures to watch the charts, alerts, and Copilot reactions dynamically.

---

## How to Run Locally

Since this dashboard is written in clean, modern vanilla HTML, CSS, and ES6 Javascript, you can run it locally with **zero installation** or configuration:

### Method 1: Direct File Open
1. Navigate to the `webapp` folder.
2. Double-click [index.html](file:///c:/Users/RajatKumar/OneDrive%20-%20Spektra%20Systems%20LLC/Desktop/AI-Powered%20Cloud%20Operations%20on%20Azure/webapp/index.html) to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

### Method 2: Local HTTP Server (Recommended)
If you wish to serve the files over an HTTP network context locally, run:
```bash
# Using Node.js (npx)
npx serve webapp

# Or using Python 3
python -m http.server 8000 --directory webapp
```
Then, open `http://localhost:3000` (for serve) or `http://localhost:8000` (for Python) in your browser.

---

## Deploying Directly to Azure

This application is ready to be deployed directly to Microsoft Azure. We recommend two simple deployment options:

### Option A: Azure Static Web Apps (Recommended & Free Tier)
Azure Static Web Apps is the fastest, easiest way to host static single-page web applications on Azure.

#### Method 1: Using the Azure Portal (Zero CLI)
1. Commit and push the `webapp` directory to your GitHub or Azure DevOps repository.
2. Search for **Static Web Apps** in the Azure Portal search bar and select it.
3. Click **+ Create** and configure:
   - **Resource Group**: Select your active resource group (`ai-ops-<DeploymentID>`).
   - **Name**: Enter `cloudops-ai-portal`.
   - **Plan type**: Select **Free: For hobby or personal projects**.
   - **Region**: Choose your nearest Azure region.
4. Under **Deployment Details**, select **GitHub** (or Azure DevOps) and sign in.
5. Choose your repository, branch (`main`), and click **Next: Build >**.
6. Set the **Build Presets** to **Custom**:
   - **App location**: `/webapp` (Points to the dashboard subdirectory)
   - **Api location**: Leave empty.
   - **Output location**: `.` (Since it's a raw static site)
7. Click **Review + Create**, then click **Create**.
8. Once deployment finishes, navigate to the resource and click the **URL** link to access your live portal!

---

### Option B: Azure App Service (HTML/Static Hosting)
If you want to host this in a standard Azure App Service Web App, you can deploy it using the Azure CLI.

1. Install the [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) if you haven't already.
2. Open your terminal or PowerShell, log in to your Azure account, and set your active subscription:
   ```powershell
   az login
   ```
3. Run the following command to deploy the static files as an App Service web app:
   ```powershell
   # Ensure you are inside the 'webapp' directory
   cd "c:\Users\RajatKumar\OneDrive - Spektra Systems LLC\Desktop\AI-Powered Cloud Operations on Azure\webapp"

   # Deploy the current folder directly
   az webapp up --name "cloudops-ai-portal-<DeploymentID>" --resource-group "ai-ops-<DeploymentID>" --html --location "eastus2"
   ```
4. The command will package the folder, provision a free Linux App Service plan, and deploy the HTML, CSS, and JS files. The URL will be printed on the screen once it completes!
