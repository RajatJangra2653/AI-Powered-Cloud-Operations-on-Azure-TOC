# Challenge 04: Cost Management & Cost Anomaly Detection

### Estimated Duration: 45–60 Minutes

## Overview

In this challenge, you will use AI to gain control over cloud spend, identify waste, detect abnormal spending patterns, and predict future costs based on operational trends.

## Objectives

In this challenge, you will complete the following tasks:
- Task 1: Analyze cost trends using Azure Cost Management
- Task 2: Detect abnormal spending patterns using AI Anomaly Detector
- Task 3: Use Azure OpenAI to identify cost drivers
- Task 4: Build reporting for unused/orphaned resources
- Task 5: Automate cleanup recommendations
- Task 6: Use Azure Copilot to analyze cost data and highlight top cost drivers and anomalies

## Task 1: Analyze cost trends using Azure Cost Management

1. Search for **Cost Management + Billing (1)** in the Azure portal and open it.
1. From the left pane, click on **Cost analysis (1)** under the Cost Management section.
1. Review the cost analysis dashboard to understand current spending trends and view the accumulated cost for your resource group.

    ![](./media/c4/t1_1.png)

## Task 2: Detect abnormal spending patterns using AI Anomaly Detector

1. In the Cost analysis view, look for the **Anomaly detection** insights (or use the preview feature for Cost Anomalies).
1. Alternatively, export daily cost data and use the Azure AI Anomaly Detector to spot unexpected spikes in daily spend programmatically.

    ![](./media/c4/t2_1.png)

## Task 3: Use Azure OpenAI to identify cost drivers

1. Export the billing breakdown (cost by resource/service) to a CSV or JSON format.
1. Go to the **Microsoft Foundry Playground**.
1. Paste the cost data and prompt the AI: `Analyze this billing data and identify the primary cost drivers behind the recent anomalies. Highlight resources that experienced the largest daily spike.`

    ![](./media/c4/t3_1.png)

## Task 4: Build reporting for unused/orphaned resources

1. Open **Azure Resource Graph Explorer (1)** from the Azure portal search bar.
1. Run a custom query to identify unused or orphaned resources (e.g., unattached Managed Disks, Public IPs not associated with a NIC).
    ```kusto
    Resources 
    | where type has "microsoft.compute/disks" 
    | where properties.diskState == "Unattached"
    ```
1. Note the list of orphaned resources.

    ![](./media/c4/t4_1.png)

## Task 5: Automate cleanup recommendations

1. Take the output from Task 4 and paste it into the **Microsoft Foundry Playground**.
1. Prompt the AI: `Generate an automated PowerShell runbook script to clean up and delete these specific orphaned resources.`
1. Review the generated script recommendations.

    ![](./media/c4/t5_1.png)

## Task 6: Use Azure Copilot to analyze cost data

1. Open **Azure Copilot** in the Azure portal.
1. Ask Copilot: `Analyze my cost data for the current month. Highlight the top cost drivers and any cost anomalies that have occurred in my subscription.`
1. Review the comprehensive summary provided by Copilot.

  > **Congratulations** on completing the lab! Now, it's time to validate it. Here are the steps:
  > - Hit the Validate button for the corresponding task. If you receive a success message, you can proceed to the next task. 
  > - If not, carefully read the error message and retry the step.
 
<validation step="c4-validation-step" />

## Summary

In this challenge, you have completed the following:
- Analyzed cost trends and detected spending anomalies
- Identified unused/orphaned resources and generated cleanup scripts
- Summarized top cost drivers using Azure Copilot

### You have successfully completed this challenge. Kindly click **Next >>** to proceed further

![Launch Azure Portal](./media/new/2nct.png)
