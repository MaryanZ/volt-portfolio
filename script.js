// ========== THEME TOGGLE ==========
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("volt-theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);
themeToggle?.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "" : "light";
  if (next) root.setAttribute("data-theme", next);
  else root.removeAttribute("data-theme");
  localStorage.setItem("volt-theme", next);
});

// ========== MOBILE MENU ==========
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn?.addEventListener("click", () => {
  const shown = mobileMenu.style.display === "block";
  mobileMenu.style.display = shown ? "none" : "block";
});
mobileMenu
  ?.querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => (mobileMenu.style.display = "none"))
  );
window.addEventListener("resize", () => {
  if (window.innerWidth > 960 && mobileMenu?.style.display === "block") {
    mobileMenu.style.display = "none";
  }
});

// ========== SMOOTH ANCHOR SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 64,
        behavior: "smooth",
      });
    }
  });
});

// ========== REVEAL ON SCROLL ==========
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ========== FOOTER YEAR ==========
document.getElementById("year").textContent = new Date().getFullYear();

// ========== RESUME LINK ==========
document.getElementById("resumeLink")?.setAttribute("href", "#"); // <-- put your PDF URL here

// ========== PROJECTS DATA ==========
/**
 * Fields:
 * - title
 * - blurb
 * - tags (array)
 * - demo (url or null)
 * - source (url or null)
 * - icon (optional)
 * - comingSoon (optional bool)
 * - category: "vanilla" | "api" | "react"
 */
const projects = [
  {
    title: "Volt — SaaS Landing Page",
    blurb:
      "Modern landing with dark/light theme, animated reveals, mobile nav, and polished pricing UI.",
    tags: ["HTML", "CSS", "JavaScript", "Accessibility"],
    demo: "#", // TODO: replace
    source: "#", // TODO: replace
    icon: "assets/bolt.svg",
    category: "vanilla",
  },
  {
    title: "Volt Weather — Live Dashboard",
    blurb:
      "WeatherAPI integration with geolocation, loading states, error handling, timestamp, and localStorage.",
    tags: ["API", "Async/Await", "State", "UX"],
    demo: "#", // TODO: replace
    source: "#", // TODO: replace
    icon: "assets/bolt.svg",
    category: "api",
  },
  {
    title: "Next: React App (Coming Soon)",
    blurb:
      "A small but real app (search/filter, hooks, local storage). Ships after this portfolio goes live.",
    tags: ["React", "Hooks", "Components"],
    demo: null,
    source: null,
    icon: "assets/bolt.svg",
    comingSoon: true,
    category: "react",
  },
];

let currentFilter = "all";

// ========== RENDER PROJECTS ==========
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const filtered = projects.filter((p) =>
    currentFilter === "all" ? true : p.category === currentFilter
  );

  filtered.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card reveal";

    const head = document.createElement("div");
    head.className = "card-head";

    const icon = document.createElement("img");
    icon.src = p.icon || "assets/bolt.svg";
    icon.alt = "";
    icon.width = 24;
    icon.height = 24;

    const h3 = document.createElement("h3");
    h3.textContent = p.title;

    head.appendChild(icon);
    head.appendChild(h3);

    const blurb = document.createElement("p");
    blurb.className = "muted";
    blurb.textContent = p.blurb;

    const tags = document.createElement("ul");
    tags.className = "tags";
    (p.tags || []).forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      tags.appendChild(li);
    });

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const liveBtn = document.createElement(p.demo ? "a" : "button");
    liveBtn.className = p.demo ? "btn btn-primary" : "btn btn-ghost";
    liveBtn.textContent = "Live Demo";
    if (p.demo) {
      liveBtn.href = p.demo;
      liveBtn.target = "_blank";
      liveBtn.rel = "noopener";
    } else {
      liveBtn.disabled = true;
    }

    const sourceBtn = document.createElement(p.source ? "a" : "button");
    sourceBtn.className = "btn btn-ghost";
    sourceBtn.textContent = "Source";
    if (p.source) {
      sourceBtn.href = p.source;
      sourceBtn.target = "_blank";
      sourceBtn.rel = "noopener";
    } else {
      sourceBtn.disabled = true;
    }

    if (p.comingSoon) {
      liveBtn.disabled = true;
      sourceBtn.disabled = true;
    }

    actions.appendChild(liveBtn);
    actions.appendChild(sourceBtn);

    card.appendChild(head);
    card.appendChild(blurb);
    card.appendChild(tags);
    card.appendChild(actions);

    grid.appendChild(card);
  });

  // hook new reveals
  document.querySelectorAll(".reveal").forEach((el) => {
    if (!el.classList.contains("in")) io.observe(el);
  });
}

// ========== FILTER BUTTONS ==========
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.dataset.filter;
    currentFilter = val || "all";

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    renderProjects();
  });
});

// Initial render
renderProjects();
