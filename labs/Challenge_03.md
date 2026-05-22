# Challenge 03: Actionable Security Visibility

### Estimated Duration: 45–60 Minutes

## Overview

In this challenge, you will enhance your cloud security posture by using AI to interpret complex access logs, identify abnormal access patterns, and generate least privilege remediation recommendations.

## Objectives

In this challenge, you will complete the following tasks:
- Task 1: Identify abnormal access patterns using Microsoft Sentinel
- Task 2: Detect anomalies using Azure AI Anomaly Detector
- Task 3: Correlate RBAC and activity logs using Azure OpenAI
- Task 4: Generate least privilege remediation recommendations
- Task 5: Enable continuous monitoring for access anomalies
- Task 6: Use Azure Copilot in Microsoft Sentinel to investigate suspicious access patterns

## Task 1: Identify abnormal access patterns using Microsoft Sentinel

1. On the Azure portal search bar, search for **Microsoft Sentinel (1)** and select it.
1. Select your Sentinel workspace.
1. From the left navigation pane, click on **Logs (1)**.
1. Query the `SigninLogs` and `AzureActivity` tables to look for unusual locations or risky sign-ins over the last 48 hours.

    ![](./media/c3/t1_1.png)

## Task 2: Detect anomalies using Azure AI Anomaly Detector

1. In the Sentinel Logs interface, modify your query to aggregate failed login attempts by location per hour.
1. Use the Anomaly Detector API to flag any unusual behavior (e.g., unexpected location access spikes or unusual API calls) from the aggregated data.

    ![](./media/c3/t2_1.png)

## Task 3: Correlate RBAC and activity logs using Azure OpenAI

1. Export the risky `AzureActivity` logs and the corresponding user's active RBAC role assignments.
1. Navigate to **Microsoft Foundry** -> **Playground**.
1. Paste the RBAC and Activity data, and prompt the model: `Correlate the following RBAC assignments with the activity logs and identify if there are over-privileged identities performing suspicious actions.`

    ![](./media/c3/t3_1.png)

## Task 4: Generate least privilege remediation recommendations

1. In the same Playground session, follow up with the prompt: `Generate least privilege remediation recommendations based on the actual usage data provided.`
1. Note the specific roles the AI suggests removing or modifying.

    ![](./media/c3/t4_1.png)

## Task 5: Enable continuous monitoring for access anomalies

1. Go back to **Microsoft Sentinel**.
1. Click on **Analytics (1)** from the left pane and then **+ Create (2)** -> **Scheduled query rule (3)**.
1. Paste the anomaly detection KQL query.
1. Configure the rule to trigger an Incident whenever the anomaly conditions are met, and click **Review + create**.

    ![](./media/c3/t5_1.png)

## Task 6: Use Azure Copilot in Microsoft Sentinel

1. Open an existing Incident in Microsoft Sentinel that was triggered by your anomaly rule.
1. Click on the **Copilot** icon.
1. Prompt Copilot: `Investigate this suspicious access pattern, summarize the associated risks, and suggest response actions.`
1. Review the generated incident summary.

  > **Congratulations** on completing the lab! Now, it's time to validate it. Here are the steps:
  > - Hit the Validate button for the corresponding task. If you receive a success message, you can proceed to the next task. 
  > - If not, carefully read the error message and retry the step.
 
<validation step="c3-validation-step" />

## Summary

In this challenge, you have completed the following:
- Identified and detected security anomalies
- Generated RBAC remediation recommendations via AI
- Enabled continuous security monitoring

### You have successfully completed this challenge. Kindly click **Next >>** to proceed further

![Launch Azure Portal](./media/new/2nct.png)
