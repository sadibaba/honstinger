const API_URL = "http://localhost:5000/api";
const BASE_URL = "http://localhost:5000";

// ─────────────────────────────────────────────────────────────
// ADMIN CREDENTIALS (hardcoded — .env se match karna chahiye)
// ─────────────────────────────────────────────────────────────
const ADMIN_EMAIL = "s@s.com";
const ADMIN_PASSWORD = "12345678";

const getAdminCredentials = () => ({
  adminEmail: ADMIN_EMAIL,
  adminPassword: ADMIN_PASSWORD,
});

// ─────────────────────────────────────────────────────────────
// IMAGE URL HELPER
// ─────────────────────────────────────────────────────────────
export const getImageUrl = (image) => {
  if (!image) return null;

  if (typeof image === "string") {
    if (image.startsWith("http")) return image;
    if (image.startsWith("/uploads")) return `${BASE_URL}${image}`;
    return image;
  }

  if (typeof image === "object") {
    const url = image.url || image.data;
    if (!url) return null;
    if (url.startsWith("http")) return url;
    if (url.startsWith("/uploads")) return `${BASE_URL}${url}`;
    return url;
  }

  return null;
};

// ─────────────────────────────────────────────────────────────
// RESPONSE HANDLER
// ─────────────────────────────────────────────────────────────
const handleResponse = async (response) => {
  let data;
  try {
    data = await response.json();
  } catch (e) {
    throw new Error("Server returned an invalid response");
  }

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Too many requests. Please wait a few minutes.");
    }
    if (response.status === 403) {
      throw new Error("You do not have permission to perform this action");
    }
    if (response.status === 404) {
      throw new Error("The requested resource was not found");
    }
    if (response.status === 500) {
      console.error("Server 500 Error:", data);
      throw new Error(data.message || "Server error. Please try again later.");
    }
    throw new Error(
      data.message || data.error || `Request failed with status ${response.status}`
    );
  }

  return data;
};

// ─────────────────────────────────────────────────────────────
// GET
// ─────────────────────────────────────────────────────────────
export const getData = async (endpoint) => {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      headers: { Accept: "application/json" },
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(`API GET Error (${endpoint}):`, error);
    throw error;
  }
};

// ─────────────────────────────────────────────────────────────
// POST — admin credentials auto-inject
// ─────────────────────────────────────────────────────────────
export const postData = async (endpoint, data, isFormData = false) => {
  try {
    let body;
    const headers = { Accept: "application/json" };

    if (isFormData) {
      const creds = getAdminCredentials();
      data.append("adminEmail", creds.adminEmail);
      data.append("adminPassword", creds.adminPassword);
      body = data;
    } else {
      const creds = getAdminCredentials();
      const payload = { ...(data || {}), ...creds };
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(payload);
    }

    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers,
      body,
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(`API POST Error (${endpoint}):`, error);
    throw error;
  }
};

// ─────────────────────────────────────────────────────────────
// PUT — admin credentials auto-inject
// ─────────────────────────────────────────────────────────────
export const putData = async (endpoint, data, isFormData = false) => {
  try {
    let body;
    const headers = { Accept: "application/json" };

    if (isFormData) {
      const creds = getAdminCredentials();
      data.append("adminEmail", creds.adminEmail);
      data.append("adminPassword", creds.adminPassword);
      body = data;
    } else {
      const creds = getAdminCredentials();
      const payload = { ...(data || {}), ...creds };
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(payload);
    }

    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "PUT",
      headers,
      body,
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(`API PUT Error (${endpoint}):`, error);
    throw error;
  }
};

// ─────────────────────────────────────────────────────────────
// DELETE — admin credentials in headers
// ─────────────────────────────────────────────────────────────
export const deleteData = async (endpoint) => {
  try {
    const creds = getAdminCredentials();
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "x-admin-email": creds.adminEmail,
        "x-admin-password": creds.adminPassword,
      },
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(`API DELETE Error (${endpoint}):`, error);
    if (error.message === "Failed to fetch") {
      error.message = "Network error: Could not connect to server.";
    }
    throw error;
  }
};

// ─────────────────────────────────────────────────────────────
// POSTS
// ─────────────────────────────────────────────────────────────
export const getPosts = async (forceRefresh = false) => {
  try {
    const cacheKey = "posts_cache";
    const cacheTimeKey = "posts_cache_time";
    const CACHE_DURATION = 60000;

    if (!forceRefresh) {
      const cached = localStorage.getItem(cacheKey);
      const cacheTime = localStorage.getItem(cacheTimeKey);
      if (cached && cacheTime && Date.now() - parseInt(cacheTime) < CACHE_DURATION) {
        return JSON.parse(cached);
      }
    }

    const response = await getData("posts");
    const data = response.data || response;

    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(cacheTimeKey, Date.now().toString());

    return data;
  } catch (error) {
    console.error("Get posts error:", error);
    throw new Error("Failed to load posts. Please refresh the page.");
  }
};

export const getPost = async (id) => {
  try {
    const response = await getData(`posts/${id}`);
    return response.data || response;
  } catch (error) {
    console.error("Get post error:", error);
    throw new Error("Failed to load the post.");
  }
};

export const createPost = async (data) => {
  try {
    const isFormData = data instanceof FormData;
    const response = await postData("posts", data, isFormData);

    localStorage.removeItem("posts_cache");
    localStorage.removeItem("posts_cache_time");

    if (response && response.post) {
      return { success: true, data: { post: response.post } };
    }
    return response.data || response;
  } catch (error) {
    console.error("Create post error:", error);
    throw new Error(error.message || "Failed to create post.");
  }
};

export const updatePost = async (id, postData) => {
  try {
    const isFormData = postData instanceof FormData;
    const response = await putData(`posts/${id}`, postData, isFormData);
    localStorage.removeItem("posts_cache");
    localStorage.removeItem("posts_cache_time");
    return response.data || response;
  } catch (error) {
    console.error("Update post error:", error);
    throw new Error(error.message || "Failed to update post.");
  }
};

export const deletePost = async (id) => {
  try {
    const response = await deleteData(`posts/${id}`);
    localStorage.removeItem("posts_cache");
    localStorage.removeItem("posts_cache_time");
    return response;
  } catch (error) {
    console.error("Delete post error:", error);
    throw new Error(error.message || "Failed to delete post.");
  }
};

// ─────────────────────────────────────────────────────────────
// COMMENTS
// ─────────────────────────────────────────────────────────────
export const getComments = async (postId) => {
  try {
    const response = await getData(`comments/${postId}`);
    return response.data || response;
  } catch (error) {
    console.error("Get comments error:", error);
    throw new Error("Failed to load comments.");
  }
};

export const addComment = async (commentData) => {
  try {
    const response = await postData("comments", commentData);
    return response.data || response;
  } catch (error) {
    console.error("Add comment error:", error);
    throw new Error(error.message || "Failed to add comment.");
  }
};

export const deleteComment = async (id) => {
  try {
    return await deleteData(`comments/${id}`);
  } catch (error) {
    console.error("Delete comment error:", error);
    throw new Error(error.message || "Failed to delete comment.");
  }
};

// ─────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────
export const getCategories = async () => {
  try {
    const response = await getData("categories");
    return response.data || response;
  } catch (error) {
    console.error("Get categories error:", error);
    return [];
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await postData("categories", categoryData);
    return response.data || response;
  } catch (error) {
    console.error("Create category error:", error);
    throw new Error(error.message || "Failed to create category.");
  }
};