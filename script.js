const audiences = [
  {
    id: "readers",
    tag: "Для читателей",
    title: "Присоединиться к клубу",
    text: "Для тех, кто хочет читать регулярнее, обсуждать книги не в одиночку и находить людей, с которыми хочется говорить глубже."
  },
  {
    id: "authors",
    tag: "Для авторов",
    title: "Встретиться с читателями",
    text: "Форматы живых встреч, интервью и совместных проектов вокруг книг, тем и авторского опыта.",
    cta: "Предложить встречу"
  },
  {
    id: "libraries",
    tag: "Для библиотек",
    title: "Развивать чтение вместе",
    text: "Клубные форматы, методические идеи и камерные события, которые помогают собирать вокруг книг устойчивые сообщества.",
    cta: "Обсудить формат"
  },
  {
    id: "publishers",
    tag: "Для издательств",
    title: "Представить книги сообществу",
    text: "Возможность мягко и содержательно знакомить читателей с новыми книгами, авторами и издательскими проектами.",
    cta: "Предложить книгу"
  },
  {
    id: "partners",
    tag: "Для партнеров",
    title: "Создать совместный проект",
    text: "Культурные коллаборации, специальные события и партнерские инициативы вокруг чтения и городской жизни.",
    cta: "Создать проект"
  }
];

const collaborationAudiences = audiences.filter(item => item.id !== "readers");
const whatsAppUrl = "https://wa.me/77077572504";

const currentBook = {
  month: "Книга месяца",
  title: "Скоро объявим новый выбор PAGE17",
  author: "Следите за анонсом",
  date: "Дата обсуждения появится здесь",
  note: "Этот блок станет главным ритуалом клуба: одна книга, один месяц, одна встреча и общий разговор, к которому легко присоединиться.",
  cta: "Записаться в клуб"
};

const pastBooks = [
  {
    title: "Первая книжная полка PAGE17",
    date: "Архив обсуждений",
    summary: "Здесь появятся книги, которые клуб уже читал: дата встречи, короткий дайджест разговора, вопросы и фотографии атмосферы."
  },
  {
    title: "Дайджест встречи",
    date: "После обсуждения",
    summary: "Для каждой книги можно сохранять 3 мысли встречи, цитату, фото и ссылку на пост или сторис."
  },
  {
    title: "Рекомендации участников",
    date: "Постоянная рубрика",
    summary: "Отдельное место для книг, которые участники советуют друг другу после клубных встреч."
  }
];

const pressLinks = [
  {
    source: "SKO24",
    title: "В Петропавловске книжный клуб Page 17 возрождает любовь к чтению и живому общению",
    url: "https://sko24.kz/ru/article/1594",
    type: "СМИ"
  },
  {
    source: "Instagram",
    title: "Публикация о PAGE17",
    url: "https://www.instagram.com/p/DUqGSG1DCgR/?igsh=OXg5OTNlNHYwcHds",
    type: "Соцсети"
  }
];

const pageData = {
  readers: {
    tag: "Читателям",
    title: "Книжный клуб, куда легко прийти впервые",
    lead: "PAGE17 помогает читать регулярнее, встречаться с людьми по духу и обсуждать книги в теплой живой атмосфере.",
    cta: "Присоединиться к клубу",
    mini: ["О клубе", "Как проходят встречи", "Книга месяца", "FAQ", "Присоединиться"],
    rows: [
      ["Как проходят встречи", "Мы заранее читаем выбранную книгу, встречаемся в спокойном пространстве и обсуждаем не только сюжет, но и то, что книга запускает внутри разговора."],
      ["Книга месяца", "Анонс книги, дата обсуждения и регистрация будут жить в общем книжном блоке. Так человеку сразу понятно, что читать и как попасть на встречу."],
      ["FAQ", "Можно прийти без опыта книжных клубов, можно сначала просто слушать, а можно активно участвовать в обсуждении."]
    ]
  },
  authors: {
    tag: "Авторам",
    title: "Встречи с читателями без лишнего шума",
    lead: "PAGE17 открыт для авторов, которым важен внимательный разговор о книге, теме и читательском опыте.",
    cta: "Предложить встречу или проект",
    mini: ["Почему PAGE17", "Форматы сотрудничества", "Встречи с читателями", "Интервью", "Подать заявку"],
    rows: [
      ["Форматы", "Авторская встреча, камерный разговор, интервью, совместный спецпроект или обсуждение книги в клубном формате."],
      ["Аудитория", "Люди, которые приходят не за быстрым инфоповодом, а за смыслом, диалогом и настоящим интересом к литературе."],
      ["Как начать", "Расскажите о книге, теме встречи и удобных датах. Мы предложим формат, который подойдет именно вашему проекту."]
    ]
  },
  libraries: {
    tag: "Библиотекам",
    title: "Клубные форматы для живого чтения",
    lead: "Мы можем вместе создавать встречи, подборки, методические идеи и локальные книжные события.",
    cta: "Обсудить сотрудничество",
    mini: ["Совместные проекты", "Форматы мероприятий", "Книжные клубы", "Методические идеи", "Связаться"],
    rows: [
      ["Совместные проекты", "Запуск клуба, серия встреч, тематическая программа или событие вокруг конкретной книги и аудитории."],
      ["Методические идеи", "Поможем упаковать формат обсуждения так, чтобы участникам было понятно, зачем приходить и как включаться."],
      ["Коммуникация", "PAGE17 может стать партнером в продвижении чтения через современные, спокойные и понятные форматы."]
    ]
  },
  publishers: {
    tag: "Издательствам",
    title: "Мягкое продвижение книг через разговор",
    lead: "PAGE17 знакомит читателей с книгами через живые встречи, подборки, клубные обсуждения и авторские форматы.",
    cta: "Предложить книгу или проект",
    mini: ["Почему книжные клубы", "Что мы можем предложить", "Наша аудитория", "Форматы продвижения", "Обсудить проект"],
    rows: [
      ["Что мы можем", "Клубное чтение, презентация книги, встреча с автором, интервью, тематическая подборка или партнерский спецпроект."],
      ["Аудитория", "Читатели, которые ценят рекомендации, личный контекст и разговор вокруг книги, а не агрессивный маркетинг."],
      ["Форматы", "От камерных обсуждений до серии событий вокруг автора, жанра, темы или новой издательской линейки."]
    ]
  },
  partners: {
    tag: "Партнерам",
    title: "Совместные проекты вокруг культуры чтения",
    lead: "PAGE17 открыт для партнерств с культурными площадками, брендами, образовательными и городскими проектами.",
    cta: "Создать совместный проект",
    mini: ["О сотрудничестве", "Возможные форматы", "Наши проекты", "Почему мы", "Связаться"],
    rows: [
      ["Форматы", "Книжный вечер, клубная серия, городская программа, партнерская подборка, спецпроект или камерная встреча."],
      ["Почему мы", "Мы бережно работаем с аудиторией и создаем события, в которые хочется возвращаться."],
      ["Как начать", "Опишите идею, аудиторию и желаемый результат. Мы предложим реалистичный формат сотрудничества."]
    ]
  }
};

const routes = {
  home: renderHome,
  readers: () => renderAudiencePage("readers"),
  authors: () => renderAudiencePage("authors"),
  libraries: () => renderAudiencePage("libraries"),
  publishers: () => renderAudiencePage("publishers"),
  partners: () => renderAudiencePage("partners"),
  books: renderBooks,
  events: renderEvents,
  about: renderAbout,
  media: renderMedia,
  contacts: renderContacts
};

const app = document.querySelector("#app");
const nav = document.querySelector(".main-nav");
const menuButton = document.querySelector(".menu-button");

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
});

document.addEventListener("click", event => {
  const tab = event.target.closest(".audience-tab");
  const mediaTab = event.target.closest(".media-tab");
  const nextSlide = event.target.closest("[data-slider-next]");
  const prevSlide = event.target.closest("[data-slider-prev]");

  if (tab) {
    const section = tab.closest(".audience-switcher, .audience-slider");
    const target = tab.dataset.target;

    section.querySelectorAll(".audience-tab").forEach(button => {
      const isActive = button.dataset.target === target;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    section.querySelectorAll(".audience-panel").forEach(panel => {
      panel.classList.toggle("is-active", panel.id === `panel-${target}`);
    });
    return;
  }

  if (mediaTab) {
    setMediaTab(mediaTab);
    return;
  }

  if (nextSlide || prevSlide) {
    moveAudienceSlide(nextSlide ? 1 : -1);
  }
});

window.addEventListener("hashchange", render);
window.addEventListener("load", render);

function routeName() {
  return window.location.hash.replace("#", "") || "home";
}

function render() {
  const name = routeName();
  const view = routes[name] || routes.home;
  app.innerHTML = view();
  nav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "instant" });
}

function renderHome() {
  return `
    <section class="hero">
      <div class="hero-content">
        <div class="eyebrow">Живой книжный клуб</div>
        <h1>PAGE17</h1>
        <p class="hero-lead">Место, куда хочется возвращаться ради книг, людей и разговоров.</p>
        <p class="hero-description">Книжный клуб для тех, кто хочет читать, обсуждать, открывать новые книги и находить людей, с которыми хочется говорить глубже.</p>
        <div class="actions">
          <a class="button" href="${whatsAppUrl}" target="_blank" rel="noreferrer">Присоединиться к клубу</a>
          <a class="button secondary" href="#events">Посмотреть ближайшую встречу</a>
        </div>
      </div>
    </section>
    ${bookMonthSection()}
    <section class="section">
      <div class="section-inner intro-grid">
        <div class="section-title">
          <span class="eyebrow">Что такое PAGE17</span>
          <h2>Клуб для живых встреч и разговоров вокруг книг</h2>
        </div>
        <div class="quote-panel">
          <strong>PAGE17 - это книжный клуб, где проходят обсуждения книг, литературные события и проекты для людей, которым важны книги и разговоры вокруг них.</strong>
          <p>Сначала мы остаемся понятным клубом для читателей. Возможности для авторов, библиотек, издательств и партнеров раскрываются постепенно через отдельные входы.</p>
        </div>
      </div>
    </section>
    ${clubExperienceSection()}
    ${audienceSection()}
  `;
}

function renderAudiencePage(id) {
  const page = pageData[id];
  return `
    <section class="page-hero">
      <div class="section-inner">
        <div>
          <a class="back-link" href="#home">← На главную</a>
          <span class="eyebrow">${page.tag}</span>
          <h1>${page.title}</h1>
          <p class="hero-lead">${page.lead}</p>
          <a class="button" href="${id === "readers" ? whatsAppUrl : "#contacts"}" ${id === "readers" ? 'target="_blank" rel="noreferrer"' : ""}>${page.cta}</a>
        </div>
        <div class="quote-panel">
          <strong>Навигация раздела</strong>
          <div class="mini-nav">${page.mini.map(item => `<a href="#contacts">${item}</a>`).join("")}</div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="section-inner content-list">
        ${page.rows.map(row => `
          <article class="content-row">
            <h3>${row[0]}</h3>
            <p>${row[1]}</p>
          </article>
        `).join("")}
      </div>
    </section>
    ${audienceSection()}
  `;
}

function renderEvents() {
  return `
    <section class="page-hero">
      <div class="section-inner">
        <div>
          <span class="eyebrow">Афиша</span>
          <h1>Ближайшие встречи PAGE17</h1>
          <p class="hero-lead">Здесь будут появляться даты, книги, форматы и ссылки на регистрацию.</p>
        </div>
        ${eventCard()}
      </div>
    </section>
    ${bookMonthSection()}
  `;
}

function renderAbout() {
  return `
    <section class="page-hero">
      <div class="section-inner">
        <div>
          <span class="eyebrow">О клубе</span>
          <h1>Мы собираем людей вокруг книг</h1>
          <p class="hero-lead">PAGE17 вырос из желания создать спокойное место для чтения, разговоров и культурных связей.</p>
        </div>
        <div class="quote-panel"><strong>Миссия</strong><p>Делать чтение живым, регулярным и человеческим опытом, который продолжается после последней страницы.</p></div>
      </div>
    </section>
    <section class="section"><div class="section-inner card-grid">
      ${["История клуба", "Ценности", "Команда"].map((item, index) => featureCard(index + 1, item, "Этот блок можно расширить реальными фактами, фотографиями и именами команды Дины и Лены.")).join("")}
    </div></section>
  `;
}

function renderMedia() {
  return `
    <section class="page-hero">
      <div class="section-inner">
        <div>
          <span class="eyebrow">Медиа</span>
          <h1>Медиа PAGE17</h1>
          <p class="hero-lead">Здесь собираются наши материалы, публикации о клубе и будущий ежемесячный подкаст с героинями.</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="section-inner">
        <div class="media-tabs" role="tablist" aria-label="Разделы медиа">
          <button class="media-tab is-active" type="button" data-media-target="own">Мы пишем</button>
          <button class="media-tab" type="button" data-media-target="press">О нас пишут</button>
          <button class="media-tab" type="button" data-media-target="podcast">Подкаст</button>
        </div>
        <div class="media-panel is-active" id="media-own">
          <div class="card-grid">
            ${["Рекомендации книг", "Интервью", "Заметки клуба"].map((item, index) => featureCard(index + 1, item, "Место для будущих публикаций PAGE17: короткие тексты, подборки, вопросы к встречам и читательские заметки.")).join("")}
          </div>
        </div>
        <div class="media-panel" id="media-press">
          <div class="press-list">
            ${pressLinks.map(item => `
              <a class="press-card" href="${item.url}" target="_blank" rel="noreferrer">
                <span>${item.type} · ${item.source}</span>
                <strong>${item.title}</strong>
                <em>Открыть материал</em>
              </a>
            `).join("")}
          </div>
        </div>
        <div class="media-panel" id="media-podcast">
          <article class="podcast-card">
            <span class="eyebrow">Скоро</span>
            <h2>Первый подкаст с героиней PAGE17</h2>
            <p>Оставляем здесь место для постоянной ежемесячной рубрики: разговоры с героинями, авторами, читательницами и людьми, которые создают культурную среду вокруг книг.</p>
            <a class="button secondary" href="#contacts">Предложить героиню</a>
          </article>
        </div>
      </div>
    </section>
  `;
}

function renderContacts() {
  return `
    <section class="page-hero">
      <div class="section-inner">
        <div>
          <span class="eyebrow">Контакты</span>
          <h1>Напишите PAGE17</h1>
          <p class="hero-lead">Для участия в клубе, авторских встреч, издательских проектов и партнерств.</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="section-inner contact-layout">
        <div>
          <h2>Связаться</h2>
          <div class="contact-list">
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://t.me/" target="_blank" rel="noreferrer">Telegram</a>
            <a href="${whatsAppUrl}" target="_blank" rel="noreferrer">WhatsApp Дины</a>
            <a href="mailto:hello@page17.club">hello@page17.club</a>
          </div>
        </div>
        <form class="form" action="mailto:hello@page17.club" method="post" enctype="text/plain">
          <label class="field">Имя<input name="name" autocomplete="name"></label>
          <label class="field">Email или Telegram<input name="contact" autocomplete="email"></label>
          <label class="field">Сообщение<textarea name="message"></textarea></label>
          <button class="button" type="submit">Отправить</button>
        </form>
      </div>
    </section>
  `;
}

function eventCard() {
  return `
    <article class="event-card">
      <div class="event-date"><span>17</span><span>дата скоро</span></div>
      <div>
        <h3>Следующая встреча PAGE17</h3>
        <p>Скоро объявим следующую встречу. Следите за обновлениями в Instagram и Telegram или оставьте контакт, чтобы получить анонс.</p>
        <a class="button" href="${whatsAppUrl}" target="_blank" rel="noreferrer">Зарегистрироваться</a>
      </div>
    </article>
  `;
}

function renderBooks() {
  return `
    <section class="page-hero">
      <div class="section-inner">
        <div>
          <a class="back-link" href="#home">← На главную</a>
          <span class="eyebrow">Книжная полка</span>
          <h1>Книги PAGE17</h1>
          <p class="hero-lead">Текущий выбор клуба, архив прошлых обсуждений и дайджесты встреч.</p>
        </div>
        ${bookCard()}
      </div>
    </section>
    ${pastBooksSection()}
  `;
}

function featureCard(number, title, text) {
  return `<article class="card"><div class="card-number">${String(number).padStart(2, "0")}</div><h3>${title}</h3><p>${text}</p></article>`;
}

function clubExperienceSection() {
  const reasons = [
    ["Читать регулярнее", "Книга месяца задает мягкий ритм и помогает возвращаться к чтению без давления."],
    ["Обсуждать глубже", "На встречах говорят не только о сюжете, но и о том, что книга меняет в нас."],
    ["Находить своих", "Клуб собирает людей, с которыми хочется продолжать разговор после последней страницы."]
  ];

  return `
    <section class="section experience-section">
      <div class="section-inner experience-layout">
        <div class="experience-copy">
          <div class="section-title">
            <span class="eyebrow">Как это устроено</span>
            <h2>Читаем книгу, встречаемся и разговариваем по-настоящему</h2>
            <p>PAGE17 держится на простом клубном ритме: общий выбор месяца, живая встреча, спокойная атмосфера и люди, которым важны книги.</p>
          </div>
          <div class="experience-steps">
            ${["Выбираем книгу месяца", "Читаем в своем темпе", "Встречаемся и обсуждаем", "Делимся мыслями и возвращаемся снова"].map((step, index) => `
              <div class="experience-step"><b>${String(index + 1).padStart(2, "0")}</b><span>${step}</span></div>
            `).join("")}
          </div>
        </div>
        <div class="experience-visual">
          <div class="gallery-item img-books" data-label="встречи"></div>
          <div class="gallery-item img-notes" data-label="заметки"></div>
        </div>
        <div class="experience-reasons">
          ${reasons.map(item => `
            <article class="reason-card">
              <h3>${item[0]}</h3>
              <p>${item[1]}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function gallerySection() {
  return `
    <section class="section">
      <div class="section-inner">
        <div class="section-title">
          <span class="eyebrow">Атмосфера клуба</span>
          <h2>Теплое место для книг и людей</h2>
        </div>
        <div class="gallery">
          <div class="gallery-item img-books" data-label="встречи"></div>
          <div class="gallery-item img-table" data-label="книги"></div>
          <div class="gallery-item img-notes" data-label="заметки"></div>
          <div class="gallery-item img-shelves" data-label="полки"></div>
          <div class="gallery-item img-cups" data-label="чай"></div>
        </div>
      </div>
    </section>
  `;
}

function audienceSection() {
  return `
    <section class="section audience-band">
      <div class="section-inner">
        <div class="section-title">
          <span class="eyebrow">Мы открыты для сотрудничества</span>
          <h2>PAGE17 - книжный клуб, вокруг которого постепенно формируется литературное пространство</h2>
          <p>Выберите направление сотрудничества, чтобы увидеть подходящий формат и следующий шаг.</p>
        </div>
        <div class="audience-slider" data-active-slide="0">
          <div class="slider-topline">
            <div class="slider-dots" aria-label="Направления сотрудничества">
              ${collaborationAudiences.map((item, index) => `
                <button class="audience-tab ${index === 0 ? "is-active" : ""}" type="button" role="tab" aria-selected="${index === 0}" data-target="${item.id}">
                  ${item.tag}
                </button>
              `).join("")}
            </div>
            <div class="slider-controls">
              <button class="icon-button" type="button" aria-label="Предыдущее направление" data-slider-prev>‹</button>
              <button class="icon-button" type="button" aria-label="Следующее направление" data-slider-next>›</button>
            </div>
          </div>
          <div class="audience-panels">
            ${collaborationAudiences.map((item, index) => `
              <article class="audience-panel ${index === 0 ? "is-active" : ""}" id="panel-${item.id}" role="tabpanel">
                <span>${item.tag}</span>
                <h3>${item.title}</h3>
                <p>${item.text}</p>
                <div class="actions">
                  <a class="button" href="#${item.id}">Подробнее</a>
                  <a class="button secondary" href="#contacts">${item.cta}</a>
                </div>
              </article>
            `).join("")}
          </div>
        </div>
        <div class="reader-note">
          <strong>Для читателей</strong>
          <p>Вступление в клуб осталось отдельным основным путем: можно перейти в раздел для читателей или оставить контакт для анонсов.</p>
          <a class="button secondary" href="${whatsAppUrl}" target="_blank" rel="noreferrer">Присоединиться к клубу</a>
        </div>
      </div>
    </section>
  `;
}

function bookMonthSection() {
  return `
    <section class="section book-month-band">
      <div class="section-inner book-month">
        <div class="section-title">
          <span class="eyebrow">${currentBook.month}</span>
          <h2>Один выбор, один месяц, один общий разговор</h2>
          <p>Книга месяца может стать главным регулярным ритуалом PAGE17 и точкой входа для новых участников.</p>
        </div>
        ${bookCard()}
      </div>
    </section>
  `;
}

function bookCard() {
  return `
    <article class="book-card">
      <div class="book-cover">
        <span>PAGE</span>
        <strong>17</strong>
      </div>
      <div>
        <span class="eyebrow">${currentBook.date}</span>
        <h3>${currentBook.title}</h3>
        <p>${currentBook.note}</p>
        <div class="actions">
          <a class="button" href="${whatsAppUrl}" target="_blank" rel="noreferrer">${currentBook.cta}</a>
          <a class="button secondary" href="#books">Прошлые книги</a>
        </div>
      </div>
    </article>
  `;
}

function pastBooksSection() {
  return `
    <section class="section">
      <div class="section-inner">
        <div class="section-title">
          <span class="eyebrow">Архив</span>
          <h2>Прошлые книги и дайджесты встреч</h2>
          <p>Когда появятся реальные обсуждения, сюда можно добавлять краткие итоги, фото, вопросы и ссылки на посты.</p>
        </div>
        <div class="card-grid">
          ${pastBooks.map((item, index) => featureCard(index + 1, item.title, `${item.date}. ${item.summary}`)).join("")}
        </div>
      </div>
    </section>
  `;
}

function setMediaTab(tab) {
  const target = tab.dataset.mediaTarget;
  const root = tab.closest(".section-inner");

  root.querySelectorAll(".media-tab").forEach(button => {
    button.classList.toggle("is-active", button.dataset.mediaTarget === target);
  });
  root.querySelectorAll(".media-panel").forEach(panel => {
    panel.classList.toggle("is-active", panel.id === `media-${target}`);
  });
}

function moveAudienceSlide(direction) {
  const slider = document.querySelector(".audience-slider");
  if (!slider) return;

  const tabs = [...slider.querySelectorAll(".audience-tab")];
  const activeIndex = tabs.findIndex(tab => tab.classList.contains("is-active"));
  const nextIndex = (activeIndex + direction + tabs.length) % tabs.length;
  tabs[nextIndex].click();
}
