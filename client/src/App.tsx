import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import { ProtectedRoute } from "./lib/protected-route";
import ChatbotPage from "@/pages/chatbot-page";
import DashboardPage from "@/pages/dashboard-page";
import ResourcesPage from "@/pages/resources-page";
import SosButton from "@/components/sos-button";
import { AuthProvider } from "./hooks/use-auth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/chatbot" component={ChatbotPage} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <ProtectedRoute path="/resources" component={ResourcesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-neutral-50 font-nunito">
        <Router />
        <SosButton />
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
