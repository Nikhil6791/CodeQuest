const ACCOUNTS_KEY = "codequest-accounts";
const SESSION_KEY = "codequest-session";

function loadAccounts() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error("Unable to load accounts", error);
    return {};
  }
}

function saveAccounts(accounts) {
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch (error) {
    console.error("Unable to save accounts", error);
  }
}

function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function generateSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return bytesToHex(bytes);
}

async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const digest = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(`${salt}:${password}`),
  );
  return bytesToHex(new Uint8Array(digest));
}

function toKey(username) {
  return username.trim().toLowerCase();
}

export function getSession() {
  return localStorage.getItem(SESSION_KEY);
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function listStudentAccounts() {
  return Object.values(loadAccounts()).filter(
    (account) => account.role === "student",
  );
}

export async function signUpAccount({ username, password, role }) {
  const trimmedName = username.trim();
  if (!trimmedName || !password) {
    throw new Error("Username and password are required.");
  }
  if (password.length < 4) {
    throw new Error("Password must be at least 4 characters.");
  }

  const key = toKey(trimmedName);
  const accounts = loadAccounts();
  if (accounts[key]) {
    throw new Error("That username is already taken.");
  }

  const salt = generateSalt();
  const passwordHash = await hashPassword(password, salt);

  accounts[key] = {
    username: trimmedName,
    passwordHash,
    salt,
    role,
    createdAt: new Date().toISOString(),
  };
  saveAccounts(accounts);
  localStorage.setItem(SESSION_KEY, key);

  return { username: trimmedName, role };
}

export async function loginAccount({ username, password }) {
  const key = toKey(username);
  const accounts = loadAccounts();
  const account = accounts[key];
  if (!account) {
    throw new Error("No account found with that username.");
  }

  const attemptHash = await hashPassword(password, account.salt);
  if (attemptHash !== account.passwordHash) {
    throw new Error("Incorrect password.");
  }

  localStorage.setItem(SESSION_KEY, key);
  return { username: account.username, role: account.role };
}

export function getCurrentAccount() {
  const key = getSession();
  if (!key) return null;

  const account = loadAccounts()[key];
  if (!account) return null;

  return { username: account.username, role: account.role };
}
