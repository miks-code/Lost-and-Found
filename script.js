document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menuBtn");
  const nav = document.getElementById("publicNav");
  if(menu && nav) menu.addEventListener("click", () => nav.classList.toggle("open"));

  document.querySelectorAll(".eye-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      input.type = input.type === "password" ? "text" : "password";
    });
  });

  const loginForm = document.getElementById("loginForm");
  if(loginForm) loginForm.addEventListener("submit", e => {
    e.preventDefault();
    localStorage.setItem("finditLoggedIn","true");
    window.location.href = "dashboard.html";
  });

  const signupForm = document.getElementById("signupForm");
  if(signupForm) signupForm.addEventListener("submit", e => {
    e.preventDefault();
    const p = document.getElementById("signupPassword");
    const c = document.getElementById("signupConfirm");
    const msg = document.getElementById("signupMessage");
    if(p && c && p.value !== c.value){ msg.textContent = "Passwords do not match."; return; }
    localStorage.setItem("finditLoggedIn","true");
    window.location.href = "dashboard.html";
  });

  const sideToggle = document.getElementById("sideToggle");
  const sidebar = document.getElementById("sidebar");
  if(sideToggle && sidebar) sideToggle.addEventListener("click", () => sidebar.classList.toggle("open"));

  document.querySelectorAll("[data-live-search]").forEach(input => {
    input.addEventListener("input", () => {
      const selector = input.dataset.liveSearch;
      const query = input.value.toLowerCase().trim();
      document.querySelectorAll(selector).forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(query) ? "" : "none";
      });
    });
  });

  document.querySelectorAll(".profile-fields input").forEach(input => {
    input.dataset.originalDisabled = input.disabled;
  });
  const edit = document.getElementById("editProfileBtn");
  const save = document.getElementById("saveProfileBtn");
  if(edit) edit.addEventListener("click", () => document.querySelectorAll(".profile-fields input").forEach(i => i.disabled = false));
  if(save) save.addEventListener("click", () => {
    document.querySelectorAll(".profile-fields input").forEach(i => i.disabled = true);
    const n = document.getElementById("profileFullName");
    const e = document.getElementById("profileUserEmail");
    const pn = document.getElementById("profileName");
    const pe = document.getElementById("profileEmail");
    const pi = document.getElementById("profileInitial");
    if(n && pn) pn.textContent = n.value;
    if(e && pe) pe.textContent = e.value;
    if(n && pi) pi.textContent = n.value.trim().charAt(0).toUpperCase() || "F";
  });

  const photo = document.getElementById("itemPhoto");
  const preview = document.getElementById("imagePreview");
  if(photo && preview) photo.addEventListener("change", () => {
    const file = photo.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width:100%;max-height:220px;border-radius:8px">`;
    };
    reader.readAsDataURL(file);
  });

  document.querySelectorAll(".accept-btn").forEach(btn => btn.addEventListener("click", () => {
    const status = btn.closest(".claim-info")?.querySelector(".claim-status");
    if(status){ status.textContent = "Accepted"; status.className = "claim-status returned"; }
  }));
  document.querySelectorAll(".reject-btn").forEach(btn => btn.addEventListener("click", () => {
    const status = btn.closest(".claim-info")?.querySelector(".claim-status");
    if(status){ status.textContent = "Rejected"; status.className = "claim-status"; }
  }));
  const send = document.getElementById("sendMessageBtn");
  if(send) send.addEventListener("click", () => { alert("Message sent."); window.location.href="item-details.html"; });
});
