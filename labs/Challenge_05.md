# Challenge 05: Trend-Based Insights, Not Manual Investigation

### Estimated Duration: 45–60 Minutes

## Overview

In this challenge, you will automate the process of establishing operational baselines and predicting future behavior using machine learning and AI tools, moving away from manual log investigations.

## Objectives

In this challenge, you will complete the following tasks:
- Task 1: Establish baseline using Log Analytics historical data
- Task 2: Implement anomaly detection using AI Anomaly Detector
- Task 3: Apply forecasting using Azure ML AutoML
- Task 4: Detect deviations from baseline automatically
- Task 5: Generate insights using Azure OpenAI
- Task 6: Use Azure Copilot to interpret baseline deviations and generate anomaly insights

## Task 1: Establish baseline using Log Analytics historical data

1. Open your **Log Analytics workspace** and click on **Logs (1)**.
1. Write a query to pull 30 days of metrics for CPU and Memory to establish a normal operational baseline. Example:
    ```kusto
    Perf
    | where TimeGenerated > ago(30d)
    | summarize avg(CounterValue) by bin(TimeGenerated, 1h), CounterName
    ```

    ![](./media/c5/t1_1.png)

## Task 2: Implement anomaly detection using AI Anomaly Detector

1. Use the historical data retrieved from Task 1.
1. Feed this dataset into the Azure AI Anomaly Detector API to identify historical deviations from the norm.

    ![](./media/c5/t2_1.png)

## Task 3: Apply forecasting using Azure ML AutoML

1. Navigate to your **Azure Machine Learning** workspace.
1. Use the **Automated ML (AutoML)** feature to train a time-series forecasting model using the historical metric data.
1. View the forecasted future resource utilization based on the historical baseline.

    ![](./media/c5/t3_1.png)

## Task 4: Detect deviations from baseline automatically

1. Set up an automated mechanism (like an Azure Function or Logic App) to compare real-time metrics against the AutoML forecasted baseline.
1. Ensure the mechanism flags any metric that falls outside the forecasted confidence intervals.

    ![](./media/c5/t4_1.png)

## Task 5: Generate insights using Azure OpenAI

1. When a deviation is detected in Task 4, send the context (expected value vs actual value, timestamps, related metrics) to **Azure OpenAI**.
1. Prompt the AI: `Generate a human-readable insight explaining why this metric might have deviated from the baseline.`

    ![](./media/c5/t5_1.png)

## Task 6: Use Azure Copilot to interpret baseline deviations

1. Open **Azure Copilot**.
1. Prompt it with: `Interpret the recent baseline deviations in my Log Analytics workspace and generate comprehensive anomaly insights for my operations team.`
1. Review the generated insights.

  > **Congratulations** on completing the lab! Now, it's time to validate it. Here are the steps:
  > - Hit the Validate button for the corresponding task. If you receive a success message, you can proceed to the next task. 
  > - If not, carefully read the error message and retry the step.
 
<validation step="c5-validation-step" />

## Summary

In this challenge, you have completed the following:
- Established operational baselines and applied ML forecasting
- Automatically detected deviations
- Generated AI-driven insights to explain anomalies

### You have successfully completed this challenge. Kindly click **Next >>** to proceed further

![Launch Azure Portal](./media/new/2nct.png)
