import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTABlocks } from "@/components/CTABlocks";
import Home from "@/pages/Home";
import ArticlePage from "@/pages/ArticlePage";
import AllArticles from "@/pages/AllArticles";
import CategoryPage from "@/pages/CategoryPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import Calculators from "@/pages/Calculators";
import LegalConsultation from "@/pages/LegalConsultation";
import ModelsPage from "@/pages/ModelsPage";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import PaidConsultationPage from "@/pages/PaidConsultationPage";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/artigos" component={AllArticles} />
      <Route path="/artigo/:slug" component={ArticlePage} />
      <Route path="/categoria/:slug" component={CategoryPage} />
      <Route path="/sobre" component={AboutPage} />
      <Route path="/contato" component={ContactPage} />
      <Route path="/calculadoras" component={Calculators} />
      <Route path="/modelos" component={ModelsPage} />
      <Route path="/consulta-juridica" component={LegalConsultation} />
      <Route path="/consulta-paga" component={PaidConsultationPage} />
      <Route path="/termos" component={TermsOfService} />
      <Route path="/privacidade" component={PrivacyPolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
        <CTABlocks />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
