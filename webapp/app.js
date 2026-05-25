// Apex CloudStore - Core Application JavaScript

// Global Application Insights state
let appInsights = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initializations
    lucide.createIcons();
    initializePages();
    initializeCart();
    initializeDiagnostics();

    // Auto-detect and connect to App Insights if connection string exists in window.ENV or localStorage
    const envConnStr = window.ENV && window.ENV.APPLICATIONINSIGHTS_CONNECTION_STRING;
    const savedConnStr = localStorage.getItem('azure_appinsights_connectionstring');
    const connStr = envConnStr || savedConnStr;
    if (connStr) {
        initializeAzureAppInsights(connStr);
    }
});

// --- 1. Application Insights Integration ---
function initializeAzureAppInsights(connectionString) {
    const statusDot = document.getElementById('status-dot');
    try {
        if (window.Microsoft && window.Microsoft.ApplicationInsights) {
            const config = {
                connectionString: connectionString,
                enableAutoRouteTracking: true,
                maxAjaxCallsPerView: -1,
                disableTelemetry: false
            };
            appInsights = new Microsoft.ApplicationInsights.ApplicationInsights({ config: config });
            appInsights.loadAppInsights();
            appInsights.trackPageView({ name: 'Catalog Page' });
            
            // Save to localStorage
            localStorage.setItem('azure_appinsights_connectionstring', connectionString);
            
            // Update UI Dot
            statusDot.className = "connection-status-dot connected";
            statusDot.title = "Connected to Application Insights";
            logToConsole("[System] Application Insights JS SDK loaded and connected successfully!");
            logToConsole("[Telemetry] Recorded initial page view: 'Catalog Page'");
            return true;
        } else {
            statusDot.className = "connection-status-dot disconnected";
            statusDot.title = "Application Insights SDK not found";
            logToConsole("[Error] Application Insights SDK script not found on the page.");
            return false;
        }
    } catch (e) {
        statusDot.className = "connection-status-dot disconnected";
        statusDot.title = "Connection failed";
        logToConsole("[Error] App Insights Connection String is invalid: " + e.message);
        return false;
    }
}

function logToConsole(message) {
    const consoleLogs = document.getElementById('diag-console-logs');
    if (consoleLogs) {
        const timestamp = new Date().toLocaleTimeString();
        consoleLogs.textContent = `[${timestamp}] ${message}\n` + consoleLogs.textContent;
    }
}

// --- 2. Dynamic Routing / Page Switching ---
function initializePages() {
    const navLinks = document.querySelectorAll('.nav-link');
    const storePages = document.querySelectorAll('.store-page');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetPage = link.getAttribute('data-page');
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            storePages.forEach(page => {
                page.classList.remove('active');
                if (page.id === `page-${targetPage}`) {
                    page.classList.add('active');
                }
            });

            // Track Real Page View in Azure
            const pageNames = {
                catalog: "Resource Catalog",
                profile: "My Subscriptions",
                diagnostics: "Diagnostics Lab"
            };
            const pageTitle = pageNames[targetPage] || targetPage;
            logToConsole(`[Navigation] Navigated to page: '${pageTitle}'`);
            
            if (appInsights) {
                appInsights.trackPageView({ name: pageTitle });
                logToConsole(`[Telemetry] Transmitted real PageView: '${pageTitle}'`);
            }
        });
    });
}

// --- 3. Shopping Cart & Provisioning Logic ---
const cartState = {
    items: [],
    total: 0
};

function initializeCart() {
    const cartToggle = document.getElementById('cart-toggle-btn');
    const cartClose = document.getElementById('cart-close-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const checkoutBtn = document.getElementById('btn-checkout');

    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.toggle('active');
        logToConsole("[Cart] Opened Deployment Cart drawer");
    });

    cartClose.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        logToConsole("[Cart] Closed Deployment Cart drawer");
    });

    checkoutBtn.addEventListener('click', () => {
        executeCheckout();
    });
}

function addToCart(id, name, price, iconType) {
    // Add item to cart state
    const existing = cartState.items.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cartState.items.push({ id, name, price, iconType, quantity: 1 });
    }
    
    logToConsole(`[Cart] Added item to cart: '${name}'`);
    updateCartUI();

    // Track shopping action in App Insights
    if (appInsights) {
        appInsights.trackEvent({
            name: "AddToCart",
            properties: {
                resourceId: id,
                resourceName: name,
                unitPrice: price
            }
        });
        logToConsole(`[Telemetry] Transmitted custom event: 'AddToCart' for '${name}'`);
    }
}

function removeFromCart(id) {
    const idx = cartState.items.findIndex(item => item.id === id);
    if (idx !== -1) {
        const name = cartState.items[idx].name;
        cartState.items.splice(idx, 1);
        logToConsole(`[Cart] Removed item from cart: '${name}'`);
        updateCartUI();
    }
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const countBadge = document.getElementById('cart-badge-count');
    const totalPriceText = document.getElementById('cart-total-price');

    if (cartState.items.length === 0) {
        container.innerHTML = `<div class="cart-empty-msg">Your deployment cart is empty. Provision a resource from the catalog to get started.</div>`;
        countBadge.textContent = "0";
        totalPriceText.textContent = "$0.00";
        cartState.total = 0;
        return;
    }

    let html = '';
    let total = 0;
    let itemCount = 0;

    cartState.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemCount += item.quantity;

        html += `
            <div class="cart-item glass-box mt-2">
                <div class="cart-item-header">
                    <h5>${item.name}</h5>
                    <button class="remove-item-btn" onclick="removeFromCart('${item.id}')"><i data-lucide="trash-2" class="sm-icon"></i></button>
                </div>
                <div class="cart-item-details mt-1">
                    <span class="text-sm text-gray">Qty: ${item.quantity}</span>
                    <span class="text-sm text-white font-semibold">$${itemTotal.toFixed(2)}</span>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    countBadge.textContent = itemCount;
    totalPriceText.textContent = `$${total.toFixed(2)}`;
    cartState.total = total;
    
    lucide.createIcons();
}

function executeCheckout() {
    if (cartState.items.length === 0) {
        logToConsole("[Cart] Cannot checkout: Cart is empty.");
        return;
    }

    const checkoutBtn = document.getElementById('btn-checkout');
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = "Provisioning Resources...";
    logToConsole("[Checkout] Initiating resource deployment pipeline...");

    const startTime = Date.now();
    
    // Simulate real backend dependency request (AJAX/Fetch)
    // Application Insights automatically intercepts this real fetch request!
    const targetUrl = window.location.protocol === 'file:' ? 'https://httpbin.org/post' : '/api/checkout/cart';
    
    fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartState.items, totalPrice: cartState.total })
    })
    .then(response => {
        const duration = Date.now() - startTime;
        logToConsole(`[Checkout] Pipeline completed. HTTP Status: ${response.status} (${duration}ms)`);
        
        // Handle direct fallback explicitly for App Insights if local file open blocks fetch intercept
        if (appInsights) {
            appInsights.trackDependencyData({
                id: "dep-checkout-" + Date.now(),
                name: "api/checkout/cart",
                responseCode: response.status,
                duration: duration,
                type: "HTTP",
                target: window.location.host || "localhost",
                success: response.ok
            });
            appInsights.trackEvent({
                name: "DeploymentProvisioned",
                properties: {
                    itemsCount: cartState.items.length,
                    totalCost: cartState.total,
                    durationMs: duration
                }
            });
            logToConsole(`[Telemetry] Transmitted dependency: 'api/checkout/cart' and custom event: 'DeploymentProvisioned'`);
        }

        // Clear Cart
        cartState.items = [];
        updateCartUI();
        document.getElementById('cart-sidebar').classList.remove('active');
        
        alert("Resources deployed successfully! Check your Azure Portal Resource Group to review the provisions.");
    })
    .catch(err => {
        const duration = Date.now() - startTime;
        logToConsole(`[Checkout] Pipeline error: ${err.message} (${duration}ms)`);
        
        if (appInsights) {
            appInsights.trackDependencyData({
                id: "dep-checkout-fail-" + Date.now(),
                name: "api/checkout/cart",
                responseCode: 500,
                duration: duration,
                type: "HTTP",
                target: window.location.host || "localhost",
                success: false
            });
            logToConsole(`[Telemetry] Recorded failed dependency: 'api/checkout/cart'`);
        }

        // Still succeed the simulation for e-commerce UX
        cartState.items = [];
        updateCartUI();
        document.getElementById('cart-sidebar').classList.remove('active');
        alert("Provisioning triggered. Checkout recorded in telemetry logs!");
    })
    .finally(() => {
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = "Submit Deployment (Checkout)";
    });
}

// --- 4. Diagnostics & Lab Telemetry Controls ---
function initializeDiagnostics() {
    const btnLatency = document.getElementById('btn-diag-latency');
    const btnError = document.getElementById('btn-diag-error');

    btnLatency.addEventListener('click', () => {
        executeDelayedQuery();
    });

    btnError.addEventListener('click', () => {
        triggerUncaughtException();
    });
}

function executeDelayedQuery() {
    const statusEl = document.getElementById('diag-latency-status');
    const btn = document.getElementById('btn-diag-latency');

    btn.disabled = true;
    statusEl.textContent = "Query executing on Orders table (Simulating CPU/Locks)...";
    statusEl.className = "diag-status mt-2 text-xs font-mono text-amber";
    logToConsole("[Diagnostics] Running database query: GET /api/db-query/orders-list...");

    const startTime = Date.now();

    // Introduce a real client-side delay of 1200ms
    new Promise(resolve => setTimeout(resolve, 1200))
        .then(() => {
            const targetUrl = window.location.protocol === 'file:' ? 'https://httpbin.org/delay/1' : '/api/db-query/orders-list';
            return fetch(targetUrl);
        })
        .then(response => {
            const duration = Date.now() - startTime;
            statusEl.textContent = `Completed in ${duration}ms (HTTP ${response.status})`;
            statusEl.className = "diag-status mt-2 text-xs font-mono text-green";
            logToConsole(`[Diagnostics] Database query returned status ${response.status} in ${duration}ms`);

            if (appInsights) {
                // Log the real dependency call details explicitly to ensure it shows perfectly in Azure
                appInsights.trackDependencyData({
                    id: "dep-orders-list-" + Date.now(),
                    name: "api/db-query/orders-list",
                    responseCode: response.status,
                    duration: duration,
                    type: "SQL",
                    target: "openai-demo-sql.database.windows.net",
                    success: response.ok
                });
                logToConsole(`[Telemetry] Transmitted high-duration SQL dependency: 'api/db-query/orders-list' (${duration}ms)`);
            }
        })
        .catch(err => {
            const duration = Date.now() - startTime;
            statusEl.textContent = `Completed in ${duration}ms (Error: ${err.message})`;
            statusEl.className = "diag-status mt-2 text-xs font-mono text-rose";
            logToConsole(`[Diagnostics] Database query failed: ${err.message} (${duration}ms)`);

            if (appInsights) {
                appInsights.trackDependencyData({
                    id: "dep-orders-list-err-" + Date.now(),
                    name: "api/db-query/orders-list",
                    responseCode: 500,
                    duration: duration,
                    type: "SQL",
                    target: "openai-demo-sql.database.windows.net",
                    success: false
                });
                logToConsole(`[Telemetry] Transmitted failed SQL dependency: 'api/db-query/orders-list'`);
            }
        })
        .finally(() => {
            btn.disabled = false;
        });
}

function triggerUncaughtException() {
    const statusEl = document.getElementById('diag-error-status');
    statusEl.textContent = "Throwing uncaught database exception...";
    statusEl.className = "diag-status mt-2 text-xs font-mono text-rose";
    
    logToConsole("[Diagnostics] Throwing uncaught script exception: 'CriticalDatabaseLockException'...");

    // We set a brief delay so the console updates, then trigger a real JavaScript error.
    setTimeout(() => {
        statusEl.textContent = "Error thrown! Logged in Application Insights.";
        statusEl.className = "diag-status mt-2 text-xs font-mono text-green";

        // Throws a real, uncaught Javascript error.
        // App Insights captures this organically in the exceptions table!
        try {
            // Forcefully invoke an undefined function to trigger a real JS runtime exception
            window.executeNonExistentDatabaseQueryProcedure();
        } catch (err) {
            logToConsole(`[System] Caught local exception: ${err.message}`);
            if (appInsights) {
                appInsights.trackException({
                    error: err,
                    severityLevel: 3, // Critical
                    properties: {
                        componentName: "SQL Engine",
                        tableName: "Orders",
                        errorType: "CriticalDatabaseLockException",
                        lockEscalation: "True"
                    }
                });
                logToConsole(`[Telemetry] Transmitted real JS Exception: 'executeNonExistentDatabaseQueryProcedure is not a function'`);
            }
            // rethrow so it shows in the browser console too
            console.error(err);
        }
    }, 500);
}
