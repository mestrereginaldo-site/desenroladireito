import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertArticleSchema, updateArticleSchema, insertDocumentTemplateSchema } from "@shared/schema";
import { sendEmail } from "./email";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getAllArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/slug/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const article = await storage.getArticleBySlug(slug);
      
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.get("/api/articles/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const articles = await storage.getArticlesByCategory(category);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles by category" });
    }
  });

  app.get("/api/articles/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Search query required" });
      }
      
      const articles = await storage.searchArticles(query);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to search articles" });
    }
  });

  app.post("/api/articles", async (req, res) => {
    try {
      const validatedData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(validatedData);
      res.status(201).json(article);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid article data", details: error.errors });
      }
      if (error.message?.includes("slug already exists")) {
        return res.status(409).json({ error: "Article with this slug already exists" });
      }
      res.status(500).json({ error: "Failed to create article" });
    }
  });

  app.patch("/api/articles/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const validatedData = updateArticleSchema.parse(req.body);
      const article = await storage.updateArticle(slug, validatedData);
      
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      
      res.json(article);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid article data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update article" });
    }
  });

  app.delete("/api/articles/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const deleted = await storage.deleteArticle(slug);
      
      if (!deleted) {
        return res.status(404).json({ error: "Article not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete article" });
    }
  });

  app.get("/api/templates", async (req, res) => {
    try {
      const templates = await storage.getAllDocumentTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  });

  app.get("/api/templates/slug/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const template = await storage.getDocumentTemplateBySlug(slug);
      
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
      
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch template" });
    }
  });

  app.get("/api/templates/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const templates = await storage.getDocumentTemplatesByCategory(category);
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch templates by category" });
    }
  });

  app.post("/api/templates", async (req, res) => {
    try {
      const validatedData = insertDocumentTemplateSchema.parse(req.body);
      const template = await storage.createDocumentTemplate(validatedData);
      res.status(201).json(template);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid template data", details: error.errors });
      }
      if (error.message?.includes("slug already exists")) {
        return res.status(409).json({ error: "Template with this slug already exists" });
      }
      res.status(500).json({ error: "Failed to create template" });
    }
  });

  app.post("/api/templates/:slug/download", async (req, res) => {
    try {
      const { slug } = req.params;
      await storage.incrementDocumentDownloads(slug);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to record download" });
    }
  });

  const contactFormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    message: z.string(),
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactFormSchema.parse(req.body);
      
      const emailHtml = `
        <h2>Nova Mensagem de Contato</h2>
        <p><strong>Nome:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${data.message}</p>
      `;
      
      await sendEmail(
        "reginaldo.oliveira@catolicasc.edu.br",
        `Contato do Site - ${data.name}`,
        emailHtml
      );
      
      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error('Contact form error:', error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Dados inválidos", details: error.errors });
      }
      res.status(500).json({ error: "Erro ao enviar mensagem" });
    }
  });

  const consultationFormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    area: z.string(),
    message: z.string(),
  });

  app.post("/api/consultation", async (req, res) => {
    try {
      const data = consultationFormSchema.parse(req.body);
      
      const emailHtml = `
        <h2>Nova Solicitação de Consulta Jurídica</h2>
        <p><strong>Nome:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefone/WhatsApp:</strong> ${data.phone}</p>
        <p><strong>Área do Direito:</strong> ${data.area}</p>
        <p><strong>Descrição do Caso:</strong></p>
        <p>${data.message}</p>
      `;
      
      await sendEmail(
        "reginaldo.oliveira@catolicasc.edu.br",
        `Consulta Jurídica - ${data.name}`,
        emailHtml
      );
      
      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error('Consultation form error:', error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Dados inválidos", details: error.errors });
      }
      res.status(500).json({ error: "Erro ao enviar solicitação" });
    }
  });

  const paidConsultationSchema = z.object({
    name: z.string(),
    whatsapp: z.string(),
    case: z.string(),
  });

  app.post("/api/paid-consultation", async (req, res) => {
    try {
      const data = paidConsultationSchema.parse(req.body);
      
      const emailHtml = `
        <h2>Nova Consulta Paga (R$ 29,90)</h2>
        <p><strong>Nome:</strong> ${data.name}</p>
        <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
        <p><strong>Caso:</strong></p>
        <p>${data.case}</p>
        <hr>
        <p><em>Cliente será direcionado para pagamento via Stripe</em></p>
      `;
      
      await sendEmail(
        "reginaldo.oliveira@catolicasc.edu.br",
        `Consulta Paga - ${data.name}`,
        emailHtml
      );
      
      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error('Paid consultation form error:', error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Dados inválidos", details: error.errors });
      }
      res.status(500).json({ error: "Erro ao enviar dados" });
    }
  });

  const newsletterSchema = z.object({
    email: z.string().email(),
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const data = newsletterSchema.parse(req.body);
      
      const emailHtml = `
        <h2>Nova Inscrição na Newsletter</h2>
        <p><strong>Email:</strong> ${data.email}</p>
      `;
      
      await sendEmail(
        "reginaldo.oliveira@catolicasc.edu.br",
        `Nova Inscrição Newsletter - ${data.email}`,
        emailHtml
      );
      
      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error('Newsletter form error:', error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Email inválido", details: error.errors });
      }
      res.status(500).json({ error: "Erro ao cadastrar email" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
