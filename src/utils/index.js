export function createPageUrl(pageName) {
  const routes = {
    Home: "/",
    Dashboard: "/dashboard",
    Analytics: "/analytics",
    AnalyticsForecasting: "/analytics-forecasting",
    AudienceChannels: "/audience-channels",
    BMCBuilder: "/bmc-builder",
    Copilot: "/copilot",
    CreativeLab: "/creative-lab",
    CreativeMessaging: "/creative-messaging",
    Insights: "/insights",
    MarketFinder: "/market-finder",
    MarketProductFit: "/market-product-fit",
    PlanningReadiness: "/planning-readiness",
    PlaybooksModes: "/playbooks-modes",
    PostLaunch: "/post-launch",
    ProductBuilder: "/product-builder",
    ProjectView: "/project",
    Resources: "/resources",
    RiskSimulation: "/risk-simulation",
  };
  return routes[pageName] || "/";
}
