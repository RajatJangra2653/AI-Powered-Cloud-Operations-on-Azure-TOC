# Challenge 02: Proactive Infrastructure Reliability & Observability

### Estimated Duration: 45–60 Minutes

## Overview

In this challenge, you will shift from reactive troubleshooting to proactive reliability management by leveraging AI to uncover hidden infrastructure anomalies.

## Objectives

In this challenge, you will complete the following tasks:
- Task 1: Analyze latency and reliability signals using Azure Monitor
- Task 2: Detect anomalies using Azure AI Anomaly Detector
- Task 3: Correlate system metrics and dependencies
- Task 4: Use Azure OpenAI to interpret reliability patterns
- Task 5: Configure proactive observability alerts
- Task 6: Use Azure Copilot to analyze reliability signals and detect hidden anomalies across telemetry

## Task 1: Analyze latency and reliability signals using Azure Monitor

1. On the Azure portal search bar, search for **Azure Monitor (1)** and select it from the results.
1. Under **Insights**, click on **Virtual Machines (2)** or **App Services** to view the overall health and reliability signals of your deployed infrastructure.
1. Review the performance graphs for CPU, memory, and disk latency over the past 7 days.

    ![](./media/c2/t1_1.png)

## Task 2: Detect anomalies using Azure AI Anomaly Detector

1. Open your **Log Analytics workspace** linked to the Azure Monitor setup.
1. Write a KQL query that retrieves historical infrastructure metrics (e.g., `Perf` table for Memory usage).
1. Use the `series_decompose_anomalies()` function (which utilizes built-in anomaly detection logic) or pass the data directly to your provisioned Azure AI Anomaly Detector resource to identify subtle anomalies like slow memory leaks.

    ![](./media/c2/t2_1.png)

## Task 3: Correlate system metrics and dependencies

1. Create a **Workbook** in Azure Monitor.
1. Add a query that maps out system metrics (e.g., Virtual Machine CPU) against underlying dependencies (e.g., SQL Database DTU consumption).
1. Identify how a spike in database usage affects the web tier's reliability.

    ![](./media/c2/t3_1.png)

## Task 4: Use Azure OpenAI to interpret reliability patterns

1. Navigate to **Microsoft Foundry** and open the **Playground**.
1. Paste the correlated JSON output from your Azure Monitor Workbook.
1. Prompt the `gpt-4o` model with: `Interpret these reliability patterns and explain the potential impact on system uptime.`
1. Click **Send** and analyze the generated insights.

    ![](./media/c2/t4_1.png)

## Task 5: Configure proactive observability alerts

1. In Azure Monitor, navigate to **Alerts** and create a new **Alert rule**.
1. Choose a multi-dimensional metric such as **Available Memory** and apply dynamic thresholds.
1. In the **Condition** tab, set the threshold type to **Dynamic** so the alert relies on machine learning algorithms to determine normal behavior bounds.
1. Complete the alert setup and click **Review + create**.

    ![](./media/c2/t5_1.png)

## Task 6: Use Azure Copilot to analyze reliability signals

1. Open **Azure Copilot** in the Azure portal.
1. Ask Copilot: `Analyze the reliability signals for my resource group ai-ops-<inject key="Deployment ID" enableCopy="false"></inject> and detect any hidden anomalies across telemetry data.`
1. Review the output provided by Copilot for an executive summary of infrastructure health.

  > **Congratulations** on completing the lab! Now, it's time to validate it. Here are the steps:
  > - Hit the Validate button for the corresponding task. If you receive a success message, you can proceed to the next task. 
  > - If not, carefully read the error message and retry the step.
 
<validation step="c2-validation-step" />

## Summary

In this challenge, you have completed the following:
- Analyzed reliability signals
- Detected and interpreted anomalies using AI
- Configured dynamic observability alerts

### You have successfully completed this challenge. Kindly click **Next >>** to proceed further

![Launch Azure Portal](./media/new/2nct.png)
