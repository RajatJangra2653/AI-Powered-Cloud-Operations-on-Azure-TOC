// CloudOps AI Portal - Core Application JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initializations
    lucide.createIcons();
    initializeTabs();
    initializeCharts();
    initializeSimulator();
    initializeCopilot();
});

// 2. Global State Management
const state = {
    activeTab: 'dashboard',
    activeIncident: 'none', // 'none', 'latency', 'reliability', 'security', 'cost', 'leak'
    incidentLogs: {
        none: [
            "[2026-05-22 12:40:01] INFO  GET /api/orders/list - Duration 112ms - DB Response 28ms - CPU 12%",
            "[2026-05-22 12:40:05] INFO  GET /api/inventory/status - Duration 89ms - DB Response 14ms - CPU 9%",
            "[2026-05-22 12:40:10] INFO  POST /api/checkout/cart - Duration 242ms - DB Response 98ms - CPU 15%",
            "[2026-05-22 12:40:15] INFO  GET /api/user/profile - Duration 104ms - DB Response 18ms - CPU 10%"
        ],
        latency: [
            "[2026-05-22 12:41:20] WARNING GET /api/orders/list - Duration 854ms - DB Response 621ms - CPU 45% (Anomaly Flagged)",
            "[2026-05-22 12:41:25] WARNING GET /api/inventory/status - Duration 792ms - DB Response 584ms - CPU 42%",
            "[2026-05-22 12:41:30] WARNING POST /api/checkout/cart - Duration 1240ms - DB Response 994ms - CPU 55% (High Dependency Latency)",
            "[2026-05-22 12:41:35] WARNING GET /api/user/profile - Duration 680ms - DB Response 490ms - CPU 38%"
        ],
        security: [
            "[2026-05-22 12:42:01] WARNING SigninLogs - john.doe@company.com - IP 185.220.101.5 - High Risk Location: Stockholm, Sweden",
            "[2026-05-22 12:42:05] ALERT   AzureActivity - john.doe@company.com - Action: Microsoft.Authorization/roleAssignments/write - Status: Succeeded",
            "[2026-05-22 12:42:12] WARNING AzureActivity - john.doe@company.com - Action: Microsoft.Network/networkSecurityGroups/write - Status: Succeeded",
            "[2026-05-22 12:42:20] ALERT   Microsoft Sentinel - Access anomaly rule triggered for identity john.doe@company.com"
        ]
    }
};

// 3. Tab Routing Manager
function initializeTabs() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabViews = document.querySelectorAll('.tab-view');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');
            
            // Update nav item active state
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            // Swap visible tab views
            tabViews.forEach(view => {
                view.classList.remove('active');
                if (view.id === `tab-${targetTab}`) {
                    view.classList.add('active');
                }
            });

            // Update Header Meta
            state.activeTab = targetTab;
            updateTabHeaderInfo(targetTab);
            
            // Resize charts dynamically to ensure proper glassmorphism layout rendering
            resizeActiveTabCharts();
        });
    });
}

function updateTabHeaderInfo(tab) {
    const titleEl = document.getElementById('current-tab-title');
    const subtitleEl = document.getElementById('current-tab-subtitle');

    const meta = {
        dashboard: {
            title: "Dashboard Overview",
            sub: "Real-time Azure operations, security, and cost telemetry."
        },
        performance: {
            title: "Challenge 01: Performance Observability",
            sub: "Identify latency trends and analyze application dependency response times."
        },
        reliability: {
            title: "Challenge 02: Infrastructure Reliability",
            sub: "Proactive VM observability, SQL correlation, and system reliability mapping."
        },
        security: {
            title: "Challenge 03: Actionable Security",
            sub: "Sentinel threat intelligence, access anomalies, and least privilege audits."
        },
        cost: {
            title: "Challenge 04: Cost Optimization",
            sub: "Track cloud spend, isolate billing spikes, and automate orphaned resource cleanups."
        },
        forecasting: {
            title: "Challenge 05: Machine Learning Forecasting",
            sub: "Establishing historical baselines and predicting deviations using AutoML models."
        },
        copilot: {
            title: "Challenge 06: Azure Copilot Operations Center",
            sub: "Execute natural language queries across multi-domain telemetry dashboards."
        }
    };

    if (meta[tab]) {
        titleEl.textContent = meta[tab].title;
        subtitleEl.textContent = meta[tab].sub;
    }
}

// 4. Chart.js Management
let charts = {};

function initializeCharts() {
    const ctxDashPerf = document.getElementById('dashboardPerformanceChart').getContext('2d');
    const ctxC1Perf = document.getElementById('c1PerformanceChart').getContext('2d');
    const ctxC2Rel = document.getElementById('c2ReliabilityChart').getContext('2d');
    const ctxC4Cost = document.getElementById('c4CostChart').getContext('2d');
    const ctxC5Fore = document.getElementById('c5ForecastingChart').getContext('2d');

    // Chart.js Theme Defaults (Glassmorphism Accents)
    Chart.defaults.color = '#9ca3af';
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.plugins.legend.labels.boxWidth = 12;

    // --- Dashboard Overview Performance ---
    charts.dashboardPerformance = new Chart(ctxDashPerf, {
        type: 'line',
        data: {
            labels: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40'],
            datasets: [
                {
                    label: 'User Response Time (ms)',
                    data: [118, 122, 105, 134, 115, 128, 142, 120, 124],
                    borderColor: '#00e5ff',
                    backgroundColor: 'rgba(0, 229, 255, 0.05)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'DB Call Duration (ms)',
                    data: [25, 28, 22, 34, 21, 26, 38, 24, 28],
                    borderColor: '#a855f7',
                    borderDash: [5, 5],
                    tension: 0.3,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });

    // --- C1 Full Performance Timeline ---
    charts.c1Performance = new Chart(ctxC1Perf, {
        type: 'line',
        data: {
            labels: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'],
            datasets: [
                {
                    label: 'Avg Response Time (ms)',
                    data: [115, 120, 110, 130, 125, 118, 122, 128, 124],
                    borderColor: '#00e5ff',
                    backgroundColor: 'rgba(0, 229, 255, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Dependency Call Delay (ms)',
                    data: [22, 25, 20, 31, 28, 24, 26, 30, 28],
                    borderColor: '#a855f7',
                    tension: 0.3,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });

    // --- C2 Reliability (CPU vs DTU) ---
    charts.c2Reliability = new Chart(ctxC2Rel, {
        type: 'line',
        data: {
            labels: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40'],
            datasets: [
                {
                    label: 'Web Server VM CPU (%)',
                    data: [12, 15, 10, 18, 14, 11, 15, 16, 14],
                    borderColor: '#00e5ff',
                    tension: 0.3,
                    fill: false
                },
                {
                    label: 'SQL DB DTU Level (%)',
                    data: [22, 28, 20, 35, 28, 22, 30, 32, 28],
                    borderColor: '#a855f7',
                    tension: 0.3,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, max: 100 },
                x: { grid: { display: false } }
            }
        }
    });

    // --- C4 Cost Management daily spend ---
    charts.c4Cost = new Chart(ctxC4Cost, {
        type: 'bar',
        data: {
            labels: ['May 15', 'May 16', 'May 17', 'May 18', 'May 19', 'May 20', 'May 21', 'May 22'],
            datasets: [
                {
                    label: 'Daily Azure Resource Spend ($)',
                    data: [19.50, 20.10, 19.80, 20.40, 19.90, 21.00, 20.50, 21.20],
                    backgroundColor: 'rgba(245, 158, 11, 0.4)',
                    borderColor: '#f59e0b',
                    borderWidth: 1,
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });

    // --- C5 ML baseline forecasting ---
    charts.c5Forecasting = new Chart(ctxC5Fore, {
        type: 'line',
        data: {
            labels: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40'],
            datasets: [
                {
                    label: 'AutoML Upper Confidence Band (%)',
                    data: [50, 52, 51, 55, 53, 50, 52, 54, 52],
                    borderColor: 'rgba(16, 185, 129, 0.15)',
                    backgroundColor: 'transparent',
                    pointRadius: 0,
                    tension: 0.3,
                    fill: false
                },
                {
                    label: 'AutoML Lower Confidence Band (%)',
                    data: [36, 38, 37, 40, 39, 36, 38, 39, 38],
                    borderColor: 'rgba(16, 185, 129, 0.15)',
                    backgroundColor: 'rgba(16, 185, 129, 0.05)',
                    pointRadius: 0,
                    tension: 0.3,
                    fill: '-1' // Fill up to Upper Band
                },
                {
                    label: 'Historical Baseline (%)',
                    data: [42, 45, 44, 47, 45, 43, 44, 46, 45],
                    borderColor: 'rgba(255,255,255,0.3)',
                    borderDash: [3, 3],
                    pointRadius: 0,
                    tension: 0.3,
                    fill: false
                },
                {
                    label: 'Actual VM Memory (%)',
                    data: [42, 44, 43, 45, 46, 44, 45, 45, 45],
                    borderColor: '#00e5ff',
                    pointStyle: 'circle',
                    pointRadius: 3,
                    tension: 0.3,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, min: 20, max: 100 },
                x: { grid: { display: false } }
            }
        }
    });
}

function resizeActiveTabCharts() {
    setTimeout(() => {
        Object.keys(charts).forEach(key => {
            charts[key].resize();
        });
    }, 100);
}

// 5. Incident Simulator Engine
function initializeSimulator() {
    const btnLatency = document.getElementById('btn-sim-latency');
    const btnReliability = document.getElementById('btn-sim-reliability');
    const btnSecurity = document.getElementById('btn-sim-security');
    const btnCost = document.getElementById('btn-sim-cost');
    const btnLeak = document.getElementById('btn-sim-leak');
    const btnReset = document.getElementById('btn-sim-reset');

    btnLatency.addEventListener('click', () => triggerIncident('latency'));
    btnReliability.addEventListener('click', () => triggerIncident('reliability'));
    btnSecurity.addEventListener('click', () => triggerIncident('security'));
    btnCost.addEventListener('click', () => triggerIncident('cost'));
    btnLeak.addEventListener('click', () => triggerIncident('leak'));
    btnReset.addEventListener('click', () => triggerIncident('none'));
}

function triggerIncident(type) {
    state.activeIncident = type;

    // Reset all simulator button active classes
    const simBtns = document.querySelectorAll('.sim-btn');
    simBtns.forEach(btn => btn.classList.remove('active'));

    // Reset app components to default before applying the specific incident
    resetComponentsToDefault();

    if (type === 'none') {
        showGlobalSuccessMessage("Environment restored to healthy state!");
        return;
    }

    // Mark current button as active
    document.getElementById(`btn-sim-${type}`).classList.add('active');

    // Apply Incident specific states
    const healthBadge = document.getElementById('env-health-badge');
    const activeIncCount = document.getElementById('active-incidents-count');
    const alertBanner = document.getElementById('active-incident-banner');
    const alertMsg = document.getElementById('active-incident-msg');

    healthBadge.textContent = "Incident Active";
    healthBadge.className = "health-badge anomaly";
    activeIncCount.textContent = "1";
    activeIncCount.className = "status-val text-rose";
    alertBanner.style.display = "flex";

    switch(type) {
        case 'latency':
            alertMsg.textContent = "Performance Degradation: Latency Spike Detected!";
            applyLatencyIncident();
            break;
        case 'reliability':
            alertMsg.textContent = "Resource Spike: Backend DB Load Out-Of-Bounds!";
            applyReliabilityIncident();
            break;
        case 'security':
            alertMsg.textContent = "Security Breach: Abnormal RBAC Escalation Active!";
            applySecurityIncident();
            break;
        case 'cost':
            alertMsg.textContent = "Cost Anomaly: Significant Resource Cost Leakage!";
            applyCostIncident();
            break;
        case 'leak':
            alertMsg.textContent = "Observability Warning: Persistent VM Memory Leakage!";
            applyLeakIncident();
            break;
    }

    // Force updates to render instantly
    resizeActiveTabCharts();
}

function resetComponentsToDefault() {
    // 1. Reset Global UI Headers
    document.getElementById('env-health-badge').textContent = "Healthy";
    document.getElementById('env-health-badge').className = "health-badge healthy";
    document.getElementById('active-incidents-count').textContent = "0";
    document.getElementById('active-incidents-count').className = "status-val text-green";
    document.getElementById('active-incident-banner').style.display = "none";

    // 2. Reset Dashboard Mini Metrics
    document.getElementById('dash-latency-val').textContent = "124 ms";
    document.getElementById('dash-latency-val').className = "card-value";
    document.getElementById('dash-dtu-val').textContent = "28%";
    document.getElementById('dash-dtu-val').className = "card-value";
    document.getElementById('dash-security-val').textContent = "0";
    document.getElementById('dash-security-val').className = "card-value";
    document.getElementById('dash-security-icon').className = "text-green";
    document.getElementById('dash-security-desc').textContent = "No active security alerts";
    document.getElementById('dash-security-desc').className = "text-green";

    // 3. Reset Performance Charts
    charts.dashboardPerformance.data.datasets[0].data = [118, 122, 105, 134, 115, 128, 142, 120, 124];
    charts.dashboardPerformance.data.datasets[1].data = [25, 28, 22, 34, 21, 26, 38, 24, 28];
    charts.dashboardPerformance.update();

    charts.c1Performance.data.datasets[0].data = [115, 120, 110, 130, 125, 118, 122, 128, 124];
    charts.c1Performance.data.datasets[1].data = [22, 25, 20, 31, 28, 24, 26, 30, 28];
    charts.c1Performance.update();

    // 4. Reset Performance Anomaly panel & console logs
    document.getElementById('latency-trend-badge').textContent = "Standard Baseline";
    document.getElementById('latency-trend-badge').className = "badge";
    document.getElementById('c1-telemetry-badge').textContent = "Real-Time";
    document.getElementById('c1-telemetry-badge').className = "badge";
    document.getElementById('c1-anomaly-status').textContent = "NO ANOMALIES DETECTED";
    document.getElementById('c1-anomaly-status').className = "badge healthy";
    document.getElementById('c1-anomaly-panel').style.borderColor = "rgba(255,255,255,0.08)";
    document.getElementById('c1-logs-console').textContent = state.incidentLogs.none.join("\n");

    // 5. Reset Reliability Tab
    charts.c2Reliability.data.datasets[0].data = [12, 15, 10, 18, 14, 11, 15, 16, 14];
    charts.c2Reliability.data.datasets[1].data = [22, 28, 20, 35, 28, 22, 30, 32, 28];
    charts.c2Reliability.update();
    document.getElementById('c2-alert-status').textContent = "ACTIVE MONITORING";
    document.getElementById('c2-alert-status').className = "badge healthy";
    document.getElementById('c2-observability-panel').style.borderColor = "rgba(255,255,255,0.08)";
    updateProgressMeter('vm-cpu', 14, 'bg-cyan');
    updateProgressMeter('sql-dtu', 28, 'bg-purple');
    updateProgressMeter('vm-mem', 45, 'bg-amber');

    // 6. Reset Security Tab
    document.getElementById('c3-sentinel-status').textContent = "0 INCIDENTS TRIGGERED";
    document.getElementById('c3-sentinel-status').className = "badge healthy";
    document.getElementById('c3-alert-box').style.borderColor = "rgba(255,255,255,0.08)";
    document.getElementById('c3-incident-detail').textContent = "All sign-ins and identity operations align with geographical baselines and standard RBAC privileges.";
    document.getElementById('suspicious-security-row').style.display = "none";
    
    const secRecomIcon = document.getElementById('security-recom-icon');
    secRecomIcon.setAttribute('data-lucide', 'check-shield');
    secRecomIcon.className = "recom-icon text-green";
    document.getElementById('security-recom-box').style.borderColor = "rgba(255,255,255,0.08)";
    document.getElementById('security-recom-text').innerHTML = `
        <h5>All Identities Fully Compliant</h5>
        <p class="text-sm mt-1 text-gray">Azure OpenAI reviewed the activity logs against RBAC maps. Current permissions represent the minimum privileges required for continuous operation.</p>
    `;
    document.getElementById('c3-logs-console').textContent = `
[2026-05-22 11:15:30] SigninLogs - devops-deployer-sp - IP 20.38.104.14 - Low Risk (MFA Succeeded)
[2026-05-22 11:20:45] AzureActivity - devops-deployer-sp - Update Web App - Status: Succeeded
[2026-05-22 11:22:10] SigninLogs - sec-auditor-sa - IP 192.168.10.45 - Low Risk (Intranet)
[2026-05-22 12:05:12] AzureActivity - sec-auditor-sa - List Keys - Status: Succeeded
    `.trim();
    lucide.createIcons();

    // 7. Reset Cost Tab
    charts.c4Cost.data.datasets[0].data = [19.50, 20.10, 19.80, 20.40, 19.90, 21.00, 20.50, 21.20];
    charts.c4Cost.data.datasets[0].backgroundColor = 'rgba(245, 158, 11, 0.4)';
    charts.c4Cost.data.datasets[0].borderColor = '#f59e0b';
    charts.c4Cost.update();

    document.getElementById('orphaned-table-body').innerHTML = `
        <tr class="empty-state">
            <td colspan="4" class="text-center py-4 text-gray">No unused or orphaned resources found in active subscription.</td>
        </tr>
    `;
    document.getElementById('cleanup-runbook-container').style.display = "none";

    // 8. Reset Forecasting Tab
    charts.c5Forecasting.data.datasets[3].data = [42, 44, 43, 45, 46, 44, 45, 45, 45];
    charts.c5Forecasting.update();
    document.getElementById('c5-deviation-status').textContent = "WITHIN NORMAL BOUNDS";
    document.getElementById('c5-deviation-status').className = "badge healthy";
    document.getElementById('c5-forecast-panel').style.borderColor = "rgba(255,255,255,0.08)";
    document.getElementById('c5-insight-box').textContent = `"Telemetry analysis shows CPU and memory patterns perfectly aligned with regular weekday workloads. No unexpected structural breaks or variance leaks detected in the time-series bounds."`;

    // 9. Inform Copilot (mini bubble reset)
    document.querySelector('.copilot-mini-body .bubble').innerHTML = `
        I am analyzing the operations logs. Currently, all systems are **Healthy**. Click on the **Incident Simulator** to test anomalies, or ask me directly about cost, performance, and security.
    `;
}

function updateProgressMeter(id, value, bgClass) {
    const prog = document.getElementById(`${id}-progress`);
    const text = document.getElementById(`${id}-text`);
    prog.className = `progress-bar ${bgClass}`;
    prog.style.width = `${value}%`;
    text.textContent = `${value}%`;
    
    if (value > 70) {
        text.className = "comp-val text-rose font-bold";
    } else {
        text.className = "comp-val";
    }
}

function showGlobalSuccessMessage(msg) {
    const banner = document.getElementById('active-incident-banner');
    const alertMsg = document.getElementById('active-incident-msg');
    banner.style.display = "flex";
    banner.style.background = "rgba(16, 185, 129, 0.12)";
    banner.style.borderColor = "rgba(16, 185, 129, 0.3)";
    alertMsg.textContent = msg;
    alertMsg.className = "text-green";
    
    // Auto-hide success message after 4 seconds
    setTimeout(() => {
        if (state.activeIncident === 'none') {
            banner.style.display = "none";
        }
    }, 4000);
}

// 5.1 C1 Latency Incident Logic
function applyLatencyIncident() {
    // 1. Spikes Response values on Dashboard
    document.getElementById('dash-latency-val').textContent = "854 ms";
    document.getElementById('dash-latency-val').className = "card-value text-rose";
    
    // 2. Mutates active performance charts
    // Last three metrics spiked
    charts.dashboardPerformance.data.datasets[0].data = [118, 122, 105, 134, 115, 128, 550, 784, 854];
    charts.dashboardPerformance.data.datasets[1].data = [25, 28, 22, 34, 21, 26, 390, 560, 621];
    charts.dashboardPerformance.update();

    charts.c1Performance.data.datasets[0].data = [115, 120, 110, 130, 125, 118, 510, 720, 854];
    charts.c1Performance.data.datasets[1].data = [22, 25, 20, 31, 28, 24, 380, 510, 621];
    charts.c1Performance.update();

    // 3. Telemetry details & alert panels
    document.getElementById('latency-trend-badge').textContent = "ANOMALY SIGNAL DETECTED";
    document.getElementById('latency-trend-badge').className = "badge critical";
    document.getElementById('c1-telemetry-badge').textContent = "ANOMALOUS ACTIVITY";
    document.getElementById('c1-telemetry-badge').className = "badge critical";
    
    const c1Status = document.getElementById('c1-anomaly-status');
    c1Status.textContent = "ANOMALY INJECTED: CRITICAL DRIFT";
    c1Status.className = "badge critical";
    document.getElementById('c1-anomaly-panel').style.borderColor = "rgba(244, 63, 94, 0.4)";
    document.getElementById('c1-logs-console').textContent = state.incidentLogs.latency.join("\n");

    // 4. Update Copilot Mini Suggestion
    document.querySelector('.copilot-mini-body .bubble').innerHTML = `
        <span class="text-rose font-bold"><i data-lucide="alert-octagon" class="sm-icon"></i> Alert Detected:</span> A latency spike of **854ms** has been identified. Underlying logs reveal **GET /api/orders/list** is blocked by an Azure SQL database query dependency taking **621ms**. Click **What caused the latency spike?** below to analyze.
    `;
    lucide.createIcons();
}

// 5.2 C2 Reliability Incident Logic
function applyReliabilityIncident() {
    // 1. Spikes DTU values on Dashboard
    document.getElementById('dash-dtu-val').textContent = "98%";
    document.getElementById('dash-dtu-val').className = "card-value text-rose";

    // 2. Update CPU vs DTU Chart
    charts.c2Reliability.data.datasets[0].data = [12, 15, 10, 18, 14, 11, 45, 68, 78]; // VM CPU
    charts.c2Reliability.data.datasets[1].data = [22, 28, 20, 35, 28, 22, 75, 92, 98]; // SQL DTU
    charts.c2Reliability.update();

    // 3. Alerts Panels
    const c2Status = document.getElementById('c2-alert-status');
    c2Status.textContent = "CRITICAL LIMIT EXCEEDED";
    c2Status.className = "badge critical";
    document.getElementById('c2-observability-panel').style.borderColor = "rgba(244, 63, 94, 0.4)";

    // 4. Update Progress meters
    updateProgressMeter('vm-cpu', 78, 'bg-rose');
    updateProgressMeter('sql-dtu', 98, 'bg-rose');
    updateProgressMeter('vm-mem', 52, 'bg-amber');

    // 5. Update Copilot mini
    document.querySelector('.copilot-mini-body .bubble').innerHTML = `
        <span class="text-rose font-bold"><i data-lucide="alert-triangle" class="sm-icon"></i> Resource Saturation:</span> SQL database DTU consumption is at **98%**, causing thread blocking on the Web VM webserver. CPU is saturated at **78%**. 
    `;
    lucide.createIcons();
}

// 5.3 C3 Security Incident Logic
function applySecurityIncident() {
    // 1. Dashboard updates
    document.getElementById('dash-security-val').textContent = "1";
    document.getElementById('dash-security-val').className = "card-value text-rose";
    
    const dashSecIcon = document.getElementById('dash-security-icon');
    dashSecIcon.className = "text-rose";
    dashSecIcon.setAttribute('data-lucide', 'shield-alert');
    
    const dashSecDesc = document.getElementById('dash-security-desc');
    dashSecDesc.textContent = "Sentinel Access Incident Active";
    dashSecDesc.className = "text-rose font-semibold";

    // 2. Incident Status
    const c3Status = document.getElementById('c3-sentinel-status');
    c3Status.textContent = "1 SECURITY INCIDENT DETECTED";
    c3Status.className = "badge critical";
    document.getElementById('c3-alert-box').style.borderColor = "rgba(244, 63, 94, 0.4)";
    document.getElementById('c3-incident-detail').innerHTML = `
        <span class="text-rose font-bold">Severity High:</span> Suspicious role assignments detected for identity <span class="font-mono text-white">john.doe@company.com</span> from Stockholm, SE (Unusual Geography).
    `;

    // 3. Show Suspicious Row in security table
    document.getElementById('suspicious-security-row').style.display = "table-row";

    // 4. Audit Log Updates
    document.getElementById('c3-logs-console').textContent = state.incidentLogs.security.join("\n");

    // 5. AI Recommendations Panel (Azure OpenAI Sandbox output)
    const secRecomIcon = document.getElementById('security-recom-icon');
    secRecomIcon.setAttribute('data-lucide', 'alert-triangle');
    secRecomIcon.className = "recom-icon text-rose";
    
    const recomBox = document.getElementById('security-recom-box');
    recomBox.style.borderColor = "rgba(244, 63, 94, 0.3)";
    recomBox.style.background = "rgba(244, 63, 94, 0.03)";
    
    document.getElementById('security-recom-text').innerHTML = `
        <h5 class="text-rose">Remediation Required (Least Privilege Policy Violations)</h5>
        <p class="text-sm mt-1 text-gray">
            <strong>Azure OpenAI Analysis:</strong> User account <span class="font-mono text-white">john.doe@company.com</span> was granted **Owner** permissions but is actively executing network configurations and access policy rewrites outside standard enterprise geolocation.
        </p>
        <div class="mt-2 text-xs bg-black-opaque p-2 border-dashed-gray">
            <strong>Recommended Actions:</strong><br>
            1. Revoke **Owner** role assignment immediately.<br>
            2. Assign target-scoped **Network Contributor** permissions only if required.<br>
            3. Enforce Conditional Access Policies block from Swedish Tor Exits.
        </div>
    `;

    // 6. Update Copilot Mini
    document.querySelector('.copilot-mini-body .bubble').innerHTML = `
        <span class="text-rose font-bold"><i data-lucide="shield-alert" class="sm-icon"></i> Sentinel Security Alert:</span> Suspicious administrative operations logged by **john.doe@company.com** from Stockholm, Sweden. Overprivileged **Owner** role detected. Click **Show security posture anomalies** below to investigate.
    `;

    lucide.createIcons();
}

// 5.4 C4 Cost Incident Logic
function applyCostIncident() {
    // 1. Spikes Cost Chart on the last day
    charts.c4Cost.data.datasets[0].data = [19.50, 20.10, 19.80, 328.40, 19.90, 21.00, 20.50, 21.20]; // Huge spike on May 18th
    
    // Color the anomalous bar red
    const bgColors = Array(8).fill('rgba(245, 158, 11, 0.4)');
    bgColors[3] = 'rgba(244, 63, 94, 0.6)'; // Red highlight on anomaly
    const borderColors = Array(8).fill('#f59e0b');
    borderColors[3] = '#f43f5e';
    charts.c4Cost.data.datasets[0].backgroundColor = bgColors;
    charts.c4Cost.data.datasets[0].borderColor = borderColors;
    charts.c4Cost.update();

    // 2. Populate Orphaned Resources table
    document.getElementById('orphaned-table-body').innerHTML = `
        <tr>
            <td class="font-mono text-rose">disk-prod-replica-01</td>
            <td>Premium SSD Managed Disk (1024 GB)</td>
            <td><span class="badge warning">Unattached</span></td>
            <td class="font-semibold text-white">$122.80 / mo</td>
        </tr>
        <tr>
            <td class="font-mono text-rose">pip-unused-web-02</td>
            <td>Static Public IP Address</td>
            <td><span class="badge warning">Unassociated</span></td>
            <td class="font-semibold text-white">$5.00 / mo</td>
        </tr>
        <tr>
            <td class="font-mono text-rose">vm-test-sandbox-04</td>
            <td>Standard D4s v3 (Stopped)</td>
            <td><span class="badge warning">Allocated Disk Only</span></td>
            <td class="font-semibold text-white">$180.00 / mo</td>
        </tr>
    `;

    // 3. Show Cleanup PowerShell Runbook Panel
    document.getElementById('cleanup-runbook-container').style.display = "block";

    // 4. Update Copilot Mini
    document.querySelector('.copilot-mini-body .bubble').innerHTML = `
        <span class="text-rose font-bold"><i data-lucide="coins" class="sm-icon"></i> Cost Anomaly Detected:</span> A massive spend spike ($328.40) occurred on May 18th. Resource Graph analysis indicates **3 unused/orphaned items** incurring a combined **$307.80/month** in waste. Cleanup PowerShell runbook generated.
    `;
    lucide.createIcons();
}

// 5.5 C5 Leak Incident Logic (Memory Leak / Forecast)
function applyLeakIncident() {
    // 1. Spikes actual memory usage above AutoML band
    // AutoML upper band is 52. Memory leak spikes actual up to 88%
    charts.c5Forecasting.data.datasets[3].data = [42, 44, 48, 55, 62, 70, 78, 83, 88];
    charts.c5Forecasting.update();

    // 2. Alert Status
    const status = document.getElementById('c5-deviation-status');
    status.textContent = "OUT-OF-BOUNDS ANOMALY TRIGGERED";
    status.className = "badge critical";
    document.getElementById('c5-forecast-panel').style.borderColor = "rgba(244, 63, 94, 0.4)";

    // 3. AI Insights updates
    document.getElementById('c5-insight-box').innerHTML = `
        <span class="text-rose font-bold">Azure OpenAI Deviation Insight (AutoML Correlation):</span><br>
        VM metric <span class="font-mono text-white">PercentMemoryUsed</span> has crossed the **99% Confidence Boundary** of the AutoML model. 
        The actual value (**88%**) represents a structural breakout from normal diurnal historical workloads. 
        This linear climbing pattern with flat CPU utilization is highly typical of a **memory leak in Node.js heap space**.
    `;

    // 4. Update progress bars on reliability tab as well to synchronize leak
    updateProgressMeter('vm-mem', 88, 'bg-rose');

    // 5. Update Copilot Mini
    document.querySelector('.copilot-mini-body .bubble').innerHTML = `
        <span class="text-rose font-bold"><i data-lucide="trending-up" class="sm-icon"></i> Baseline Deviation:</span> PercentMemoryUsed has broken out of the AutoML time-series confidence bands. Current allocation is **88%**, pointing to an active software memory leak.
    `;
    lucide.createIcons();
}


// 6. Azure Copilot Chat System (Challenge 06 & NL querying)
const copilotResponseIndex = {
    "default": `
        I have analyzed your environment:
        * **Monitoring**: Performance is healthy. Average request latency is **124ms**, SQL Database DTU is at **28%**.
        * **Security**: Standard access control active. No Sentinel incidents are currently logged.
        * **Cost**: Budget targets aligned. Current month accumulated cost is **$412.80**.
        
        To test my capabilities, please click on the **Incident Simulator** on the right side to inject cloud anomalies, then ask me about them.
    `,
    "latency": `
        #### <i data-lucide="alert-octagon" class="sm-icon text-rose"></i> Telemetry Incident Report - Response Time Degradation

        I ran a **KQL Correlation Query** joining ` + "`requests`" + `, ` + "`dependencies`" + `, and ` + "`performanceCounters`" + ` in your Log Analytics workspace:

        ##### 1. Root Cause Summary
        A massive latency spike has degraded average user response time to **854ms** (Normal baseline: **120ms**).
        The degradation is **95% correlated** with the backend dependency query:
        * **Resource**: \`openai-demo-sql.database.windows.net\` (Azure SQL DB)
        * **Impacted Route**: \`GET /api/orders/list\`
        * **Dependency Duration**: **621 ms** (Represents **72%** of total query time).

        ##### 2. Infrastructure Health
        * Web VM CPU: **45%** (Adequate headroom)
        * SQL DB DTU Level: **42%** (Healthy utilization levels)
        
        ##### 3. AI Explanation & Root Cause
        The database response times spiked due to **missing indexes** on the \`Orders\` table during concurrent scans. No VM system limits were breached.

        ##### 4. Remediation Recommendations
        1. Create an index on column \`OrderDate\` to optimize the query execution path.
        2. Implement a **Distributed Redis Cache** for order lookup routes.
    `,
    "reliability": `
        #### <i data-lucide="alert-triangle" class="sm-icon text-rose"></i> System Saturation & SQL DTU Correlation Report

        I queried the infrastructure performance counters for Resource Group **ai-ops-demo**:

        ##### 1. Telemetry Saturation Metrics
        * **SQL Database DTU**: **98%** (Critical saturation threshold crossed)
        * **Web VM CPU Usage**: **78%** (High CPU alert generated)
        * **Response Latency**: **854ms** (Severe user experience bottleneck)

        ##### 2. Causal Relationship Analysis
        Azure OpenAI evaluated the concurrent workloads: The database DTU level spiked to 98% due to a lock escalation issue. 
        Because the webapp thread pool spent **600ms+** waiting on database connections to release, the web server's request threads queued up, driving Web VM CPU utilization from its normal **14%** up to **78%**.

        ##### 3. Resolution Plan
        * **Database Scaling**: Scale Azure SQL Database pricing tier from **Standard S0** to **S3** to accommodate DTU limits.
        * **Connection Pools**: Increase backend timeout parameters to prevent application thread locking.
    `,
    "security": `
        #### <i data-lucide="shield-alert" class="sm-icon text-rose"></i> Sentinel Security Incident Investigation: Identity Access Anomaly

        I audited the Microsoft Sentinel Workspace logs for the last 24 hours:

        ##### 1. Flagged Incident
        * **Triggered Rule**: ` + "`IdentityAccessAnomaly`" + `
        * **Target Identity**: \`john.doe@company.com\`
        * **Severity**: **High**
        * **Assigned Privilege**: **Owner** (Over-privileged directory administrator)

        ##### 2. Risk Evaluation & Threat Context
        User \`john.doe@company.com\` authenticated from Stockholm, Sweden (**IP 185.220.101.5** - flagged as an exit node). 
        Immediately after logging in, they completed privileged RBAC role assignment writes (\`Microsoft.Authorization/roleAssignments/write\`) and changed network security groups. 
        This is a **High-Risk Anomaly** as typical user activity for this identity occurs exclusively in California, US.

        ##### 3. Actionable Remediation (Least Privilege)
        1. **Revoke Owner Assignment**: Remove Owner access and replace it with tight-scoped custom roles (e.g. **Network Contributor**).
        2. **Session Revocation**: Invoke immediate token revocation on Azure AD for \`john.doe@company.com\`.
        3. **Conditional Access**: Restrict access to admin dashboards exclusively to corporate compliant VPN ranges.
    `,
    "cost": `
        #### <i data-lucide="coins" class="sm-icon text-rose"></i> Cloud Cost Anomaly & Resource Optimization Review

        I scanned the billing datasets and ran custom **Azure Resource Graph** queries:

        ##### 1. Cost Anomaly Audit
        * **Spike Event**: May 18th daily spend surged to **$328.40** (A **15x increase** compared to the $20/day baseline).
        * **Top Cost Driver**: Unattached Premium SSD Managed Disks.

        ##### 2. Unused / Orphaned Resources Identified
        * **Managed Disk**: \`disk-prod-replica-01\` (1024 GB, State: **Unattached**) — Wasting **$122.80/month**.
        * **Public IP**: \`pip-unused-web-02\` (State: **Unassociated**) — Wasting **$5.00/month**.
        * **VM Host**: \`vm-test-sandbox-04\` (Allocated disks running while VM is deallocated) — Wasting **$180.00/month**.

        ##### 3. Financial Reclaim Potential
        By deleting these 3 orphaned elements, you will instantly reclaim **$307.80 / month** in wasted cloud spend.

        ##### 4. Automated PowerShell Remediation Script
        I have prepared an automated Azure PowerShell script in your **Cost Optimizer** tab. Run it to complete cleanup.
    `,
    "leak": `
        #### <i data-lucide="trending-up" class="sm-icon text-rose"></i> AutoML Anomaly Detection: PercentMemoryUsed Deviation

        I compared real-time streaming telemetry with the **AutoML baseline** predictions:

        ##### 1. Forecast Deviation
        * **Target Metric**: \`PercentMemoryUsed\`
        * **Current Actual**: **88%**
        * **Model Forecast Boundary**: **38% - 52%** (99% Confidence Interval)
        * **Status**: **Critical Out-of-Bounds** (AutoML baseline breached)

        ##### 2. AI Diagnostics (gpt-4o)
        The metric shows a linear, continuous upward trajectory over the last 4 hours, while Web CPU remains constant at **14%**. 
        This is a classic signature of a **Memory Leak** in Node.js server heap memory. 
        Unlike CPU spikes, a memory leak does not auto-resolve and will eventually trigger an Out-of-Memory (OOM) kernel crash.

        ##### 3. Mitigation Steps
        1. Force a **rolling restart** of the App Service/VM node to purge memory pools.
        2. Perform a heap dump analysis using Chrome DevTools or Node Clinic to isolate heap leakage variables in code.
    `,
    "summary": `
        ### <i data-lucide="sparkles" class="text-purple sm-icon"></i> Unified Cloud Operations & Health Executive Summary

        Synthesizing telemetry across Microsoft Sentinel, Azure Monitor, and Azure Cost Management:

        #### 1. Operations & Performance
        * **Overall Status**: **DEGRADED** (Response times spiked to 854ms due to database lock dependencies).
        * **SQL Health**: Saturation warnings at **98% DTU** levels. CPU is queuing.

        #### 2. Identity & Security
        * **Overall Status**: **HIGH RISK** (1 Active Sentinel Security Incident).
        * **Threat Vector**: Account compromise indicator for \`john.doe@company.com\` with suspicious Owner privilege usage from Stockholm, Sweden.

        #### 3. Cloud Cost Efficiency
        * **Overall Status**: **INEFFICIENT** (Significant billing spike detected).
        * **Wasted Spend**: **$307.80/month** in orphaned Premium SSD disks and allocated deallocated sandbox servers.

        ---
        ##### Azure Copilot Comprehensive Action Plan:
        1. Scale database scale tier to **S3** to relieve DTU saturation immediately.
        2. Lock out user \`john.doe@company.com\` and run RBAC cleanup audits.
        3. Trigger the **PowerShell Cleanup Runbook** to remove orphaned SSDs and recoup $307.80/mo.
    `
};

function initializeCopilot() {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-chat-btn');
    const clearBtn = document.getElementById('clear-chat-btn');
    const chatMessages = document.getElementById('chat-messages');

    // 1. Send Chat Event
    sendBtn.addEventListener('click', handleUserMessage);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleUserMessage();
    });

    // 2. Clear Chat Event
    clearBtn.addEventListener('click', () => {
        chatMessages.innerHTML = `
            <div class="message assistant">
                <div class="message-bubble">
                    Hello! I am your **Azure Copilot** for cloud operations. How can I assist you in investigating performance, security, or costs today?
                </div>
                <span class="message-time">Just Now</span>
            </div>
        `;
        lucide.createIcons();
    });

    // 3. Quick Suggestion Query Buttons (both in dashboard and copilot sidebar)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.quick-q-btn');
        if (btn) {
            const query = btn.getAttribute('data-query');
            chatInput.value = query;
            handleUserMessage();
            
            // Auto navigate to copilot tab if click happened elsewhere
            const currentTabBtn = document.querySelector(`.nav-item[data-tab="copilot"]`);
            if (currentTabBtn && state.activeTab !== 'copilot') {
                currentTabBtn.click();
            }
        }
    });
}

function handleUserMessage() {
    const chatInput = document.getElementById('chat-input');
    const queryText = chatInput.value.trim();
    if (!queryText) return;

    // Add User Message bubble
    addMessageToChat('user', queryText);
    chatInput.value = '';

    // Add Typing indicator
    const typingId = addTypingIndicatorToChat();

    // Calculate response after simulated delay
    setTimeout(() => {
        removeTypingIndicator(typingId);
        const responseHTML = getCopilotResponse(queryText);
        addMessageToChat('assistant', responseHTML);
        
        // Render any Lucide icons added to the chat markdown
        lucide.createIcons();
    }, 800);
}

function addMessageToChat(sender, text) {
    const chatMessages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    
    // Convert simple pseudo-markdown formatting to HTML elements for rich output
    const formattedText = pseudoMarkdownToHTML(text);

    msgDiv.innerHTML = `
        <div class="message-bubble">
            ${formattedText}
        </div>
        <span class="message-time">Just Now</span>
    `;

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addTypingIndicatorToChat() {
    const chatMessages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message assistant typing-indicator-msg';
    const id = 'typing-' + Date.now();
    msgDiv.id = id;

    msgDiv.innerHTML = `
        <div class="message-bubble" style="display:flex; gap: 4px; padding: 12px 20px;">
            <span class="text-xs text-dim">Copilot is analyzing logs...</span>
        </div>
    `;

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function pseudoMarkdownToHTML(markdown) {
    // Escape standard HTML tags except the ones we control
    let html = markdown
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    
    // Support custom icon tag translation
    html = html.replace(/&lt;i data-lucide="([^"]+)" class="([^"]+)"&gt;&lt;\/i&gt;/g, '<i data-lucide="$1" class="$2"></i>');

    // Headers
    html = html.replace(/^#### (.*$)/gim, '<h5 class="mt-4 font-bold text-white">$1</h5>');
    html = html.replace(/^### (.*$)/gim, '<h4 class="mt-4 text-purple font-bold">$1</h4>');
    html = html.replace(/^##### (.*$)/gim, '<h6 class="mt-2 text-xs text-muted text-uppercase font-mono font-bold">$1</h6>');

    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
    
    // Code blocks/inline code
    html = html.replace(/`([^`]+)`/g, '<code class="font-mono text-cyan text-sm">$1</code>');
    
    // Bullet lists
    html = html.replace(/^\s*\*\s+(.*$)/gim, '<li class="text-sm mt-1">$1</li>');
    
    // Line breaks
    html = html.replace(/\n/g, '<br>');

    return html;
}

function getCopilotResponse(query) {
    const text = query.toLowerCase();

    // Match keywords to current active incidents or specific questions
    if (text.includes("unified") || text.includes("summary") || text.includes("posture")) {
        // Executive summary
        return copilotResponseIndex.summary;
    }

    if (text.includes("latency") || text.includes("slow") || text.includes("response")) {
        return copilotResponseIndex.latency;
    }

    if (text.includes("dtu") || text.includes("cpu") || text.includes("saturation") || text.includes("reliability")) {
        return copilotResponseIndex.reliability;
    }

    if (text.includes("security") || text.includes("sentinel") || text.includes("john") || text.includes("access")) {
        return copilotResponseIndex.security;
    }

    if (text.includes("cost") || text.includes("billing") || text.includes("price") || text.includes("spend") || text.includes("waste")) {
        return copilotResponseIndex.cost;
    }

    if (text.includes("leak") || text.includes("memory") || text.includes("forecasting") || text.includes("baseline")) {
        return copilotResponseIndex.leak;
    }

    // Context aware check based on active simulation
    if (state.activeIncident !== 'none') {
        return copilotResponseIndex[state.activeIncident];
    }

    return copilotResponseIndex.default;
}
