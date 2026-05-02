// 🔐 LocalStorage Keys
const USERS_KEY = "users";

// 📦 Helpers
const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// ✅ REGISTER USER
export const registerUser = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();

      // check if user already exists
      const existingUser = users.find((u) => u.email === data.email);
      if (existingUser) {
        return reject(new Error("User already exists"));
      }

      // store new user
      const newUser = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role, // "buyer" or "seller"
      };

      users.push(newUser);
      saveUsers(users);

      resolve(newUser);
    }, 500);
  });
};

// ✅ LOGIN BUYER
export const loginBuyer = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();

      const user = users.find((u) => u.email === data.email);

      if (!user) {
        return reject(new Error("User not found"));
      }

      if (user.password !== data.password) {
        return reject(new Error("Wrong password"));
      }

      if (user.role !== "buyer") {
        return reject(new Error("This account is not a buyer"));
      }

      resolve(user);
    }, 500);
  });
};

// ✅ LOGIN SELLER
export const loginSeller = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();

      const user = users.find((u) => u.email === data.email);

      if (!user) {
        return reject(new Error("User not found"));
      }

      if (user.password !== data.password) {
        return reject(new Error("Wrong password"));
      }

      if (user.role !== "seller") {
        return reject(new Error("This account is not a seller"));
      }

      resolve(user);
    }, 500);
  });
};
