# Challenge 06: Custom, Purpose-Built Experience

### Estimated Duration: 45–60 Minutes

## Overview

In this challenge, you will build a unified, intelligent operational dashboard that aggregates insights across all domains (monitoring, security, and cost) and enables natural language querying.

## Objectives

In this challenge, you will complete the following tasks:
- Task 1: Aggregate signals from monitoring, cost, and security systems
- Task 2: Generate summaries using Azure OpenAI
- Task 3: Store insights using Azure AI Search
- Task 4: Enable natural language querying
- Task 5: Highlight risks, anomalies, and recommendations
- Task 6: Use Azure Copilot to generate a unified operational summary across monitoring, cost, and security

## Task 1: Aggregate signals from monitoring, cost, and security systems

1. Review the data collected from previous challenges (Application Insights, Sentinel alerts, Cost anomalies).
1. Aggregate these signals into a central storage account or a unified Log Analytics table for holistic processing.

    ![](./media/c6/t1_1.png)

## Task 2: Generate summaries using Azure OpenAI

1. Create a script or Logic App that periodically reads the aggregated signals.
1. Pass the combined data payload to the **Azure OpenAI** API.
1. Use a prompt to generate high-level, unified summaries of the overall environment health, security posture, and cost efficiency.

    ![](./media/c6/t2_1.png)

## Task 3: Store insights using Azure AI Search

1. Navigate to your **Azure AI Search** resource.
1. Create a new Index designed to store the AI-generated operational insights.
1. Index the generated summaries so they are searchable and easily retrievable.

    ![](./media/c6/t3_1.png)

## Task 4: Enable natural language querying

1. Configure a search interface (or connect a Bot Service) to your Azure AI Search instance.
1. Test the natural language querying capability by searching for terms like `Show me the biggest security risks from yesterday` or `What caused the latency spike last night?`.

    ![](./media/c6/t4_1.png)

## Task 5: Highlight risks, anomalies, and recommendations

1. Modify your search and display interface to parse the JSON responses.
1. Ensure the system automatically highlights critical risks, anomalies, and recommendations visually, without requiring complex query languages from the operators.

    ![](./media/c6/t5_1.png)

## Task 6: Use Azure Copilot for unified summaries

1. Open **Azure Copilot**.
1. Prompt Copilot: `Act as my central operations assistant. Generate a unified operational summary across monitoring, cost, and security based on the aggregated data in my environment.`
1. Validate that the response correctly synthesizes information across all three domains.

  > **Congratulations** on completing the lab! Now, it's time to validate it. Here are the steps:
  > - Hit the Validate button for the corresponding task. If you receive a success message, you can proceed to the next task. 
  > - If not, carefully read the error message and retry the step.
 
<validation step="c6-validation-step" />

## Summary

In this challenge, you have completed the following:
- Aggregated multi-domain signals and stored them in AI Search
- Built a natural language query interface
- Used Azure Copilot to generate a unified operational summary

### You have successfully completed this challenge. You have completed the entire Lab!

![Launch Azure Portal](./media/new/2nct.png)
