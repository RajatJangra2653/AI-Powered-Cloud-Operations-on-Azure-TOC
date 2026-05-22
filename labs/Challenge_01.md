# Challenge 01: Operations First, Not Development-Focused

### Estimated Duration: 45–60 Minutes

## Overview

In this challenge, you will shift from traditional monitoring to AI-assisted telemetry analysis. You will identify latency trends, detect deviations using Azure AI Anomaly Detector, and explain degradation patterns using Azure OpenAI.

## Objectives

In this challenge, you will complete the following tasks:
- Task 1: Identify latency trends using Application Insights and Azure Monitor
- Task 2: Detect deviations using Azure AI Anomaly Detector
- Task 3: Correlate CPU, dependencies, and response time signals
- Task 4: Use Azure OpenAI to explain degradation patterns
- Task 5: Configure proactive alerts for gradual performance issues
- Task 6: Use Azure Copilot in Azure Monitor to summarize latency trends and identify root cause signals

## Task 1: Identify latency trends using Application Insights and Azure Monitor

1. On the Azure portal search bar, search for **Application Insights (1)** and select **Application Insights (2)** from the results.

    ![](./media/c1/t1_1.png)

1. Select your Application Insights instance **appinsights-<inject key="Deployment ID" enableCopy="false"></inject>**.

1. From the left navigation pane, under **Investigate**, click **Performance (1)**.
1. Adjust the time range to **Last 24 hours (2)** and review the **Response time (3)** graph for any gradual latency degradation.

    ![](./media/c1/t1_2.png)

## Task 2: Detect deviations using Azure AI Anomaly Detector

1. Navigate to your **Azure AI Anomaly Detector** resource in the Azure portal.
1. Copy the **Endpoint** and **Key 1** from the **Keys and Endpoint** section.
1. Open Azure Data Explorer or Log Analytics workspace and execute a query to pass the Application Insights telemetry to the Anomaly Detector API.
1. Review the output to identify flagged deviations in the normal application response times.

    ![](./media/c1/t2_1.png)

## Task 3: Correlate CPU, dependencies, and response time signals

1. In the Log Analytics Workspace, create a new **Query (1)**.
1. Write a KQL query that joins the `performanceCounters` table (CPU) with `dependencies` (call durations) and `requests` (response times).
1. Click **Run (2)** and visualize the data as a time chart to find common denominators for the latency.

    ![](./media/c1/t3_1.png)

## Task 4: Use Azure OpenAI to explain degradation patterns

1. Navigate to **Microsoft Foundry** and open your AI Hub.
1. Launch the **Playground (1)** and select your deployed **gpt-4o** model.
1. Copy the correlated log patterns from Task 3 and paste them into the chat window.
1. Prompt the model with: `Analyze these log patterns and explain the root cause of the degradation in plain text.` **(2)**
1. Click **Send (3)** and review the AI's explanation.

    ![](./media/c1/t4_1.png)

## Task 5: Configure proactive alerts for gradual performance issues

1. In Azure Monitor, navigate to **Alerts (1)** and click **+ Create (2)** -> **Alert rule (3)**.

    ![](./media/c1/t5_1.png)

1. Select your Application Insights instance as the scope.
1. Set the condition using a **Custom log search** query that triggers when gradual performance issues are detected by the Anomaly Detector over a rolling 1-hour window.
1. Configure the action group and alert details, then click **Review + create**.

## Task 6: Use Azure Copilot in Azure Monitor

1. Go back to your **Azure Monitor** overview page.
1. Click on the **Copilot** icon in the top navigation bar.
1. In the chat interface, type: `Summarize the latency trends for my web application over the last 24 hours and highlight root cause signals based on the latest metrics.`
1. Review Copilot's response to validate your findings.

  > **Congratulations** on completing the lab! Now, it's time to validate it. Here are the steps:
  > - Hit the Validate button for the corresponding task. If you receive a success message, you can proceed to the next task. 
  > - If not, carefully read the error message and retry the step, following the instructions in the lab guide.
 
<validation step="c1-validation-step" />

## Summary

In this challenge, you have completed the following:
- Identified latency trends
- Detected deviations and correlated signals
- Leveraged AI to explain and alert on performance issues

### You have successfully completed this challenge. Kindly click **Next >>** to proceed further

![Launch Azure Portal](./media/new/2nct.png)
