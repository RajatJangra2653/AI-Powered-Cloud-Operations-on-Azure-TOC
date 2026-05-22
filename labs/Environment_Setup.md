# Environment Setup: Deploy the required resources

### Estimated Duration: 30 Minutes

## Overview

In this exercise, you will gain hands-on experience setting up the required Azure infrastructure. You will deploy the foundational Azure resources, enable AI Services, and configure access permissions to ensure a smooth experience throughout the challenges.

## Objectives

In this exercise, you will complete the following tasks:
- Task 1: Provision Base Infrastructure
- Task 2: Enable AI Services
- Task 3: Configure Access

## Task 1: Provision Base Infrastructure

In this task, you will create the foundational Azure resources such as a Log Analytics Workspace and Application Insights.

1. On the Azure portal search bar, search for **Log Analytics workspaces (1)** and select **Log Analytics workspaces (2)** from the results.

    ![](./media/env/t1_1.png)

1. From the top menu bar, click on **+ Create (1)**.

    ![](./media/env/t1_2.png)

1. On the **Create Log Analytics workspace** page, provide the following details, then click on **Review + Create (4)**:

    - **Subscription:** Leave the default one **(1)**
    - **Resource group:** Select **ai-ops-<inject key="Deployment ID" enableCopy="false"></inject> (2)**
    - **Name:** Enter **law-<inject key="Deployment ID" enableCopy="false"></inject> (3)**
    - **Region:** Select **<inject key="Region" enableCopy="false"></inject>** 

    ![](./media/env/t1_3.png)

1. Click **Create** to deploy the workspace.

## Task 2: Enable AI Services

In this task, you will provision Azure OpenAI and Azure AI Anomaly Detector instances.

1. On the Azure portal search bar, search for **Azure OpenAI (1)** and select **Azure OpenAI (2)** from the results.

    ![](./media/env/t2_1.png)

1. Click on **+ Create (1)**.

    ![](./media/env/t2_2.png)

1. Fill in the required details on the **Create Azure OpenAI** page:
    - **Subscription:** Leave the default one **(1)**
    - **Resource group:** Select **ai-ops-<inject key="Deployment ID" enableCopy="false"></inject> (2)**
    - **Region:** Select **<inject key="Region" enableCopy="false"></inject> (3)**
    - **Name:** Enter **openai-<inject key="Deployment ID" enableCopy="false"></inject> (4)**
    - **Pricing tier:** Select **Standard S0 (5)**
    
    Click **Next (6)** until you reach the Review + submit page, then click **Create**.

    ![](./media/env/t2_3.png)

## Task 3: Configure Access

In this task, you will ensure your user account has appropriate RBAC permissions to complete the challenges.

1. Navigate to your Resource Group **ai-ops-<inject key="Deployment ID" enableCopy="false"></inject>**.
1. From the left navigation pane, select **Access control (IAM) (1)**.
1. Click on **+ Add (2)** and select **Add role assignment (3)**.

    ![](./media/env/t3_1.png)

1. Search for and select the **Log Analytics Reader** role, then click **Next**.
1. Assign access to **User, group, or service principal**, click **+ Select members**, search for your user account, select it, and click **Review + assign**.

  > **Congratulations** on completing the setup! Now, it's time to validate it. Here are the steps:
  > - Hit the Validate button for the corresponding task. If you receive a success message, you can proceed to the next task. 
  > - If not, carefully read the error message and retry the step, following the instructions in the lab guide.
 
<validation step="env-setup-validation-step" />

## Summary

In this exercise, you have completed the following:
- Provisioned Base Infrastructure
- Enabled AI Services
- Configured Access

### You have successfully completed this exercise. Kindly click **Next >>** to proceed further

![Launch Azure Portal](./media/new/2nct.png)
