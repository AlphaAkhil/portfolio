// Data-driven project array including XR Case Studies
const projects = [
  {
    id: "pedestrian-crossing",
    title: "Pedestrian Crossing Simulator",
    year: "2026",
    category: "Virtual Reality",
    image: "images/game.jpg",
    tagLine: "Unity / KAT VR / Eye Tracking",
    cardDescription: "An immersive XR training simulator designed to improve pedestrian road safety through realistic virtual environments and intelligent behavior analysis.",
    videoUrl: "", 
    githubUrl: "", // Empty: GitHub button automatically hidden
    role: "Lead Developer",
    duration: "6 Months",
    tags: ["Unity", "KAT VR", "C#", "Eye Tracking", "SUMO"],
    summary: "Integrated Eye Tracking and KAT VR locomotion to create a natural walking experience while monitoring user awareness and decision-making metrics in real time.",
    highlights: [
      "Engineered real-time data collection pipelines for head rotation and eye-gaze metrics.",
      "Integrated KAT VR omnidirectional treadmill SDK for natural physical locomotion.",
      "Synchronized traffic state behavior simulation using SUMO framework."
    ]
  },
  {
    id: "electronics-lab",
    title: "Electronics Learning Lab Simulator",
    year: "2025",
    category: "Mixed Reality",
    image: "images/game.jpg",
    tagLine: "Unity / Mixed Reality / C#",
    cardDescription: "An interactive Mixed Reality educational platform featuring 50+ learning modules that blend theoretical concepts with hands-on practical experiments.",
    videoUrl: "", 
    githubUrl: "https://github.com/nitin-pant-oo1",
    role: "XR Developer",
    duration: "4 Months",
    tags: ["Unity", "Mixed Reality", "C#", "Education"],
    summary: "Users perform interactive circuit simulations—including Rectifiers and Half Adders—while operating virtual electrical instruments like multimeters in MR.",
    highlights: [
      "Developed 50+ modular interactive circuit experiments with live logic calculation.",
      "Simulated real-world multimeter voltage and resistance measurement routines.",
      "Designed spatial anchor positioning for seamless physical-to-virtual alignment."
    ]
  },
  {
    id: "rocket-3d",
    title: "Rocket Game 3D",
    year: "2024",
    category: "Game Dev",
    image: "images/3dRocketGame.png",
    tagLine: "Unity 3D / C# / Blender",
    cardDescription: "Custom 3D low-poly models built in Blender and integrated into Unity. Features physics-based thrust, collision logic, and polished level flow.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://alphaakhil.github.io/3DRocketGame/",
    role: "Lead Developer",
    duration: "4 Weeks",
    tags: ["Unity 3D", "C#", "Blender", "Physics Engine"],
    summary: "A physics-based space traversal game featuring custom low-poly models, thrust/inertia calculations, and robust level state controllers.",
    highlights: [
      "Designed and modeled 3D assets in Blender with optimized poly counts.",
      "Engineered vector-based thrust physics and collision detection systems in C#.",
      "Implemented flexible level progression flow and UI state management."
    ]
  },
  {
    id: "spaceship-2d",
    title: "2D Spaceship Shooter",
    year: "2024",
    category: "Game Dev",
    image: "images/archedGame.png",
    tagLine: "Python / Pygame",
    cardDescription: "Fast-paced arcade shooter featuring custom sprite physics, dynamic enemy spawns, collision handling, and sound effect pipelines.",
    videoUrl: "",
    githubUrl: "",
    role: "Game Programmer",
    duration: "2 Weeks",
    tags: ["Python", "Pygame", "2D Physics", "OOP"],
    summary: "An arcade-style shooter built from scratch in Python, demonstrating dynamic object spawning and collision pipelines.",
    highlights: [
      "Built object-oriented sprite inheritance structures for weapons and enemies.",
      "Engineered high-performance bounding box collision detection routines.",
      "Integrated multi-channel audio synthesis for real-time sound effects."
    ]
  }
];

let activeCategory = "all";

// Helper check for non-empty links
function hasLink(url) {
  return url && url.trim() !== "" && url.trim() !== "#";
}

// Mobile Menu Navigation Controls
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  if (nav) nav.classList.toggle("active");
}

function closeMenu() {
  const nav = document.getElementById("navMenu");
  if (nav) nav.classList.remove("active");
}

// Filter Function
function filterProjects(category, buttonEl) {
  activeCategory = category;

  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  if (buttonEl) buttonEl.classList.add("active");

  renderProjects();
}

// Populate projects grid DOM
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const filtered = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  grid.innerHTML = filtered.map(project => {
    const isGithubAvailable = hasLink(project.githubUrl);

    // Standard arrow icon for all Explore Case buttons
    const btnIcon = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>`;

 
    // Adjust grid column layout if only one button is visible
    const cardButtonsStyle = "";

    return `
      <article class="project-card">
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-content">
          <div class="card-top-meta">
            <span class="project-tag">${project.tagLine}</span>
            <span class="project-year">${project.year}</span>
          </div>
          <h3>${project.title}</h3>
          <p>${project.cardDescription}</p>
          <div class="card-buttons " style='grid-template-columns: 1fr;'>
            <button class="btn card-btn video-btn" onclick="openProjectModal('${project.id}')">
              ${btnIcon}
              Explore Case
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// Modal handling
function openProjectModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById("projectModal");
  const iframe = document.getElementById("modalVideo");
  const videoContainer = document.querySelector(".iframe-container");
  const githubBtn = document.getElementById("modalGithub");

  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalRole").textContent = `Role: ${project.role}`;
  document.getElementById("modalDuration").textContent = `Timeline: ${project.duration}`;
  document.getElementById("modalSummary").textContent = project.summary;

  // GitHub link check & visibility logic in modal
  if (hasLink(project.githubUrl)) {
    githubBtn.href = project.githubUrl;
    githubBtn.style.display = "inline-flex";
  } else {
    githubBtn.href = "#";
    githubBtn.style.display = "none";
  }

  // Video check & visibility logic
  if (hasLink(project.videoUrl)) {
    iframe.src = project.videoUrl;
    videoContainer.classList.remove("hidden");
  } else {
    iframe.src = "";
    videoContainer.classList.add("hidden");
  }

  document.getElementById("modalTags").innerHTML = project.tags
    .map(t => `<span class="tag-pill">${t}</span>`).join("");

  document.getElementById("modalHighlights").innerHTML = project.highlights
    .map(h => `<li>${h}</li>`).join("");

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(event, force = false) {
  if (force || (event && event.target.classList.contains("project-modal"))) {
    const modal = document.getElementById("projectModal");
    const iframe = document.getElementById("modalVideo");
    
    iframe.src = "";
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

document.addEventListener("DOMContentLoaded", renderProjects);