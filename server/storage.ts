import { type User, type InsertUser, type Article, type InsertArticle, type UpdateArticle, type DocumentTemplate, type InsertDocumentTemplate } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllArticles(): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getArticlesByCategory(category: string): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(slug: string, article: UpdateArticle): Promise<Article | undefined>;
  deleteArticle(slug: string): Promise<boolean>;
  searchArticles(query: string): Promise<Article[]>;
  
  getAllDocumentTemplates(): Promise<DocumentTemplate[]>;
  getDocumentTemplateBySlug(slug: string): Promise<DocumentTemplate | undefined>;
  getDocumentTemplatesByCategory(category: string): Promise<DocumentTemplate[]>;
  createDocumentTemplate(template: InsertDocumentTemplate): Promise<DocumentTemplate>;
  incrementDocumentDownloads(slug: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private articles: Map<string, Article>;
  private slugToId: Map<string, string>;
  private documentTemplates: Map<string, DocumentTemplate>;
  private templateSlugToId: Map<string, string>;

  constructor() {
    this.users = new Map();
    this.articles = new Map();
    this.slugToId = new Map();
    this.documentTemplates = new Map();
    this.templateSlugToId = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).sort(
      (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
    );
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const id = this.slugToId.get(slug);
    if (!id) return undefined;
    return this.articles.get(id);
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    const normalizedCategory = category.toLowerCase();
    return Array.from(this.articles.values())
      .filter((article) => article.category.toLowerCase().includes(normalizedCategory))
      .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    if (this.slugToId.has(insertArticle.slug)) {
      throw new Error("Article with this slug already exists");
    }

    const id = randomUUID();
    const article: Article = {
      ...insertArticle,
      id,
      authorImage: insertArticle.authorImage ?? null,
      featuredImage: insertArticle.featuredImage ?? null,
      published: insertArticle.published ? new Date(insertArticle.published) : new Date(),
    };
    this.articles.set(id, article);
    this.slugToId.set(article.slug, id);
    return article;
  }

  async updateArticle(slug: string, updates: UpdateArticle): Promise<Article | undefined> {
    const existingArticle = await this.getArticleBySlug(slug);
    if (!existingArticle) {
      return undefined;
    }

    const updatedArticle: Article = {
      ...existingArticle,
      ...updates,
      id: existingArticle.id,
      slug: existingArticle.slug,
      published: existingArticle.published,
      authorImage: updates.authorImage !== undefined ? (updates.authorImage ?? null) : existingArticle.authorImage,
      featuredImage: updates.featuredImage !== undefined ? (updates.featuredImage ?? null) : existingArticle.featuredImage,
    };

    this.articles.set(existingArticle.id, updatedArticle);
    return updatedArticle;
  }

  async deleteArticle(slug: string): Promise<boolean> {
    const article = await this.getArticleBySlug(slug);
    if (!article) {
      return false;
    }
    
    this.articles.delete(article.id);
    this.slugToId.delete(article.slug);
    return true;
  }

  async searchArticles(query: string): Promise<Article[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.articles.values())
      .filter((article) =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm)
      )
      .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
  }

  async getAllDocumentTemplates(): Promise<DocumentTemplate[]> {
    return Array.from(this.documentTemplates.values()).sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    );
  }

  async getDocumentTemplateBySlug(slug: string): Promise<DocumentTemplate | undefined> {
    const id = this.templateSlugToId.get(slug);
    if (!id) return undefined;
    return this.documentTemplates.get(id);
  }

  async getDocumentTemplatesByCategory(category: string): Promise<DocumentTemplate[]> {
    const normalizedCategory = category.toLowerCase();
    return Array.from(this.documentTemplates.values())
      .filter((template) => template.category.toLowerCase() === normalizedCategory)
      .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  }

  async createDocumentTemplate(insertTemplate: InsertDocumentTemplate): Promise<DocumentTemplate> {
    if (this.templateSlugToId.has(insertTemplate.slug)) {
      throw new Error("Document template with this slug already exists");
    }

    const id = randomUUID();
    const template: DocumentTemplate = {
      ...insertTemplate,
      id,
      downloads: 0,
      created: insertTemplate.created ?? new Date(),
    };
    this.documentTemplates.set(id, template);
    this.templateSlugToId.set(template.slug, id);
    return template;
  }

  async incrementDocumentDownloads(slug: string): Promise<void> {
    const template = await this.getDocumentTemplateBySlug(slug);
    if (template) {
      template.downloads += 1;
      this.documentTemplates.set(template.id, template);
    }
  }
}

export const storage = new MemStorage();
