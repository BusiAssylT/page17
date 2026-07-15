const cfg = window.PAGE17_CONFIG || {};
const client = cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase
  ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey)
  : null;

function showNotice(element, message, type = "") {
  element.textContent = message;
  element.className = `notice ${type}`.trim();
}

function requireClient(notice) {
  if (client) return true;
  showNotice(notice, "Билетная система ещё подключается. Попробуйте немного позже.", "error");
  return false;
}

function cleanPhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("8") && digits.length === 11 ? `7${digits.slice(1)}` : digits;
}

async function initRegistration() {
  const form = document.querySelector("#registration-form");
  if (!form) return;
  const notice = document.querySelector("#form-notice");
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!requireClient(notice)) return;
    const submit = form.querySelector("button[type=submit]");
    const data = new FormData(form);
    const receipt = data.get("receipt");
    if (!receipt || receipt.size === 0 || receipt.size > 5 * 1024 * 1024) {
      return showNotice(notice, "Загрузите чек в JPG, PNG или PDF размером до 5 МБ.", "error");
    }
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowed.includes(receipt.type)) return showNotice(notice, "Допустимы только JPG, PNG или PDF.", "error");
    submit.disabled = true;
    showNotice(notice, "Загружаем чек и создаём заявку…");
    const ext = receipt.name.split(".").pop().toLowerCase();
    const receiptPath = `${crypto.randomUUID()}.${ext}`;
    const upload = await client.storage.from("receipts").upload(receiptPath, receipt, {contentType: receipt.type, upsert: false});
    if (upload.error) {
      submit.disabled = false;
      return showNotice(notice, "Не удалось загрузить чек. Попробуйте ещё раз.", "error");
    }
    const payload = {
      p_full_name: String(data.get("full_name")).trim(),
      p_whatsapp: cleanPhone(String(data.get("whatsapp"))),
      p_receipt_path: receiptPath
    };
    const result = await client.rpc("create_registration", payload);
    if (result.error) {
      await client.storage.from("receipts").remove([receiptPath]);
      submit.disabled = false;
      const message = result.error.message.includes("sold_out") ? "Все 60 мест уже заняты." : "Не удалось создать заявку. Проверьте данные и попробуйте снова.";
      return showNotice(notice, message, "error");
    }
    form.reset();
    form.classList.add("hidden");
    showNotice(notice, `Заявка №${result.data} принята. После проверки оплаты организатор отправит именной билет на ваш WhatsApp.`, "success");
  });
}

async function initTicket() {
  const root = document.querySelector("#ticket-root");
  if (!root) return;
  const notice = document.querySelector("#ticket-notice");
  if (!requireClient(notice)) return;
  const token = new URLSearchParams(location.search).get("token");
  if (!token) return showNotice(notice, "В ссылке отсутствует код билета.", "error");
  const result = await client.rpc("get_public_ticket", {p_token: token});
  if (result.error || !result.data?.length) return showNotice(notice, "Билет не найден или аннулирован.", "error");
  const ticket = result.data[0];
  document.querySelector("#ticket-content").classList.remove("hidden");
  document.querySelector("#ticket-name").textContent = ticket.full_name;
  document.querySelector("#ticket-number").textContent = ticket.serial_number;
  const status = document.querySelector("#ticket-status");
  status.textContent = ticket.checked_in_at ? "Билет уже использован" : "Билет действителен";
  status.classList.toggle("used", Boolean(ticket.checked_in_at));
  const checkinUrl = `${cfg.siteUrl}/admin.html?checkin=${encodeURIComponent(token)}`;
  new QRCode(document.querySelector("#ticket-qr"), {text: checkinUrl, width: 200, height: 200, correctLevel: QRCode.CorrectLevel.H});
  notice.classList.add("hidden");
}

async function initAdmin() {
  const login = document.querySelector("#admin-login");
  if (!login) return;
  const notice = document.querySelector("#admin-notice");
  if (!requireClient(notice)) return;
  login.addEventListener("submit", async event => {
    event.preventDefault();
    const data = new FormData(login);
    const {error} = await client.auth.signInWithPassword({email: data.get("email"), password: data.get("password")});
    if (error) return showNotice(notice, "Неверная почта или пароль.", "error");
    await loadAdmin();
  });
  document.querySelector("#logout").addEventListener("click", async () => { await client.auth.signOut(); location.reload(); });
  document.querySelector("#checkin-form").addEventListener("submit", handleCheckin);
  const {data:{session}} = await client.auth.getSession();
  if (session) await loadAdmin();
}

async function loadAdmin() {
  const notice = document.querySelector("#admin-notice");
  const result = await client.rpc("admin_list_registrations");
  if (result.error) return showNotice(notice, "У этой учётной записи нет доступа организатора.", "error");
  document.querySelector("#admin-login").classList.add("hidden");
  document.querySelector("#admin-panel").classList.remove("hidden");
  document.querySelector("#logout").classList.remove("hidden");
  notice.classList.add("hidden");
  renderApplications(result.data || []);
  const checkinToken = new URLSearchParams(location.search).get("checkin");
  if (checkinToken) {
    document.querySelector("#checkin-token").value = checkinToken;
    history.replaceState({}, "", location.pathname);
    await checkInToken(checkinToken);
  }
}

function renderApplications(rows) {
  document.querySelector("#stat-total").textContent = rows.length;
  document.querySelector("#stat-issued").textContent = rows.filter(r => r.status === "issued").length;
  document.querySelector("#stat-used").textContent = rows.filter(r => r.checked_in_at).length;
  const list = document.querySelector("#applications");
  list.innerHTML = rows.map(row => {
    const ticketUrl = row.ticket_token ? `${cfg.siteUrl}/ticket.html?token=${encodeURIComponent(row.ticket_token)}` : "";
    const message = `Здравствуйте, ${row.full_name}! Оплата подтверждена. Ваш именной билет на юбилей PAGE17: ${ticketUrl}`;
    return `<article class="application">
      <div><h3>${escapeHtml(row.full_name)}</h3><p>Заявка №${row.application_number} · +${escapeHtml(row.whatsapp)} · ${statusLabel(row)}</p>${row.serial_number ? `<strong>${row.serial_number}</strong>` : ""}</div>
      <div class="application-actions">
        <button class="button secondary" data-receipt="${escapeHtml(row.receipt_path)}">Чек</button>
        ${row.status === "pending" ? `<button class="button" data-approve="${row.id}">Подтвердить</button><button class="button danger" data-reject="${row.id}">Отклонить</button>` : ""}
        ${row.status === "issued" ? `<a class="button" target="_blank" rel="noreferrer" href="https://wa.me/${row.whatsapp}?text=${encodeURIComponent(message)}">WhatsApp</a>` : ""}
      </div>
    </article>`;
  }).join("") || "<p>Заявок пока нет.</p>";
  list.querySelectorAll("[data-receipt]").forEach(button => button.addEventListener("click", () => openReceipt(button.dataset.receipt)));
  list.querySelectorAll("[data-approve]").forEach(button => button.addEventListener("click", () => updateApplication("approve_registration", button.dataset.approve)));
  list.querySelectorAll("[data-reject]").forEach(button => button.addEventListener("click", () => updateApplication("reject_registration", button.dataset.reject)));
}

async function openReceipt(path) {
  const result = await client.storage.from("receipts").createSignedUrl(path, 300);
  if (!result.error && result.data?.signedUrl) window.open(result.data.signedUrl, "_blank", "noopener");
}

async function updateApplication(action, id) {
  const result = await client.rpc(action, {p_registration_id: id});
  if (result.error) alert(result.error.message.includes("sold_out") ? "Лимит 60 билетов исчерпан." : "Не удалось обновить заявку.");
  await loadAdmin();
}

async function handleCheckin(event) {
  event.preventDefault();
  const input = document.querySelector("#checkin-token");
  const raw = input.value.trim();
  let token = raw;
  if (raw.includes("=")) {
    try {
      const params = new URL(raw).searchParams;
      token = params.get("checkin") || params.get("token") || raw;
    } catch (_) {}
  }
  input.value = "";
  await checkInToken(token);
}

async function checkInToken(token) {
  const notice = document.querySelector("#checkin-notice");
  const result = await client.rpc("check_in_ticket", {p_token: token});
  if (result.error || !result.data?.length) return showNotice(notice, "Билет не найден.", "error");
  const ticket = result.data[0];
  showNotice(notice, ticket.was_already_used ? `${ticket.full_name}: билет уже использован ранее.` : `${ticket.full_name}: вход подтверждён.`, ticket.was_already_used ? "error" : "success");
  await loadAdmin();
}

function statusLabel(row) {
  if (row.checked_in_at) return "использован";
  return {pending:"ожидает проверки", issued:"билет выдан", rejected:"отклонена"}[row.status] || row.status;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
}

initRegistration();
initTicket();
initAdmin();
