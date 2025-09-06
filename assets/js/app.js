/* assets/js/app.js
   Nexora — Hidden F2 Developer Login + Role Helpers
   NOTE: Change DEV_USERNAME and DEV_PASSWORD below.
*/
(() => {
  const MODAL_ID = "devLoginModal";
  const DEV_USERNAME = "devadmin";       // TODO: change me
  const DEV_PASSWORD = "SuperSecret123"; // TODO: change me

  /** Inject minimal CSS for the modal (safe to call multiple times) */
  function injectStyles() {
    if (document.getElementById("dev-modal-styles")) return;
    const css = `
      :root {
        --gold:#d4af37; --gold-bright:#ffd700; --bg:#0a0a0a; --panel:#111; --text:#f5f5f5; --muted:#bbb;
        --border:#333;
      }
      .dev-hidden{display:none !important}
      #${MODAL_ID}{
        position:fixed; inset:0; background:rgba(0,0,0,.75);
        display:flex; align-items:center; justify-content:center; z-index:9999;
      }
      #${MODAL_ID}.dev-hidden{display:none !important}
      #${MODAL_ID} .dev-modal{
        width:min(92vw,420px); background:linear-gradient(135deg,#151515,#0f0f0f);
        border:1px solid var(--gold); border-radius:14px; padding:22px 22px 18px;
        box-shadow:0 20px 60px rgba(212,175,55,.25);
      }
      #${MODAL_ID} .dev-head{
        display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;
      }
      #${MODAL_ID} .dev-title{
        font-size:1.25rem; font-weight:800;
        background:linear-gradient(90deg,var(--gold),var(--gold-bright));
        -webkit-background-clip:text; -webkit-text-fill-color:transparent;
      }
      #${MODAL_ID} .dev-close{
        background:transparent; border:none; color:var(--gold-bright);
        font-size:1.6rem; line-height:1; cursor:pointer;
      }
      #${MODAL_ID} label{display:block; color:var(--muted); font-size:.9rem; margin:.75rem 0 .35rem}
      #${MODAL_ID} input{
        width:100%; padding:.8rem .9rem; border-radius:10px; border:1px solid var(--border);
        background:#1a1a1a; color:var(--text); outline:none;
      }
      #${MODAL_ID} input:focus{border-color:var(--gold); box-shadow:0 0 0 3px rgba(212,175,55,.15)}
      #${MODAL_ID} .dev-actions{display:flex; gap:.6rem; margin-top:1rem}
      #${MODAL_ID} .btn{
        flex:1; padding:.85rem; border-radius:10px; border:1px solid var(--gold);
        cursor:pointer; font-weight:700; text-transform:uppercase; letter-spacing:.5px;
      }
      #${MODAL_ID} .btn-primary{
        background:linear-gradient(135deg,var(--gold),var(--gold-bright)); color:#000;
        border:none;
      }
      #${MODAL_ID} .btn-secondary{
        background:transparent; color:var(--gold);
      }
      #${MODAL_ID} .dev-hint{
        margin-top:.75rem; font-size:.8rem; color:var(--muted); text-align:center;
      }
      #${MODAL_ID} .dev-error{
        margin-top:.6rem; font-size:.9rem; color:#ff8c8c; text-align:center; min-height:1.2em;
      }
      /* small helper for any page logo if needed */
      .logo svg,.logo img{max-width:220px; max-height:60px}
    `;
    const style = document.createElement("style");
    style.id = "dev-modal-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  /** Build the modal HTML once and attach handlers */
  function injectModal() {
    if (document.getElementById(MODAL_ID)) return;

    const wrapper = document.createElement("div");
    wrapper.id = MODAL_ID;
    wrapper.className = "dev-hidden";
    wrapper.innerHTML = `
      <div class="dev-modal" role="dialog" aria-modal="true" aria-labelledby="devLoginTitle">
        <div class="dev-head">
          <h2 id="devLoginTitle" class="dev-title">Developer Login</h2>
          <button class="dev-close" type="button" aria-label="Close">&times;</button>
        </div>
        <form id="devLoginForm" novalidate>
          <label for="devUser">Username</label>
          <input id="devUser" name="devUser" type="text" autocomplete="username" required />

          <label for="devPass">Password</label>
          <input id="devPass" name="devPass" type="password" autocomplete="current-password" required />

          <div class="dev-actions">
            <button class="btn btn-secondary" type="button" id="devCancelBtn">Cancel</button>
            <button class="btn btn-primary" type="submit">Login</button>
          </div>
          <div class="dev-error" id="devError"></div>
          <div class="dev-hint">Tip: Press <strong>F2</strong> anytime to open this.</div>
        </form>
      </div>
    `;
    document.body.appendChild(wrapper);

    // Events
    const modal = document.getElementById(MODAL_ID);
    const closeBtn = modal.querySelector(".dev-close");
    const cancelBtn = modal.querySelector("#devCancelBtn");
    const form = modal.querySelector("#devLoginForm");

    function closeModal() {
      modal.classList.add("dev-hidden");
      form.reset();
      modal.querySelector("#devError").textContent = "";
    }
    function openModal() {
      modal.classList.remove("dev-hidden");
      setTimeout(() => modal.querySelector("#devUser").focus(), 0);
    }

    // expose for other scripts (optional)
    window.NEXORA_DEV = {
      openDevModal: openModal,
      closeDevModal: closeModal
    };

    // click outside to close
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    // close buttons / ESC
    closeBtn.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("dev-hidden")) closeModal();
    });
    // F2 to open
    document.addEventListener("keydown", (e) => {
      if (e.key === "F2") {
        e.preventDefault();
        openModal();
      }
    });

    // form submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = form.devUser.value.trim();
      const pass = form.devPass.value;

      if (user === DEV_USERNAME && pass === DEV_PASSWORD) {
        // set role and go to developer page
        localStorage.setItem("userRole", "developer");
        localStorage.setItem("developerLoginAt", new Date().toISOString());
        window.location.href = "developer.html";
      } else {
        const err = modal.querySelector("#devError");
        err.textContent = "Invalid developer credentials.";
      }
    });
  }

  /** Public helper: enforce dev-only access on private pages */
  function enforceDeveloperAccess(redirectTo = "login.html") {
    const role = localStorage.getItem("userRole");
    if (role !== "developer") {
      window.location.replace(redirectTo);
    }
  }

  /** Public helper: sign out developer */
  function developerLogout(next = "index.html") {
    localStorage.removeItem("userRole");
    localStorage.removeItem("developerLoginAt");
    window.location.href = next;
  }

  // Init
  document.addEventListener("DOMContentLoaded", () => {
    injectStyles();
    injectModal();
  });

  // expose guards on window
  window.NEXORA_DEV = Object.assign(window.NEXORA_DEV || {}, {
    enforceDeveloperAccess,
    developerLogout
  });
})();
