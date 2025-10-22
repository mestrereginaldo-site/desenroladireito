import { 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  articles, type Article, type InsertArticle, type ArticleWithCategory,
  solutions, type Solution, type InsertSolution
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getCategoryById(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Articles
  getArticles(): Promise<ArticleWithCategory[]>;
  getArticleBySlug(slug: string): Promise<ArticleWithCategory | undefined>;
  getArticleById(id: number): Promise<ArticleWithCategory | undefined>;
  getArticlesByCategory(categorySlug: string): Promise<ArticleWithCategory[]>;
  getFeaturedArticles(): Promise<ArticleWithCategory[]>;
  getRecentArticles(limit: number): Promise<ArticleWithCategory[]>;
  searchArticles(query: string): Promise<ArticleWithCategory[]>;
  createArticle(article: InsertArticle): Promise<Article>;

  // Solutions
  getSolutions(): Promise<Solution[]>;
  createSolution(solution: InsertSolution): Promise<Solution>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private articles: Map<number, Article>;
  private solutions: Map<number, Solution>;
  private currentUserId: number;
  private currentCategoryId: number;
  private currentArticleId: number;
  private currentSolutionId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.articles = new Map();
    this.solutions = new Map();
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentArticleId = 1;
    this.currentSolutionId = 1;

    // Initialize with default data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { 
      ...insertCategory, 
      id,
      description: insertCategory.description ?? null,
      iconName: insertCategory.iconName ?? null
    };
    this.categories.set(id, category);
    return category;
  }

  // Article methods
  async getArticles(): Promise<ArticleWithCategory[]> {
    return Promise.all(
      Array.from(this.articles.values()).map(async (article) => {
        const category = await this.getCategoryById(article.categoryId);
        return {
          ...article,
          category: category!,
        };
      })
    );
  }

  async getArticleBySlug(slug: string): Promise<ArticleWithCategory | undefined> {
    const article = Array.from(this.articles.values()).find(
      (article) => article.slug === slug,
    );

    if (!article) return undefined;

    const category = await this.getCategoryById(article.categoryId);
    return {
      ...article,
      category: category!,
    };
  }

  async getArticleById(id: number): Promise<ArticleWithCategory | undefined> {
    const article = this.articles.get(id);
    if (!article) return undefined;

    const category = await this.getCategoryById(article.categoryId);
    return {
      ...article,
      category: category!,
    };
  }

  async getArticlesByCategory(categorySlug: string): Promise<ArticleWithCategory[]> {
    const category = await this.getCategoryBySlug(categorySlug);
    if (!category) return [];

    return (await this.getArticles()).filter(
      (article) => article.categoryId === category.id
    );
  }

  async getFeaturedArticles(): Promise<ArticleWithCategory[]> {
    return (await this.getArticles())
      .filter((article) => article.featured === 1)
      .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
  }

  async getRecentArticles(limit: number): Promise<ArticleWithCategory[]> {
    return (await this.getArticles())
      .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime())
      .slice(0, limit);
  }

  async searchArticles(query: string): Promise<ArticleWithCategory[]> {
    const lowerCaseQuery = query.toLowerCase();
    return (await this.getArticles()).filter(
      (article) =>
        article.title.toLowerCase().includes(lowerCaseQuery) ||
        article.excerpt.toLowerCase().includes(lowerCaseQuery) ||
        article.content.toLowerCase().includes(lowerCaseQuery)
    );
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.currentArticleId++;
    const article: Article = { 
      ...insertArticle, 
      id,
      imageUrl: insertArticle.imageUrl ?? null,
      featured: insertArticle.featured ?? null
    };
    this.articles.set(id, article);
    return article;
  }

  // Solution methods
  async getSolutions(): Promise<Solution[]> {
    return Array.from(this.solutions.values());
  }

  async createSolution(insertSolution: InsertSolution): Promise<Solution> {
    const id = this.currentSolutionId++;
    const solution: Solution = { 
      ...insertSolution, 
      id,
      imageUrl: insertSolution.imageUrl ?? null
    };
    this.solutions.set(id, solution);
    return solution;
  }

  // Initialize with default data
  private async initializeData() {
    // Create categories
    const consumerCategory = await this.createCategory({
      name: "Direito do Consumidor",
      slug: "direito-consumidor",
      description: "Saiba como resolver problemas com empresas, garantir seus direitos nas compras e obter ressarcimento por produtos defeituosos.",
      iconName: "fa-gavel"
    });

    const laborCategory = await this.createCategory({
      name: "Direito Trabalhista",
      slug: "direito-trabalhista",
      description: "Conheça seus direitos no ambiente de trabalho, rescisão, horas extras, assédio e mais. Saiba quando você pode reivindicar.",
      iconName: "fa-briefcase"
    });

    const realEstateCategory = await this.createCategory({
      name: "Direito Imobiliário",
      slug: "direito-imobiliario",
      description: "Tudo sobre contratos de aluguel, compra e venda de imóveis, financiamentos e como evitar armadilhas neste setor.",
      iconName: "fa-home"
    });

    const familyCategory = await this.createCategory({
      name: "Direito Familiar",
      slug: "direito-familiar",
      description: "Orientações sobre divórcio, pensão alimentícia, guarda de filhos, inventário e outros assuntos relacionados à família.",
      iconName: "fa-users"
    });

    const socialSecurityCategory = await this.createCategory({
      name: "Direito Previdenciário",
      slug: "direito-previdenciario",
      description: "Informações sobre aposentadoria, benefícios, auxílios e como garantir seus direitos junto ao INSS.",
      iconName: "fa-shield-alt"
    });

    // Create articles for each category
    // Consumer rights articles
    await this.createArticle({
      title: "Como cancelar compras online: Guia prático",
      slug: "como-cancelar-compras-online",
      excerpt: "Saiba seus direitos de arrependimento em compras pela internet e como proceder para cancelamentos sem dor de cabeça.",
      content: `
# Como cancelar compras online: Guia prático

Você fez uma compra pela internet e se arrependeu? Saiba que o Código de Defesa do Consumidor (CDC) garante o direito de arrependimento para compras realizadas fora do estabelecimento comercial.

## O direito de arrependimento

O artigo 49 do CDC estabelece que o consumidor pode desistir da compra no prazo de 7 dias, contados a partir do recebimento do produto ou da assinatura do contrato. Este direito é garantido independentemente do motivo do arrependimento.

## Como proceder para cancelar:

1. **Entre em contato com a empresa**: Faça o pedido de cancelamento preferencialmente por escrito (e-mail, chat ou outro canal oficial), guardando o protocolo de atendimento.

2. **Prazo legal**: Lembre-se que o pedido deve ser feito em até 7 dias após o recebimento do produto.

3. **Devolução do valor**: A empresa deve devolver integralmente qualquer valor pago, inclusive frete, atualizado monetariamente.

4. **Custos de devolução**: Em regra, os custos de devolução são de responsabilidade da empresa.

## O que fazer se a empresa se recusar a cancelar:

- Guarde todos os comprovantes da tentativa de cancelamento
- Formalize uma reclamação no Procon
- Registre uma queixa no site consumidor.gov.br
- Em último caso, procure o Juizado Especial Cível

## Exceções ao direito de arrependimento:

Alguns produtos podem ter restrições para cancelamento, como:
- Produtos personalizados
- Produtos perecíveis
- Conteúdos digitais após o download ou acesso

Lembre-se que conhecer seus direitos é o primeiro passo para garantir que sejam respeitados!
      `,
      imageUrl: "https://images.unsplash.com/photo-1589216996730-15c1486d8590",
      publishDate: new Date("2025-05-12"),
      categoryId: consumerCategory.id,
      featured: 1
    });

    await this.createArticle({
      title: "Produtos com defeito: Como exigir seus direitos",
      slug: "produtos-com-defeito",
      excerpt: "Guia completo sobre como proceder quando um produto apresenta defeito, incluindo prazos e opções de reparação.",
      content: `
# Produtos com defeito: Como exigir seus direitos

Comprou um produto que apresentou defeito? O Código de Defesa do Consumidor estabelece regras claras para proteger o consumidor nessas situações.

## Prazos para reclamação

- **Produtos não duráveis**: 30 dias (alimentos, cosméticos, etc.)
- **Produtos duráveis**: 90 dias (eletrodomésticos, móveis, etc.)

Estes prazos começam a contar a partir da entrega efetiva do produto para vícios aparentes, ou da descoberta do problema, para vícios ocultos.

## As três alternativas legais

Quando um produto apresenta defeito, o consumidor pode exigir, à sua escolha:

1. **Substituição do produto**
2. **Abatimento proporcional do preço**
3. **Devolução do valor pago (com correção monetária)**

O fornecedor tem até 30 dias para sanar o problema. Se não resolver neste prazo, o consumidor pode exigir imediatamente qualquer uma das três alternativas acima.

## Como proceder:

1. **Registre o problema**: Tire fotos, guarde notas fiscais e faça um relatório detalhado do defeito
2. **Contate o fornecedor**: Use canais oficiais e guarde protocolos de atendimento
3. **Formalize a reclamação**: Envie carta com AR ou e-mail com confirmação de leitura
4. **Acione órgãos de defesa**: Procon, consumidor.gov.br ou Juizado Especial Cível

## Garantias legais e contratuais

A garantia legal é obrigatória e independe de termo escrito. Já a garantia contratual é complementar, oferecida voluntariamente pelo fornecedor.

Lembre-se: A garantia contratual não substitui a legal, mas se soma a ela!
      `,
      imageUrl: "https://images.unsplash.com/photo-1625225230517-7426c1be750c",
      publishDate: new Date("2025-05-01"),
      categoryId: consumerCategory.id,
      featured: 0
    });

    // Labor law articles
    await this.createArticle({
      title: "Demissão sem justa causa: O que você precisa saber",
      slug: "demissao-sem-justa-causa",
      excerpt: "Entenda seus direitos durante uma demissão sem justa causa, quais verbas rescisórias você tem direito e como calcular.",
      content: `
# Demissão sem justa causa: O que você precisa saber

A demissão sem justa causa ocorre quando o empregador decide encerrar o contrato de trabalho sem que o funcionário tenha cometido qualquer falta grave. Nesta situação, o trabalhador tem direito a diversas verbas rescisórias.

## Quais são seus direitos?

Quando demitido sem justa causa, o trabalhador tem direito a:

- **Saldo de salário**: Dias trabalhados no mês da rescisão
- **Aviso prévio**: 30 dias + 3 dias por ano trabalhado (limitado a 90 dias)
- **Férias vencidas e proporcionais**: Com acréscimo de 1/3
- **13º salário proporcional**: Referente aos meses trabalhados no ano
- **FGTS**: Saque do saldo + multa de 40% sobre o total depositado
- **Seguro-desemprego**: Se atender aos requisitos legais

## Prazos para pagamento

A quitação das verbas rescisórias deve ocorrer:
- Em até 10 dias após o término do contrato, se houver aviso prévio trabalhado
- No primeiro dia útil após o término do contrato, se for aviso prévio indenizado

## Como calcular as verbas rescisórias

Para fazer uma estimativa dos valores a receber:

1. **Saldo de salário**: (Salário ÷ 30) × dias trabalhados no mês
2. **Aviso prévio**: Salário mensal
3. **Férias + 1/3**: Salário + (Salário ÷ 3)
4. **13º proporcional**: (Salário ÷ 12) × meses trabalhados no ano
5. **FGTS**: 8% sobre todas as verbas salariais no período + multa de 40%

## O que fazer em caso de problemas?

Se a empresa não pagar corretamente:
- Busque a assistência do sindicato da categoria
- Registre uma denúncia na Superintendência Regional do Trabalho
- Procure um advogado trabalhista ou a Defensoria Pública
- Entre com uma ação na Justiça do Trabalho

Lembre-se: A homologação da rescisão não impede o questionamento posterior de direitos não pagos!
      `,
      imageUrl: "https://images.unsplash.com/photo-1590087851092-908fd5cc6c67",
      publishDate: new Date("2025-05-10"),
      categoryId: laborCategory.id,
      featured: 1
    });

    await this.createArticle({
      title: "Assédio moral no trabalho: Como identificar e agir",
      slug: "assedio-moral-trabalho",
      excerpt: "Aprenda a identificar situações de assédio moral, seus direitos como trabalhador e as medidas legais para se proteger.",
      content: `
# Assédio moral no trabalho: Como identificar e agir

O assédio moral no ambiente de trabalho consiste na exposição repetitiva e prolongada do trabalhador a situações humilhantes e constrangedoras, capazes de causar ofensa à personalidade, dignidade ou integridade psíquica.

## Como identificar o assédio moral

Algumas condutas comuns que caracterizam assédio moral:

- Críticas constantes ao trabalho de forma desrespeitosa
- Isolamento do funcionário
- Atribuição de tarefas impossíveis ou excessivas
- Ridicularização pública
- Propagação de boatos
- Desvalorização da capacidade profissional
- Ameaças veladas ou explícitas

## Consequências para a vítima

O assédio moral pode causar:
- Problemas psicológicos (ansiedade, depressão, síndrome do pânico)
- Doenças físicas relacionadas ao estresse
- Isolamento social
- Prejuízos à carreira profissional

## O que fazer ao sofrer assédio moral

1. **Registre os fatos**: Anote datas, horários, locais e pessoas presentes
2. **Guarde provas**: E-mails, mensagens, testemunhas
3. **Informe a empresa**: Reporte à ouvidoria ou departamento de RH
4. **Procure apoio**: Sindicato, colegas e familiares
5. **Busque ajuda médica e psicológica**: Para documentar problemas de saúde relacionados

## Medidas legais

Em caso de assédio moral comprovado, você pode:

- Solicitar a rescisão indireta do contrato (equivalente à demissão sem justa causa)
- Buscar indenização por danos morais na Justiça do Trabalho
- Em casos graves, registrar Boletim de Ocorrência, pois pode configurar crime contra a honra

## Prevenção nas empresas

Empresas com políticas anti-assédio costumam adotar:
- Códigos de ética e conduta
- Canais de denúncia confidenciais
- Treinamentos sobre respeito no ambiente de trabalho
- Punição exemplar para casos confirmados

Lembre-se: O assédio moral é diferente de cobranças normais de trabalho. A linha que separa a exigência legítima do assédio está no respeito à dignidade humana.
      `,
      imageUrl: "https://images.unsplash.com/photo-1517502884422-41eaead166d4",
      publishDate: new Date("2025-04-28"),
      categoryId: laborCategory.id,
      featured: 0
    });

    // Real estate law articles
    await this.createArticle({
      title: "Aluguel: 5 cláusulas abusivas que você deve ficar atento",
      slug: "clausulas-abusivas-aluguel",
      excerpt: "Descubra quais cláusulas são consideradas abusivas em contratos de aluguel e como se proteger de armadilhas contratuais.",
      content: `
# Aluguel: 5 cláusulas abusivas que você deve ficar atento

Ao assinar um contrato de locação, é fundamental conhecer seus direitos para evitar aceitar condições abusivas. A Lei do Inquilinato (Lei nº 8.245/91) e o Código de Defesa do Consumidor protegem o locatário contra cláusulas consideradas ilegais.

## 1. Multa por rescisão antecipada superior a 3 aluguéis

É considerado abusivo estabelecer multa superior ao valor de três meses de aluguel quando o inquilino precisa rescindir o contrato antes do prazo.

**O que diz a lei:** O artigo 4º da Lei 8.245/91 estabelece que a multa por rescisão antecipada não pode exceder o valor de três meses de aluguel.

## 2. Transferência de todos os reparos para o inquilino

Cláusulas que responsabilizam o inquilino por todo e qualquer reparo no imóvel são abusivas.

**O que diz a lei:** O locador é responsável pelos reparos estruturais e por problemas anteriores à locação. Ao inquilino cabem apenas pequenos reparos de manutenção decorrentes do uso normal.

## 3. Reajuste de aluguel em período inferior a 12 meses

Estabelecer reajustes do valor do aluguel em períodos menores que um ano é ilegal.

**O que diz a lei:** O artigo 18 da Lei do Inquilinato estabelece que o aluguel só pode ser reajustado após 12 meses de contrato.

## 4. Proibição absoluta de sublocação

Proibir completamente a sublocação, sem considerar a possibilidade mediante consentimento do locador.

**O que diz a lei:** A sublocação é permitida desde que haja consentimento prévio e escrito do locador, conforme o artigo 13 da Lei 8.245/91.

## 5. Renúncia antecipada ao direito de preferência na compra

Cláusulas que fazem o inquilino renunciar previamente ao direito de preferência na compra do imóvel.

**O que diz a lei:** O inquilino tem direito de preferência na compra do imóvel, caso o proprietário decida vendê-lo, nas mesmas condições oferecidas a terceiros (artigo 27 da Lei 8.245/91).

## O que fazer ao identificar cláusulas abusivas

1. Negocie a retirada da cláusula antes de assinar
2. Consulte um advogado especializado para revisar o contrato
3. Se já assinou, saiba que cláusulas abusivas são nulas e podem ser contestadas judicialmente
4. Registre sua reclamação no Procon
5. Em caso de litígio, busque o Juizado Especial Cível

Lembre-se: Mesmo que você tenha assinado um contrato com cláusulas abusivas, elas podem ser declaradas nulas judicialmente, sem invalidar o restante do contrato.
      `,
      imageUrl: "https://images.unsplash.com/photo-1556156653-e5a7c69cc263",
      publishDate: new Date("2025-05-05"),
      categoryId: realEstateCategory.id,
      featured: 1
    });

    await this.createArticle({
      title: "O que verificar antes de assinar um contrato de aluguel",
      slug: "verificar-antes-contrato-aluguel",
      excerpt: "Checklist completo do que verificar antes de alugar um imóvel, cláusulas importantes e como evitar problemas futuros.",
      content: `
# O que verificar antes de assinar um contrato de aluguel

Alugar um imóvel é uma decisão importante e requer atenção a diversos detalhes para evitar dores de cabeça futuras. Confira nosso checklist completo antes de assinar o contrato.

## Inspeção do imóvel

Antes de qualquer negociação, verifique:

- **Estado geral do imóvel**: Paredes, tetos, pisos
- **Instalações elétricas e hidráulicas**: Teste interruptores, torneiras, descargas
- **Infiltrações e umidade**: Manchas nas paredes podem indicar problemas
- **Portas e janelas**: Verifique se abrem e fecham adequadamente
- **Vizinhança**: Conheça o bairro em diferentes horários

**Dica**: Faça um relatório fotográfico detalhado do estado atual do imóvel para evitar questionamentos ao final do contrato.

## Documentação necessária

Confira se o proprietário ou imobiliária solicitou:

- RG e CPF
- Comprovante de renda (geralmente 3x o valor do aluguel)
- Comprovante de residência atual
- Certidões negativas de débitos
- Referências pessoais ou comerciais

## Análise do contrato

Pontos essenciais que devem constar claramente:

1. **Identificação completa das partes**: Dados do locador e locatário
2. **Descrição detalhada do imóvel**: Tamanho, cômodos, acessórios
3. **Valor do aluguel e forma de reajuste**: Normalmente pelo IGP-M anual
4. **Prazo de locação**: Mínimo de 30 meses para garantir renovação automática
5. **Encargos e responsabilidades**: Quem paga IPTU, condomínio, etc.
6. **Permissões e restrições**: Animais, reformas, sublocação
7. **Condições para rescisão antecipada**: Multa e prazos de aviso

## Garantias locatícias

O proprietário pode exigir apenas UMA das seguintes garantias:

- **Caução**: Depósito de até 3 meses de aluguel
- **Fiador**: Pessoa com imóvel quitado que se responsabiliza
- **Seguro-fiança**: Contratado em seguradora
- **Título de capitalização**: Valor aplicado como garantia

## Vistorias

- Exija vistoria de entrada documentada e detalhada
- Assine apenas após conferir todos os itens
- Guarde uma cópia da vistoria assinada por ambas as partes

## Alertas importantes

- Desconfie de valores muito abaixo do mercado
- Nunca pague antes de assinar o contrato
- Verifique se quem está alugando é realmente o proprietário (solicite matrícula do imóvel)
- Cheque se não há pendências de condomínio ou IPTU
- Negocie cláusulas abusivas antes de assinar

Lembre-se que um bom contrato protege ambas as partes e previne conflitos futuros.
      `,
      imageUrl: "https://images.unsplash.com/photo-1464082354059-27db6ce50048",
      publishDate: new Date("2025-04-20"),
      categoryId: realEstateCategory.id,
      featured: 0
    });

    // Family law articles
    await this.createArticle({
      title: "Divórcio consensual: Como fazer sem gastar muito",
      slug: "divorcio-consensual-economico",
      excerpt: "Entenda como funciona o divórcio consensual, quais documentos são necessários e como economizar nos procedimentos.",
      content: `
# Divórcio consensual: Como fazer sem gastar muito

O divórcio consensual é a dissolução do casamento quando ambos os cônjuges estão de acordo. Este procedimento é mais rápido, menos custoso e emocionalmente menos desgastante que um divórcio litigioso.

## O que é necessário para um divórcio consensual?

- Acordo entre os cônjuges sobre todos os pontos da separação
- Definição sobre guarda dos filhos, se houver
- Acordo sobre pensão alimentícia, se aplicável
- Divisão dos bens em comum

## Opções para realizar o divórcio consensual

### 1. Cartório (Extrajudicial)

A opção mais rápida e econômica, possível quando:
- Não há filhos menores ou incapazes
- Há consenso total entre as partes
- Ambos estão representados por advogado ou defensor público

**Documentos necessários:**
- Certidão de casamento atualizada
- Documentos pessoais dos cônjuges (RG e CPF)
- Pacto antenupcial, se houver
- Documentos dos bens a serem partilhados
- Escritura pública elaborada por advogado

**Custo:** Varia conforme o estado, mas geralmente entre R$ 500 e R$ 1.500 (taxas cartoriais + honorários advocatícios)

**Tempo médio:** 1 a 2 semanas

### 2. Via judicial, mas consensual

Necessária quando:
- Há filhos menores ou incapazes
- O casal está de acordo em todos os termos

**Documentos adicionais:**
- Certidões de nascimento dos filhos
- Comprovantes de renda para definição de pensão

**Custo:** Entre R$ 1.500 e R$ 3.000 (custas judiciais + honorários advocatícios)

**Tempo médio:** 1 a 3 meses

## Como economizar no processo

1. **Defina os termos antes de procurar profissionais**
   Discuta e chegue a acordos sobre todos os pontos com seu cônjuge

2. **Considere a Defensoria Pública**
   Se sua renda familiar for até 3 salários mínimos

3. **Busque escritórios de faculdades de Direito**
   Muitas universidades oferecem assistência jurídica gratuita

4. **Compare honorários advocatícios**
   Solicite orçamentos de diferentes profissionais

5. **Divórcio online**
   Algumas plataformas oferecem serviços de divórcio consensual a preços reduzidos

## Pontos de atenção

- Mesmo sendo consensual, cada cônjuge deve ter seu próprio advogado ou o mesmo advogado com procuração de ambos
- A pensão alimentícia deve ser estabelecida considerando as necessidades de quem recebe e possibilidades de quem paga
- A guarda compartilhada é a regra no Brasil, salvo quando não for benéfica para a criança
- Bens adquiridos antes do casamento ou por herança não entram na partilha (exceto se regime de comunhão universal)

Lembre-se: Investir em um bom acordo agora pode evitar problemas e despesas maiores no futuro!
      `,
      imageUrl: "https://images.unsplash.com/photo-1575505586569-8a0f335b5653",
      publishDate: new Date("2025-04-25"),
      categoryId: familyCategory.id,
      featured: 1
    });

    // Social security article
    await this.createArticle({
      title: "Aposentadoria por tempo de contribuição: Novas regras após a reforma",
      slug: "aposentadoria-tempo-contribuicao",
      excerpt: "Entenda as mudanças nas regras de aposentadoria após a reforma previdenciária e quais são suas opções para se aposentar.",
      content: `
# Aposentadoria por tempo de contribuição: Novas regras após a reforma

A reforma da Previdência, aprovada em 2019, trouxe mudanças significativas nas regras para aposentadoria. Entenda como ficou a aposentadoria por tempo de contribuição e quais são as regras de transição.

## O fim da aposentadoria por tempo de contribuição pura

Com a reforma, deixou de existir a aposentadoria exclusivamente por tempo de contribuição. Agora, além do tempo mínimo de contribuição, também é exigida uma idade mínima.

**Regra geral atual:**
- **Homens**: 65 anos de idade + 20 anos de contribuição
- **Mulheres**: 62 anos de idade + 15 anos de contribuição

## Regras de transição

Para quem já estava no mercado de trabalho antes da reforma, existem cinco regras de transição:

### 1. Regra dos pontos (86/96)

Soma-se a idade com o tempo de contribuição:
- **Homens**: Começou em 96 pontos (2019), aumentando 1 ponto por ano até chegar a 105
- **Mulheres**: Começou em 86 pontos (2019), aumentando 1 ponto por ano até chegar a 100

**Tempo mínimo de contribuição:**
- Homens: 35 anos
- Mulheres: 30 anos

### 2. Idade mínima progressiva

Em 2019, a idade mínima começou em:
- Homens: 61 anos + 35 anos de contribuição
- Mulheres: 56 anos + 30 anos de contribuição

**Progressão:** Aumento de 6 meses a cada ano até atingir 65/62 anos

### 3. Pedágio de 50%

Para quem estava a até 2 anos de completar o tempo mínimo de contribuição quando a reforma entrou em vigor:
- Tempo adicional: 50% do que faltava para atingir o tempo mínimo (35 anos homens/30 anos mulheres)
- Sem idade mínima

### 4. Pedágio de 100%

- Idade mínima: 60 anos (homens) e 57 anos (mulheres)
- Tempo de contribuição: 35 anos (homens) e 30 anos (mulheres)
- Pedágio: 100% do tempo que faltava para atingir o tempo mínimo de contribuição

### 5. Idade reduzida para professor

Regras especiais para professores da educação básica com redução de:
- 5 anos na idade mínima
- 5 pontos na regra de pontos

## Como escolher a melhor regra

A escolha da regra mais vantajosa depende de:
- Sua idade atual
- Tempo de contribuição acumulado
- Expectativa salarial nos próximos anos
- Condições de saúde
- Planos pessoais

## Dicas importantes

1. **Verifique seu tempo de contribuição**: Solicite um extrato previdenciário no site ou aplicativo Meu INSS
2. **Procure por períodos não computados**: Trabalhos anteriores não registrados podem ser incluídos mediante comprovação
3. **Simule diferentes cenários**: Use o simulador do INSS para comparar as diferentes regras
4. **Avalie o fator previdenciário**: Em algumas situações ele pode reduzir significativamente o benefício
5. **Considere adiar a aposentadoria**: Contribuir por mais tempo pode aumentar o valor do benefício

Lembre-se: A decisão de se aposentar deve considerar não apenas quando você pode, mas também se o valor do benefício será suficiente para manter seu padrão de vida.
      `,
      imageUrl: "https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d",
      publishDate: new Date("2025-05-08"),
      categoryId: socialSecurityCategory.id,
      featured: 1
    });

    // Create solutions
    await this.createSolution({
      title: "Consultoria jurídica online",
      description: "Tire suas dúvidas com especialistas sem sair de casa.",
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
      link: "/legal-consultation",
      linkText: "Encontre um Advogado"
    });

    await this.createSolution({
      title: "Modelos de documentos",
      description: "Acesse modelos prontos de petições, contratos e outros documentos.",
      imageUrl: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc",
      link: "/contact",
      linkText: "Baixar modelos"
    });

    await this.createSolution({
      title: "Calculadoras jurídicas",
      description: "Calcule verbas rescisórias, pensão alimentícia e outros valores.",
      imageUrl: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33",
      link: "/calculators",
      linkText: "Usar calculadoras"
    });

    await this.createSolution({
      title: "Comunidade de apoio",
      description: "Compartilhe experiências e receba conselhos de outras pessoas.",
      imageUrl: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a",
      link: "/contact",
      linkText: "Participar"
    });

    // Artigos adicionais para o lançamento do site
    
    // Artigo 3 - Direito Previdenciário
    await this.createArticle({
      title: "Aposentadoria por tempo de contribuição: Requisitos e cálculos atualizados",
      slug: "aposentadoria-tempo-contribuicao",
      excerpt: "Guia completo sobre as regras de aposentadoria por tempo de contribuição após a reforma da previdência, com exemplos de cálculos e dicas.",
      content: `# Aposentadoria por tempo de contribuição: Requisitos e cálculos atualizados

## Introdução

A aposentadoria por tempo de contribuição sempre foi uma das modalidades mais tradicionais do sistema previdenciário brasileiro. No entanto, após a Reforma da Previdência (Emenda Constitucional nº 103/2019), ocorreram mudanças significativas nas regras para concessão deste benefício, incluindo a criação de regras de transição para quem já estava no mercado de trabalho.

Este artigo apresenta um panorama completo e atualizado sobre a aposentadoria por tempo de contribuição, explicando as novas regras, as regras de transição vigentes e como calcular o valor do benefício conforme a legislação atual.

## O fim da aposentadoria por tempo de contribuição pura

A primeira e mais importante mudança trazida pela Reforma da Previdência foi o fim da aposentadoria exclusivamente por tempo de contribuição, sem idade mínima, para os novos segurados. Para quem ingressou no sistema previdenciário após a reforma (13/11/2019), passou a valer a aposentadoria por tempo de contribuição com idade mínima.

## Regras atuais para novos segurados

Para quem começou a contribuir após a reforma, as regras são:

### Homens:
- 65 anos de idade
- 20 anos de tempo de contribuição

### Mulheres:
- 62 anos de idade
- 15 anos de tempo de contribuição

## Regras de transição

Para quem já estava no sistema antes da reforma, foram criadas cinco regras de transição:

### 1. Regra dos pontos (art. 4º da EC 103/2019)

Soma de idade e tempo de contribuição:
- Mulheres: começando com 86 pontos em 2019, aumentando 1 ponto a cada ano até atingir 100 pontos
- Homens: começando com 96 pontos em 2019, aumentando 1 ponto a cada ano até atingir 105 pontos

Requisitos mínimos:
- Mulheres: 30 anos de contribuição
- Homens: 35 anos de contribuição

### 2. Regra da idade mínima progressiva (art. 4º da EC 103/2019)

Idade mínima em 2019:
- Mulheres: 56 anos, aumentando 6 meses a cada ano até atingir 62 anos
- Homens: 61 anos, aumentando 6 meses a cada ano até atingir 65 anos

Requisitos mínimos:
- Mulheres: 30 anos de contribuição
- Homens: 35 anos de contribuição

### 3. Regra do pedágio de 50% (art. 17 da EC 103/2019)

Para quem estava a até 2 anos de completar o tempo mínimo de contribuição:
- Mulheres: 28 anos de contribuição já cumpridos na data da reforma
- Homens: 33 anos de contribuição já cumpridos na data da reforma

O segurado deverá cumprir um pedágio de 50% sobre o tempo que faltava para completar o tempo mínimo.

### 4. Regra do pedágio de 100% (art. 20 da EC 103/2019)

Idade mínima:
- Mulheres: 57 anos
- Homens: 60 anos

Requisitos:
- Cumprimento de 100% do tempo de contribuição que faltava para completar o tempo mínimo na data da reforma

### 5. Regra para professores

Os professores da educação básica têm redução de 5 anos na idade e no tempo de contribuição nas regras de transição.

## Como calcular o valor da aposentadoria

### Cálculo para novos segurados e regras de transição (exceto pedágio 100%)

O valor da aposentadoria será de 60% da média de todos os salários de contribuição desde julho de 1994 (ou desde o início das contribuições, se posterior), com acréscimo de 2% para cada ano que exceder:
- 20 anos de contribuição para homens
- 15 anos de contribuição para mulheres

### Exemplo de cálculo:

Mulher com 30 anos de contribuição:
- 60% (base) + 30% (2% x 15 anos excedentes) = 90% da média dos salários de contribuição

Homem com 40 anos de contribuição:
- 60% (base) + 40% (2% x 20 anos excedentes) = 100% da média dos salários de contribuição

### Cálculo para a regra de pedágio 100%

Para quem se aposentar pela regra do pedágio de 100%, o cálculo é diferente:
- 100% da média dos salários de contribuição, com aplicação do fator previdenciário

## Limites da aposentadoria

- Valor mínimo: um salário mínimo (R$ 1.412,00 em 2023)
- Valor máximo: teto do INSS (R$ 7.507,49 em 2023)

## Documentos necessários para solicitar a aposentadoria

Para solicitar a aposentadoria, o segurado deve reunir:

- Documentos pessoais (RG, CPF)
- Carteira de Trabalho (todas que possuir)
- PIS/PASEP/NIT
- Documentos que comprovem atividade rural, se for o caso
- Comprovantes de recolhimento para períodos como autônomo
- Certificado de reservista (homens)
- Certidão de nascimento dos filhos (mulheres podem ter direito a tempo adicional)

## Como solicitar a aposentadoria

O pedido de aposentadoria pode ser feito:

1. **Pelo aplicativo ou site Meu INSS**:
   - Faça login com sua conta gov.br
   - Clique em "Novo Pedido"
   - Selecione o tipo de aposentadoria
   - Preencha as informações solicitadas
   - Anexe os documentos necessários
   - Acompanhe o andamento pelo próprio aplicativo

2. **Pela Central 135**:
   - Ligue gratuitamente de telefone fixo ou pague tarifa local de celular
   - Horário de atendimento: segunda a sábado, das 7h às 22h
   - Agende uma data para levar a documentação à agência

## Tempo de análise e concessão

O prazo legal para análise do requerimento é de 45 dias, mas pode variar conforme a complexidade do caso e a disponibilidade da agência. A decisão será informada pelos canais de comunicação do INSS.

## Recursos em caso de indeferimento

Se o pedido for negado, o segurado pode:

1. **Apresentar recurso**: No prazo de 30 dias, ao Conselho de Recursos da Previdência Social
2. **Solicitar revisão administrativa**: Para corrigir erros materiais
3. **Buscar a via judicial**: Através do Juizado Especial Federal (para valores até 60 salários mínimos)

## Dicas importantes

### 1. Verifique seu tempo de contribuição antes de solicitar

Acesse o Meu INSS e verifique seu Cadastro Nacional de Informações Sociais (CNIS) para confirmar se todos os períodos trabalhados estão devidamente registrados.

### 2. Atente-se a contribuições faltantes

Se identificar períodos trabalhados que não constam no CNIS, separe documentos que comprovem essas atividades:
- Carteira de trabalho
- Contracheques
- Recibos de pagamento
- Declarações de empresas

### 3. Considere a possibilidade de compra de tempo

Para completar o tempo necessário, é possível:
- Fazer contribuições retroativas como contribuinte individual
- Indenizar períodos trabalhados sem registro

### 4. Compare as regras de transição

Faça simulações para verificar qual regra de transição é mais vantajosa no seu caso específico.

### 5. Planeje o momento certo para se aposentar

Às vezes, contribuir por alguns meses adicionais pode significar um aumento expressivo no valor do benefício.

## Direitos do aposentado

Quem se aposenta tem direito a:

- **13º salário**: Pago em duas parcelas (normalmente em agosto e novembro)
- **Reajustes anuais**: Conforme a inflação (INPC)
- **Continuar trabalhando**: Não há impedimento para trabalhar após a aposentadoria
- **Pensão por morte aos dependentes**: Em caso de falecimento

## Mudanças frequentes na legislação

É importante destacar que a legislação previdenciária está sujeita a constantes alterações. Modificações em índices, idades mínimas e percentuais de cálculo podem ocorrer através de novas leis ou decisões judiciais.

Por isso, recomenda-se consultar um advogado especializado em direito previdenciário antes de tomar decisões importantes sobre sua aposentadoria, especialmente em casos mais complexos.

## Conclusão

A aposentadoria por tempo de contribuição passou por transformações significativas após a Reforma da Previdência. Embora as regras tenham se tornado mais rígidas, as regras de transição permitem que segurados que já estavam contribuindo possam se aposentar em condições mais favoráveis do que as estabelecidas para os novos entrantes no sistema.

Independentemente da regra aplicável, o planejamento previdenciário tornou-se ainda mais importante. Conhecer seus direitos, monitorar regularmente seu tempo de contribuição e fazer simulações periódicas são práticas recomendadas para garantir uma aposentadoria tranquila e financeiramente sustentável.

Lembre-se de que cada caso é único, com suas particularidades. Consulte sempre fontes oficiais e, se necessário, busque orientação profissional para tomar as melhores decisões sobre sua aposentadoria.`,
      imageUrl: "https://images.unsplash.com/photo-1574280363402-2f672940b871?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
      publishDate: new Date("2023-04-10"),
      categoryId: 5, // Categoria Direito Previdenciário
      featured: 1
    });
    
    // Artigo 4 - Direito Imobiliário
    await this.createArticle({
      title: "Contrato de aluguel: Como evitar armadilhas e proteger seus direitos",
      slug: "contrato-de-aluguel-evitar-armadilhas",
      excerpt: "Tudo o que você precisa saber antes de assinar um contrato de locação, incluindo cláusulas abusivas, garantias e direitos do inquilino.",
      content: `# Contrato de aluguel: Como evitar armadilhas e proteger seus direitos

## Introdução

Alugar um imóvel é uma das transações mais comuns no mercado imobiliário brasileiro, seja para moradia ou para estabelecer um negócio. No entanto, muitas pessoas assinam contratos de aluguel sem compreender totalmente suas implicações ou sem verificar a presença de cláusulas potencialmente prejudiciais.

A Lei do Inquilinato (Lei nº 8.245/1991) regulamenta as locações de imóveis urbanos no Brasil, estabelecendo direitos e deveres tanto para proprietários quanto para inquilinos. Conhecer essa legislação é fundamental para evitar problemas futuros e garantir uma relação locatícia equilibrada.

Neste artigo, vamos explorar os principais aspectos a serem observados em contratos de aluguel, identificar cláusulas abusivas comuns, explicar as diferentes modalidades de garantia disponíveis e apresentar os direitos fundamentais do inquilino que não podem ser ignorados.

## Antes de assinar: Pontos essenciais a verificar

### 1. Identificação completa das partes

O contrato deve identificar claramente:
- Locador (proprietário): nome completo, RG, CPF, estado civil, profissão e endereço
- Locatário (inquilino): mesmas informações
- Fiador ou outra garantia (se houver): dados completos

Se o imóvel pertencer a mais de uma pessoa, todos os proprietários devem constar no contrato ou deve haver uma procuração que autorize uma única pessoa a representar os demais.

### 2. Descrição detalhada do imóvel

Verifique se o contrato inclui:
- Endereço completo (inclusive CEP)
- Número da matrícula e cartório de registro
- Características físicas (área, número de cômodos, etc.)
- Estado de conservação
- Lista de equipamentos e móveis (se for mobiliado)

Recomenda-se anexar ao contrato um laudo detalhado do estado do imóvel, com fotos, para evitar disputas futuras sobre danos preexistentes.

### 3. Prazo e valor do aluguel

Confira com atenção:
- Prazo da locação: mínimo de 30 meses para locações residenciais, se o proprietário quiser evitar a denúncia vazia
- Valor do aluguel e data de vencimento
- Critérios para reajuste (geralmente anual, pelo IGP-M ou IPCA)
- Especificação clara sobre o que está incluído e o que não está no valor (condomínio, IPTU, etc.)

### 4. Despesas e encargos

O contrato deve especificar quem é responsável pelo pagamento de:
- IPTU e taxas municipais
- Taxas de condomínio
- Seguro do imóvel
- Contas de consumo (água, luz, gás, internet)
- Taxas de bombeiros, lixo e outras taxas específicas da região

Por lei, despesas extraordinárias de condomínio (obras estruturais, por exemplo) são de responsabilidade do proprietário, enquanto despesas ordinárias (manutenção regular) são do inquilino.

## Cláusulas abusivas: O que evitar

Alguns termos contratuais podem ser considerados abusivos e, portanto, nulos. Fique atento a:

### 1. Multas excessivas

A multa por atraso no pagamento do aluguel não pode exceder 10% do valor do débito, conforme o art. 52, §1º do Código de Defesa do Consumidor. Cláusulas que estabeleçam multas superiores a esse percentual são consideradas abusivas.

### 2. Proibição total de animais

Embora o contrato possa estabelecer limitações, a proibição total de animais de estimação pode ser contestada judicialmente, especialmente para animais de pequeno porte que não causem transtornos ou danos ao imóvel.

### 3. Renúncia a direitos fundamentais

São nulas as cláusulas que:
- Impeçam o inquilino de pedir revisão do valor do aluguel
- Proíbam a prorrogação automática da locação por prazo indeterminado
- Obriguem o inquilino a pagar reformas estruturais do imóvel

### 4. Transferência indevida de responsabilidades

O contrato não pode transferir ao inquilino obrigações que legalmente são do proprietário, como:
- Despesas extraordinárias de condomínio
- Obras estruturais
- Vícios ocultos do imóvel

### 5. Exigência de garantias cumulativas

A Lei do Inquilinato permite apenas uma das modalidades de garantia (fiador, caução, seguro-fiança ou cessão de direitos creditórios). É abusiva a cláusula que exija duas ou mais garantias simultaneamente.

## Modalidades de garantia: Escolhendo a mais adequada

A garantia é uma segurança para o proprietário caso o inquilino não cumpra suas obrigações. As modalidades legalmente previstas são:

### 1. Fiador

Um terceiro se compromete a pagar os valores devidos em caso de inadimplência do inquilino. Pontos importantes:

- O fiador deve possuir pelo menos um imóvel livre de ônus
- A fiança se estende até a efetiva devolução do imóvel, mesmo após o término do contrato
- O fiador pode exigir sua exoneração da fiança quando o contrato é prorrogado por prazo indeterminado
- O cônjuge do fiador deve assinar o contrato, exceto se casados com separação total de bens

### 2. Caução (depósito)

Consiste no depósito de valor equivalente a até três meses de aluguel:

- O valor deve ser depositado em conta poupança e só pode ser movimentado com autorização das partes
- Rendimentos pertencem ao inquilino
- O valor é devolvido ao término da locação, descontadas eventuais pendências

### 3. Seguro-fiança locatícia

Um seguro específico contratado junto a uma seguradora:

- Cobre o não pagamento de aluguéis e encargos
- Geralmente tem custo anual entre 1,5 e 3 vezes o valor do aluguel mensal
- Pode incluir coberturas adicionais (danos ao imóvel, por exemplo)
- Dispensa a necessidade de fiador

### 4. Cessão fiduciária de quotas de fundo de investimento

Menos comum, consiste na cessão temporária de direitos sobre aplicações financeiras:

- O inquilino cede ao locador, como garantia, direitos sobre aplicações
- Os rendimentos continuam pertencendo ao inquilino
- Ao final do contrato, a cessão é desfeita

## Direitos fundamentais do inquilino

Alguns direitos básicos do inquilino não podem ser suprimidos por cláusulas contratuais:

### 1. Preferência na compra

Se o proprietário decidir vender o imóvel durante a locação, o inquilino tem preferência para comprá-lo nas mesmas condições oferecidas a terceiros (direito de preempção).

### 2. Devolução antecipada com multa reduzida

O inquilino pode devolver o imóvel antes do término do contrato, pagando multa proporcional ao período restante. Se encontrar um substituto que o locador aceite, pode ficar isento da multa.

### 3. Revisão do valor do aluguel

A cada três anos, qualquer das partes pode pedir revisão judicial do valor do aluguel, para ajustá-lo ao preço de mercado, se houver discrepância significativa.

### 4. Manutenção e reparos essenciais

O proprietário é obrigado a realizar reparos urgentes necessários à habitabilidade do imóvel. Se não o fizer em 30 dias após notificação, o inquilino pode:
- Realizar os reparos e descontar do aluguel
- Pedir rescisão do contrato sem multa
- Abater proporcionalmente o valor do aluguel

### 5. Prorrogação automática

Ao término do prazo contratual, se o inquilino permanecer no imóvel por mais de 30 dias sem oposição do locador, a locação prorroga-se automaticamente por prazo indeterminado.

### 6. Prazo mínimo para desocupação

Em caso de denúncia vazia (pedido de desocupação sem motivo) em contratos por prazo indeterminado, o locador deve conceder prazo de 30 dias para desocupação.

## Situações especiais de locação

### 1. Locação comercial

Contratos para fins comerciais têm algumas particularidades:

- Não há renovação automática, exceto se prevista no contrato
- Após 5 anos de locação, o inquilino tem direito à renovação compulsória (ação renovatória), desde que:
  - O contrato seja escrito
  - O prazo seja determinado
  - O inquilino esteja explorando a mesma atividade por pelo menos 3 anos

### 2. Locação por temporada

Para períodos de até 90 dias:

- O aluguel pode ser cobrado antecipadamente
- A finalidade deve ser residência temporária (lazer, estudos, tratamento de saúde)
- Não se aplica a prorrogação automática por prazo indeterminado

### 3. Locação para estudantes

Embora não tenha legislação específica, recomenda-se:

- Contrato com prazo que coincida com o período letivo
- Especificar claramente a condição de estudante como motivo da locação
- Prever a possibilidade de compartilhamento com outros estudantes

## Como proceder em caso de problemas

### 1. Em caso de atrasos no pagamento

O locador pode:
- Cobrar multa (limitada a 10%) e juros
- Após 30 dias de atraso, iniciar ação de despejo
- Protestar o título e incluir o nome do devedor em cadastros de proteção ao crédito

### 2. Se o imóvel apresentar problemas estruturais

O inquilino deve:
- Notificar formalmente o proprietário (carta com AR ou e-mail com confirmação)
- Conceder prazo razoável para reparo (mínimo de 30 dias para problemas graves)
- Se não houver solução, considerar as opções legais (abatimento, reparo por conta própria com desconto, ou rescisão)

### 3. Em caso de venda do imóvel locado

- Se o contrato tiver cláusula de vigência registrada em cartório, o novo proprietário deve respeitar o contrato até o fim
- Sem registro, o novo proprietário pode pedir a desocupação com 90 dias de aviso prévio
- O inquilino sempre tem preferência na compra, nas mesmas condições oferecidas a terceiros

## Dicas práticas para uma locação tranquila

### Para o inquilino:

1. **Leia todo o contrato**: Não deixe de ler todas as cláusulas, mesmo as em letras pequenas
2. **Registre o estado do imóvel**: Faça um relatório detalhado com fotos antes de se mudar
3. **Guarde todos os recibos**: Comprovantes de pagamento de aluguel e despesas
4. **Comunique problemas por escrito**: Sempre formalize reclamações
5. **Negocie antes de assinar**: Muitas cláusulas podem ser ajustadas antes da assinatura

### Para o proprietário:

1. **Verifique referências**: Peça comprovantes de renda e referências do inquilino
2. **Escolha bem a garantia**: A modalidade mais adequada depende do perfil do inquilino
3. **Faça vistorias periódicas**: Previstas em contrato e sempre com aviso prévio
4. **Mantenha o imóvel em boas condições**: Cumprir suas obrigações evita problemas
5. **Formalize qualquer acordo**: Aditivos contratuais são essenciais para mudanças

## Conclusão

O contrato de aluguel é um documento jurídico complexo que estabelece direitos e obrigações para ambas as partes. Conhecer a legislação aplicável e identificar cláusulas potencialmente abusivas é fundamental para evitar problemas durante a locação.

Tanto inquilinos quanto proprietários devem buscar o equilíbrio contratual, lembrando que a transparência e o cumprimento das obrigações são a base para uma relação harmoniosa. Em caso de dúvidas específicas ou situações mais complexas, é sempre recomendável consultar um advogado especializado em direito imobiliário.

Lembre-se: a prevenção de problemas através de um contrato bem elaborado e negociado é sempre mais vantajosa que a solução de conflitos após sua ocorrência.`,
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
      publishDate: new Date("2023-06-15"),
      categoryId: 3, // Categoria Direito Imobiliário
      featured: 0
    });
    
    // Artigo 5 - Direito do Consumidor
    await this.createArticle({
      title: "Compras pela internet: Direitos do consumidor e como evitar fraudes",
      slug: "compras-internet-direitos-evitar-fraudes",
      excerpt: "Aprenda quais são seus direitos nas compras online, como identificar sites confiáveis e o que fazer em caso de problemas com sua compra.",
      content: `# Compras pela internet: Direitos do consumidor e como evitar fraudes

## Introdução

As compras pela internet se tornaram parte da rotina dos brasileiros, especialmente após a pandemia de COVID-19, que acelerou a digitalização do comércio. Segundo dados da Associação Brasileira de Comércio Eletrônico (ABComm), o e-commerce brasileiro cresceu mais de 70% nos últimos anos, com milhões de novos consumidores aderindo às compras online.

No entanto, junto com o crescimento do comércio eletrônico, cresceram também os problemas relacionados a fraudes, sites não confiáveis, produtos que não correspondem ao anunciado e dificuldades no exercício de direitos básicos do consumidor. Este artigo visa orientar o consumidor sobre seus direitos nas compras pela internet, apresentar medidas para evitar fraudes e explicar como proceder em caso de problemas.

## Direitos básicos do consumidor nas compras online

### 1. Direito de arrependimento

O artigo 49 do Código de Defesa do Consumidor estabelece o direito de arrependimento nas compras realizadas fora do estabelecimento comercial:

> "O consumidor pode desistir do contrato, no prazo de 7 dias a contar de sua assinatura ou do ato de recebimento do produto ou serviço, sempre que a contratação de fornecimento de produtos e serviços ocorrer fora do estabelecimento comercial, especialmente por telefone ou a domicílio."

Nas compras online, esse prazo de 7 dias (chamado "período de reflexão") começa a contar a partir da data de recebimento do produto. Durante esse período, o consumidor pode devolver o produto e receber de volta o valor pago, incluindo frete, sem precisar justificar o motivo da desistência.

É importante destacar que:
- Não é necessário que o produto esteja lacrado para exercer o direito de arrependimento
- A empresa não pode cobrar multa ou qualquer taxa para aceitar a devolução
- Os custos da devolução são de responsabilidade do fornecedor

### 2. Informações claras e precisas

O CDC exige que todas as informações sobre o produto sejam claras e precisas, incluindo:
- Características essenciais do produto
- Preço total (incluindo impostos e frete)
- Prazo de entrega
- Política de troca e devolução
- Identificação completa do fornecedor (CNPJ, endereço, telefone)

Sites que omitem informações importantes ou apresentam descrições enganosas estão infringindo a lei e podem ser obrigados a ressarcir danos causados ao consumidor.

### 3. Cumprimento da oferta

Tudo o que é anunciado deve ser cumprido. O artigo 30 do CDC estabelece que:

> "Toda informação ou publicidade, suficientemente precisa, veiculada por qualquer forma ou meio de comunicação com relação a produtos e serviços oferecidos ou apresentados, obriga o fornecedor que a fizer veicular ou dela se utilizar e integra o contrato que vier a ser celebrado."

Isso significa que:
- Promoções divulgadas devem ser honradas
- Prazos de entrega anunciados devem ser respeitados
- Características dos produtos divulgadas em fotos ou descrições vinculam o fornecedor

### 4. Prazo para entrega

A entrega deve ser feita dentro do prazo informado antes da compra. Se nenhum prazo for especificado, o Decreto 7.962/2013 estabelece que a entrega deve ocorrer em no máximo 30 dias.

Em caso de atraso, o consumidor pode optar por:
- Exigir a entrega imediata do produto
- Aceitar outro produto equivalente
- Cancelar a compra e receber de volta o valor pago, com correção monetária

### 5. Segurança das informações

O fornecedor deve garantir a segurança das informações pessoais e financeiras do consumidor. Com a Lei Geral de Proteção de Dados (LGPD), as empresas são obrigadas a:
- Informar claramente como os dados pessoais serão utilizados
- Obter consentimento expresso para uso dos dados
- Manter sistemas de segurança adequados para proteção de informações
- Notificar o consumidor em caso de vazamento de dados

## Como identificar sites confiáveis

Antes de realizar uma compra, é importante verificar a confiabilidade do site. Alguns indicadores importantes são:

### 1. Informações da empresa

Verifique se o site apresenta:
- CNPJ válido (pode ser consultado no site da Receita Federal)
- Endereço físico completo
- Canais de atendimento (telefone, e-mail, chat)
- Políticas claras de privacidade, troca e devolução

### 2. Segurança do site

Observe se o site possui:
- Protocolo HTTPS (cadeado na barra de endereço)
- Certificado de segurança válido
- Sistemas de pagamento seguros e conhecidos

### 3. Reputação da empresa

Pesquise a reputação do site em:
- Sites de reclamação como Reclame Aqui
- Avaliações em redes sociais
- Listas de sites não recomendados divulgadas por órgãos de defesa do consumidor
- Experiências de amigos e familiares

### 4. Preços muito abaixo do mercado

Desconfie de ofertas com preços muito inferiores aos praticados no mercado, especialmente para produtos de alto valor ou grande demanda. Muitas vezes, essas ofertas são usadas para atrair vítimas para golpes.

### 5. Erros gramaticais e de design

Sites legítimos geralmente investem em design profissional e revisão de conteúdo. Muitos erros gramaticais, layout mal feito ou imagens de baixa qualidade podem indicar falta de profissionalismo ou sites fraudulentos.

## Principais tipos de fraudes e como evitá-las

### 1. Sites falsos (phishing)

São sites que imitam lojas conhecidas para capturar dados pessoais e financeiros.

**Como evitar**:
- Verifique o endereço (URL) do site
- Confirme se há o protocolo HTTPS
- Desconfie de domínios estranhos ou com erros ortográficos
- Utilize um buscador para acessar o site em vez de clicar em links recebidos por e-mail ou mensagens

### 2. Golpe do boleto falso

O fraudador envia um boleto adulterado com dados bancários alterados.

**Como evitar**:
- Confira se o beneficiário do boleto corresponde à empresa onde realizou a compra
- Verifique o valor e a data de vencimento
- Escaneie o código de barras com o aplicativo do seu banco
- Desconfie de boletos recebidos por WhatsApp ou outras mensagens

### 3. Fraude do cartão de crédito

Uso indevido dos dados do cartão para compras não autorizadas.

**Como evitar**:
- Use cartões virtuais para compras online
- Ative notificações de transações do seu banco
- Nunca compartilhe a senha ou o código de segurança
- Verifique regularmente seu extrato
- Utilize autenticação em dois fatores quando disponível

### 4. Lojas fantasmas

Sites criados exclusivamente para aplicar golpes, que desaparecem após receber pagamentos.

**Como evitar**:
- Pesquise sobre a loja em sites de reclamação
- Verifique há quanto tempo o domínio existe
- Procure pelo CNPJ da empresa
- Prefira métodos de pagamento que ofereçam proteção ao comprador

### 5. Produtos falsificados

Venda de produtos falsificados como se fossem originais.

**Como evitar**:
- Compre em sites oficiais ou revendedores autorizados
- Desconfie de preços muito abaixo do mercado
- Verifique se o vendedor oferece nota fiscal
- Pesquise avaliações específicas sobre a autenticidade dos produtos

## O que fazer em caso de problemas com compras online

### 1. Produto não entregue

Se o produto não for entregue no prazo combinado:

- **Entre em contato com a empresa**: Utilize o SAC, e-mail ou chat, guardando protocolo
- **Registre uma reclamação formal**: Solicite formalmente a entrega imediata ou o cancelamento com devolução do valor
- **Estabeleça um prazo**: Dê um prazo razoável (5 dias úteis) para solução

Se não houver resposta:
- Registre reclamação no Procon
- Faça uma denúncia no site consumidor.gov.br
- Registre sua experiência em sites como Reclame Aqui

### 2. Produto diferente do anunciado

Se o produto recebido for diferente do anunciado:

- **Documente a divergência**: Tire fotos comparando o recebido com o anúncio
- **Contate imediatamente a empresa**: Explique a divergência e solicite a troca ou devolução
- **Recuse a proposta de abatimento**: Você tem direito à substituição por um produto adequado ou à devolução integral do valor

### 3. Exercendo o direito de arrependimento

Para exercer o direito de arrependimento nos 7 dias:

- **Formalize o pedido**: Envie um e-mail ou utilize o canal da loja para formalizar a desistência
- **Guarde comprovantes**: Mantenha registros de todos os contatos e protocolos
- **Devolução do produto**: Siga as orientações da empresa para devolução, mas lembre-se que os custos são de responsabilidade do fornecedor
- **Reembolso**: O valor deve ser devolvido imediatamente, na mesma forma de pagamento utilizada na compra

### 4. Em caso de fraude confirmada

Se você for vítima de fraude:

- **Cartão de crédito**: Contate imediatamente a operadora para contestar a compra e bloquear o cartão
- **Boleto bancário**: Informe seu banco, mas saiba que a recuperação do valor é mais difícil
- **Registre Boletim de Ocorrência**: É importante para documentar a fraude
- **Denuncie o site**: Ao Procon, Delegacia de Crimes Cibernéticos e ao Centro de Denúncias de Crimes Cibernéticos (www.safernet.org.br)

## Compras internacionais: cuidados especiais

As compras em sites internacionais estão sujeitas a regras diferentes:

### 1. Tributação e taxas

- Compras de até US$ 50 são isentas de impostos (apenas para envios entre pessoas físicas)
- Acima desse valor, incide Imposto de Importação (alíquota média de 60%)
- Alguns estados cobram ICMS adicional
- A cobrança é feita pelos Correios no momento da entrega

### 2. Direito de arrependimento

- A legislação brasileira aplica-se apenas a empresas com operação no Brasil
- Sites internacionais seguem as leis de seus países de origem
- Verifique a política de devolução antes da compra

### 3. Tempo de entrega

- Prazos geralmente são mais longos (30 a 90 dias)
- O produto pode ficar retido na alfândega para fiscalização
- Acompanhe o rastreamento e fique atento aos avisos de tentativa de entrega

### 4. Assistência técnica

Produtos importados podem enfrentar dificuldades com:
- Garantia não reconhecida no Brasil
- Falta de peças para reparo
- Incompatibilidade com padrões brasileiros (voltagem, plugues)

## Dicas finais para compras seguras na internet

### 1. Planeje suas compras

- Pesquise preços em diferentes sites
- Verifique o custo total, incluindo frete
- Leia a descrição completa do produto antes de comprar
- Verifique prazos de entrega, especialmente para datas importantes

### 2. Prefira métodos de pagamento seguros

- Cartões virtuais oferecem mais segurança
- Evite transferências bancárias diretas para pessoas físicas
- Utilize serviços de pagamento que oferecem proteção ao comprador

### 3. Mantenha registros da compra

- Salve o anúncio do produto (print screen)
- Guarde e-mails de confirmação
- Anote protocolos de atendimento
- Arquive a nota fiscal eletrônica

### 4. Verifique o produto ao receber

- Confira se a embalagem está íntegra
- Verifique se o produto corresponde ao anunciado
- Teste o funcionamento antes de descartar a embalagem
- Em caso de problemas, registre com fotos e vídeos

### 5. Fique atento a novos golpes

- Acompanhe notícias sobre novas modalidades de fraudes
- Desconfie de ofertas enviadas por WhatsApp ou redes sociais
- Não clique em links suspeitos
- Mantenha o antivírus atualizado

## Conclusão

O comércio eletrônico oferece conveniência e acesso a uma variedade enorme de produtos, mas requer atenção para garantir uma experiência segura e satisfatória. Conhecer seus direitos como consumidor, identificar sites confiáveis e saber como proceder em caso de problemas são habilidades essenciais para navegar com segurança nesse ambiente.

Lembre-se que a prevenção é sempre o melhor caminho. Investir alguns minutos pesquisando a reputação de uma loja, verificando a segurança do site e comparando preços pode economizar muito tempo e dinheiro no futuro.

Em caso de problemas, mantenha a calma e siga os passos recomendados, começando sempre pelo contato direto com a empresa. Na maioria das vezes, as situações podem ser resolvidas de forma amigável. Caso não haja solução, recorra aos órgãos de defesa do consumidor, que estão à disposição para garantir que seus direitos sejam respeitados.

O consumidor informado e atento é a melhor defesa contra fraudes e práticas comerciais abusivas no ambiente virtual.`,
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      publishDate: new Date("2023-05-03"),
      categoryId: 1, // Categoria Direito do Consumidor
      featured: 1
    });
    
    // Artigo 6 - Direito Penal
    await this.createArticle({
      title: "Legítima defesa: Quando é permitido se defender e quais os limites",
      slug: "legitima-defesa-limites-legais",
      excerpt: "Entenda os requisitos da legítima defesa, quando ela pode ser invocada e quais os limites impostos pela lei para que não se torne excesso punível.",
      content: `# Legítima defesa: Quando é permitido se defender e quais os limites

## Introdução

A legítima defesa é um dos institutos mais conhecidos do Direito Penal brasileiro, frequentemente mencionado em discussões sobre segurança pública e defesa pessoal. Trata-se de uma das causas excludentes de ilicitude previstas no Código Penal, que permite a uma pessoa defender-se ou defender terceiros contra agressão injusta, atual ou iminente, mesmo que essa defesa implique em ações que, em outras circunstâncias, seriam consideradas crimes.

No entanto, apesar de ser um conceito aparentemente simples, a legítima defesa é cercada de requisitos legais e limites cuja compreensão é fundamental para sua correta aplicação. Este artigo busca esclarecer quando a legítima defesa pode ser invocada, quais seus requisitos legais, seus limites e as consequências do chamado "excesso de legítima defesa".

## O que é legítima defesa?

Conforme o artigo 25 do Código Penal Brasileiro:

> "Entende-se em legítima defesa quem, usando moderadamente dos meios necessários, repele injusta agressão, atual ou iminente, a direito seu ou de outrem."

Em termos simples, a legítima defesa ocorre quando uma pessoa, ao ser injustamente agredida ou ameaçada de agressão iminente, reage para se proteger ou proteger terceiros, utilizando meios moderados e necessários para repelir essa agressão.

Importante destacar que a legítima defesa não se aplica apenas à proteção da vida ou integridade física. Qualquer direito juridicamente protegido pode ser defendido, incluindo o patrimônio, a honra, a liberdade sexual, entre outros. No entanto, a proporcionalidade entre o bem defendido e o meio empregado é um fator crucial na avaliação da legítima defesa.

## Requisitos da legítima defesa

Para que uma ação seja considerada legítima defesa, é necessário que estejam presentes os seguintes requisitos:

### 1. Agressão injusta

A agressão deve ser contrária ao direito (antijurídica). Uma agressão é considerada injusta quando não é autorizada pelo ordenamento jurídico. Por exemplo:

- Não há legítima defesa contra atos legais, como uma prisão em flagrante executada por um policial
- Não há legítima defesa contra outra legítima defesa
- Não há legítima defesa contra estado de necessidade

### 2. Atualidade ou iminência da agressão

A agressão deve estar ocorrendo (atual) ou prestes a ocorrer (iminente). Não se admite legítima defesa:

- Preventiva (contra agressão futura e incerta)
- Sucessiva (após a agressão já ter cessado)

Este requisito é particularmente importante, pois delimita temporalmente a legítima defesa. Reações a agressões já finalizadas configuram vingança privada, não defesa legítima.

### 3. Direito próprio ou alheio

A defesa pode ser exercida para proteger:
- Direito próprio (legítima defesa própria)
- Direito de terceiro (legítima defesa de terceiro)

Qualquer bem juridicamente tutelado pode ser objeto de defesa, desde que a reação seja proporcional ao bem ameaçado.

### 4. Meios necessários

Os meios empregados para repelir a agressão devem ser necessários, ou seja, devem ser os menos lesivos dentre os disponíveis no momento para fazer cessar a agressão.

Fatores considerados na avaliação da necessidade:
- Instrumentos disponíveis no momento
- Condições pessoais do agressor e do agredido
- Circunstâncias do local e momento
- Intensidade da agressão

### 5. Uso moderado dos meios necessários

Mesmo utilizando os meios necessários, a pessoa deve empregá-los com moderação, ou seja, deve haver proporcionalidade entre a agressão sofrida e a reação defensiva.

A moderação é avaliada considerando:
- Intensidade empregada na defesa
- Quantidade de ações defensivas
- Momento de cessação da defesa

## A reforma da legítima defesa pelo "Pacote Anticrime"

Em 2019, a Lei 13.964 (Pacote Anticrime) incluiu o parágrafo único ao artigo 25 do Código Penal, ampliando o conceito de legítima defesa:

> "Observados os requisitos previstos no caput deste artigo, considera-se também em legítima defesa o agente de segurança pública que repele agressão ou risco de agressão a vítima mantida refém durante a prática de crimes."

Esta alteração visa proteger especificamente os agentes de segurança pública em situações de alto risco, como casos de reféns. No entanto, é importante observar que mesmo nestes casos, os requisitos básicos da legítima defesa devem estar presentes.

## Situações comuns envolvendo legítima defesa

### Legítima defesa no ambiente doméstico

A Lei 13.104/2015 (Lei do Feminicídio) trouxe importantes reflexões sobre a legítima defesa no contexto de violência doméstica. Mulheres vítimas de agressões constantes que reagem contra seus agressores podem invocar a legítima defesa, considerando:

- O histórico de violência
- A desproporcionalidade de forças
- O estado de vulnerabilidade
- A impossibilidade de fuga em muitos casos

A jurisprudência tem reconhecido que, em situações de violência doméstica, a análise da legítima defesa deve considerar o contexto de opressão continuada, não apenas o momento específico da reação.

### Legítima defesa da honra

É importante destacar que a chamada "legítima defesa da honra", historicamente usada para justificar crimes passionais, não é mais aceita pelo ordenamento jurídico brasileiro. O Supremo Tribunal Federal, na ADPF 779, declarou inconstitucional o uso desse argumento em casos de feminicídio e outros crimes contra a mulher.

A honra como bem jurídico pode ser defendida, mas não de forma desproporcional e, principalmente, não pode servir de justificativa para ações motivadas por ciúme, possessividade ou controle.

### Legítima defesa patrimonial

A defesa do patrimônio é permitida, desde que observe a proporcionalidade. Exemplos:

- Um comerciante pode empurrar um ladrão que tenta furtar mercadorias
- Um morador pode trancar um invasor em um cômodo até a chegada da polícia

No entanto, não é proporcional, por exemplo, atirar em alguém que está furtando um objeto sem violência ou grave ameaça.

## Excesso na legítima defesa

O excesso ocorre quando a pessoa ultrapassa os limites da moderação ou da necessidade na defesa. O artigo 23, parágrafo único, do Código Penal estabelece:

> "O agente, em qualquer das hipóteses deste artigo, responderá pelo excesso doloso ou culposo."

Existem dois tipos de excesso:

### 1. Excesso doloso

Ocorre quando a pessoa conscientemente ultrapassa os limites da legítima defesa. Por exemplo:
- Continuar agredindo o agressor mesmo após ele já estar dominado
- Utilizar um meio desproporcional de forma intencional quando havia outros disponíveis

Neste caso, a pessoa responde pelo crime com dolo (intenção).

### 2. Excesso culposo

Ocorre quando o excesso resulta de imprudência, negligência ou imperícia. Por exemplo:
- Não perceber que o agressor já estava desacordado e continuar a defesa
- Calcular mal a força necessária devido ao estado emocional alterado

Neste caso, a pessoa responde pelo crime na modalidade culposa, se prevista em lei.

### Excesso exculpante

Há ainda situações em que o excesso pode ser perdoado devido a circunstâncias excepcionais que afetam o discernimento, como:
- Medo insuperável
- Perturbação de ânimo
- Surpresa

Nestas situações, o juiz pode reconhecer a inexigibilidade de conduta diversa como causa supralegal de exclusão da culpabilidade.

## Legítima defesa putativa

A legítima defesa putativa ocorre quando a pessoa acredita estar em situação de legítima defesa, mas na realidade não está. Por exemplo:
- Alguém vê uma pessoa com um objeto que parece uma arma e reage, mas depois descobre que era um objeto inofensivo
- Uma pessoa confunde um movimento brusco com o início de uma agressão

Nestes casos:
- Se o erro era evitável (com a devida atenção), a pessoa responde por crime culposo
- Se o erro era inevitável, não há responsabilização penal

## Como a legítima defesa é provada?

A legítima defesa é uma tese defensiva que precisa ser provada. Alguns meios de prova comuns incluem:

- Testemunhas presenciais
- Gravações de câmeras de segurança
- Laudos periciais que confirmem a dinâmica dos fatos
- Histórico de ameaças (em casos de agressão iminente)
- Laudos médicos que demonstrem lesões defensivas

Importante destacar que, uma vez alegada a legítima defesa com um mínimo de provas, cabe à acusação demonstrar que a situação não caracterizava legítima defesa.

## Casos práticos e análise jurisprudencial

### Caso 1: Reação a assalto

Um cidadão reage a um assalto à mão armada e, durante a luta, consegue tomar a arma do assaltante e atira nele, causando sua morte.

**Análise**: Em geral, tribunais reconhecem a legítima defesa neste tipo de situação, considerando:
- A agressão injusta (assalto)
- A grave ameaça representada pela arma
- O risco à vida da vítima
- A proporcionalidade da reação

### Caso 2: Invasão domiciliar

Durante a noite, um proprietário percebe um invasor entrando em sua residência e o ataca com uma arma branca, causando ferimentos graves.

**Análise**: A jurisprudência tende a reconhecer a legítima defesa, especialmente considerando:
- A inviolabilidade do domicílio
- O momento de vulnerabilidade (período noturno)
- O desconhecimento sobre as intenções e possível armamento do invasor
- O receio de risco à família

### Caso 3: Briga após provocações

Após uma discussão em um bar com provocações verbais, uma pessoa agride outra com um soco. O agredido revida com uma garrafa, causando ferimentos graves.

**Análise**: Tribunais geralmente não reconhecem legítima defesa integral, pois:
- A reação com a garrafa pode ser desproporcional a um soco
- Poderia configurar excesso punível
- Dependendo das circunstâncias, pode haver desclassificação para lesão corporal privilegiada

## Conclusão

A legítima defesa é um instituto fundamental do Direito Penal que garante a proteção de bens jurídicos quando o Estado não pode fazê-lo imediatamente. No entanto, não é um "cheque em branco" que autoriza qualquer reação a uma agressão.

Para ser considerada válida, a legítima defesa deve observar todos os requisitos legais, especialmente a necessidade dos meios empregados e a moderação em seu uso. O excesso, seja doloso ou culposo, pode levar à responsabilização criminal.

Em um contexto de debates acalorados sobre segurança pública e defesa pessoal, é fundamental compreender claramente os limites e requisitos da legítima defesa, evitando interpretações que possam levar à justiça com as próprias mãos ou à impunidade de reações desproporcionais.

A análise de cada caso concreto, considerando todas as circunstâncias e o contexto da situação, é essencial para a correta aplicação deste importante instituto jurídico, garantindo tanto o direito à defesa quanto a proporcionalidade na resposta a agressões injustas.`,
      imageUrl: "https://images.unsplash.com/photo-1589216996730-15c1486d8590?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      publishDate: new Date("2023-03-22"),
      categoryId: 4, // Categoria Direito Penal
      featured: 0
    });
    
    // Artigo 7 - Direito Trabalhista
    await this.createArticle({
      title: "Jornada de trabalho: Horas extras, banco de horas e direitos do trabalhador",
      slug: "jornada-trabalho-horas-extras-direitos",
      excerpt: "Um guia completo sobre jornada de trabalho, pagamento de horas extras, funcionamento do banco de horas e os direitos dos trabalhadores após a reforma trabalhista.",
      content: `# Jornada de trabalho: Horas extras, banco de horas e direitos do trabalhador

## Introdução

A jornada de trabalho é um dos aspectos mais importantes da relação entre empregado e empregador, determinando não apenas o tempo que o trabalhador deve dedicar às suas funções, mas também impactando diretamente sua qualidade de vida, saúde e produtividade. Compreender as regras que norteiam a jornada de trabalho, o cômputo e pagamento de horas extras, bem como o funcionamento do banco de horas é fundamental para que trabalhadores possam garantir seus direitos e empregadores possam cumprir suas obrigações legais.

Este artigo visa apresentar de forma clara e abrangente as normas que regulamentam a jornada de trabalho no Brasil, com especial atenção às alterações trazidas pela Reforma Trabalhista (Lei 13.467/2017), que modificou significativamente vários aspectos dessa relação.

## Jornada de trabalho: limites legais

### Duração padrão

A Constituição Federal, em seu artigo 7º, inciso XIII, estabelece como regra geral:

> "duração do trabalho normal não superior a oito horas diárias e quarenta e quatro semanais, facultada a compensação de horários e a redução da jornada, mediante acordo ou convenção coletiva de trabalho"

Assim, os limites legais da jornada padrão são:
- 8 horas diárias
- 44 horas semanais
- 220 horas mensais

### Jornadas especiais

Existem categorias profissionais com jornadas especiais, estabelecidas por legislação específica:

- **Bancários**: 6 horas diárias (30 horas semanais)
- **Médicos**: 4 horas diárias (20 horas semanais) ou 6 horas (30 horas semanais)
- **Professores**: limites diferenciados por nível de ensino
- **Aeronautas**: regulamentação própria que considera voos e períodos de descanso
- **Advogados**: dedicação exclusiva de no máximo 8 horas diárias e 40 horas semanais

### Intervalos obrigatórios

A legislação prevê intervalos mínimos que não são computados na jornada:

- **Intervalo intrajornada**: para repouso e alimentação
  - Jornadas acima de 6 horas: mínimo de 1 hora, máximo de 2 horas
  - Jornadas entre 4 e 6 horas: 15 minutos de intervalo

- **Intervalo interjornada**: período mínimo de 11 horas consecutivas entre o término de uma jornada e o início da seguinte

- **Descanso semanal remunerado (DSR)**: 24 horas consecutivas, preferencialmente aos domingos

## Horas extras: definição e limites

### O que são horas extras?

Horas extras são aquelas que excedem os limites da jornada normal de trabalho. Conforme o artigo 59 da CLT:

> "A duração diária do trabalho poderá ser acrescida de horas extras, em número não excedente de duas, por acordo individual, convenção coletiva ou acordo coletivo de trabalho."

Portanto, o limite legal é de 2 horas extras por dia, resultando em jornada máxima de 10 horas diárias.

### Remuneração das horas extras

A Constituição Federal determina no artigo 7º, inciso XVI:

> "remuneração do serviço extraordinário superior, no mínimo, em cinquenta por cento à do normal"

Assim, o adicional mínimo para horas extras é de 50% sobre o valor da hora normal. No entanto, muitas convenções coletivas estabelecem percentuais superiores, como 75% ou 100%.

Para horas extras em domingos e feriados, a jurisprudência e muitas convenções coletivas determinam adicional de 100%.

### Cálculo da hora extra

O valor da hora extra é calculado da seguinte forma:

1. **Valor da hora normal**: Salário mensal ÷ Jornada mensal
2. **Valor da hora extra**: Valor da hora normal + Adicional de horas extras

**Exemplo**:
- Salário: R$ 2.200,00
- Jornada: 220 horas mensais
- Valor da hora normal: R$ 2.200,00 ÷ 220 = R$ 10,00
- Valor da hora extra (50%): R$ 10,00 + (R$ 10,00 × 50%) = R$ 15,00

### Reflexos das horas extras

As horas extras habituais geram reflexos em outras verbas:
- 13º salário
- Férias + 1/3
- FGTS
- Aviso prévio
- Repouso semanal remunerado (para quem recebe por hora)

## Banco de horas: funcionamento e requisitos

### O que é banco de horas?

O banco de horas é um sistema de compensação de jornada que permite ao empregador "guardar" as horas extras trabalhadas para compensação futura, em vez de pagá-las. Funciona como uma conta corrente de horas, onde são registradas as horas trabalhadas a mais (crédito) e as horas não trabalhadas (débito).

### Modalidades após a Reforma Trabalhista

A Reforma Trabalhista trouxe novas possibilidades para o banco de horas:

1. **Banco de horas anual**: 
   - Necessita de negociação coletiva (acordo ou convenção coletiva)
   - Compensação no período máximo de 12 meses

2. **Banco de horas semestral**: 
   - Pode ser estabelecido por acordo individual escrito
   - Compensação no período máximo de 6 meses

3. **Banco de horas mensal**: 
   - Pode ser pactuado por acordo individual tácito
   - Compensação no mesmo mês

### Regras gerais do banco de horas

Independentemente da modalidade:
- O limite diário de 2 horas extras deve ser respeitado
- As horas não compensadas dentro do prazo devem ser pagas como extras
- A compensação deve respeitar a proporção 1:1 (uma hora de descanso para cada hora extra)

### Vantagens e desvantagens

**Para o empregador**:
- Flexibilidade para lidar com picos de produção
- Redução de custos com horas extras
- Possibilidade de adequar a jornada conforme demanda

**Para o empregado**:
- Possibilidade de folgas prolongadas
- Flexibilidade para resolver questões pessoais
- Menos tempo no trânsito em dias de compensação

**Desvantagens potenciais**:
- Possibilidade de jornadas mais longas em períodos de pico
- Dificuldade de controle das horas trabalhadas
- Riscos de não compensação dentro do prazo legal

## Controle de jornada: obrigatoriedade e exceções

### Obrigatoriedade do controle

O artigo 74, §2º da CLT determina:

> "Para os estabelecimentos com mais de 20 trabalhadores será obrigatória a anotação da hora de entrada e de saída, em registro manual, mecânico ou eletrônico, conforme instruções expedidas pela Secretaria Especial de Previdência e Trabalho do Ministério da Economia, permitida a pré-assinalação do período de repouso."

### Meios de controle válidos

Os controles de jornada podem ser implementados de diversas formas:
- Relógios de ponto mecânicos ou eletrônicos
- Sistemas biométricos
- Aplicativos de celular (desde que homologados)
- Controles manuais (livros ou folhas de ponto)

### Exceções ao controle de jornada

A Reforma Trabalhista ampliou as hipóteses de trabalhadores sem controle de jornada. O artigo 62 da CLT exclui do controle:

1. **Empregados que exercem atividade externa incompatível com fixação de horário**
   - Exemplo: vendedores externos, motoristas, entregadores

2. **Gerentes e cargos de gestão**
   - Com poderes de mando e distinção salarial (gratificação de função de no mínimo 40%)

3. **Teletrabalho (home office)**
   - Atividades preponderantemente fora das dependências do empregador
   - Uso de tecnologias de informação e comunicação

### Mudanças recentes no controle de ponto

A portaria nº 1.510/2009 do Ministério do Trabalho estabeleceu o chamado "ponto eletrônico", com regras rígidas para evitar fraudes. Entre as exigências:
- Impossibilidade de alteração dos registros
- Emissão de comprovante a cada marcação
- Armazenamento da informação em meio não adulterável

No entanto, a Portaria 373/2011 flexibilizou algumas exigências, permitindo sistemas alternativos desde que autorizados por acordo coletivo.

## Horas extras em situações específicas

### Horas in itinere (tempo de deslocamento)

Antes da Reforma Trabalhista, o tempo gasto pelo empregado no trajeto para locais de difícil acesso ou não servidos por transporte público, quando fornecido pelo empregador, era computado como jornada. Com a reforma, esse tempo deixou de ser considerado como tempo à disposição.

### Horas de sobreaviso

O sobreaviso ocorre quando o empregado permanece à disposição do empregador fora do horário normal de trabalho, aguardando ser chamado para o serviço.

- Conforme a Súmula 428 do TST, o uso de instrumentos telemáticos ou informatizados (celular, pager, etc.) não caracteriza sobreaviso por si só
- Para caracterização, deve haver restrição à liberdade de locomoção
- O tempo de sobreaviso é remunerado à razão de 1/3 do valor da hora normal

### Tempo à disposição

Considera-se tempo à disposição aquele em que o empregado aguarda ordens, mesmo sem trabalhar efetivamente. A Reforma Trabalhista alterou o artigo 4º da CLT, estabelecendo que não são consideradas como tempo à disposição, entre outras, as seguintes situações:

- Tempo de deslocamento residência-trabalho
- Práticas religiosas ou de lazer nas dependências da empresa
- Atividades particulares como higiene pessoal, troca de roupa ou uniforme (quando não for obrigatório que a troca seja feita na empresa)

## Jornada 12x36: particularidades

### Características da jornada 12x36

A jornada 12x36 consiste em 12 horas de trabalho seguidas por 36 horas de descanso. Com a Reforma Trabalhista, essa modalidade pode ser estabelecida por:
- Acordo ou convenção coletiva (para qualquer setor)
- Acordo individual escrito (especificamente para o setor de saúde)

### Vantagens e particularidades

Essa jornada é comum em atividades que exigem trabalho contínuo, como hospitais, segurança e hotelaria. Suas particularidades incluem:

- **Feriados**: Considerados já compensados, sem direito a pagamento em dobro
- **Intervalo**: Deve ser concedido ou indenizado
- **Hora noturna**: Aplicam-se as regras do trabalho noturno, com redução da hora e adicional
- **Limite mensal**: Na prática, a jornada mensal é menor que a padrão (192 horas vs. 220 horas)

## Direitos relacionados a intervalos e descansos

### Intervalo intrajornada

Com a Reforma Trabalhista, a supressão total ou parcial do intervalo intrajornada implica no pagamento apenas do período suprimido, com acréscimo de 50% sobre o valor da hora normal. Anteriormente, o entendimento era de que qualquer supressão, mesmo que parcial, gerava o direito ao pagamento de todo o período.

### Intervalo para amamentação

A mulher que estiver amamentando tem direito a dois descansos especiais de 30 minutos cada, até que o bebê complete 6 meses de idade. Este prazo pode ser estendido por recomendação médica.

### Pausas em trabalho contínuo com computador

A NR-17 prevê pausas de 10 minutos a cada 90 minutos trabalhados para atividades que exijam sobrecarga muscular estática ou dinâmica, como digitação contínua. Estas pausas são consideradas como trabalho efetivo.

## Negociação coletiva sobre jornada

A Reforma Trabalhista fortaleceu a negociação coletiva, estabelecendo que o negociado prevalece sobre o legislado em diversos temas, especialmente os relacionados à jornada de trabalho. Entre os pontos que podem ser negociados:

- Banco de horas anual
- Compensação de jornada
- Jornada 12x36
- Redução do intervalo intrajornada para mínimo de 30 minutos

No entanto, algumas garantias mínimas não podem ser flexibilizadas, como:
- Limite constitucional de 8 horas diárias e 44 semanais
- Normas de saúde e segurança do trabalho
- Descanso semanal remunerado

## Novas modalidades de trabalho e jornada

### Teletrabalho (home office)

Com a Reforma Trabalhista e, principalmente, após a pandemia de COVID-19, o teletrabalho ganhou maior regulamentação. Suas principais características:

- Não há controle de jornada (art. 62, III da CLT)
- Necessidade de contrato escrito especificando atividades
- Responsabilidade pelos equipamentos e infraestrutura deve ser prevista contratualmente
- Possibilidade de regime híbrido (presencial e remoto)

### Trabalho intermitente

Modalidade criada pela Reforma Trabalhista, o trabalho intermitente permite a prestação de serviços de forma não contínua, com alternância de períodos de atividade e inatividade. Características:

- Contrato escrito com valor da hora de trabalho
- Convocação com antecedência mínima de 3 dias
- Trabalhador pode recusar chamados sem descaracterizar subordinação
- Pagamento proporcional de férias, 13º, FGTS e demais verbas

## Conclusão

A jornada de trabalho, suas extensões e compensações compõem um dos temas mais relevantes e dinâmicos do Direito do Trabalho brasileiro. As alterações trazidas pela Reforma Trabalhista de 2017 modificaram significativamente diversos aspectos relacionados à duração do trabalho, trazendo maior flexibilidade, mas também novos desafios interpretativos.

Compreender corretamente as regras sobre horas extras, banco de horas e demais aspectos da jornada é fundamental tanto para trabalhadores quanto para empregadores. Para os primeiros, representa a garantia de direitos fundamentais e da justa remuneração pelo tempo dedicado ao trabalho. Para os segundos, significa cumprir adequadamente as obrigações legais, evitando passivos trabalhistas.

É importante ressaltar que muitas das regras apresentadas neste artigo podem ser objeto de negociação coletiva, resultando em condições específicas para determinadas categorias profissionais. Por isso, é sempre recomendável consultar a convenção ou acordo coletivo aplicável à categoria, além de buscar orientação jurídica especializada para casos concretos.

A proteção à jornada de trabalho, estabelecendo limites e garantindo a remuneração adequada pelo trabalho extraordinário, não representa apenas uma questão legal, mas uma forma de preservar a saúde física e mental do trabalhador, promover o equilíbrio entre vida profissional e pessoal, e, em última análise, contribuir para uma sociedade mais justa e produtiva.`,
      imageUrl: "https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      publishDate: new Date("2023-07-14"),
      categoryId: 2, // Categoria Direito Trabalhista
      featured: 0
    });
    
    // Artigo 8 - Direito Familiar
    await this.createArticle({
      title: "Divórcio no Brasil: Procedimentos, direitos e divisão de bens",
      slug: "divorcio-brasil-procedimentos-direitos",
      excerpt: "Guia completo sobre os procedimentos de divórcio no Brasil, incluindo modalidades, divisão de bens, guarda dos filhos e pensão alimentícia.",
      content: `# Divórcio no Brasil: Procedimentos, direitos e divisão de bens

## Introdução

O divórcio representa a dissolução formal e legal do vínculo matrimonial, permitindo que os ex-cônjuges sigam suas vidas de forma independente e possam, inclusive, contrair novas núpcias. No Brasil, o processo de divórcio passou por significativas transformações ao longo das décadas, culminando com a Emenda Constitucional nº 66/2010, que simplificou consideravelmente o procedimento, eliminando requisitos antes necessários como a separação judicial prévia ou prazos mínimos de separação de fato.

Este artigo apresenta um panorama completo sobre o divórcio no Brasil, abordando suas modalidades, os procedimentos necessários, a questão da divisão de bens conforme diferentes regimes matrimoniais, os direitos relacionados aos filhos e aspectos financeiros como pensão alimentícia e partilha de dívidas.

## Evolução histórica do divórcio no Brasil

Compreender a evolução da legislação sobre divórcio ajuda a entender o atual cenário jurídico:

### Do indissolúvel ao divórcio direto

- **Até 1977**: O casamento era indissolúvel no Brasil
- **Lei do Divórcio (1977)**: Instituiu o divórcio, mas exigia separação judicial prévia por 3 anos
- **Constituição de 1988**: Reduziu o prazo de separação para 1 ano
- **Lei 11.441/2007**: Permitiu divórcio em cartório para casos consensuais sem filhos menores
- **EC 66/2010**: Eliminou os requisitos de separação prévia e prazos, instituindo o divórcio direto

Esta evolução reflete uma tendência de simplificação e desburocratização, respeitando a autonomia dos indivíduos quanto à manutenção ou não do vínculo matrimonial.

## Modalidades de divórcio

Atualmente, existem diferentes modalidades de divórcio no Brasil, que variam conforme o nível de consenso entre as partes e a via escolhida para o procedimento:

### 1. Divórcio consensual

Ocorre quando ambos os cônjuges concordam com o divórcio e com todas as suas condições, como divisão de bens, guarda dos filhos e pensão alimentícia. Pode ser realizado de duas formas:

#### a) Divórcio extrajudicial (em cartório)

Requisitos:
- Consenso entre as partes sobre todos os aspectos
- Ausência de filhos menores ou incapazes
- Assistência de advogado ou defensor público

Procedimento:
- Redação da escritura pública de divórcio
- Coleta das assinaturas dos cônjuges e advogado(s)
- Lavração pelo tabelião
- Averbação no registro civil

Vantagens:
- Rapidez (pode ser concluído em um único dia)
- Menor custo
- Menos burocracia

#### b) Divórcio judicial consensual

Necessário quando:
- Há filhos menores ou incapazes
- Cônjuge incapaz

Procedimento:
- Petição inicial assinada por ambas as partes e advogado
- Apresentação do acordo sobre todos os aspectos (bens, guarda, pensão)
- Manifestação do Ministério Público (quando há filhos menores)
- Homologação pelo juiz

### 2. Divórcio litigioso

Ocorre quando não há consenso sobre o divórcio em si ou sobre algum de seus aspectos (divisão de bens, guarda, pensão). Sempre tramita judicialmente.

Procedimento:
- Petição inicial por um dos cônjuges
- Citação do outro cônjuge
- Contestação
- Audiência de conciliação
- Instrução processual (provas, testemunhas)
- Sentença judicial

Características:
- Processo mais demorado (pode levar anos)
- Mais oneroso
- Desgaste emocional maior
- Possível necessidade de perícias (avaliação de bens, estudos psicossociais)

## Requisitos atuais para o divórcio

Após a EC 66/2010, os requisitos para o divórcio foram simplificados. Atualmente:

- **Não há necessidade de separação prévia**: O divórcio pode ser direto
- **Não há prazo mínimo de casamento**: Pode-se divorciar a qualquer tempo
- **Não é necessário alegar motivo**: A simples vontade de se divorciar é suficiente
- **Não exige culpa**: O divórcio é um direito potestativo, independente de culpa

## Divisão de bens conforme o regime matrimonial

A divisão do patrimônio no divórcio segue regras específicas dependendo do regime de bens escolhido pelos cônjuges ao se casarem:

### 1. Comunhão parcial de bens (regime legal)

Este é o regime aplicado automaticamente quando os cônjuges não escolhem outro regime antes do casamento.

**Bens comuns** (divididos igualmente no divórcio):
- Adquiridos onerosamente na constância do casamento
- Frutos e rendimentos de bens particulares obtidos durante o casamento

**Bens particulares** (não são divididos):
- Adquiridos antes do casamento
- Recebidos por herança ou doação, mesmo durante o casamento
- Sub-rogados no lugar de bens particulares
- Adquiridos com valores exclusivamente pertencentes a um dos cônjuges

### 2. Comunhão universal de bens

Neste regime, forma-se um patrimônio comum que inclui os bens anteriores e posteriores ao casamento, com algumas exceções.

**Bens comuns** (divididos igualmente):
- Praticamente todos os bens, independentemente do momento de aquisição

**Exceções** (bens que permanecem particulares):
- Bens doados ou herdados com cláusula de incomunicabilidade
- Bens gravados com fideicomisso
- Dívidas anteriores ao casamento (salvo se reverteram em benefício da família)
- Proventos do trabalho pessoal de cada cônjuge (apenas o saldo)

### 3. Separação total de bens

Neste regime, cada cônjuge mantém patrimônio próprio e separado.

**Divisão no divórcio**:
- Em regra, não há divisão de bens
- Cada um fica com o que está em seu nome

**Exceções e controvérsias**:
- Bens adquiridos com esforço comum podem gerar direito à partilha (Súmula 377 do STF)
- Imóveis adquiridos na constância do casamento, mesmo que no nome de apenas um cônjuge, podem gerar discussões sobre comunicabilidade

### 4. Participação final nos aquestos

Regime misto, que funciona como separação de bens durante o casamento e como comunhão parcial no momento da dissolução.

**No divórcio**:
- Cada cônjuge tem direito à metade do patrimônio que o outro adquiriu onerosamente durante o casamento
- A divisão não é automática, mas calculada como um crédito

### 5. Separação obrigatória de bens

Imposto por lei em situações específicas (pessoas com mais de 70 anos, dependentes de autorização judicial para casar, etc.)

**Particularidades**:
- Aplicação da Súmula 377 do STF (comunicação dos bens adquiridos na constância do casamento)
- Discussões sobre constitucionalidade da imposição aos maiores de 70 anos

## Guarda dos filhos

A definição sobre quem ficará com a guarda dos filhos menores é um dos aspectos mais sensíveis do divórcio.

### Modalidades de guarda

#### 1. Guarda compartilhada

Após a Lei 13.058/2014, tornou-se a regra no ordenamento jurídico brasileiro. Características:
- Responsabilização conjunta sobre decisões importantes na vida dos filhos
- Tempo de convívio equilibrado (não necessariamente igual)
- Ambos os pais mantêm autoridade parental
- Deve haver diálogo constante entre os genitores

#### 2. Guarda unilateral

Exceção, aplicada quando um dos genitores não pode, não quer ou não tem condições de exercer a guarda.
- Um genitor detém a guarda física e legal
- O outro tem direito a visitas e fiscalização
- Decisões importantes são tomadas prioritariamente pelo guardião

### Fatores considerados na definição da guarda

- Melhor interesse da criança/adolescente (princípio fundamental)
- Idade e necessidades específicas dos filhos
- Vínculo afetivo com cada genitor
- Condições de cada genitor (tempo disponível, estabilidade)
- Opinião dos filhos (considerada conforme seu desenvolvimento)
- Manutenção do status quo (evitar mudanças traumáticas)

### Convivência e direito de visitas

Quando não há guarda compartilhada com residência alternada, estabelece-se um regime de convivência:
- Fins de semana alternados
- Pernoites durante a semana
- Feriados divididos
- Férias escolares compartilhadas
- Datas comemorativas (aniversários, dia dos pais/mães)

## Pensão alimentícia

### Entre ex-cônjuges

A pensão entre ex-cônjuges não é automática, mas excepcional, devendo ser demonstrada:
- Necessidade de quem pede
- Possibilidade de quem paga
- Vínculo causal entre a necessidade e o casamento

Características:
- Geralmente temporária (até recolocação profissional)
- Revisável quando mudam as circunstâncias
- Cessa com novo casamento ou união estável do beneficiário

### Para os filhos

A obrigação alimentar em relação aos filhos é compartilhada por ambos os genitores, independentemente da guarda:
- Proporcional aos recursos de cada genitor
- Deve atender às necessidades dos filhos
- Inclui alimentação, educação, lazer, vestuário, saúde
- Geralmente dura até 18 anos ou 24 (se estudante universitário)

### Cálculo do valor

Não existe um percentual fixo em lei, mas a jurisprudência costuma considerar:
- 15% a 30% da remuneração líquida para um filho
- 20% a 40% para dois filhos
- 30% a 50% para três ou mais filhos

Fatores que influenciam o valor:
- Padrão de vida da família antes do divórcio
- Necessidades específicas (saúde, educação especial)
- Idade dos filhos
- Despesas já pagas diretamente (plano de saúde, escola)

## Procedimentos práticos do divórcio

### Documentos necessários

Para iniciar o processo de divórcio, são necessários:
- Certidão de casamento atualizada
- Documentos pessoais dos cônjuges (RG, CPF)
- Certidão de nascimento dos filhos menores
- Documentos relativos aos bens (escrituras, certificados de veículos)
- Comprovantes de renda de ambos
- Comprovantes de despesas dos filhos (escola, plano de saúde)

### Custos envolvidos

Os custos variam conforme a modalidade escolhida:

**Divórcio em cartório**:
- Emolumentos cartorários (variam por estado)
- Honorários advocatícios
- Taxa de averbação no registro civil

**Divórcio judicial**:
- Custas processuais
- Honorários advocatícios
- Eventuais perícias (avaliação de bens, estudo psicossocial)
- Taxa de averbação no registro civil

### Duração do processo

- **Divórcio extrajudicial**: Pode ser concluído em um dia
- **Divórcio consensual judicial**: Entre 1 e 3 meses
- **Divórcio litigioso**: De 1 a 5 anos, dependendo da complexidade e do congestionamento judicial

## Questões patrimoniais específicas

### Dívidas no divórcio

- **Dívidas comuns** (adquiridas em benefício da família): Divididas entre os cônjuges
- **Dívidas particulares**: Permanecem com o cônjuge que as contraiu
- **Fianças e avais**: Caso complexo, dependendo de quando foram prestados

### Empresas e participações societárias

- Quotas/ações podem ser divididas conforme o regime de bens
- Possibilidade de compensação com outros bens
- Avaliação do valor da empresa (geralmente requer perícia)

### Bens no exterior

- Seguem as mesmas regras do regime de bens escolhido
- Podem exigir procedimentos específicos conforme a legislação do país
- Recomendável advocacia especializada em direito internacional privado

## Divórcio e planejamento financeiro

### Impactos financeiros do divórcio

- Duplicação de despesas fixas (moradia, contas)
- Possível redução do padrão de vida
- Custos com a reorganização (mudança, novos móveis)
- Impacto na aposentadoria e planos de longo prazo

### Recomendações para minimizar danos

- Buscar acordos que preservem a estabilidade financeira de ambos
- Planejamento tributário na divisão de bens
- Considerar liquidez dos bens na partilha
- Avaliação profissional do impacto financeiro das decisões

## Aspectos emocionais e psicológicos

### Impacto emocional do divórcio

- Processo de luto pelo fim da relação
- Ansiedade sobre o futuro
- Preocupações com os filhos
- Reestruturação da identidade pessoal

### Suporte recomendado

- Terapia individual durante o processo
- Grupos de apoio
- Mediação para minimizar conflitos
- Terapia familiar para ajudar os filhos

## Mediação e conciliação no divórcio

### Benefícios da mediação

- Redução da litigiosidade
- Soluções mais customizadas às necessidades da família
- Preservação das relações parentais
- Processo menos traumático para os filhos
- Redução de custos e tempo

### Quando buscar mediação

- Quando há disposição para diálogo
- Quando há filhos em comum
- Quando o patrimônio é complexo
- Quando se deseja privacidade

## Conclusão

O divórcio representa um momento de transição significativo na vida familiar, com impactos jurídicos, financeiros, emocionais e parentais. A legislação brasileira evoluiu para simplificar o processo, respeitando a autonomia dos indivíduos quanto à manutenção ou não do vínculo matrimonial.

Embora o aspecto legal seja fundamental, é importante considerar o divórcio como um processo multidimensional que afeta profundamente a vida de todos os envolvidos. Buscar assistência jurídica adequada, combinada com suporte emocional e financeiro, pode contribuir significativamente para um processo menos traumático e mais eficiente.

É fundamental que, especialmente quando há filhos envolvidos, os ex-cônjuges busquem superar ressentimentos pessoais para priorizar o bem-estar dos filhos, construindo uma coparentalidade saudável e cooperativa, mesmo após o fim do relacionamento conjugal.

A transparência, o diálogo e a busca por soluções consensuais, sempre que possível, não apenas simplificam os procedimentos legais, mas também contribuem para a construção de um futuro mais equilibrado e positivo para todos os membros da família, mesmo após a dissolução do vínculo matrimonial.`,
      imageUrl: "https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
      publishDate: new Date("2023-02-09"),
      categoryId: 3, // Categoria Direito Familiar
      featured: 1
    });
  }
}

export const storage = new MemStorage();
